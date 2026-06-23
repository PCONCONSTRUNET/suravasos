import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Route } from "./declaracao._id-EoBoEkPO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/declaracao._id-Cv75E7oh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeclaracaoConteudo() {
	const { id } = Route.useParams();
	const [venda, setVenda] = (0, import_react.useState)(null);
	const [itens, setItens] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		async function loadData() {
			if (id.startsWith("mock")) {
				setVenda({
					id,
					valor_total: 150,
					clientes: {
						nome: "João Silva (Exemplo)",
						endereco: "Rua das Flores",
						numero: "123",
						bairro: "Centro",
						cidade: "São Paulo",
						uf: "SP",
						cep: "01000-000",
						cpf_cnpj: "111.222.333-44"
					}
				});
				setItens([{
					quantidade: 2,
					subtotal: 100,
					produtos: { nome: "Vaso de Cerâmica Grande" }
				}, {
					quantidade: 1,
					subtotal: 50,
					produtos: { nome: "Suporte de Madeira" }
				}]);
				setTimeout(() => window.print(), 800);
				return;
			}
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
		children: "Carregando formulário..."
	});
	const remetente = {
		nome: "Douglas de Almeida",
		endereco: "Rua Bom Jesus, 267 - Paraisolandia",
		cidade: "Charqueada",
		uf: "SP",
		cep: "13.519-008",
		cpf_cnpj: "63.874.628/0001-36"
	};
	const destinatario = venda.clientes || {};
	const rows = [...itens];
	while (rows.length < 6) rows.push(null);
	const totalQtd = itens.reduce((acc, item) => acc + (item.quantidade || 0), 0);
	const totalVal = itens.reduce((acc, item) => acc + (item.subtotal || 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white text-black font-sans text-[12px] p-6 max-w-[850px] mx-auto print:p-0 print:max-w-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-black font-bold text-center py-1 mb-2",
				children: "DECLARAÇÃO DE CONTEÚDO"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				className: "w-full border-collapse border border-black mb-2 table-fixed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "w-1/2 border border-black font-bold text-center py-0.5",
					children: "REMETENTE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "w-1/2 border border-black font-bold text-center py-0.5",
					children: "DESTINATÁRIO"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					className: "w-1/2 border border-black p-0 align-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex px-1 border-b border-black",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NOME:" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 truncate",
									children: remetente.nome
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex px-1 border-b border-black",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ENDEREÇO:" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 truncate",
									children: remetente.endereco
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex border-b border-black",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[75%] px-1 border-r border-black flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CIDADE:" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 truncate",
										children: remetente.cidade
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[25%] px-1 flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UF:" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1",
										children: remetente.uf
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[40%] px-1 border-r border-black flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CEP:" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 truncate",
										children: remetente.cep
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[60%] px-1 flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CNPJ/CPF:" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 truncate",
										children: remetente.cpf_cnpj
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					className: "w-1/2 border border-black p-0 align-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex px-1 border-b border-black",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NOME:" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 truncate",
									children: destinatario.nome || "Não informado"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex px-1 border-b border-black",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ENDEREÇO:" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 truncate",
									children: [
										destinatario.endereco || "Não informado",
										", ",
										destinatario.numero,
										" - ",
										destinatario.bairro
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex border-b border-black",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[75%] px-1 border-r border-black flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CIDADE:" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 truncate",
										children: destinatario.cidade || "-"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[25%] px-1 flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UF:" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1",
										children: destinatario.uf || "-"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[40%] px-1 border-r border-black flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CEP:" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 truncate",
										children: destinatario.cep || "-"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[60%] px-1 flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CNPJ/CPF:" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 truncate",
										children: destinatario.cpf_cnpj || "-"
									})
								]
							})]
						})
					]
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse border border-black mb-2 table-fixed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("thead", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					colSpan: 4,
					className: "border border-black text-center py-1 font-bold",
					children: "IDENTIFICAÇÃO DOS BENS"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-center font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border border-black w-[10%] py-0.5",
							children: "ITEM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border border-black w-[60%] py-0.5",
							children: "CONTEÚDO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border border-black w-[15%] py-0.5",
							children: "QUANTIDADE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border border-black w-[15%] py-0.5",
							children: "VALOR"
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					rows.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border border-black text-center py-0.5 h-[22px]",
							children: item ? index + 1 : ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border border-black px-1 truncate",
							children: item ? item.produtos?.nome || `Item #${item.produto_id.substring(0, 6)}` : ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border border-black text-center",
							children: item ? item.quantidade : ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border border-black text-right px-1",
							children: item ? Number(item.subtotal).toFixed(2) : ""
						})
					] }, index)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 2,
							className: "border border-black bg-gray-200 font-bold text-right pr-2 py-0.5",
							style: {
								backgroundColor: "#e5e7eb",
								WebkitPrintColorAdjust: "exact",
								colorAdjust: "exact"
							},
							children: "TOTAIS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border border-black text-center",
							children: totalQtd
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border border-black text-right px-1",
							children: totalVal.toFixed(2)
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 2,
						className: "border border-black bg-gray-200 font-bold text-right pr-2 py-0.5",
						style: {
							backgroundColor: "#e5e7eb",
							WebkitPrintColorAdjust: "exact",
							colorAdjust: "exact"
						},
						children: "PESO TOTAL(Kg)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 2,
						className: "border border-black"
					})] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-black mb-2 flex flex-col min-h-[180px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-bold text-center py-1 border-b border-black",
						children: "DECLARAÇÃO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2 text-justify flex-1",
						children: [
							"Declaro que não me enquadro no conceito de contribuinte previsto no art. 4º da Lei Complementar nº 87/1996, uma vez que não realizo, com habitualidade ou em volume que caracterize intuito comercial, operações de circulação de mercadoria, ainda que se iniciem no exterior, ou estou dispensado da emissão da nota fiscal por força da legislação tributária vigente, responsabilizando-me, nos termos da lei e a quem de direito, por informações inverídicas.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Declaro ainda que não estou postando conteúdo inflamável, explosivo, causador de combustão espontânea, tóxico, corrosivo, gás ou qualquer outro conteúdo que constitua perigo, conforme o art. 13 da Lei Postal nº 6.538/78"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-end px-8 pb-4 mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-black w-32 text-center pb-1",
									children: [
										remetente.cidade,
										" - ",
										remetente.uf
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pb-1",
									children: ","
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-b border-black w-8 pb-1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pb-1",
									children: "de"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-b border-black w-24 pb-1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pb-1",
									children: "de"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-b border-black w-12 pb-1 text-center",
									children: (/* @__PURE__ */ new Date()).getFullYear()
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-b border-black w-72 h-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] mt-1",
								children: "Assinatura do Declarante/Remetente"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-black p-1 leading-tight",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-bold",
					children: ["OBSERVAÇÃO:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {})]
				}), "Constitui crime contra a ordem tributária suprimir ou reduzir tributo,ou contribuição social de qualquer acessório (Lei8.137/90 Art1,V)."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 text-center print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => window.print(),
					className: "bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition-colors",
					children: "Imprimir Declaração"
				})
			})
		]
	});
}
//#endregion
export { DeclaracaoConteudo as component };
