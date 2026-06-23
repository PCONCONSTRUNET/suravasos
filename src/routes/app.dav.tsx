import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, Printer, Trash2, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useConfirm } from "@/contexts/ConfirmContext";

export const Route = createFileRoute("/app/dav")({
  head: () => ({ meta: [{ title: "Orçamentos (DAV) — VIVAVERDE ERP" }] }),
  validateSearch: (search: Record<string, unknown>): { id?: string } => ({
    id: search.id as string | undefined,
  }),
  component: DAVList,
});

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

function gerarHTMLOrcamento(dav: any, itens: any[]) {
  const linhasItens = itens.map((i, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${i.codigo || '—'}</td>
      <td>${i.produto || '—'}</td>
      <td style="text-align:center">${i.qtd}</td>
      <td style="text-align:right">R$ ${Number(i.valor_unitario || 0).toFixed(2).replace('.', ',')}</td>
      <td style="text-align:right"><strong>R$ ${Number(i.total || 0).toFixed(2).replace('.', ',')}</strong></td>
    </tr>
  `).join('');

  const total = Number(dav.total || 0);
  const subtotal = Number(dav.subtotal || 0);
  const desconto = Number(dav.desconto_valor || 0);
  const frete = Number(dav.frete_valor || 0);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>Orçamento ${dav.id?.substring(0,8).toUpperCase()}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, sans-serif; font-size: 12px; color: #111; padding: 32px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #16a34a; padding-bottom: 16px; margin-bottom: 20px; }
    .logo { font-size: 22px; font-weight: 900; color: #16a34a; letter-spacing: -1px; }
    .logo span { color: #111; }
    .doc-title { text-align: right; }
    .doc-title h2 { font-size: 18px; font-weight: bold; color: #16a34a; }
    .doc-title p { color: #666; font-size: 11px; margin-top: 2px; }
    .section { margin-bottom: 16px; }
    .section-title { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #16a34a; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 8px; letter-spacing: 0.5px; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .info-row { margin-bottom: 4px; }
    .info-label { color: #666; font-size: 11px; }
    .info-value { font-weight: 600; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    thead tr { background: #f0fdf4; }
    th { padding: 8px 6px; text-align: left; font-size: 11px; font-weight: bold; border-bottom: 2px solid #16a34a; }
    td { padding: 7px 6px; border-bottom: 1px solid #f3f4f6; font-size: 12px; }
    tbody tr:nth-child(even) { background: #fafafa; }
    .totals { float: right; width: 260px; }
    .total-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; }
    .total-final { display: flex; justify-content: space-between; padding: 8px 0; font-size: 15px; font-weight: bold; border-top: 2px solid #16a34a; margin-top: 4px; color: #16a34a; }
    .clearfix::after { content: ""; display: table; clear: both; }
    .obs { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; padding: 10px; margin-top: 16px; font-size: 11px; }
    .footer { margin-top: 32px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #e5e7eb; padding-top: 12px; }
    .validade { font-size: 11px; color: #f59e0b; font-weight: 600; }
    @media print { body { padding: 16px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">VIVA<span>VERDE</span></div>
      <div style="font-size:11px; color:#666; margin-top:4px;">Distribuidora de Vasos e Acessórios</div>
      <div style="font-size:11px; color:#666;">Rod. Marechal Rondon, KM 342 — Bauru/SP</div>
    </div>
    <div class="doc-title">
      <h2>ORÇAMENTO (DAV)</h2>
      <p>Nº ${dav.id?.substring(0,8).toUpperCase()}</p>
      <p>Data: ${new Date(dav.created_at || dav.validade || Date.now()).toLocaleDateString('pt-BR')}</p>
      ${dav.validade ? `<p class="validade">Válido até: ${new Date(dav.validade).toLocaleDateString('pt-BR')}</p>` : ''}
    </div>
  </div>

  <div class="grid2" style="margin-bottom:20px;">
    <div class="section">
      <div class="section-title">Dados do Cliente</div>
      <div class="info-row"><span class="info-label">Nome/Razão Social: </span><span class="info-value">${dav.cliente_nome || '—'}</span></div>
      ${dav.cliente_cnpj ? `<div class="info-row"><span class="info-label">CNPJ/CPF: </span><span class="info-value">${dav.cliente_cnpj}</span></div>` : ''}
      ${dav.cliente_endereco ? `<div class="info-row"><span class="info-label">Endereço: </span><span class="info-value">${dav.cliente_endereco}</span></div>` : ''}
      ${dav.cliente_telefone ? `<div class="info-row"><span class="info-label">Telefone: </span><span class="info-value">${dav.cliente_telefone}</span></div>` : ''}
    </div>
    <div class="section">
      <div class="section-title">Condições Comerciais</div>
      ${dav.vendedor ? `<div class="info-row"><span class="info-label">Vendedor: </span><span class="info-value">${dav.vendedor}</span></div>` : ''}
      ${dav.condicao_pagamento ? `<div class="info-row"><span class="info-label">Pagamento: </span><span class="info-value">${dav.condicao_pagamento}</span></div>` : ''}
      ${dav.frete_tipo ? `<div class="info-row"><span class="info-label">Frete: </span><span class="info-value">${dav.frete_tipo}</span></div>` : ''}
      ${dav.prazo_entrega ? `<div class="info-row"><span class="info-label">Prazo: </span><span class="info-value">${dav.prazo_entrega}</span></div>` : ''}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Produtos</div>
    <table>
      <thead>
        <tr>
          <th style="width:30px">#</th>
          <th style="width:80px">Código</th>
          <th>Produto</th>
          <th style="width:50px; text-align:center">Qtd</th>
          <th style="width:100px; text-align:right">Vlr Unit.</th>
          <th style="width:110px; text-align:right">Total</th>
        </tr>
      </thead>
      <tbody>${linhasItens}</tbody>
    </table>
  </div>

  <div class="clearfix">
    <div class="totals">
      <div class="total-row"><span>Subtotal</span><span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span></div>
      ${desconto > 0 ? `<div class="total-row"><span>Desconto</span><span style="color:#dc2626">- R$ ${desconto.toFixed(2).replace('.', ',')}</span></div>` : ''}
      ${frete > 0 ? `<div class="total-row"><span>Frete</span><span>R$ ${frete.toFixed(2).replace('.', ',')}</span></div>` : ''}
      <div class="total-final"><span>TOTAL</span><span>R$ ${total.toFixed(2).replace('.', ',')}</span></div>
    </div>
  </div>

  ${dav.observacoes ? `<div class="obs"><strong>Observações:</strong> ${dav.observacoes}</div>` : ''}

  <div class="footer">
    Este documento não tem validade fiscal. Orçamento sujeito a alteração sem aviso prévio.<br/>
    VIVAVERDE Distribuidora — contato@vivaverde.com.br
  </div>
</body>
</html>`;
}

function DAVList() {
  const confirm = useConfirm();
  const [davs, setDavs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Detail drawer
  const [selectedDav, setSelectedDav] = useState<any | null>(null);
  const [selectedItens, setSelectedItens] = useState<any[]>([]);
  const [loadingItens, setLoadingItens] = useState(false);

  const fetchDavs = async () => {
    try {
      const { data, error } = await supabase.from('davs').select('*');
      if (error) throw error;
      const sorted = (data || []).sort((a: any, b: any) => {
        const dateA = a.created_at || a.validade || "";
        const dateB = b.created_at || b.validade || "";
        return dateB.localeCompare(dateA);
      });
      setDavs(sorted);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao buscar orçamentos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDavs(); }, []);

  const handleOpenDetail = async (d: any) => {
    setSelectedDav(d);
    setLoadingItens(true);
    try {
      const { data, error } = await supabase.from('dav_items').select('*').eq('dav_id', d.id);
      if (!error && data) setSelectedItens(data);
    } catch (e) { console.error(e); }
    finally { setLoadingItens(false); }
  };

  const handleDelete = async (id: string) => {
    if (!await confirm({ description: "Tem certeza que deseja excluir este orçamento?", variant: "destructive" })) return;
    try {
      await supabase.from('dav_items').delete().eq('dav_id', id);
      const { error } = await supabase.from('davs').delete().eq('id', id);
      if (error) throw error;
      if (selectedDav?.id === id) setSelectedDav(null);
      fetchDavs();
    } catch (err: any) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const handleImprimir = async (d: any) => {
    setLoadingItens(true);
    let itens = selectedItens;
    if (!selectedDav || selectedDav.id !== d.id) {
      const { data } = await supabase.from('dav_items').select('*').eq('dav_id', d.id);
      itens = data || [];
    }
    setLoadingItens(false);
    const html = gerarHTMLOrcamento(d, itens);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      setTimeout(() => win.print(), 500);
    }
  };

  const handleWhatsApp = async (d: any) => {
    let itens = selectedItens;
    if (!selectedDav || selectedDav.id !== d.id) {
      const { data } = await supabase.from('dav_items').select('*').eq('dav_id', d.id);
      itens = data || [];
    }
    const linhas = itens.map(i =>
      `▪ *${i.produto}* — Qtd: ${i.qtd} × R$ ${Number(i.valor_unitario).toFixed(2).replace('.', ',')} = *R$ ${Number(i.total).toFixed(2).replace('.', ',')}*`
    ).join('\n');

    const total = Number(d.total || 0);
    const desconto = Number(d.desconto_valor || 0);
    const frete = Number(d.frete_valor || 0);

    const mensagem =
      `Olá ${d.cliente_nome || ''}! Segue seu orçamento da *VIVAVERDE* 🌿\n\n` +
      `*Orçamento Nº:* ${d.id?.substring(0, 8).toUpperCase()}\n` +
      (d.validade ? `*Válido até:* ${new Date(d.validade).toLocaleDateString('pt-BR')}\n` : '') +
      `\n*PRODUTOS:*\n${linhas}\n\n` +
      (desconto > 0 ? `*Desconto:* - R$ ${desconto.toFixed(2).replace('.', ',')}\n` : '') +
      (frete > 0 ? `*Frete:* R$ ${frete.toFixed(2).replace('.', ',')}\n` : '') +
      `\n💰 *TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n` +
      (d.condicao_pagamento ? `*Pagamento:* ${d.condicao_pagamento}\n` : '') +
      (d.prazo_entrega ? `*Prazo de entrega:* ${d.prazo_entrega}\n` : '') +
      `\nQualquer dúvida estamos à disposição! 😊`;

    const tel = d.cliente_telefone?.replace(/\D/g, '');
    const base = tel ? `https://wa.me/55${tel}` : `https://wa.me/`;
    window.open(`${base}?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const getStatusTone = (status: string) => {
    if (status === 'Aprovado') return "bg-success/15 text-success border-0";
    if (status === 'Rejeitado') return "bg-destructive/10 text-destructive border-0";
    return "bg-info/15 text-info border-0";
  };

  const fmtDate = (v: string) => {
    if (!v) return '—';
    try { return new Date(v).toLocaleDateString('pt-BR'); } catch { return '—'; }
  };

  return (
    <>
      <PageHeader title="Orçamentos (DAV)" subtitle="Documentos Auxiliares de Venda" actions={
        <Button className="bg-gradient-brand text-primary-foreground" asChild>
          <Link to="/app/dav-novo"><Plus className="mr-2 h-4 w-4" />Novo DAV</Link>
        </Button>
      } />

      <Card className="shadow-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Nº</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8">Carregando DAVs...</TableCell></TableRow>
            ) : davs.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum orçamento encontrado.</TableCell></TableRow>
            ) : davs.map((d) => (
              <TableRow
                key={d.id}
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => handleOpenDetail(d)}
              >
                <TableCell className="font-mono text-xs">{d.id.substring(0, 8).toUpperCase()}</TableCell>
                <TableCell className="font-semibold">{d.cliente_nome || "—"}</TableCell>
                <TableCell>{fmtDate(d.created_at || d.validade)}</TableCell>
                <TableCell className="text-right font-semibold">
                  R$ {Number(d.total || 0).toFixed(2).replace('.', ',')}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusTone(d.status || 'Aberto')}>{d.status || 'Aberto'}</Badge>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    {/* Imprimir PDF */}
                    <Button
                      variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-primary"
                      title="Imprimir / Salvar PDF"
                      onClick={(e) => { e.stopPropagation(); handleImprimir(d); }}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                    {/* WhatsApp */}
                    <Button
                      variant="ghost" size="icon" className="h-8 w-8 text-[#25D366] hover:text-[#1aab57] hover:bg-green-50"
                      title="Enviar orçamento via WhatsApp"
                      onClick={(e) => { e.stopPropagation(); handleWhatsApp(d); }}
                    >
                      <WhatsAppIcon />
                    </Button>
                    {/* Excluir */}
                    <Button
                      variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={(e) => { e.stopPropagation(); handleDelete(d.id); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Sheet de detalhes do DAV */}
      <Sheet open={!!selectedDav} onOpenChange={(open) => !open && setSelectedDav(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0">
          {selectedDav && (
            <>
              <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-emerald-50 to-white">
                <div className="flex items-start justify-between">
                  <div>
                    <SheetTitle className="text-lg">
                      Orçamento Nº {selectedDav.id?.substring(0, 8).toUpperCase()}
                    </SheetTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">{selectedDav.cliente_nome}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge className={getStatusTone(selectedDav.status || 'Aberto')}>
                      {selectedDav.status || 'Aberto'}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedDav(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => handleImprimir(selectedDav)}>
                    <Printer className="h-4 w-4" /> Imprimir / PDF
                  </Button>
                  <Button size="sm" className="gap-1.5 bg-[#25D366] hover:bg-[#1aab57] text-white" onClick={() => handleWhatsApp(selectedDav)}>
                    <WhatsAppIcon /> Enviar via WhatsApp
                  </Button>
                </div>
              </SheetHeader>

              <div className="px-6 py-4 space-y-6">
                {/* Dados do cliente */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">Dados do Cliente</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground block text-xs">Nome</span><span className="font-semibold">{selectedDav.cliente_nome || '—'}</span></div>
                    <div><span className="text-muted-foreground block text-xs">CNPJ/CPF</span><span className="font-semibold">{selectedDav.cliente_cnpj || '—'}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Telefone</span><span className="font-semibold">{selectedDav.cliente_telefone || '—'}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Endereço</span><span className="font-semibold">{selectedDav.cliente_endereco || '—'}</span></div>
                  </div>
                </div>

                {/* Condições */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">Condições Comerciais</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground block text-xs">Vendedor</span><span className="font-semibold">{selectedDav.vendedor || '—'}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Pagamento</span><span className="font-semibold">{selectedDav.condicao_pagamento || '—'}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Frete</span><span className="font-semibold">{selectedDav.frete_tipo || '—'}</span></div>
                    <div><span className="text-muted-foreground block text-xs">Prazo</span><span className="font-semibold">{selectedDav.prazo_entrega || '—'}</span></div>
                    {selectedDav.validade && (
                      <div><span className="text-muted-foreground block text-xs">Validade</span><span className="font-semibold text-amber-600">{fmtDate(selectedDav.validade)}</span></div>
                    )}
                  </div>
                </div>

                {/* Itens */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">Produtos</h4>
                  {loadingItens ? (
                    <p className="text-sm text-muted-foreground">Carregando itens...</p>
                  ) : selectedItens.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhum item encontrado.</p>
                  ) : (
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left px-3 py-2 text-xs font-semibold">Produto</th>
                            <th className="text-center px-3 py-2 text-xs font-semibold">Qtd</th>
                            <th className="text-right px-3 py-2 text-xs font-semibold">Unit.</th>
                            <th className="text-right px-3 py-2 text-xs font-semibold">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedItens.map((i, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="px-3 py-2.5">
                                <p className="font-semibold text-slate-800">{i.produto}</p>
                                {i.codigo && <p className="text-xs text-muted-foreground font-mono">{i.codigo}</p>}
                              </td>
                              <td className="px-3 py-2.5 text-center font-medium">{i.qtd}</td>
                              <td className="px-3 py-2.5 text-right text-muted-foreground">R$ {Number(i.valor_unitario || 0).toFixed(2).replace('.', ',')}</td>
                              <td className="px-3 py-2.5 text-right font-bold">R$ {Number(i.total || 0).toFixed(2).replace('.', ',')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Totais */}
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
                  {Number(selectedDav.desconto_valor) > 0 && (
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>R$ {Number(selectedDav.subtotal || 0).toFixed(2).replace('.', ',')}</span></div>
                  )}
                  {Number(selectedDav.desconto_valor) > 0 && (
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Desconto</span><span className="text-destructive">- R$ {Number(selectedDav.desconto_valor || 0).toFixed(2).replace('.', ',')}</span></div>
                  )}
                  {Number(selectedDav.frete_valor) > 0 && (
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Frete</span><span>R$ {Number(selectedDav.frete_valor || 0).toFixed(2).replace('.', ',')}</span></div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t border-emerald-200 pt-2 mt-1">
                    <span>Total</span>
                    <span className="text-emerald-700">R$ {Number(selectedDav.total || 0).toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                {selectedDav.observacoes && (
                  <div className="text-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Observações</h4>
                    <p className="text-muted-foreground bg-muted/50 rounded-lg p-3">{selectedDav.observacoes}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
