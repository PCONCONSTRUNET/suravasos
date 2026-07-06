// Supabase Edge Function — Brasil NFe Webhook Receiver
// Deploy: supabase functions deploy brasilnfe-webhook
// URL:    https://<project-ref>.supabase.co/functions/v1/brasilnfe-webhook
//
// Configurar no painel Supabase:
//   supabase secrets set BRASILNFE_WEBHOOK_SECRET=<seu_secret_gerado_no_painel_brasilnfe>

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── Tipos do payload Brasil NFe ──────────────────────────────────────────────

interface WebhookEnvelope {
  event: string;
  deliveryId: string;
  timestamp: string;
  data: Record<string, unknown>;
}

interface NotaLote {
  id: number;
  numero: number;
  serie: number;
  chaveAcesso: string;
  numeroProtocolo: string;
  codStatus: number;
  dsStatus: string;
  error: string | null;
}

interface LoteFinalizadoData {
  codLote: string;
  tipoAmbiente: number;
  modeloDocumento: number;
  status: number;
  qtdTotal: number;
  qtdEmitida: number;
  qtdErro: number;
  notas: NotaLote[];
}

// ─── Verificação de assinatura HMAC-SHA256 ───────────────────────────────────

async function verificarAssinatura(
  body: string,
  headerRecebido: string,
  secret: string,
): Promise<boolean> {
  if (!headerRecebido || !secret) return false;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(body);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, msgData);
  const hashHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const esperada = `sha256=${hashHex}`;

  // Comparação em tempo constante (evita timing attacks)
  if (esperada.length !== headerRecebido.length) return false;

  let diff = 0;
  for (let i = 0; i < esperada.length; i++) {
    diff |= esperada.charCodeAt(i) ^ headerRecebido.charCodeAt(i);
  }
  return diff === 0;
}

// ─── Handler principal ────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  // Só aceita POST
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Ler o body raw (antes de qualquer parse para não quebrar a assinatura)
  const bodyRaw = await req.text();

  // Verificar assinatura com o secret configurado via Supabase Secrets
  const webhookSecret = Deno.env.get("BRASILNFE_WEBHOOK_SECRET") ?? "";
  const signatureHeader = req.headers.get("x-webhook-signature") ?? "";

  if (webhookSecret) {
    const assinaturaValida = await verificarAssinatura(
      bodyRaw,
      signatureHeader,
      webhookSecret,
    );
    if (!assinaturaValida) {
      console.error("Assinatura inválida recebida:", signatureHeader);
      return new Response(
        JSON.stringify({ error: "Assinatura inválida" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }
  }

  // Idempotência: ler o deliveryId para evitar processar duplicatas
  const deliveryId = req.headers.get("x-webhook-delivery") ?? "";
  const attempt = req.headers.get("x-webhook-attempt") ?? "1";
  const event = req.headers.get("x-webhook-event") ?? "";

  console.log(`[BrasilNFe Webhook] event=${event} deliveryId=${deliveryId} attempt=${attempt}`);

  // Parse do payload
  let envelope: WebhookEnvelope;
  try {
    envelope = JSON.parse(bodyRaw);
  } catch {
    return new Response(
      JSON.stringify({ error: "Payload inválido" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Inicializar cliente Supabase com service_role para bypass de RLS
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  // ── Verificar idempotência ─────────────────────────────────────────────────
  // Registrar o deliveryId para evitar reprocessamento de retentativas
  if (deliveryId) {
    const { data: existente } = await supabase
      .from("webhook_deliveries")
      .select("id")
      .eq("delivery_id", deliveryId)
      .maybeSingle();

    if (existente) {
      console.log(`Delivery ${deliveryId} já processado — ignorando.`);
      return new Response(
        JSON.stringify({ ok: true, idempotent: true }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    // Registrar este deliveryId (TTL gerenciado por cron ou política de retenção)
    await supabase.from("webhook_deliveries").insert({
      delivery_id: deliveryId,
      event: envelope.event,
      attempt: Number(attempt),
      payload: envelope,
      processado_em: new Date().toISOString(),
    }).throwOnError().catch(() => {
      // Se a tabela não existir ainda, apenas continua sem idempotência
      console.warn("Tabela webhook_deliveries não encontrada — idempotência desativada.");
    });
  }

  // ── Processar por tipo de evento ───────────────────────────────────────────

  switch (envelope.event) {
    // ── Teste de conectividade ─────────────────────────────────────────────
    case "test.ping": {
      console.log("Ping recebido do Brasil NFe — webhook ativo.");
      break;
    }

    // ── Lote de NF-e finalizado ────────────────────────────────────────────
    case "nfe.lote.finalizado": {
      const data = envelope.data as unknown as LoteFinalizadoData;

      console.log(
        `Lote ${data.codLote} finalizado: ${data.qtdEmitida}/${data.qtdTotal} emitidas`,
      );

      // Atualizar cada nota do lote no banco
      for (const nota of data.notas ?? []) {
        const statusStr =
          nota.codStatus === 100 || nota.codStatus === 150
            ? "Autorizada"
            : nota.codStatus === 101
            ? "Cancelada"
            : nota.codStatus === 110
            ? "Denegada"
            : "Erro";

        const { error: updateError } = await supabase
          .from("notas_fiscais")
          .update({
            numero: String(nota.numero),
            chave_acesso: nota.chaveAcesso || "",
            numero_protocolo: nota.numeroProtocolo || null,
            cod_status: nota.codStatus,
            ds_status: nota.dsStatus || null,
            error_message: nota.error || null,
            status: statusStr,
            tipo_ambiente: data.tipoAmbiente,
          })
          .eq("brasilnfe_id", nota.id);

        if (updateError) {
          console.error(`Erro ao atualizar nota ${nota.id}:`, updateError.message);
        } else {
          console.log(`Nota ${nota.id} (${nota.numero}) atualizada: ${statusStr}`);
        }
      }
      break;
    }

    // ── Documento de entrada recebido (NF-e/CT-e chegou para sua empresa) ─
    case "documento.entrada.recebida": {
      const data = envelope.data as {
        Chave: string;
        Numero: number;
        ModeloDocumento: number;
        Valor: number;
        CnpjEmissor: string;
        NomeEmissor: string;
        CnpjDestinatario: string;
        NumeroProtocolo: string;
        Status: number;
        DtEmissao: string;
        DtRecebimento: string;
      };

      console.log(
        `Documento de entrada recebido: ${data.Chave} de ${data.NomeEmissor}`,
      );

      // Registrar na tabela de documentos de entrada (se existir)
      await supabase.from("documentos_entrada").upsert(
        {
          chave_acesso: data.Chave,
          numero: data.Numero,
          modelo: data.ModeloDocumento,
          valor: data.Valor,
          cnpj_emissor: data.CnpjEmissor,
          nome_emissor: data.NomeEmissor,
          cnpj_destinatario: data.CnpjDestinatario,
          numero_protocolo: data.NumeroProtocolo,
          status: data.Status,
          dt_emissao: data.DtEmissao,
          dt_recebimento: data.DtRecebimento,
          webhook_delivery_id: deliveryId,
        },
        { onConflict: "chave_acesso" },
      ).throwOnError().catch((err: Error) => {
        // Tabela pode não existir ainda — apenas loga
        console.warn("documentos_entrada não encontrada:", err.message);
      });
      break;
    }

    // ── Documento de entrada cancelado ─────────────────────────────────────
    case "documento.entrada.cancelada": {
      const data = envelope.data as { Chave: string; NomeEmissor: string };

      console.log(`Documento cancelado: ${data.Chave}`);

      await supabase
        .from("documentos_entrada")
        .update({ status: 2 }) // 2 = cancelado
        .eq("chave_acesso", data.Chave)
        .throwOnError()
        .catch((err: Error) => {
          console.warn("documentos_entrada não encontrada:", err.message);
        });
      break;
    }

    default: {
      console.warn(`Evento não tratado: ${envelope.event}`);
    }
  }

  // Sempre responder 200 rapidamente para evitar retentativas desnecessárias
  return new Response(
    JSON.stringify({ ok: true, event: envelope.event, deliveryId }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
});
