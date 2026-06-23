import { a as require_jsx_runtime, i as __toESM, o as require_react } from "./react-dom-4oCbIcVr.mjs";
import { a as useRouter } from "./useRouter-CxGPY5O6.mjs";
import { F as useHydrated, I as useStore, f as escapeHtml, u as deepEqual } from "./useStore-BGxIynNj.mjs";
import { i as redirect } from "./redirect-BBmI00op.mjs";
import { a as RouterCore, c as createNonReactiveMutableStore, i as Outlet, l as createNonReactiveReadonlyStore } from "./Match-BW1smEm3.mjs";
import { t as Link } from "./link-DcX1dWGt.mjs";
import { a as supabaseParceiro, i as supabase } from "./supabase-e8TdIE0G.mjs";
import { t as ConfirmProvider } from "./ConfirmContext-CPHq_Vwj.mjs";
import { n as createRootRouteWithContext, r as lazyRouteComponent, t as createFileRoute } from "./lazyRouteComponent-CFotKzaz.mjs";
import { t as Route$32 } from "./app.dav-novo-BoPdlIuD.mjs";
import { t as Route$33 } from "./app.produto-novo-CfRtwelu.mjs";
import { t as Toaster$1 } from "./dist-WJ01chjq.mjs";
import { t as Route$34 } from "./declaracao._id-eQ0eSBHn.mjs";
import { t as Route$35 } from "./parceiro.dav-DYN4lwJU.mjs";
import { a as getScriptPreloadAttrs, c as resolveManifestCssLink, i as getAssetCrossOrigin, t as appendUniqueUserTags } from "./atom-HSyjuv6w.mjs";
import { n as stringType, t as objectType } from "./types-hbn53zNs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BCfz4hJj.js
var getStoreFactory = (opts) => {
	return {
		createMutableStore: createNonReactiveMutableStore,
		createReadonlyStore: createNonReactiveReadonlyStore,
		batch: (fn) => fn()
	};
};
/**
* Creates a new Router instance for React.
*
* Pass the returned router to `RouterProvider` to enable routing.
* Notable options: `routeTree` (your route definitions) and `context`
* (required if the root route was created with `createRootRouteWithContext`).
*
* @param options Router options used to configure the router.
* @returns A Router instance to be provided to `RouterProvider`.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction
*/
var createRouter = (options) => {
	return new Router(options);
};
var Router = class extends RouterCore {
	constructor(options) {
		super(options, getStoreFactory);
	}
};
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var noopScriptHandler = () => {};
function setScriptAttrs(script, attrs) {
	if (!attrs) return;
	for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
}
function Asset(asset) {
	const { attrs, children, nonce, preventScriptHoist } = asset;
	switch (asset.tag) {
		case "title": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", {
			...attrs,
			suppressHydrationWarning: true,
			children
		});
		case "meta": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			...attrs,
			suppressHydrationWarning: true
		});
		case "link": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
			...attrs,
			precedence: attrs?.precedence ?? (attrs?.rel === "stylesheet" ? "default" : void 0),
			nonce,
			suppressHydrationWarning: true
		});
		case "style":
			if (asset.inlineCss && false);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				...attrs,
				dangerouslySetInnerHTML: { __html: children },
				nonce
			});
		case "script": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Script, {
			attrs,
			preventScriptHoist,
			children
		});
		default: return null;
	}
}
function Script({ attrs, children, preventScriptHoist }) {
	useRouter();
	useHydrated();
	const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
	import_react.useEffect(() => {
		if (dataScript) return;
		if (attrs?.src) {
			const normSrc = (() => {
				try {
					const base = document.baseURI || window.location.href;
					return new URL(attrs.src, base).href;
				} catch {
					return attrs.src;
				}
			})();
			for (const el of document.querySelectorAll("script[src]")) if (el.src === normSrc) return;
			const script = document.createElement("script");
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
		if (typeof children === "string") {
			const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
			const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
			for (const el of document.querySelectorAll("script:not([src])")) {
				if (!(el instanceof HTMLScriptElement)) continue;
				const sType = el.getAttribute("type") ?? "text/javascript";
				const sNonce = el.getAttribute("nonce") ?? void 0;
				if (el.textContent === children && sType === typeAttr && sNonce === nonceAttr) return;
			}
			const script = document.createElement("script");
			script.textContent = children;
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
	}, [
		attrs,
		children,
		dataScript
	]);
	if (attrs?.src) {
		if (!preventScriptHoist) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			suppressHydrationWarning: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			onLoad: noopScriptHandler,
			suppressHydrationWarning: true
		});
	}
	if (typeof children === "string") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		...attrs,
		dangerouslySetInnerHTML: { __html: children },
		suppressHydrationWarning: true
	});
	return null;
}
function buildTagsFromMatches(router, nonce, matches, assetCrossOrigin) {
	const routeMeta = matches.map((match) => match.meta).filter((meta) => meta !== void 0);
	const resultMeta = [];
	const metaByAttribute = {};
	let title;
	for (let i = routeMeta.length - 1; i >= 0; i--) {
		const metas = routeMeta[i];
		for (let j = metas.length - 1; j >= 0; j--) {
			const m = metas[j];
			if (!m) continue;
			if (m.title) {
				if (!title) title = {
					tag: "title",
					children: m.title
				};
			} else if ("script:ld+json" in m) try {
				const json = JSON.stringify(m["script:ld+json"]);
				resultMeta.push({
					tag: "script",
					attrs: { type: "application/ld+json" },
					children: escapeHtml(json)
				});
			} catch {}
			else {
				const attribute = m.name ?? m.property;
				if (attribute) if (metaByAttribute[attribute]) continue;
				else metaByAttribute[attribute] = true;
				resultMeta.push({
					tag: "meta",
					attrs: {
						...m,
						nonce
					}
				});
			}
		}
	}
	if (title) resultMeta.push(title);
	if (nonce) resultMeta.push({
		tag: "meta",
		attrs: {
			property: "csp-nonce",
			content: nonce
		}
	});
	resultMeta.reverse();
	const constructedLinks = matches.flatMap((match) => match.links ?? []).filter((link) => link !== void 0).map((link) => ({
		tag: "link",
		attrs: {
			...link,
			nonce
		}
	}));
	const manifest = router.ssr?.manifest;
	const manifestCssTags = [];
	if (manifest) {
		matches.forEach((match) => {
			(manifest.routes[match.routeId]?.css)?.forEach((link) => {
				const resolvedLink = resolveManifestCssLink(link);
				manifestCssTags.push({
					tag: "link",
					attrs: {
						rel: "stylesheet",
						...resolvedLink,
						crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? resolvedLink.crossOrigin,
						suppressHydrationWarning: true,
						nonce
					}
				});
			});
		});
		if (manifest.inlineStyle) manifestCssTags.push({
			tag: "style",
			attrs: {
				...manifest.inlineStyle.attrs,
				nonce
			},
			children: manifest.inlineStyle.children,
			inlineCss: true
		});
	}
	const preloadLinks = [];
	if (manifest) matches.forEach((match) => {
		manifest.routes[match.routeId]?.preloads?.forEach((preload) => {
			preloadLinks.push({
				tag: "link",
				attrs: {
					...getScriptPreloadAttrs(manifest, preload, assetCrossOrigin),
					nonce
				}
			});
		});
	});
	const styles = matches.flatMap((match) => match.styles ?? []).filter((style) => style !== void 0).map(({ children, ...attrs }) => ({
		tag: "style",
		attrs: {
			...attrs,
			nonce
		},
		children
	}));
	const headScripts = matches.flatMap((match) => match.headScripts ?? []).filter((script) => script !== void 0).map(({ children, ...script }) => ({
		tag: "script",
		attrs: {
			...script,
			nonce
		},
		children
	}));
	const tags = [];
	appendUniqueUserTags(tags, resultMeta);
	tags.push(...preloadLinks);
	appendUniqueUserTags(tags, constructedLinks);
	tags.push(...manifestCssTags);
	appendUniqueUserTags(tags, styles);
	appendUniqueUserTags(tags, headScripts);
	return tags;
}
/**
* Build the list of head/link/meta/script tags to render for active matches.
* Used internally by `HeadContent`.
*/
var useTags = (assetCrossOrigin) => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	return buildTagsFromMatches(router, nonce, router.stores.matches.get(), assetCrossOrigin);
};
/**
* Render route-managed head tags (title, meta, links, styles, head scripts).
* Place inside the document head of your app shell.
* @link https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management
*/
function HeadContent(props) {
	const tags = useTags(props.assetCrossOrigin);
	const nonce = useRouter().options.ssr?.nonce;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: tags.map((tag) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...tag,
		key: `tsr-meta-${JSON.stringify(tag)}`,
		nonce
	})) });
}
/**
* Render body script tags collected from route matches and SSR manifests.
* Should be placed near the end of the document body.
*/
var Scripts = () => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	const getAssetScripts = (matches) => {
		const assetScripts = [];
		const manifest = router.ssr?.manifest;
		if (!manifest) return [];
		for (const match of matches) {
			const scripts = manifest.routes[match.routeId]?.scripts;
			if (!scripts) continue;
			for (const asset of scripts) assetScripts.push({
				tag: "script",
				attrs: {
					...asset.attrs,
					nonce
				},
				children: asset.children,
				...typeof asset.attrs?.src === "string" ? { preventScriptHoist: true } : {}
			});
		}
		return assetScripts;
	};
	const getScripts = (matches) => matches.map((match) => match.scripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
		tag: "script",
		attrs: {
			...script,
			suppressHydrationWarning: true,
			nonce
		},
		children
	}));
	{
		const activeMatches = router.stores.matches.get();
		const assetScripts = getAssetScripts(activeMatches);
		return renderScripts(router, getScripts(activeMatches), assetScripts);
	}
	const assetScripts = useStore(router.stores.matches, getAssetScripts, deepEqual);
	return renderScripts(router, useStore(router.stores.matches, getScripts, deepEqual), assetScripts);
};
function renderScripts(router, scripts, assetScripts) {
	const allScripts = [...scripts, ...assetScripts];
	if (router.serverSsr) {
		const serverBufferedScript = router.serverSsr.takeBufferedScripts();
		if (serverBufferedScript) allScripts.unshift(serverBufferedScript);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: allScripts.map((asset, i) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...asset,
		key: `tsr-scripts-${asset.tag}-${i}`
	})) });
}
var Subscribable = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set();
		this.subscribe = this.subscribe.bind(this);
	}
	subscribe(listener) {
		this.listeners.add(listener);
		this.onSubscribe();
		return () => {
			this.listeners.delete(listener);
			this.onUnsubscribe();
		};
	}
	hasListeners() {
		return this.listeners.size > 0;
	}
	onSubscribe() {}
	onUnsubscribe() {}
};
var FocusManager = class extends Subscribable {
	#focused;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onFocus) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const listener = () => onFocus();
				window.addEventListener("visibilitychange", listener, false);
				return () => {
					window.removeEventListener("visibilitychange", listener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup((focused) => {
			if (typeof focused === "boolean") this.setFocused(focused);
			else this.onFocus();
		});
	}
	setFocused(focused) {
		if (this.#focused !== focused) {
			this.#focused = focused;
			this.onFocus();
		}
	}
	onFocus() {
		const isFocused = this.isFocused();
		this.listeners.forEach((listener) => {
			listener(isFocused);
		});
	}
	isFocused() {
		if (typeof this.#focused === "boolean") return this.#focused;
		return globalThis.document?.visibilityState !== "hidden";
	}
};
var focusManager = new FocusManager();
var defaultTimeoutProvider = {
	setTimeout: (callback, delay) => setTimeout(callback, delay),
	clearTimeout: (timeoutId) => clearTimeout(timeoutId),
	setInterval: (callback, delay) => setInterval(callback, delay),
	clearInterval: (intervalId) => clearInterval(intervalId)
};
var TimeoutManager = class {
	#provider = defaultTimeoutProvider;
	#providerCalled = false;
	setTimeoutProvider(provider) {
		this.#provider = provider;
	}
	setTimeout(callback, delay) {
		return this.#provider.setTimeout(callback, delay);
	}
	clearTimeout(timeoutId) {
		this.#provider.clearTimeout(timeoutId);
	}
	setInterval(callback, delay) {
		return this.#provider.setInterval(callback, delay);
	}
	clearInterval(intervalId) {
		this.#provider.clearInterval(intervalId);
	}
};
var timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
	setTimeout(callback, 0);
}
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {}
function functionalUpdate(updater, input) {
	return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
	return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
	return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
	return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveQueryBoolean(option, query) {
	return typeof option === "function" ? option(query) : option;
}
function matchQuery(filters, query) {
	const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters;
	if (queryKey) {
		if (exact) {
			if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) return false;
		} else if (!partialMatchKey(query.queryKey, queryKey)) return false;
	}
	if (type !== "all") {
		const isActive = query.isActive();
		if (type === "active" && !isActive) return false;
		if (type === "inactive" && isActive) return false;
	}
	if (typeof stale === "boolean" && query.isStale() !== stale) return false;
	if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false;
	if (predicate && !predicate(query)) return false;
	return true;
}
function matchMutation(filters, mutation) {
	const { exact, status, predicate, mutationKey } = filters;
	if (mutationKey) {
		if (!mutation.options.mutationKey) return false;
		if (exact) {
			if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) return false;
		} else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) return false;
	}
	if (status && mutation.state.status !== status) return false;
	if (predicate && !predicate(mutation)) return false;
	return true;
}
function hashQueryKeyByOptions(queryKey, options) {
	return (options?.queryKeyHashFn || hashKey)(queryKey);
}
function hashKey(queryKey) {
	return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
		result[key] = val[key];
		return result;
	}, {}) : val);
}
function partialMatchKey(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (a && b && typeof a === "object" && typeof b === "object") return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
	return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b, depth = 0) {
	if (a === b) return a;
	if (depth > 500) return b;
	const array = isPlainArray(a) && isPlainArray(b);
	if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
	const aSize = (array ? a : Object.keys(a)).length;
	const bItems = array ? b : Object.keys(b);
	const bSize = bItems.length;
	const copy = array ? new Array(bSize) : {};
	let equalItems = 0;
	for (let i = 0; i < bSize; i++) {
		const key = array ? i : bItems[i];
		const aItem = a[key];
		const bItem = b[key];
		if (aItem === bItem) {
			copy[key] = aItem;
			if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
			continue;
		}
		if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
			copy[key] = bItem;
			continue;
		}
		const v = replaceEqualDeep(aItem, bItem, depth + 1);
		copy[key] = v;
		if (v === aItem) equalItems++;
	}
	return aSize === bSize && equalItems === aSize ? a : copy;
}
function isPlainArray(value) {
	return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
	if (!hasObjectPrototype(o)) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	const prot = ctor.prototype;
	if (!hasObjectPrototype(prot)) return false;
	if (!prot.hasOwnProperty("isPrototypeOf")) return false;
	if (Object.getPrototypeOf(o) !== Object.prototype) return false;
	return true;
}
function hasObjectPrototype(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
	return new Promise((resolve) => {
		timeoutManager.setTimeout(resolve, timeout);
	});
}
function replaceData(prevData, data, options) {
	if (typeof options.structuralSharing === "function") return options.structuralSharing(prevData, data);
	else if (options.structuralSharing !== false) return replaceEqualDeep(prevData, data);
	return data;
}
function addToEnd(items, item, max = 0) {
	const newItems = [...items, item];
	return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
	const newItems = [item, ...items];
	return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = /* @__PURE__ */ Symbol();
function ensureQueryFn(options, fetchOptions) {
	if (!options.queryFn && fetchOptions?.initialPromise) return () => fetchOptions.initialPromise;
	if (!options.queryFn || options.queryFn === skipToken) return () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${options.queryHash}'`));
	return options.queryFn;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
	let consumed = false;
	let signal;
	Object.defineProperty(object, "signal", {
		enumerable: true,
		get: () => {
			signal ??= getSignal();
			if (consumed) return signal;
			consumed = true;
			if (signal.aborted) onCancelled();
			else signal.addEventListener("abort", onCancelled, { once: true });
			return signal;
		}
	});
	return object;
}
var environmentManager = /* @__PURE__ */ (() => {
	let isServerFn = () => isServer;
	return {
		/**
		* Returns whether the current runtime should be treated as a server environment.
		*/
		isServer() {
			return isServerFn();
		},
		/**
		* Overrides the server check globally.
		*/
		setIsServer(isServerValue) {
			isServerFn = isServerValue;
		}
	};
})();
function pendingThenable() {
	let resolve;
	let reject;
	const thenable = new Promise((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	});
	thenable.status = "pending";
	thenable.catch(() => {});
	function finalize(data) {
		Object.assign(thenable, data);
		delete thenable.resolve;
		delete thenable.reject;
	}
	thenable.resolve = (value) => {
		finalize({
			status: "fulfilled",
			value
		});
		resolve(value);
	};
	thenable.reject = (reason) => {
		finalize({
			status: "rejected",
			reason
		});
		reject(reason);
	};
	return thenable;
}
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
	let queue = [];
	let transactions = 0;
	let notifyFn = (callback) => {
		callback();
	};
	let batchNotifyFn = (callback) => {
		callback();
	};
	let scheduleFn = defaultScheduler;
	const schedule = (callback) => {
		if (transactions) queue.push(callback);
		else scheduleFn(() => {
			notifyFn(callback);
		});
	};
	const flush = () => {
		const originalQueue = queue;
		queue = [];
		if (originalQueue.length) scheduleFn(() => {
			batchNotifyFn(() => {
				originalQueue.forEach((callback) => {
					notifyFn(callback);
				});
			});
		});
	};
	return {
		batch: (callback) => {
			let result;
			transactions++;
			try {
				result = callback();
			} finally {
				transactions--;
				if (!transactions) flush();
			}
			return result;
		},
		/**
		* All calls to the wrapped function will be batched.
		*/
		batchCalls: (callback) => {
			return (...args) => {
				schedule(() => {
					callback(...args);
				});
			};
		},
		schedule,
		/**
		* Use this method to set a custom notify function.
		* This can be used to for example wrap notifications with `React.act` while running tests.
		*/
		setNotifyFunction: (fn) => {
			notifyFn = fn;
		},
		/**
		* Use this method to set a custom function to batch notifications together into a single tick.
		* By default React Query will use the batch function provided by ReactDOM or React Native.
		*/
		setBatchNotifyFunction: (fn) => {
			batchNotifyFn = fn;
		},
		setScheduler: (fn) => {
			scheduleFn = fn;
		}
	};
}
var notifyManager = createNotifyManager();
var OnlineManager = class extends Subscribable {
	#online = true;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onOnline) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const onlineListener = () => onOnline(true);
				const offlineListener = () => onOnline(false);
				window.addEventListener("online", onlineListener, false);
				window.addEventListener("offline", offlineListener, false);
				return () => {
					window.removeEventListener("online", onlineListener);
					window.removeEventListener("offline", offlineListener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup(this.setOnline.bind(this));
	}
	setOnline(online) {
		if (this.#online !== online) {
			this.#online = online;
			this.listeners.forEach((listener) => {
				listener(online);
			});
		}
	}
	isOnline() {
		return this.#online;
	}
};
var onlineManager = new OnlineManager();
function defaultRetryDelay(failureCount) {
	return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
	return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
	constructor(options) {
		super("CancelledError");
		this.revert = options?.revert;
		this.silent = options?.silent;
	}
};
function createRetryer(config) {
	let isRetryCancelled = false;
	let failureCount = 0;
	let continueFn;
	const thenable = pendingThenable();
	const isResolved = () => thenable.status !== "pending";
	const cancel = (cancelOptions) => {
		if (!isResolved()) {
			const error = new CancelledError(cancelOptions);
			reject(error);
			config.onCancel?.(error);
		}
	};
	const cancelRetry = () => {
		isRetryCancelled = true;
	};
	const continueRetry = () => {
		isRetryCancelled = false;
	};
	const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
	const canStart = () => canFetch(config.networkMode) && config.canRun();
	const resolve = (value) => {
		if (!isResolved()) {
			continueFn?.();
			thenable.resolve(value);
		}
	};
	const reject = (value) => {
		if (!isResolved()) {
			continueFn?.();
			thenable.reject(value);
		}
	};
	const pause = () => {
		return new Promise((continueResolve) => {
			continueFn = (value) => {
				if (isResolved() || canContinue()) continueResolve(value);
			};
			config.onPause?.();
		}).then(() => {
			continueFn = void 0;
			if (!isResolved()) config.onContinue?.();
		});
	};
	const run = () => {
		if (isResolved()) return;
		let promiseOrValue;
		const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
		try {
			promiseOrValue = initialPromise ?? config.fn();
		} catch (error) {
			promiseOrValue = Promise.reject(error);
		}
		Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
			if (isResolved()) return;
			const retry = config.retry ?? (environmentManager.isServer() ? 0 : 3);
			const retryDelay = config.retryDelay ?? defaultRetryDelay;
			const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
			const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
			if (isRetryCancelled || !shouldRetry) {
				reject(error);
				return;
			}
			failureCount++;
			config.onFail?.(failureCount, error);
			sleep(delay).then(() => {
				return canContinue() ? void 0 : pause();
			}).then(() => {
				if (isRetryCancelled) reject(error);
				else run();
			});
		});
	};
	return {
		promise: thenable,
		status: () => thenable.status,
		cancel,
		continue: () => {
			continueFn?.();
			return thenable;
		},
		cancelRetry,
		continueRetry,
		canStart,
		start: () => {
			if (canStart()) run();
			else pause().then(run);
			return thenable;
		}
	};
}
var Removable = class {
	#gcTimeout;
	destroy() {
		this.clearGcTimeout();
	}
	scheduleGc() {
		this.clearGcTimeout();
		if (isValidTimeout(this.gcTime)) this.#gcTimeout = timeoutManager.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime);
	}
	updateGcTime(newGcTime) {
		this.gcTime = Math.max(this.gcTime || 0, newGcTime ?? (environmentManager.isServer() ? Infinity : 300 * 1e3));
	}
	clearGcTimeout() {
		if (this.#gcTimeout !== void 0) {
			timeoutManager.clearTimeout(this.#gcTimeout);
			this.#gcTimeout = void 0;
		}
	}
};
function infiniteQueryBehavior(pages) {
	return { onFetch: (context, query) => {
		const options = context.options;
		const direction = context.fetchOptions?.meta?.fetchMore?.direction;
		const oldPages = context.state.data?.pages || [];
		const oldPageParams = context.state.data?.pageParams || [];
		let result = {
			pages: [],
			pageParams: []
		};
		let currentPage = 0;
		const fetchFn = async () => {
			let cancelled = false;
			const addSignalProperty = (object) => {
				addConsumeAwareSignal(object, () => context.signal, () => cancelled = true);
			};
			const queryFn = ensureQueryFn(context.options, context.fetchOptions);
			const fetchPage = async (data, param, previous) => {
				if (cancelled) return Promise.reject(context.signal.reason);
				if (param == null && data.pages.length) return Promise.resolve(data);
				const createQueryFnContext = () => {
					const queryFnContext2 = {
						client: context.client,
						queryKey: context.queryKey,
						pageParam: param,
						direction: previous ? "backward" : "forward",
						meta: context.options.meta
					};
					addSignalProperty(queryFnContext2);
					return queryFnContext2;
				};
				const page = await queryFn(createQueryFnContext());
				const { maxPages } = context.options;
				const addTo = previous ? addToStart : addToEnd;
				return {
					pages: addTo(data.pages, page, maxPages),
					pageParams: addTo(data.pageParams, param, maxPages)
				};
			};
			if (direction && oldPages.length) {
				const previous = direction === "backward";
				const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
				const oldData = {
					pages: oldPages,
					pageParams: oldPageParams
				};
				result = await fetchPage(oldData, pageParamFn(options, oldData), previous);
			} else {
				const remainingPages = pages ?? oldPages.length;
				do {
					const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
					if (currentPage > 0 && param == null) break;
					result = await fetchPage(result, param);
					currentPage++;
				} while (currentPage < remainingPages);
			}
			return result;
		};
		if (context.options.persister) context.fetchFn = () => {
			return context.options.persister?.(fetchFn, {
				client: context.client,
				queryKey: context.queryKey,
				meta: context.options.meta,
				signal: context.signal
			}, query);
		};
		else context.fetchFn = fetchFn;
	} };
}
function getNextPageParam(options, { pages, pageParams }) {
	const lastIndex = pages.length - 1;
	return pages.length > 0 ? options.getNextPageParam(pages[lastIndex], pages, pageParams[lastIndex], pageParams) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
	return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
var Query = class extends Removable {
	#queryType;
	#initialState;
	#revertState;
	#cache;
	#client;
	#retryer;
	#defaultOptions;
	#abortSignalConsumed;
	constructor(config) {
		super();
		this.#abortSignalConsumed = false;
		this.#defaultOptions = config.defaultOptions;
		this.setOptions(config.options);
		this.observers = [];
		this.#client = config.client;
		this.#cache = this.#client.getQueryCache();
		this.queryKey = config.queryKey;
		this.queryHash = config.queryHash;
		this.#initialState = getDefaultState$1(this.options);
		this.state = config.state ?? this.#initialState;
		this.scheduleGc();
	}
	get meta() {
		return this.options.meta;
	}
	get queryType() {
		return this.#queryType;
	}
	get promise() {
		return this.#retryer?.promise;
	}
	setOptions(options) {
		this.options = {
			...this.#defaultOptions,
			...options
		};
		if (options?._type) this.#queryType = options._type;
		this.updateGcTime(this.options.gcTime);
		if (this.state && this.state.data === void 0) {
			const defaultState = getDefaultState$1(this.options);
			if (defaultState.data !== void 0) {
				this.setState(successState(defaultState.data, defaultState.dataUpdatedAt));
				this.#initialState = defaultState;
			}
		}
	}
	optionalRemove() {
		if (!this.observers.length && this.state.fetchStatus === "idle") this.#cache.remove(this);
	}
	setData(newData, options) {
		const data = replaceData(this.state.data, newData, this.options);
		this.#dispatch({
			data,
			type: "success",
			dataUpdatedAt: options?.updatedAt,
			manual: options?.manual
		});
		return data;
	}
	setState(state) {
		this.#dispatch({
			type: "setState",
			state
		});
	}
	cancel(options) {
		const promise = this.#retryer?.promise;
		this.#retryer?.cancel(options);
		return promise ? promise.then(noop).catch(noop) : Promise.resolve();
	}
	destroy() {
		super.destroy();
		this.cancel({ silent: true });
	}
	get resetState() {
		return this.#initialState;
	}
	reset() {
		this.destroy();
		this.setState(this.resetState);
	}
	isActive() {
		return this.observers.some((observer) => resolveQueryBoolean(observer.options.enabled, this) !== false);
	}
	isDisabled() {
		if (this.getObserversCount() > 0) return !this.isActive();
		return this.options.queryFn === skipToken || !this.isFetched();
	}
	isFetched() {
		return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
	}
	isStatic() {
		if (this.getObserversCount() > 0) return this.observers.some((observer) => resolveStaleTime(observer.options.staleTime, this) === "static");
		return false;
	}
	isStale() {
		if (this.getObserversCount() > 0) return this.observers.some((observer) => observer.getCurrentResult().isStale);
		return this.state.data === void 0 || this.state.isInvalidated;
	}
	isStaleByTime(staleTime = 0) {
		if (this.state.data === void 0) return true;
		if (staleTime === "static") return false;
		if (this.state.isInvalidated) return true;
		return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
	}
	onFocus() {
		this.observers.find((x) => x.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: false });
		this.#retryer?.continue();
	}
	onOnline() {
		this.observers.find((x) => x.shouldFetchOnReconnect())?.refetch({ cancelRefetch: false });
		this.#retryer?.continue();
	}
	addObserver(observer) {
		if (!this.observers.includes(observer)) {
			this.observers.push(observer);
			this.clearGcTimeout();
			this.#cache.notify({
				type: "observerAdded",
				query: this,
				observer
			});
		}
	}
	removeObserver(observer) {
		if (this.observers.includes(observer)) {
			this.observers = this.observers.filter((x) => x !== observer);
			if (!this.observers.length) {
				if (this.#retryer) if (this.#abortSignalConsumed || this.#isInitialPausedFetch()) this.#retryer.cancel({ revert: true });
				else this.#retryer.cancelRetry();
				this.scheduleGc();
			}
			this.#cache.notify({
				type: "observerRemoved",
				query: this,
				observer
			});
		}
	}
	getObserversCount() {
		return this.observers.length;
	}
	#isInitialPausedFetch() {
		return this.state.fetchStatus === "paused" && this.state.status === "pending";
	}
	invalidate() {
		if (!this.state.isInvalidated) this.#dispatch({ type: "invalidate" });
	}
	async fetch(options, fetchOptions) {
		if (this.state.fetchStatus !== "idle" && this.#retryer?.status() !== "rejected") {
			if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) this.cancel({ silent: true });
			else if (this.#retryer) {
				this.#retryer.continueRetry();
				return this.#retryer.promise;
			}
		}
		if (options) this.setOptions(options);
		if (!this.options.queryFn) {
			const observer = this.observers.find((x) => x.options.queryFn);
			if (observer) this.setOptions(observer.options);
		}
		const abortController = new AbortController();
		const addSignalProperty = (object) => {
			Object.defineProperty(object, "signal", {
				enumerable: true,
				get: () => {
					this.#abortSignalConsumed = true;
					return abortController.signal;
				}
			});
		};
		const fetchFn = () => {
			const queryFn = ensureQueryFn(this.options, fetchOptions);
			const createQueryFnContext = () => {
				const queryFnContext2 = {
					client: this.#client,
					queryKey: this.queryKey,
					meta: this.meta
				};
				addSignalProperty(queryFnContext2);
				return queryFnContext2;
			};
			const queryFnContext = createQueryFnContext();
			this.#abortSignalConsumed = false;
			if (this.options.persister) return this.options.persister(queryFn, queryFnContext, this);
			return queryFn(queryFnContext);
		};
		const createFetchContext = () => {
			const context2 = {
				fetchOptions,
				options: this.options,
				queryKey: this.queryKey,
				client: this.#client,
				state: this.state,
				fetchFn
			};
			addSignalProperty(context2);
			return context2;
		};
		const context = createFetchContext();
		(this.#queryType === "infinite" ? infiniteQueryBehavior(this.options.pages) : this.options.behavior)?.onFetch(context, this);
		this.#revertState = this.state;
		if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) this.#dispatch({
			type: "fetch",
			meta: context.fetchOptions?.meta
		});
		this.#retryer = createRetryer({
			initialPromise: fetchOptions?.initialPromise,
			fn: context.fetchFn,
			onCancel: (error) => {
				if (error instanceof CancelledError && error.revert) this.setState({
					...this.#revertState,
					fetchStatus: "idle"
				});
				abortController.abort();
			},
			onFail: (failureCount, error) => {
				this.#dispatch({
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				this.#dispatch({ type: "pause" });
			},
			onContinue: () => {
				this.#dispatch({ type: "continue" });
			},
			retry: context.options.retry,
			retryDelay: context.options.retryDelay,
			networkMode: context.options.networkMode,
			canRun: () => true
		});
		try {
			const data = await this.#retryer.start();
			if (data === void 0) throw new Error(`${this.queryHash} data is undefined`);
			this.setData(data);
			this.#cache.config.onSuccess?.(data, this);
			this.#cache.config.onSettled?.(data, this.state.error, this);
			return data;
		} catch (error) {
			if (error instanceof CancelledError) {
				if (error.silent) return this.#retryer.promise;
				else if (error.revert) {
					if (this.state.data === void 0) throw error;
					return this.state.data;
				}
			}
			this.#dispatch({
				type: "error",
				error
			});
			this.#cache.config.onError?.(error, this);
			this.#cache.config.onSettled?.(this.state.data, error, this);
			throw error;
		} finally {
			this.scheduleGc();
		}
	}
	#dispatch(action) {
		const reducer = (state) => {
			switch (action.type) {
				case "failed": return {
					...state,
					fetchFailureCount: action.failureCount,
					fetchFailureReason: action.error
				};
				case "pause": return {
					...state,
					fetchStatus: "paused"
				};
				case "continue": return {
					...state,
					fetchStatus: "fetching"
				};
				case "fetch": return {
					...state,
					...fetchState(state.data, this.options),
					fetchMeta: action.meta ?? null
				};
				case "success":
					const newState = {
						...state,
						...successState(action.data, action.dataUpdatedAt),
						dataUpdateCount: state.dataUpdateCount + 1,
						...!action.manual && {
							fetchStatus: "idle",
							fetchFailureCount: 0,
							fetchFailureReason: null
						}
					};
					this.#revertState = action.manual ? newState : void 0;
					return newState;
				case "error":
					const error = action.error;
					return {
						...state,
						error,
						errorUpdateCount: state.errorUpdateCount + 1,
						errorUpdatedAt: Date.now(),
						fetchFailureCount: state.fetchFailureCount + 1,
						fetchFailureReason: error,
						fetchStatus: "idle",
						status: "error",
						isInvalidated: true
					};
				case "invalidate": return {
					...state,
					isInvalidated: true
				};
				case "setState": return {
					...state,
					...action.state
				};
			}
		};
		this.state = reducer(this.state);
		notifyManager.batch(() => {
			this.observers.forEach((observer) => {
				observer.onQueryUpdate();
			});
			this.#cache.notify({
				query: this,
				type: "updated",
				action
			});
		});
	}
};
function fetchState(data, options) {
	return {
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
		...data === void 0 && {
			error: null,
			status: "pending"
		}
	};
}
function successState(data, dataUpdatedAt) {
	return {
		data,
		dataUpdatedAt: dataUpdatedAt ?? Date.now(),
		error: null,
		isInvalidated: false,
		status: "success"
	};
}
function getDefaultState$1(options) {
	const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
	const hasData = data !== void 0;
	const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
	return {
		data,
		dataUpdateCount: 0,
		dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
		error: null,
		errorUpdateCount: 0,
		errorUpdatedAt: 0,
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchMeta: null,
		isInvalidated: false,
		status: hasData ? "success" : "pending",
		fetchStatus: "idle"
	};
}
var Mutation = class extends Removable {
	#client;
	#observers;
	#mutationCache;
	#retryer;
	constructor(config) {
		super();
		this.#client = config.client;
		this.mutationId = config.mutationId;
		this.#mutationCache = config.mutationCache;
		this.#observers = [];
		this.state = config.state || getDefaultState();
		this.setOptions(config.options);
		this.scheduleGc();
	}
	setOptions(options) {
		this.options = options;
		this.updateGcTime(this.options.gcTime);
	}
	get meta() {
		return this.options.meta;
	}
	addObserver(observer) {
		if (!this.#observers.includes(observer)) {
			this.#observers.push(observer);
			this.clearGcTimeout();
			this.#mutationCache.notify({
				type: "observerAdded",
				mutation: this,
				observer
			});
		}
	}
	removeObserver(observer) {
		this.#observers = this.#observers.filter((x) => x !== observer);
		this.scheduleGc();
		this.#mutationCache.notify({
			type: "observerRemoved",
			mutation: this,
			observer
		});
	}
	optionalRemove() {
		if (!this.#observers.length) if (this.state.status === "pending") this.scheduleGc();
		else this.#mutationCache.remove(this);
	}
	continue() {
		return this.#retryer?.continue() ?? this.execute(this.state.variables);
	}
	async execute(variables) {
		const onContinue = () => {
			this.#dispatch({ type: "continue" });
		};
		const mutationFnContext = {
			client: this.#client,
			meta: this.options.meta,
			mutationKey: this.options.mutationKey
		};
		this.#retryer = createRetryer({
			fn: () => {
				if (!this.options.mutationFn) return Promise.reject(/* @__PURE__ */ new Error("No mutationFn found"));
				return this.options.mutationFn(variables, mutationFnContext);
			},
			onFail: (failureCount, error) => {
				this.#dispatch({
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				this.#dispatch({ type: "pause" });
			},
			onContinue,
			retry: this.options.retry ?? 0,
			retryDelay: this.options.retryDelay,
			networkMode: this.options.networkMode,
			canRun: () => this.#mutationCache.canRun(this)
		});
		const restored = this.state.status === "pending";
		const isPaused = !this.#retryer.canStart();
		try {
			if (restored) onContinue();
			else {
				this.#dispatch({
					type: "pending",
					variables,
					isPaused
				});
				if (this.#mutationCache.config.onMutate) await this.#mutationCache.config.onMutate(variables, this, mutationFnContext);
				const context = await this.options.onMutate?.(variables, mutationFnContext);
				if (context !== this.state.context) this.#dispatch({
					type: "pending",
					context,
					variables,
					isPaused
				});
			}
			const data = await this.#retryer.start();
			await this.#mutationCache.config.onSuccess?.(data, variables, this.state.context, this, mutationFnContext);
			await this.options.onSuccess?.(data, variables, this.state.context, mutationFnContext);
			await this.#mutationCache.config.onSettled?.(data, null, this.state.variables, this.state.context, this, mutationFnContext);
			await this.options.onSettled?.(data, null, variables, this.state.context, mutationFnContext);
			this.#dispatch({
				type: "success",
				data
			});
			return data;
		} catch (error) {
			try {
				await this.#mutationCache.config.onError?.(error, variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onError?.(error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.#mutationCache.config.onSettled?.(void 0, error, this.state.variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onSettled?.(void 0, error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			this.#dispatch({
				type: "error",
				error
			});
			throw error;
		} finally {
			this.#mutationCache.runNext(this);
		}
	}
	#dispatch(action) {
		const reducer = (state) => {
			switch (action.type) {
				case "failed": return {
					...state,
					failureCount: action.failureCount,
					failureReason: action.error
				};
				case "pause": return {
					...state,
					isPaused: true
				};
				case "continue": return {
					...state,
					isPaused: false
				};
				case "pending": return {
					...state,
					context: action.context,
					data: void 0,
					failureCount: 0,
					failureReason: null,
					error: null,
					isPaused: action.isPaused,
					status: "pending",
					variables: action.variables,
					submittedAt: Date.now()
				};
				case "success": return {
					...state,
					data: action.data,
					failureCount: 0,
					failureReason: null,
					error: null,
					status: "success",
					isPaused: false
				};
				case "error": return {
					...state,
					data: void 0,
					error: action.error,
					failureCount: state.failureCount + 1,
					failureReason: action.error,
					isPaused: false,
					status: "error"
				};
			}
		};
		this.state = reducer(this.state);
		notifyManager.batch(() => {
			this.#observers.forEach((observer) => {
				observer.onMutationUpdate(action);
			});
			this.#mutationCache.notify({
				mutation: this,
				type: "updated",
				action
			});
		});
	}
};
function getDefaultState() {
	return {
		context: void 0,
		data: void 0,
		error: null,
		failureCount: 0,
		failureReason: null,
		isPaused: false,
		status: "idle",
		variables: void 0,
		submittedAt: 0
	};
}
var MutationCache = class extends Subscribable {
	constructor(config = {}) {
		super();
		this.config = config;
		this.#mutations = /* @__PURE__ */ new Set();
		this.#scopes = /* @__PURE__ */ new Map();
		this.#mutationId = 0;
	}
	#mutations;
	#scopes;
	#mutationId;
	build(client, options, state) {
		const mutation = new Mutation({
			client,
			mutationCache: this,
			mutationId: ++this.#mutationId,
			options: client.defaultMutationOptions(options),
			state
		});
		this.add(mutation);
		return mutation;
	}
	add(mutation) {
		this.#mutations.add(mutation);
		const scope = scopeFor(mutation);
		if (typeof scope === "string") {
			const scopedMutations = this.#scopes.get(scope);
			if (scopedMutations) scopedMutations.push(mutation);
			else this.#scopes.set(scope, [mutation]);
		}
		this.notify({
			type: "added",
			mutation
		});
	}
	remove(mutation) {
		if (this.#mutations.delete(mutation)) {
			const scope = scopeFor(mutation);
			if (typeof scope === "string") {
				const scopedMutations = this.#scopes.get(scope);
				if (scopedMutations) {
					if (scopedMutations.length > 1) {
						const index = scopedMutations.indexOf(mutation);
						if (index !== -1) scopedMutations.splice(index, 1);
					} else if (scopedMutations[0] === mutation) this.#scopes.delete(scope);
				}
			}
		}
		this.notify({
			type: "removed",
			mutation
		});
	}
	canRun(mutation) {
		const scope = scopeFor(mutation);
		if (typeof scope === "string") {
			const firstPendingMutation = this.#scopes.get(scope)?.find((m) => m.state.status === "pending");
			return !firstPendingMutation || firstPendingMutation === mutation;
		} else return true;
	}
	runNext(mutation) {
		const scope = scopeFor(mutation);
		if (typeof scope === "string") return (this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused))?.continue() ?? Promise.resolve();
		else return Promise.resolve();
	}
	clear() {
		notifyManager.batch(() => {
			this.#mutations.forEach((mutation) => {
				this.notify({
					type: "removed",
					mutation
				});
			});
			this.#mutations.clear();
			this.#scopes.clear();
		});
	}
	getAll() {
		return Array.from(this.#mutations);
	}
	find(filters) {
		const defaultedFilters = {
			exact: true,
			...filters
		};
		return this.getAll().find((mutation) => matchMutation(defaultedFilters, mutation));
	}
	findAll(filters = {}) {
		return this.getAll().filter((mutation) => matchMutation(filters, mutation));
	}
	notify(event) {
		notifyManager.batch(() => {
			this.listeners.forEach((listener) => {
				listener(event);
			});
		});
	}
	resumePausedMutations() {
		const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
		return notifyManager.batch(() => Promise.all(pausedMutations.map((mutation) => mutation.continue().catch(noop))));
	}
};
function scopeFor(mutation) {
	return mutation.options.scope?.id;
}
var QueryCache = class extends Subscribable {
	constructor(config = {}) {
		super();
		this.config = config;
		this.#queries = /* @__PURE__ */ new Map();
	}
	#queries;
	build(client, options, state) {
		const queryKey = options.queryKey;
		const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
		let query = this.get(queryHash);
		if (!query) {
			query = new Query({
				client,
				queryKey,
				queryHash,
				options: client.defaultQueryOptions(options),
				state,
				defaultOptions: client.getQueryDefaults(queryKey)
			});
			this.add(query);
		}
		return query;
	}
	add(query) {
		if (!this.#queries.has(query.queryHash)) {
			this.#queries.set(query.queryHash, query);
			this.notify({
				type: "added",
				query
			});
		}
	}
	remove(query) {
		const queryInMap = this.#queries.get(query.queryHash);
		if (queryInMap) {
			query.destroy();
			if (queryInMap === query) this.#queries.delete(query.queryHash);
			this.notify({
				type: "removed",
				query
			});
		}
	}
	clear() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				this.remove(query);
			});
		});
	}
	get(queryHash) {
		return this.#queries.get(queryHash);
	}
	getAll() {
		return [...this.#queries.values()];
	}
	find(filters) {
		const defaultedFilters = {
			exact: true,
			...filters
		};
		return this.getAll().find((query) => matchQuery(defaultedFilters, query));
	}
	findAll(filters = {}) {
		const queries = this.getAll();
		return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
	}
	notify(event) {
		notifyManager.batch(() => {
			this.listeners.forEach((listener) => {
				listener(event);
			});
		});
	}
	onFocus() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				query.onFocus();
			});
		});
	}
	onOnline() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				query.onOnline();
			});
		});
	}
};
var QueryClient = class {
	#queryCache;
	#mutationCache;
	#defaultOptions;
	#queryDefaults;
	#mutationDefaults;
	#mountCount;
	#unsubscribeFocus;
	#unsubscribeOnline;
	constructor(config = {}) {
		this.#queryCache = config.queryCache || new QueryCache();
		this.#mutationCache = config.mutationCache || new MutationCache();
		this.#defaultOptions = config.defaultOptions || {};
		this.#queryDefaults = /* @__PURE__ */ new Map();
		this.#mutationDefaults = /* @__PURE__ */ new Map();
		this.#mountCount = 0;
	}
	mount() {
		this.#mountCount++;
		if (this.#mountCount !== 1) return;
		this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
			if (focused) {
				await this.resumePausedMutations();
				this.#queryCache.onFocus();
			}
		});
		this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
			if (online) {
				await this.resumePausedMutations();
				this.#queryCache.onOnline();
			}
		});
	}
	unmount() {
		this.#mountCount--;
		if (this.#mountCount !== 0) return;
		this.#unsubscribeFocus?.();
		this.#unsubscribeFocus = void 0;
		this.#unsubscribeOnline?.();
		this.#unsubscribeOnline = void 0;
	}
	isFetching(filters) {
		return this.#queryCache.findAll({
			...filters,
			fetchStatus: "fetching"
		}).length;
	}
	isMutating(filters) {
		return this.#mutationCache.findAll({
			...filters,
			status: "pending"
		}).length;
	}
	/**
	* Imperative (non-reactive) way to retrieve data for a QueryKey.
	* Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
	*
	* Hint: Do not use this function inside a component, because it won't receive updates.
	* Use `useQuery` to create a `QueryObserver` that subscribes to changes.
	*/
	getQueryData(queryKey) {
		const options = this.defaultQueryOptions({ queryKey });
		return this.#queryCache.get(options.queryHash)?.state.data;
	}
	ensureQueryData(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		const query = this.#queryCache.build(this, defaultedOptions);
		const cachedData = query.state.data;
		if (cachedData === void 0) return this.fetchQuery(options);
		if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) this.prefetchQuery(defaultedOptions);
		return Promise.resolve(cachedData);
	}
	getQueriesData(filters) {
		return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
			return [queryKey, state.data];
		});
	}
	setQueryData(queryKey, updater, options) {
		const defaultedOptions = this.defaultQueryOptions({ queryKey });
		const prevData = this.#queryCache.get(defaultedOptions.queryHash)?.state.data;
		const data = functionalUpdate(updater, prevData);
		if (data === void 0) return;
		return this.#queryCache.build(this, defaultedOptions).setData(data, {
			...options,
			manual: true
		});
	}
	setQueriesData(filters, updater, options) {
		return notifyManager.batch(() => this.#queryCache.findAll(filters).map(({ queryKey }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
	}
	getQueryState(queryKey) {
		const options = this.defaultQueryOptions({ queryKey });
		return this.#queryCache.get(options.queryHash)?.state;
	}
	removeQueries(filters) {
		const queryCache = this.#queryCache;
		notifyManager.batch(() => {
			queryCache.findAll(filters).forEach((query) => {
				queryCache.remove(query);
			});
		});
	}
	resetQueries(filters, options) {
		const queryCache = this.#queryCache;
		return notifyManager.batch(() => {
			queryCache.findAll(filters).forEach((query) => {
				query.reset();
			});
			return this.refetchQueries({
				type: "active",
				...filters
			}, options);
		});
	}
	cancelQueries(filters, cancelOptions = {}) {
		const defaultedCancelOptions = {
			revert: true,
			...cancelOptions
		};
		const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions)));
		return Promise.all(promises).then(noop).catch(noop);
	}
	invalidateQueries(filters, options = {}) {
		return notifyManager.batch(() => {
			this.#queryCache.findAll(filters).forEach((query) => {
				query.invalidate();
			});
			if (filters?.refetchType === "none") return Promise.resolve();
			return this.refetchQueries({
				...filters,
				type: filters?.refetchType ?? filters?.type ?? "active"
			}, options);
		});
	}
	refetchQueries(filters, options = {}) {
		const fetchOptions = {
			...options,
			cancelRefetch: options.cancelRefetch ?? true
		};
		const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
			let promise = query.fetch(void 0, fetchOptions);
			if (!fetchOptions.throwOnError) promise = promise.catch(noop);
			return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
		}));
		return Promise.all(promises).then(noop);
	}
	fetchQuery(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
		const query = this.#queryCache.build(this, defaultedOptions);
		return query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query)) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
	}
	prefetchQuery(options) {
		return this.fetchQuery(options).then(noop).catch(noop);
	}
	fetchInfiniteQuery(options) {
		options._type = "infinite";
		return this.fetchQuery(options);
	}
	prefetchInfiniteQuery(options) {
		return this.fetchInfiniteQuery(options).then(noop).catch(noop);
	}
	ensureInfiniteQueryData(options) {
		options._type = "infinite";
		return this.ensureQueryData(options);
	}
	resumePausedMutations() {
		if (onlineManager.isOnline()) return this.#mutationCache.resumePausedMutations();
		return Promise.resolve();
	}
	getQueryCache() {
		return this.#queryCache;
	}
	getMutationCache() {
		return this.#mutationCache;
	}
	getDefaultOptions() {
		return this.#defaultOptions;
	}
	setDefaultOptions(options) {
		this.#defaultOptions = options;
	}
	setQueryDefaults(queryKey, options) {
		this.#queryDefaults.set(hashKey(queryKey), {
			queryKey,
			defaultOptions: options
		});
	}
	getQueryDefaults(queryKey) {
		const defaults = [...this.#queryDefaults.values()];
		const result = {};
		defaults.forEach((queryDefault) => {
			if (partialMatchKey(queryKey, queryDefault.queryKey)) Object.assign(result, queryDefault.defaultOptions);
		});
		return result;
	}
	setMutationDefaults(mutationKey, options) {
		this.#mutationDefaults.set(hashKey(mutationKey), {
			mutationKey,
			defaultOptions: options
		});
	}
	getMutationDefaults(mutationKey) {
		const defaults = [...this.#mutationDefaults.values()];
		const result = {};
		defaults.forEach((queryDefault) => {
			if (partialMatchKey(mutationKey, queryDefault.mutationKey)) Object.assign(result, queryDefault.defaultOptions);
		});
		return result;
	}
	defaultQueryOptions(options) {
		if (options._defaulted) return options;
		const defaultedOptions = {
			...this.#defaultOptions.queries,
			...this.getQueryDefaults(options.queryKey),
			...options,
			_defaulted: true
		};
		if (!defaultedOptions.queryHash) defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
		if (defaultedOptions.refetchOnReconnect === void 0) defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
		if (defaultedOptions.throwOnError === void 0) defaultedOptions.throwOnError = !!defaultedOptions.suspense;
		if (!defaultedOptions.networkMode && defaultedOptions.persister) defaultedOptions.networkMode = "offlineFirst";
		if (defaultedOptions.queryFn === skipToken) defaultedOptions.enabled = false;
		return defaultedOptions;
	}
	defaultMutationOptions(options) {
		if (options?._defaulted) return options;
		return {
			...this.#defaultOptions.mutations,
			...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
			...options,
			_defaulted: true
		};
	}
	clear() {
		this.#queryCache.clear();
		this.#mutationCache.clear();
	}
};
var QueryClientContext = import_react.createContext(void 0);
var QueryClientProvider = ({ client, children }) => {
	import_react.useEffect(() => {
		client.mount();
		return () => {
			client.unmount();
		};
	}, [client]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientContext.Provider, {
		value: client,
		children
	});
};
var styles_default = "/assets/styles-CMLdBVgG.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$31 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VIVAVERDE ERP — Sistema Interno" },
			{
				name: "description",
				content: "Sistema ERP interno da VIVAVERDE para gestão de estoque, vendas, financeiro e logística."
			},
			{
				property: "og:title",
				content: "VIVAVERDE ERP — Sistema Interno"
			},
			{
				property: "og:description",
				content: "Sistema ERP interno da VIVAVERDE para gestão de estoque, vendas, financeiro e logística."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "VIVAVERDE ERP — Sistema Interno"
			},
			{
				name: "twitter:description",
				content: "Sistema ERP interno da VIVAVERDE para gestão de estoque, vendas, financeiro e logística."
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/b1puNI2cwJQSkSR9bqtGJNLTTeo2/social-images/social-1781777493114-VIVAVERDE.webp"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/b1puNI2cwJQSkSR9bqtGJNLTTeo2/social-images/social-1781777493114-VIVAVERDE.webp"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			},
			{
				rel: "apple-touch-icon",
				href: "/vivaverdelogo.png"
			},
			{
				rel: "icon",
				href: "/vivaverdelogo.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$31.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT") router.navigate({ to: "/" });
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {})] })
	});
}
var $$splitComponentImporter$29 = () => import("./parceiro-6V8wNKDX.mjs");
var Route$30 = createFileRoute("/parceiro")({
	beforeLoad: async ({ location }) => {
		if (typeof window === "undefined") return;
		if (location.pathname === "/parceiro/login" || location.pathname === "/parceiro/cadastro") return;
		try {
			const { data: { session } } = await supabaseParceiro.auth.getSession();
			if (!session) throw redirect({ to: "/parceiro/login" });
			sessionStorage.removeItem("parceiro_blocked");
		} catch (err) {
			if (err?.isRedirect || err?.message === "redirect") throw err;
			console.warn("[parceiro beforeLoad] erro ao verificar status:", err);
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./catalogo-aRVOaTdo.mjs");
var Route$29 = createFileRoute("/catalogo")({
	head: () => ({ meta: [{ title: "Catálogo — VivaVerde" }] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./app-B7RdZ8sD.mjs");
var Route$28 = createFileRoute("/app")({
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data: { session } } = await supabase.auth.getSession();
		if (!session) throw redirect({ to: "/" });
		const ADMIN_EMAILS = "douglasalmeida156@hotmail.com".split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
		if (!session.user.email || !ADMIN_EMAILS.includes(session.user.email.toLowerCase())) throw redirect({ to: "/parceiro/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./routes-DBKmeVEd.mjs");
objectType({
	email: stringType().email({ message: "Insira um e-mail válido." }),
	password: stringType().min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
});
var Route$27 = createFileRoute("/")({
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data: { session } } = await supabase.auth.getSession();
		if (session) throw redirect({ to: "/app/dashboard" });
	},
	head: () => ({ meta: [{ title: "Entrar — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var Route$26 = createFileRoute("/app/")({ beforeLoad: () => {
	throw redirect({ to: "/app/dashboard" });
} });
var $$splitComponentImporter$25 = () => import("./parceiro.pdv-0Un0nsM1.mjs");
var Route$25 = createFileRoute("/parceiro/pdv")({
	head: () => ({ meta: [{ title: "Nova Venda — VIVAVERDE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./parceiro.login-CmvopEui.mjs");
var Route$24 = createFileRoute("/parceiro/login")({
	head: () => ({ meta: [{ title: "Login Parceiro — VIVAVERDE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./parceiro.dashboard-DJ_idaR7.mjs");
var Route$23 = createFileRoute("/parceiro/dashboard")({
	head: () => ({ meta: [{ title: "Meu Painel — VIVAVERDE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./parceiro.cadastro-Bz15iHQy.mjs");
var Route$22 = createFileRoute("/parceiro/cadastro")({
	head: () => ({ meta: [{ title: "Cadastro de Parceiro — VIVAVERDE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./app.vendedores-c9Y2raeP.mjs");
var Route$21 = createFileRoute("/app/vendedores")({
	head: () => ({ meta: [{ title: "Vendedores Parceiros — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./app.vendas-CHcEDv9C.mjs");
var Route$20 = createFileRoute("/app/vendas")({
	head: () => ({ meta: [{ title: "Vendas — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./app.venda-nova-GOUDygOZ.mjs");
var Route$19 = createFileRoute("/app/venda-nova")({
	head: () => ({ meta: [{ title: "Nova Venda/DAV — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./app.relatorios-C-e2y1AP.mjs");
var Route$18 = createFileRoute("/app/relatorios")({
	head: () => ({ meta: [{ title: "Relatórios — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./app.registro-B8FW1yWn.mjs");
var Route$17 = createFileRoute("/app/registro")({
	head: () => ({ meta: [{ title: "Registro Rapido - VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./app.produtos-BY6Pqb9B.mjs");
var Route$16 = createFileRoute("/app/produtos")({
	head: () => ({ meta: [{ title: "Produtos — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./app.pdv-DyVeVohh.mjs");
var Route$15 = createFileRoute("/app/pdv")({
	head: () => ({ meta: [{ title: "PDV — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./app.notificacoes-hwKliDa7.mjs");
var Route$14 = createFileRoute("/app/notificacoes")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./app.logistica-C0h5qZ_a.mjs");
var Route$13 = createFileRoute("/app/logistica")({
	head: () => ({ meta: [{ title: "Logística — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./app.fornecedores-V4m87mZ3.mjs");
var Route$12 = createFileRoute("/app/fornecedores")({
	head: () => ({ meta: [{ title: "Fornecedores — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./app.fornecedor-novo-G5vPtrZI.mjs");
var Route$11 = createFileRoute("/app/fornecedor-novo")({
	head: () => ({ meta: [{ title: "Novo Fornecedor — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./app.fiscal-B_Nj5Nwa.mjs");
var Route$10 = createFileRoute("/app/fiscal")({
	head: () => ({ meta: [{ title: "Fiscal — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./app.financeiro-BTrgtRf8.mjs");
var Route$9 = createFileRoute("/app/financeiro")({
	head: () => ({ meta: [{ title: "Financeiro — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./app.estoque-BvRf3IzX.mjs");
var Route$8 = createFileRoute("/app/estoque")({
	head: () => ({ meta: [{ title: "Estoque — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./app.dav-DgeSHTzP.mjs");
var Route$7 = createFileRoute("/app/dav")({
	head: () => ({ meta: [{ title: "Orçamentos (DAV) — VIVAVERDE ERP" }] }),
	validateSearch: (search) => ({ id: search.id }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./app.dashboard-Cso7k5iU.mjs");
var Route$6 = createFileRoute("/app/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./app.configuracoes-BPMpHm8j.mjs");
var Route$5 = createFileRoute("/app/configuracoes")({
	head: () => ({ meta: [{ title: "Configurações — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./app.compras-QKMyneAq.mjs");
var Route$4 = createFileRoute("/app/compras")({
	head: () => ({ meta: [{ title: "Compras — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./app.compra-nova-CBx3Drvz.mjs");
var Route$3 = createFileRoute("/app/compra-nova")({
	head: () => ({ meta: [{ title: "Nova Compra — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./app.clientes-B4vpnTkV.mjs");
var Route$2 = createFileRoute("/app/clientes")({
	head: () => ({ meta: [{ title: "Clientes — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./app.cliente-novo-CSvEykSa.mjs");
var Route$1 = createFileRoute("/app/cliente-novo")({
	head: () => ({ meta: [{ title: "Novo Cliente — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./app.catalogo-Bsi9js9K.mjs");
var Route = createFileRoute("/app/catalogo")({
	head: () => ({ meta: [{ title: "Catálogo Digital — VIVAVERDE ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ParceiroRoute = Route$30.update({
	id: "/parceiro",
	path: "/parceiro",
	getParentRoute: () => Route$31
});
var CatalogoRoute = Route$29.update({
	id: "/catalogo",
	path: "/catalogo",
	getParentRoute: () => Route$31
});
var AppRoute = Route$28.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$31
});
var IndexRoute = Route$27.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$31
});
var AppIndexRoute = Route$26.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var ParceiroPdvRoute = Route$25.update({
	id: "/pdv",
	path: "/pdv",
	getParentRoute: () => ParceiroRoute
});
var ParceiroLoginRoute = Route$24.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => ParceiroRoute
});
var ParceiroDavRoute = Route$35.update({
	id: "/dav",
	path: "/dav",
	getParentRoute: () => ParceiroRoute
});
var ParceiroDashboardRoute = Route$23.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => ParceiroRoute
});
var ParceiroCadastroRoute = Route$22.update({
	id: "/cadastro",
	path: "/cadastro",
	getParentRoute: () => ParceiroRoute
});
var DeclaracaoIdRoute = Route$34.update({
	id: "/declaracao/$id",
	path: "/declaracao/$id",
	getParentRoute: () => Route$31
});
var AppVendedoresRoute = Route$21.update({
	id: "/vendedores",
	path: "/vendedores",
	getParentRoute: () => AppRoute
});
var AppVendasRoute = Route$20.update({
	id: "/vendas",
	path: "/vendas",
	getParentRoute: () => AppRoute
});
var AppVendaNovaRoute = Route$19.update({
	id: "/venda-nova",
	path: "/venda-nova",
	getParentRoute: () => AppRoute
});
var AppRelatoriosRoute = Route$18.update({
	id: "/relatorios",
	path: "/relatorios",
	getParentRoute: () => AppRoute
});
var AppRegistroRoute = Route$17.update({
	id: "/registro",
	path: "/registro",
	getParentRoute: () => AppRoute
});
var AppProdutosRoute = Route$16.update({
	id: "/produtos",
	path: "/produtos",
	getParentRoute: () => AppRoute
});
var AppProdutoNovoRoute = Route$33.update({
	id: "/produto-novo",
	path: "/produto-novo",
	getParentRoute: () => AppRoute
});
var AppPdvRoute = Route$15.update({
	id: "/pdv",
	path: "/pdv",
	getParentRoute: () => AppRoute
});
var AppNotificacoesRoute = Route$14.update({
	id: "/notificacoes",
	path: "/notificacoes",
	getParentRoute: () => AppRoute
});
var AppLogisticaRoute = Route$13.update({
	id: "/logistica",
	path: "/logistica",
	getParentRoute: () => AppRoute
});
var AppFornecedoresRoute = Route$12.update({
	id: "/fornecedores",
	path: "/fornecedores",
	getParentRoute: () => AppRoute
});
var AppFornecedorNovoRoute = Route$11.update({
	id: "/fornecedor-novo",
	path: "/fornecedor-novo",
	getParentRoute: () => AppRoute
});
var AppFiscalRoute = Route$10.update({
	id: "/fiscal",
	path: "/fiscal",
	getParentRoute: () => AppRoute
});
var AppFinanceiroRoute = Route$9.update({
	id: "/financeiro",
	path: "/financeiro",
	getParentRoute: () => AppRoute
});
var AppEstoqueRoute = Route$8.update({
	id: "/estoque",
	path: "/estoque",
	getParentRoute: () => AppRoute
});
var AppDavNovoRoute = Route$32.update({
	id: "/dav-novo",
	path: "/dav-novo",
	getParentRoute: () => AppRoute
});
var AppDavRoute = Route$7.update({
	id: "/dav",
	path: "/dav",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppConfiguracoesRoute = Route$5.update({
	id: "/configuracoes",
	path: "/configuracoes",
	getParentRoute: () => AppRoute
});
var AppComprasRoute = Route$4.update({
	id: "/compras",
	path: "/compras",
	getParentRoute: () => AppRoute
});
var AppCompraNovaRoute = Route$3.update({
	id: "/compra-nova",
	path: "/compra-nova",
	getParentRoute: () => AppRoute
});
var AppClientesRoute = Route$2.update({
	id: "/clientes",
	path: "/clientes",
	getParentRoute: () => AppRoute
});
var AppClienteNovoRoute = Route$1.update({
	id: "/cliente-novo",
	path: "/cliente-novo",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppCatalogoRoute: Route.update({
		id: "/catalogo",
		path: "/catalogo",
		getParentRoute: () => AppRoute
	}),
	AppClienteNovoRoute,
	AppClientesRoute,
	AppCompraNovaRoute,
	AppComprasRoute,
	AppConfiguracoesRoute,
	AppDashboardRoute,
	AppDavRoute,
	AppDavNovoRoute,
	AppEstoqueRoute,
	AppFinanceiroRoute,
	AppFiscalRoute,
	AppFornecedorNovoRoute,
	AppFornecedoresRoute,
	AppLogisticaRoute,
	AppNotificacoesRoute,
	AppPdvRoute,
	AppProdutoNovoRoute,
	AppProdutosRoute,
	AppRegistroRoute,
	AppRelatoriosRoute,
	AppVendaNovaRoute,
	AppVendasRoute,
	AppVendedoresRoute,
	AppIndexRoute
};
var AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
var ParceiroRouteChildren = {
	ParceiroCadastroRoute,
	ParceiroDashboardRoute,
	ParceiroDavRoute,
	ParceiroLoginRoute,
	ParceiroPdvRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRouteWithChildren,
	CatalogoRoute,
	ParceiroRoute: ParceiroRoute._addFileChildren(ParceiroRouteChildren),
	DeclaracaoIdRoute
};
var routeTree = Route$31._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
