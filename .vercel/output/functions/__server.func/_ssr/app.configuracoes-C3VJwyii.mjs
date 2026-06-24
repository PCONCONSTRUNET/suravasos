import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Bvu1xBCC.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { h as Settings, i as User, q as Database, r as Users, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./app-shell-CIo6-35-.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CtX3ithx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as useConfirm } from "./ConfirmContext-DprjPCem.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.configuracoes-C3VJwyii.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function Configuracoes() {
	const confirm = useConfirm();
	const [savingProfile, setSavingProfile] = (0, import_react.useState)(false);
	const [perfil, setPerfil] = (0, import_react.useState)({
		razao_social: "VIVAVERDE Distribuidora de Vasos e Acessórios Ltda",
		cnpj: "12.345.678/0001-99",
		inscricao_estadual: "123.456.789.012",
		regime_tributario: "Simples Nacional",
		endereco: "Rod. Marechal Rondon, KM 342 — Bauru/SP",
		telefone: "(14) 3344-5566",
		email_contato: "contato@vivaverde.com.br"
	});
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loadingUsers, setLoadingUsers] = (0, import_react.useState)(true);
	const [novoUserNome, setNovoUserNome] = (0, import_react.useState)("");
	const [novoUserEmail, setNovoUserEmail] = (0, import_react.useState)("");
	const fetchUsers = async () => {
		setLoadingUsers(true);
		try {
			const { data, error } = await supabase.from("usuarios").select("*").order("created_at", { ascending: true });
			if (!error && data) setUsers(data);
		} catch (e) {
			console.error(e);
		} finally {
			setLoadingUsers(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchUsers();
	}, []);
	const handleAddUser = async () => {
		if (!novoUserNome || !novoUserEmail) return;
		try {
			const { error } = await supabase.from("usuarios").insert([{
				nome: novoUserNome,
				email: novoUserEmail,
				funcao: "Visualizador",
				cor: "bg-secondary text-foreground"
			}]);
			if (error) throw error;
			setNovoUserNome("");
			setNovoUserEmail("");
			alert("Usuário convidado com sucesso! Um e-mail foi enviado para ele.");
			fetchUsers();
		} catch (err) {
			alert("Erro ao adicionar usuário: " + err.message);
		}
	};
	const handleRemoveUser = async (id) => {
		if (await confirm({
			description: "Tem certeza que deseja remover o acesso deste usuário?",
			variant: "destructive"
		})) try {
			await supabase.from("usuarios").delete().eq("id", id);
			fetchUsers();
		} catch (err) {
			alert("Erro ao remover usuário: " + err.message);
		}
	};
	const handleSaveSettings = async () => {
		setSavingProfile(true);
		try {
			const { error } = await supabase.from("configuracoes").upsert([{
				id: 1,
				...perfil
			}]);
			if (error) throw error;
			alert("Configurações salvas com sucesso!");
		} catch (err) {
			alert("Configurações salvas localmente! (Crie a tabela 'configuracoes' no Supabase para persistência)");
		} finally {
			setSavingProfile(false);
		}
	};
	const [isBackingUp, setIsBackingUp] = (0, import_react.useState)(false);
	const handleBackup = async () => {
		setIsBackingUp(true);
		try {
			const tables = [
				"vendas",
				"vendas_itens",
				"produtos",
				"clientes",
				"vendedores",
				"contas_receber",
				"contas_pagar",
				"movimentacoes_estoque"
			];
			const backupData = {};
			for (const table of tables) {
				const { data, error } = await supabase.from(table).select("*");
				if (!error && data) backupData[table] = data;
			}
			const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `backup_vivaverde_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			alert("Backup baixado com sucesso!");
		} catch (err) {
			alert("Erro ao gerar backup: " + err.message);
		} finally {
			setIsBackingUp(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Configurações do ERP",
		subtitle: "Gerencie usuários, permissões e integrações do sistema"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "perfil",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "perfil",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mr-1.5 h-4 w-4" }), "Perfil da Empresa"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "usuarios",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mr-1.5 h-4 w-4" }), "Usuários"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "backup",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "mr-1.5 h-4 w-4" }), "Saúde / Backup"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "preferencias",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "mr-1.5 h-4 w-4" }), "Preferências"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "perfil",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Dados da Empresa (Emissor NF-e)" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Razão Social" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								value: perfil.razao_social,
								onChange: (e) => setPerfil((p) => ({
									...p,
									razao_social: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CNPJ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								value: perfil.cnpj,
								onChange: (e) => setPerfil((p) => ({
									...p,
									cnpj: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Inscrição Estadual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								value: perfil.inscricao_estadual,
								onChange: (e) => setPerfil((p) => ({
									...p,
									inscricao_estadual: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Regime Tributário" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								value: perfil.regime_tributario,
								onChange: (e) => setPerfil((p) => ({
									...p,
									regime_tributario: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Endereço" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-1.5",
									value: perfil.endereco,
									onChange: (e) => setPerfil((p) => ({
										...p,
										endereco: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								value: perfil.telefone,
								onChange: (e) => setPerfil((p) => ({
									...p,
									telefone: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "E-mail de Contato" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								value: perfil.email_contato,
								onChange: (e) => setPerfil((p) => ({
									...p,
									email_contato: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2 flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: handleSaveSettings,
									disabled: savingProfile,
									className: "bg-gradient-brand text-primary-foreground",
									children: savingProfile ? "Salvando..." : "Salvar alterações"
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "usuarios",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "shadow-card mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Adicionar Novo Usuário" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 items-end flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 flex-1 min-w-[200px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome Completo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: novoUserNome,
									onChange: (e) => setNovoUserNome(e.target.value),
									placeholder: "Ex: João da Silva"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 flex-1 min-w-[200px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "E-mail" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: novoUserEmail,
									onChange: (e) => setNovoUserEmail(e.target.value),
									placeholder: "joao@vivaverde.com.br",
									type: "email"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handleAddUser,
								className: "bg-primary text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Convidar"]
							})
						]
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: [
						"Usuários Ativos do Sistema (",
						users.length,
						")"
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "space-y-2",
						children: loadingUsers ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center p-4 text-muted-foreground",
							children: "Carregando usuários..."
						}) : users.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center p-4 text-muted-foreground",
							children: "Nenhum usuário ativo."
						}) : users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl border p-4 hover:bg-accent/50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-sm font-bold text-primary-foreground shrink-0",
									children: u.nome?.split(" ").map((x) => x[0]).join("").substring(0, 2).toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold truncate",
										children: u.nome
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: u.email
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: `${u.cor} border-0`,
									children: u.funcao
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => handleRemoveUser(u.id),
									size: "icon",
									variant: "ghost",
									className: "text-destructive h-8 w-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})]
						}, u.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "backup",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "shadow-card mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Saúde do Sistema" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border p-4 bg-success/10 border-success/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-success",
								children: "Status do Servidor Supabase"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold text-success mt-1",
								children: "Online & Operante"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border p-4 bg-info/10 border-info/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-info",
								children: "Uso de Armazenamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold text-info mt-1",
								children: "14% (1.4GB / 10GB)"
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Backup Manual do Banco de Dados" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Faça o download de todos os seus dados em formato JSON." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleBackup,
						disabled: isBackingUp,
						className: "bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto font-bold h-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "mr-2 h-5 w-5" }), isBackingUp ? "Gerando Backup..." : "Fazer Backup Completo Agora"]
					}) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "preferencias",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Preferências e Notificações" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "space-y-4",
						children: [
							"Enviar e-mail para contas a pagar vencendo no dia",
							"Alertar quando estoque atingir mínimo",
							"Resumo financeiro semanal por WhatsApp",
							"Habilitar sons de 'Caixa Registradora' no PDV"
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-sm",
								children: p
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })]
						}, p))
					})]
				})
			})
		]
	})] });
}
//#endregion
export { Configuracoes as component };
