import { i as __toESM, o as require_react } from "./react-dom-4oCbIcVr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dist-BtX_mcXH.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function usePrevious(value) {
	const ref = import_react.useRef({
		value,
		previous: value
	});
	return import_react.useMemo(() => {
		if (ref.current.value !== value) {
			ref.current.previous = ref.current.value;
			ref.current.value = value;
		}
		return ref.current.previous;
	}, [value]);
}
//#endregion
export { usePrevious as t };
