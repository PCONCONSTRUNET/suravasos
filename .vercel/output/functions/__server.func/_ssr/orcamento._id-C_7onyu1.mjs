import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as VivaverdeLogo } from "./vivaverde-logo-DWXAFaeL.mjs";
import { t as Route } from "./orcamento._id-PvqvWN-v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orcamento._id-C_7onyu1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImprimirDAV() {
	const { id } = Route.useParams();
	const [venda, setVenda] = (0, import_react.useState)(null);
	const [itens, setItens] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		async function loadData() {
			const { data: v } = await supabase.from("vendas").select("*, clientes(*)").eq("id", id).single();
			if (v) setVenda(v);
			const { data: i } = await supabase.from("vendas_itens").select("*, produtos(nome)").eq("venda_id", id);
			if (i) setItens(i);
			if (v) setTimeout(() => window.print(), 800);
		}
		loadData();
	}, [id]);
	if (!venda) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center font-sans",
		children: "Carregando Orçamento..."
	});
	const cliente = venda.clientes || {};
	const dataDAV = new Date(venda.created_at).toLocaleDateString();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white min-h-screen text-black p-8 font-sans",
		style: {
			maxWidth: "800px",
			margin: "0 auto"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @media print {
          @page { margin: 10mm; size: A4; }
          body { background: white; -webkit-print-color-adjust: exact; }
          /* Esconder cabeçalhos padrão do navegador */
          header, footer, nav, aside { display: none; }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VivaverdeLogo, { size: "small" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 text-sm text-slate-600",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-slate-900",
							children: "VIVAVERDE VASOS E SUPORTES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CNPJ: 63.874.628/0001-36" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rua Bom Jesus, 267 - Paraisolandia" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Charqueada - SP, 13.519-008" })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold text-slate-900 uppercase tracking-wider",
							children: "Orçamento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium mt-1",
							children: ["DAV Nº: ", venda.id.substring(0, 8).toUpperCase()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: ["Data: ", dataDAV]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium mt-1 text-slate-600",
							children: "Validade: 7 dias"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold uppercase tracking-wider text-slate-500 mb-3",
					children: "Dados do Cliente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Nome:"
							}),
							" ",
							cliente.nome || "Consumidor Final"
						] }),
						cliente.cpf_cnpj && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "CPF/CNPJ:"
							}),
							" ",
							cliente.cpf_cnpj
						] }),
						cliente.telefone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Telefone:"
							}),
							" ",
							cliente.telefone
						] })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [cliente.endereco && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Endereço:"
						}),
						" ",
						cliente.endereco
					] }), cliente.cidade && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Cidade/UF:"
						}),
						" ",
						cliente.cidade,
						cliente.uf ? `/${cliente.uf}` : ""
					] })] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold uppercase tracking-wider text-slate-500 mb-3",
					children: "Produtos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm border-collapse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "bg-slate-900 text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-3 text-left",
								children: "Produto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-3 text-center",
								children: "Qtd"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-3 text-right",
								children: "Vlr. Unit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-3 text-right",
								children: "Subtotal"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: itens.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-slate-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 px-3",
								children: item.produtos?.nome || "Produto Desconhecido"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 px-3 text-center",
								children: item.quantidade
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 px-3 text-right",
								children: ["R$ ", Number(item.valor_unitario).toFixed(2).replace(".", ",")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 px-3 text-right font-medium",
								children: ["R$ ", Number(item.subtotal).toFixed(2).replace(".", ",")]
							})
						]
					}, i)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-64 bg-slate-50 p-4 rounded-lg border border-slate-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center text-sm mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-600",
							children: "Subtotal:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["R$ ", Number(venda.valor_total).toFixed(2).replace(".", ",")] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center text-lg font-bold border-t border-slate-200 pt-2 mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["R$ ", Number(venda.valor_total).toFixed(2).replace(".", ",")] })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-24 grid grid-cols-2 gap-12 text-center text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-slate-400 pt-2",
					children: "Assinatura do Vendedor"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-slate-400 pt-2",
					children: "Assinatura do Cliente"
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 text-center text-xs text-slate-400",
				children: "Este documento não possui valor fiscal. É apenas um Documento Auxiliar de Venda."
			})
		]
	});
}
//#endregion
export { ImprimirDAV as component };
