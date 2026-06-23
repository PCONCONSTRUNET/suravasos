import{f as e,l as t,s as n,t as r}from"./supabase-jxJ30NRW.js";import{t as i}from"./link-DZaUHyJN.js";import{t as a}from"./button-P__Byw0t.js";import{s as o}from"./index-CKrhkQ0s.js";import{t as s}from"./createLucideIcon-CfkcPfPs.js";import{n as c}from"./app-shell-CQxCsfsv.js";import{o as l}from"./dist-CCQ9br7L.js";import{t as u}from"./plus-gyBPkaCF.js";import{t as d}from"./trash-2-r-DGawAh.js";import{t as f}from"./x-aGwPiKdJ.js";import{t as p}from"./card-DDt9xWv7.js";import{a as m,i as h,n as g,o as _,r as v,t as y}from"./table-DkXzOLOm.js";import{a as b,i as x,n as S,t as C}from"./sheet-DSRc1nWg.js";var w=s(`printer`,[[`path`,{d:`M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2`,key:`143wyd`}],[`path`,{d:`M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6`,key:`1itne7`}],[`rect`,{x:`6`,y:`14`,width:`12`,height:`8`,rx:`1`,key:`1ue0tg`}]]),T=e(t()),E=n(),D=()=>(0,E.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`currentColor`,className:`h-4 w-4`,children:(0,E.jsx)(`path`,{d:`M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z`})});function O(e,t){let n=t.map((e,t)=>`
    <tr>
      <td>${t+1}</td>
      <td>${e.codigo||`—`}</td>
      <td>${e.produto||`—`}</td>
      <td style="text-align:center">${e.qtd}</td>
      <td style="text-align:right">R$ ${Number(e.valor_unitario||0).toFixed(2).replace(`.`,`,`)}</td>
      <td style="text-align:right"><strong>R$ ${Number(e.total||0).toFixed(2).replace(`.`,`,`)}</strong></td>
    </tr>
  `).join(``),r=Number(e.total||0),i=Number(e.subtotal||0),a=Number(e.desconto_valor||0),o=Number(e.frete_valor||0);return`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>Orçamento ${e.id?.substring(0,8).toUpperCase()}</title>
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
      <p>Nº ${e.id?.substring(0,8).toUpperCase()}</p>
      <p>Data: ${new Date(e.created_at||e.validade||Date.now()).toLocaleDateString(`pt-BR`)}</p>
      ${e.validade?`<p class="validade">Válido até: ${new Date(e.validade).toLocaleDateString(`pt-BR`)}</p>`:``}
    </div>
  </div>

  <div class="grid2" style="margin-bottom:20px;">
    <div class="section">
      <div class="section-title">Dados do Cliente</div>
      <div class="info-row"><span class="info-label">Nome/Razão Social: </span><span class="info-value">${e.cliente_nome||`—`}</span></div>
      ${e.cliente_cnpj?`<div class="info-row"><span class="info-label">CNPJ/CPF: </span><span class="info-value">${e.cliente_cnpj}</span></div>`:``}
      ${e.cliente_endereco?`<div class="info-row"><span class="info-label">Endereço: </span><span class="info-value">${e.cliente_endereco}</span></div>`:``}
      ${e.cliente_telefone?`<div class="info-row"><span class="info-label">Telefone: </span><span class="info-value">${e.cliente_telefone}</span></div>`:``}
    </div>
    <div class="section">
      <div class="section-title">Condições Comerciais</div>
      ${e.vendedor?`<div class="info-row"><span class="info-label">Vendedor: </span><span class="info-value">${e.vendedor}</span></div>`:``}
      ${e.condicao_pagamento?`<div class="info-row"><span class="info-label">Pagamento: </span><span class="info-value">${e.condicao_pagamento}</span></div>`:``}
      ${e.frete_tipo?`<div class="info-row"><span class="info-label">Frete: </span><span class="info-value">${e.frete_tipo}</span></div>`:``}
      ${e.prazo_entrega?`<div class="info-row"><span class="info-label">Prazo: </span><span class="info-value">${e.prazo_entrega}</span></div>`:``}
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
      <tbody>${n}</tbody>
    </table>
  </div>

  <div class="clearfix">
    <div class="totals">
      <div class="total-row"><span>Subtotal</span><span>R$ ${i.toFixed(2).replace(`.`,`,`)}</span></div>
      ${a>0?`<div class="total-row"><span>Desconto</span><span style="color:#dc2626">- R$ ${a.toFixed(2).replace(`.`,`,`)}</span></div>`:``}
      ${o>0?`<div class="total-row"><span>Frete</span><span>R$ ${o.toFixed(2).replace(`.`,`,`)}</span></div>`:``}
      <div class="total-final"><span>TOTAL</span><span>R$ ${r.toFixed(2).replace(`.`,`,`)}</span></div>
    </div>
  </div>

  ${e.observacoes?`<div class="obs"><strong>Observações:</strong> ${e.observacoes}</div>`:``}

  <div class="footer">
    Este documento não tem validade fiscal. Orçamento sujeito a alteração sem aviso prévio.<br/>
    VIVAVERDE Distribuidora — contato@vivaverde.com.br
  </div>
</body>
</html>`}function k(){let e=o(),[t,n]=(0,T.useState)([]),[s,k]=(0,T.useState)(!0),[A,j]=(0,T.useState)(null),[M,N]=(0,T.useState)([]),[P,F]=(0,T.useState)(!1),I=async()=>{try{let{data:e,error:t}=await r.from(`davs`).select(`*`);if(t)throw t;n((e||[]).sort((e,t)=>{let n=e.created_at||e.validade||``;return(t.created_at||t.validade||``).localeCompare(n)}))}catch(e){console.error(e),alert(`Erro ao buscar orçamentos: `+e.message)}finally{k(!1)}};(0,T.useEffect)(()=>{I()},[]);let L=async e=>{j(e),F(!0);try{let{data:t,error:n}=await r.from(`dav_items`).select(`*`).eq(`dav_id`,e.id);!n&&t&&N(t)}catch(e){console.error(e)}finally{F(!1)}},R=async t=>{if(await e({description:`Tem certeza que deseja excluir este orçamento?`,variant:`destructive`}))try{await r.from(`dav_items`).delete().eq(`dav_id`,t);let{error:e}=await r.from(`davs`).delete().eq(`id`,t);if(e)throw e;A?.id===t&&j(null),I()}catch(e){alert(`Erro ao deletar: `+e.message)}},z=async e=>{F(!0);let t=M;if(!A||A.id!==e.id){let{data:n}=await r.from(`dav_items`).select(`*`).eq(`dav_id`,e.id);t=n||[]}F(!1);let n=O(e,t),i=window.open(``,`_blank`);i&&(i.document.write(n),i.document.close(),setTimeout(()=>i.print(),500))},B=async e=>{let t=M;if(!A||A.id!==e.id){let{data:n}=await r.from(`dav_items`).select(`*`).eq(`dav_id`,e.id);t=n||[]}let n=t.map(e=>`▪ *${e.produto}* — Qtd: ${e.qtd} × R$ ${Number(e.valor_unitario).toFixed(2).replace(`.`,`,`)} = *R$ ${Number(e.total).toFixed(2).replace(`.`,`,`)}*`).join(`
`),i=Number(e.total||0),a=Number(e.desconto_valor||0),o=Number(e.frete_valor||0),s=`Olá ${e.cliente_nome||``}! Segue seu orçamento da *VIVAVERDE* 🌿\n\n*Orçamento Nº:* ${e.id?.substring(0,8).toUpperCase()}\n`+(e.validade?`*Válido até:* ${new Date(e.validade).toLocaleDateString(`pt-BR`)}\n`:``)+`\n*PRODUTOS:*\n${n}\n\n`+(a>0?`*Desconto:* - R$ ${a.toFixed(2).replace(`.`,`,`)}\n`:``)+(o>0?`*Frete:* R$ ${o.toFixed(2).replace(`.`,`,`)}\n`:``)+`\n💰 *TOTAL: R$ ${i.toFixed(2).replace(`.`,`,`)}*\n\n`+(e.condicao_pagamento?`*Pagamento:* ${e.condicao_pagamento}\n`:``)+(e.prazo_entrega?`*Prazo de entrega:* ${e.prazo_entrega}\n`:``)+`
Qualquer dúvida estamos à disposição! 😊`,c=e.cliente_telefone?.replace(/\D/g,``),l=c?`https://wa.me/55${c}`:`https://wa.me/`;window.open(`${l}?text=${encodeURIComponent(s)}`,`_blank`)},V=e=>e===`Aprovado`?`bg-success/15 text-success border-0`:e===`Rejeitado`?`bg-destructive/10 text-destructive border-0`:`bg-info/15 text-info border-0`,H=e=>{if(!e)return`—`;try{return new Date(e).toLocaleDateString(`pt-BR`)}catch{return`—`}};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(c,{title:`Orçamentos (DAV)`,subtitle:`Documentos Auxiliares de Venda`,actions:(0,E.jsx)(a,{className:`bg-gradient-brand text-primary-foreground`,asChild:!0,children:(0,E.jsxs)(i,{to:`/app/dav-novo`,children:[(0,E.jsx)(u,{className:`mr-2 h-4 w-4`}),`Novo DAV`]})})}),(0,E.jsx)(p,{className:`shadow-card overflow-x-auto`,children:(0,E.jsxs)(y,{children:[(0,E.jsx)(m,{children:(0,E.jsxs)(_,{children:[(0,E.jsx)(h,{children:`Nº`}),(0,E.jsx)(h,{children:`Cliente`}),(0,E.jsx)(h,{children:`Data`}),(0,E.jsx)(h,{className:`text-right`,children:`Valor`}),(0,E.jsx)(h,{children:`Status`}),(0,E.jsx)(h,{className:`text-right`,children:`Ações`})]})}),(0,E.jsx)(g,{children:s?(0,E.jsx)(_,{children:(0,E.jsx)(v,{colSpan:6,className:`text-center py-8`,children:`Carregando DAVs...`})}):t.length===0?(0,E.jsx)(_,{children:(0,E.jsx)(v,{colSpan:6,className:`text-center py-8 text-muted-foreground`,children:`Nenhum orçamento encontrado.`})}):t.map(e=>(0,E.jsxs)(_,{className:`cursor-pointer hover:bg-muted/40 transition-colors`,onClick:()=>L(e),children:[(0,E.jsx)(v,{className:`font-mono text-xs`,children:e.id.substring(0,8).toUpperCase()}),(0,E.jsx)(v,{className:`font-semibold`,children:e.cliente_nome||`—`}),(0,E.jsx)(v,{children:H(e.created_at||e.validade)}),(0,E.jsxs)(v,{className:`text-right font-semibold`,children:[`R$ `,Number(e.total||0).toFixed(2).replace(`.`,`,`)]}),(0,E.jsx)(v,{children:(0,E.jsx)(l,{className:V(e.status||`Aberto`),children:e.status||`Aberto`})}),(0,E.jsx)(v,{className:`text-right`,onClick:e=>e.stopPropagation(),children:(0,E.jsxs)(`div`,{className:`flex items-center justify-end gap-1`,children:[(0,E.jsx)(a,{variant:`ghost`,size:`icon`,className:`h-8 w-8 text-slate-500 hover:text-primary`,title:`Imprimir / Salvar PDF`,onClick:t=>{t.stopPropagation(),z(e)},children:(0,E.jsx)(w,{className:`h-4 w-4`})}),(0,E.jsx)(a,{variant:`ghost`,size:`icon`,className:`h-8 w-8 text-[#25D366] hover:text-[#1aab57] hover:bg-green-50`,title:`Enviar orçamento via WhatsApp`,onClick:t=>{t.stopPropagation(),B(e)},children:(0,E.jsx)(D,{})}),(0,E.jsx)(a,{variant:`ghost`,size:`icon`,className:`h-8 w-8 text-destructive hover:bg-destructive/10`,onClick:t=>{t.stopPropagation(),R(e.id)},children:(0,E.jsx)(d,{className:`h-4 w-4`})})]})})]},e.id))})]})}),(0,E.jsx)(C,{open:!!A,onOpenChange:e=>!e&&j(null),children:(0,E.jsx)(S,{className:`w-full sm:max-w-2xl overflow-y-auto p-0`,children:A&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(x,{className:`px-6 py-4 border-b bg-gradient-to-r from-emerald-50 to-white`,children:[(0,E.jsxs)(`div`,{className:`flex items-start justify-between`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsxs)(b,{className:`text-lg`,children:[`Orçamento Nº `,A.id?.substring(0,8).toUpperCase()]}),(0,E.jsx)(`p`,{className:`text-sm text-muted-foreground mt-0.5`,children:A.cliente_nome})]}),(0,E.jsxs)(`div`,{className:`flex gap-2 items-center`,children:[(0,E.jsx)(l,{className:V(A.status||`Aberto`),children:A.status||`Aberto`}),(0,E.jsx)(a,{variant:`ghost`,size:`icon`,className:`h-8 w-8`,onClick:()=>j(null),children:(0,E.jsx)(f,{className:`h-4 w-4`})})]})]}),(0,E.jsxs)(`div`,{className:`flex gap-2 mt-3`,children:[(0,E.jsxs)(a,{size:`sm`,variant:`outline`,className:`gap-1.5`,onClick:()=>z(A),children:[(0,E.jsx)(w,{className:`h-4 w-4`}),` Imprimir / PDF`]}),(0,E.jsxs)(a,{size:`sm`,className:`gap-1.5 bg-[#25D366] hover:bg-[#1aab57] text-white`,onClick:()=>B(A),children:[(0,E.jsx)(D,{}),` Enviar via WhatsApp`]})]})]}),(0,E.jsxs)(`div`,{className:`px-6 py-4 space-y-6`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h4`,{className:`text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3`,children:`Dados do Cliente`}),(0,E.jsxs)(`div`,{className:`grid grid-cols-2 gap-3 text-sm`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`text-muted-foreground block text-xs`,children:`Nome`}),(0,E.jsx)(`span`,{className:`font-semibold`,children:A.cliente_nome||`—`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`text-muted-foreground block text-xs`,children:`CNPJ/CPF`}),(0,E.jsx)(`span`,{className:`font-semibold`,children:A.cliente_cnpj||`—`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`text-muted-foreground block text-xs`,children:`Telefone`}),(0,E.jsx)(`span`,{className:`font-semibold`,children:A.cliente_telefone||`—`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`text-muted-foreground block text-xs`,children:`Endereço`}),(0,E.jsx)(`span`,{className:`font-semibold`,children:A.cliente_endereco||`—`})]})]})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h4`,{className:`text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3`,children:`Condições Comerciais`}),(0,E.jsxs)(`div`,{className:`grid grid-cols-2 gap-3 text-sm`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`text-muted-foreground block text-xs`,children:`Vendedor`}),(0,E.jsx)(`span`,{className:`font-semibold`,children:A.vendedor||`—`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`text-muted-foreground block text-xs`,children:`Pagamento`}),(0,E.jsx)(`span`,{className:`font-semibold`,children:A.condicao_pagamento||`—`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`text-muted-foreground block text-xs`,children:`Frete`}),(0,E.jsx)(`span`,{className:`font-semibold`,children:A.frete_tipo||`—`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`text-muted-foreground block text-xs`,children:`Prazo`}),(0,E.jsx)(`span`,{className:`font-semibold`,children:A.prazo_entrega||`—`})]}),A.validade&&(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`text-muted-foreground block text-xs`,children:`Validade`}),(0,E.jsx)(`span`,{className:`font-semibold text-amber-600`,children:H(A.validade)})]})]})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h4`,{className:`text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3`,children:`Produtos`}),P?(0,E.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Carregando itens...`}):M.length===0?(0,E.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Nenhum item encontrado.`}):(0,E.jsx)(`div`,{className:`rounded-lg border overflow-hidden`,children:(0,E.jsxs)(`table`,{className:`w-full text-sm`,children:[(0,E.jsx)(`thead`,{className:`bg-muted/50`,children:(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`th`,{className:`text-left px-3 py-2 text-xs font-semibold`,children:`Produto`}),(0,E.jsx)(`th`,{className:`text-center px-3 py-2 text-xs font-semibold`,children:`Qtd`}),(0,E.jsx)(`th`,{className:`text-right px-3 py-2 text-xs font-semibold`,children:`Unit.`}),(0,E.jsx)(`th`,{className:`text-right px-3 py-2 text-xs font-semibold`,children:`Total`})]})}),(0,E.jsx)(`tbody`,{children:M.map((e,t)=>(0,E.jsxs)(`tr`,{className:`border-t`,children:[(0,E.jsxs)(`td`,{className:`px-3 py-2.5`,children:[(0,E.jsx)(`p`,{className:`font-semibold text-slate-800`,children:e.produto}),e.codigo&&(0,E.jsx)(`p`,{className:`text-xs text-muted-foreground font-mono`,children:e.codigo})]}),(0,E.jsx)(`td`,{className:`px-3 py-2.5 text-center font-medium`,children:e.qtd}),(0,E.jsxs)(`td`,{className:`px-3 py-2.5 text-right text-muted-foreground`,children:[`R$ `,Number(e.valor_unitario||0).toFixed(2).replace(`.`,`,`)]}),(0,E.jsxs)(`td`,{className:`px-3 py-2.5 text-right font-bold`,children:[`R$ `,Number(e.total||0).toFixed(2).replace(`.`,`,`)]})]},t))})]})})]}),(0,E.jsxs)(`div`,{className:`rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2`,children:[Number(A.desconto_valor)>0&&(0,E.jsxs)(`div`,{className:`flex justify-between text-sm`,children:[(0,E.jsx)(`span`,{className:`text-muted-foreground`,children:`Subtotal`}),(0,E.jsxs)(`span`,{children:[`R$ `,Number(A.subtotal||0).toFixed(2).replace(`.`,`,`)]})]}),Number(A.desconto_valor)>0&&(0,E.jsxs)(`div`,{className:`flex justify-between text-sm`,children:[(0,E.jsx)(`span`,{className:`text-muted-foreground`,children:`Desconto`}),(0,E.jsxs)(`span`,{className:`text-destructive`,children:[`- R$ `,Number(A.desconto_valor||0).toFixed(2).replace(`.`,`,`)]})]}),Number(A.frete_valor)>0&&(0,E.jsxs)(`div`,{className:`flex justify-between text-sm`,children:[(0,E.jsx)(`span`,{className:`text-muted-foreground`,children:`Frete`}),(0,E.jsxs)(`span`,{children:[`R$ `,Number(A.frete_valor||0).toFixed(2).replace(`.`,`,`)]})]}),(0,E.jsxs)(`div`,{className:`flex justify-between font-bold text-lg border-t border-emerald-200 pt-2 mt-1`,children:[(0,E.jsx)(`span`,{children:`Total`}),(0,E.jsxs)(`span`,{className:`text-emerald-700`,children:[`R$ `,Number(A.total||0).toFixed(2).replace(`.`,`,`)]})]})]}),A.observacoes&&(0,E.jsxs)(`div`,{className:`text-sm`,children:[(0,E.jsx)(`h4`,{className:`text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1`,children:`Observações`}),(0,E.jsx)(`p`,{className:`text-muted-foreground bg-muted/50 rounded-lg p-3`,children:A.observacoes})]})]})]})})})]})}export{k as component};