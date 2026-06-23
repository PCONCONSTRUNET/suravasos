import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-B8pFCf1w.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DiE0A9q4.mjs";
import { t as vivaverde_logo_default } from "./vivaverde-logo-DI6iBV0x.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Label } from "./label-Bzg_1qon.mjs";
import { t as Checkbox } from "./checkbox-DSjgsggS.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-NDNry4_A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var authSchema = objectType({
	email: stringType().email({ message: "Insira um e-mail válido." }),
	password: stringType().min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
});
function Login() {
	const nav = useNavigate();
	const [authError, setAuthError] = (0, import_react.useState)(null);
	const [resetSent, setResetSent] = (0, import_react.useState)(false);
	const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm({
		resolver: u(authSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});
	const onSubmitLogin = async (data) => {
		setAuthError(null);
		const { error: signInError } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password
		});
		if (signInError) setAuthError(signInError.message === "Invalid login credentials" ? "Email ou senha incorretos." : signInError.message);
		else nav({ to: "/app/dashboard" });
	};
	const handleForgotPassword = async () => {
		const email = getValues("email");
		if (!email) {
			setAuthError("Digite seu e-mail acima antes de clicar em Esqueceu.");
			return;
		}
		await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/` });
		setResetSent(true);
		setAuthError(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
				style: { backgroundImage: "url('/vasos-foto.jpeg')" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-[2px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-brand shadow-elevated z-20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full max-w-[420px] px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col items-center mb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: vivaverde_logo_default,
							alt: "VIVAVERDE",
							className: "h-32 w-auto object-contain"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-2xl border border-[#2d5a1e]/10 shadow-[0_8px_40px_-12px_rgba(45,90,30,0.15)] p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-center font-display text-lg font-semibold text-[#1a1a1a]",
								children: "Acesso ao sistema"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-sm text-[#64748b] mt-1",
								children: "Uso restrito a colaboradores autorizados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit(onSubmitLogin),
								className: "mt-6 space-y-4",
								children: [
									authError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200",
										children: authError
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "email",
												className: "text-sm font-medium text-[#374151]",
												children: "E-mail"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "email",
												type: "email",
												placeholder: "usuario@vivaverde.com.br",
												...register("email"),
												className: `h-11 border-[#e5e7eb] focus:border-[#4a7c2a] focus:ring-[#4a7c2a]/20 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`
											}),
											errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-red-500",
												children: errors.email.message
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "password",
													className: "text-sm font-medium text-[#374151]",
													children: "Senha"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: handleForgotPassword,
													className: "text-xs font-medium text-[#4a7c2a] hover:text-[#2d5a1e] hover:underline transition-colors",
													children: resetSent ? "✅ Link enviado!" : "Esqueceu?"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "password",
												type: "password",
												placeholder: "••••••••",
												...register("password"),
												className: `h-11 border-[#e5e7eb] focus:border-[#4a7c2a] focus:ring-[#4a7c2a]/20 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`
											}),
											errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-red-500",
												children: errors.password.message
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm text-[#64748b]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											className: "border-[#d1d5db] data-[state=checked]:bg-[#4a7c2a] data-[state=checked]:border-[#4a7c2a]",
											defaultChecked: true
										}), "Lembrar este computador"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											size: "lg",
											disabled: isSubmitting,
											className: "w-full h-11 bg-gradient-brand hover:brightness-110 text-white font-semibold shadow-elevated transition-all",
											children: isSubmitting ? "Aguarde..." : "Entrar"
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center text-[10px] text-[#9ca3af] tracking-wide",
						children: "VIVAVERDE Distribuidora de Vasos e Acessórios Ltda · Sistema Interno"
					})
				]
			})
		]
	});
}
//#endregion
export { Login as component };
