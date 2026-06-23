import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-DyNMUxMx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useComposedRefs, i as createSlot, r as composeRefs, t as Button } from "./button-DiE0A9q4.mjs";
import { a as dispatchDiscreteCustomEvent, i as createContextScope, n as Primitive, o as useControllableState, r as composeEventHandlers, t as Presence } from "./dist-C8Kt9iDR.mjs";
import { i as useCallbackRef, n as FocusScope, o as useFocusGuards, r as Portal$1, s as useId, t as DismissableLayer } from "./dist-BSGjNETk.mjs";
import { t as VivaverdeLogo } from "./vivaverde-logo-DWXAFaeL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Root2$1, i as Content, n as Arrow, o as createPopperScope, r as Badge, t as Anchor } from "./dist-Db34orMe.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as hideOthers, f as ReactRemoveScroll } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { A as Map$1, B as Globe, D as Moon, H as FileText, I as LayoutDashboard, N as LogOut, T as Package, _ as Search, _t as Bell, ct as ChevronRight, d as Sun, dt as Check, f as ShoppingCart, ft as CheckCheck, gt as Boxes, ht as Calculator, it as CirclePlus, k as Menu, m as Settings, n as Wallet, o as Truck, p as ShoppingBag, pt as ChartColumn, r as Users, rt as CircleUser, t as X, tt as Circle, ut as ChevronDown, y as Receipt } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-BDw82Ml2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function createCollection(name) {
	const PROVIDER_NAME = name + "CollectionProvider";
	const [createCollectionContext, createCollectionScope] = createContextScope(PROVIDER_NAME);
	const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	});
	const CollectionProvider = (props) => {
		const { scope, children } = props;
		const ref = import_react.useRef(null);
		const itemMap = import_react.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionProviderImpl, {
			scope,
			itemMap,
			collectionRef: ref,
			children
		});
	};
	CollectionProvider.displayName = PROVIDER_NAME;
	const COLLECTION_SLOT_NAME = name + "CollectionSlot";
	const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
	const CollectionSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionSlotImpl, {
			ref: useComposedRefs(forwardedRef, useCollectionContext(COLLECTION_SLOT_NAME, scope).collectionRef),
			children
		});
	});
	CollectionSlot.displayName = COLLECTION_SLOT_NAME;
	const ITEM_SLOT_NAME = name + "CollectionItemSlot";
	const ITEM_DATA_ATTR = "data-radix-collection-item";
	const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
	const CollectionItemSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children, ...itemData } = props;
		const ref = import_react.useRef(null);
		const composedRefs = useComposedRefs(forwardedRef, ref);
		const context = useCollectionContext(ITEM_SLOT_NAME, scope);
		import_react.useEffect(() => {
			context.itemMap.set(ref, {
				ref,
				...itemData
			});
			return () => void context.itemMap.delete(ref);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionItemSlotImpl, {
			[ITEM_DATA_ATTR]: "",
			ref: composedRefs,
			children
		});
	});
	CollectionItemSlot.displayName = ITEM_SLOT_NAME;
	function useCollection(scope) {
		const context = useCollectionContext(name + "CollectionConsumer", scope);
		return import_react.useCallback(() => {
			const collectionNode = context.collectionRef.current;
			if (!collectionNode) return [];
			const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
			return Array.from(context.itemMap.values()).sort((a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
		}, [context.collectionRef, context.itemMap]);
	}
	return [
		{
			Provider: CollectionProvider,
			Slot: CollectionSlot,
			ItemSlot: CollectionItemSlot
		},
		useCollection,
		createCollectionScope
	];
}
var DirectionContext = import_react.createContext(void 0);
function useDirection(localDir) {
	const globalDir = import_react.useContext(DirectionContext);
	return localDir || globalDir || "ltr";
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var GROUP_NAME$2 = "RovingFocusGroup";
var [Collection$1, useCollection$1, createCollectionScope$1] = createCollection(GROUP_NAME$2);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME$2, [createCollectionScope$1]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME$2);
var RovingFocusGroup = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.Provider, {
		scope: props.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.Slot, {
			scope: props.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, {
				...props,
				ref: forwardedRef
			})
		})
	});
});
RovingFocusGroup.displayName = GROUP_NAME$2;
var RovingFocusGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const direction = useDirection(dir);
	const [currentTabStopId, setCurrentTabStopId] = useControllableState({
		prop: currentTabStopIdProp,
		defaultProp: defaultCurrentTabStopId ?? null,
		onChange: onCurrentTabStopIdChange,
		caller: GROUP_NAME$2
	});
	const [isTabbingBackOut, setIsTabbingBackOut] = import_react.useState(false);
	const handleEntryFocus = useCallbackRef(onEntryFocus);
	const getItems = useCollection$1(__scopeRovingFocusGroup);
	const isClickFocusRef = import_react.useRef(false);
	const [focusableItemsCount, setFocusableItemsCount] = import_react.useState(0);
	import_react.useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
			return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
		}
	}, [handleEntryFocus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusProvider, {
		scope: __scopeRovingFocusGroup,
		orientation,
		dir: direction,
		loop,
		currentTabStopId,
		onItemFocus: import_react.useCallback((tabStopId) => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]),
		onItemShiftTab: import_react.useCallback(() => setIsTabbingBackOut(true), []),
		onFocusableItemAdd: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount + 1), []),
		onFocusableItemRemove: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount - 1), []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
			"data-orientation": orientation,
			...groupProps,
			ref: composedRefs,
			style: {
				outline: "none",
				...props.style
			},
			onMouseDown: composeEventHandlers(props.onMouseDown, () => {
				isClickFocusRef.current = true;
			}),
			onFocus: composeEventHandlers(props.onFocus, (event) => {
				const isKeyboardFocus = !isClickFocusRef.current;
				if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
					const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
					event.currentTarget.dispatchEvent(entryFocusEvent);
					if (!entryFocusEvent.defaultPrevented) {
						const items = getItems().filter((item) => item.focusable);
						focusFirst$1([
							items.find((item) => item.active),
							items.find((item) => item.id === currentTabStopId),
							...items
						].filter(Boolean).map((item) => item.ref.current), preventScrollOnEntryFocus);
					}
				}
				isClickFocusRef.current = false;
			}),
			onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
		})
	});
});
var ITEM_NAME$2 = "RovingFocusGroupItem";
var RovingFocusGroupItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
	const autoId = useId();
	const id = tabStopId || autoId;
	const context = useRovingFocusContext(ITEM_NAME$2, __scopeRovingFocusGroup);
	const isCurrentTabStop = context.currentTabStopId === id;
	const getItems = useCollection$1(__scopeRovingFocusGroup);
	const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
	import_react.useEffect(() => {
		if (focusable) {
			onFocusableItemAdd();
			return () => onFocusableItemRemove();
		}
	}, [
		focusable,
		onFocusableItemAdd,
		onFocusableItemRemove
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.ItemSlot, {
		scope: __scopeRovingFocusGroup,
		id,
		focusable,
		active,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			tabIndex: isCurrentTabStop ? 0 : -1,
			"data-orientation": context.orientation,
			...itemProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!focusable) event.preventDefault();
				else context.onItemFocus(id);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (event.key === "Tab" && event.shiftKey) {
					context.onItemShiftTab();
					return;
				}
				if (event.target !== event.currentTarget) return;
				const focusIntent = getFocusIntent(event, context.orientation, context.dir);
				if (focusIntent !== void 0) {
					if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
					event.preventDefault();
					let candidateNodes = getItems().filter((item) => item.focusable).map((item) => item.ref.current);
					if (focusIntent === "last") candidateNodes.reverse();
					else if (focusIntent === "prev" || focusIntent === "next") {
						if (focusIntent === "prev") candidateNodes.reverse();
						const currentIndex = candidateNodes.indexOf(event.currentTarget);
						candidateNodes = context.loop ? wrapArray$1(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
					}
					setTimeout(() => focusFirst$1(candidateNodes));
				}
			}),
			children: typeof children === "function" ? children({
				isCurrentTabStop,
				hasTabStop: currentTabStopId != null
			}) : children
		})
	});
});
RovingFocusGroupItem.displayName = ITEM_NAME$2;
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst$1(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray$1(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var SELECTION_KEYS = ["Enter", " "];
var FIRST_KEYS = [
	"ArrowDown",
	"PageUp",
	"Home"
];
var LAST_KEYS = [
	"ArrowUp",
	"PageDown",
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
	ltr: [...SELECTION_KEYS, "ArrowRight"],
	rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
};
var MENU_NAME = "Menu";
var [Collection, useCollection, createCollectionScope] = createCollection(MENU_NAME);
var [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
	createCollectionScope,
	createPopperScope,
	createRovingFocusGroupScope
]);
var usePopperScope = createPopperScope();
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
var Menu$1 = (props) => {
	const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
	const popperScope = usePopperScope(__scopeMenu);
	const [content, setContent] = import_react.useState(null);
	const isUsingKeyboardRef = import_react.useRef(false);
	const handleOpenChange = useCallbackRef(onOpenChange);
	const direction = useDirection(dir);
	import_react.useEffect(() => {
		const handleKeyDown = () => {
			isUsingKeyboardRef.current = true;
			document.addEventListener("pointerdown", handlePointer, {
				capture: true,
				once: true
			});
			document.addEventListener("pointermove", handlePointer, {
				capture: true,
				once: true
			});
		};
		const handlePointer = () => isUsingKeyboardRef.current = false;
		document.addEventListener("keydown", handleKeyDown, { capture: true });
		return () => {
			document.removeEventListener("keydown", handleKeyDown, { capture: true });
			document.removeEventListener("pointerdown", handlePointer, { capture: true });
			document.removeEventListener("pointermove", handlePointer, { capture: true });
		};
	}, []);
	import_react.useEffect(() => {
		if (!open) return;
		const handleBlur = () => handleOpenChange(false);
		window.addEventListener("blur", handleBlur);
		return () => window.removeEventListener("blur", handleBlur);
	}, [open, handleOpenChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuProvider, {
			scope: __scopeMenu,
			open,
			onOpenChange: handleOpenChange,
			content,
			onContentChange: setContent,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootProvider, {
				scope: __scopeMenu,
				onClose: import_react.useCallback(() => handleOpenChange(false), [handleOpenChange]),
				isUsingKeyboardRef,
				dir: direction,
				modal,
				children
			})
		})
	});
};
Menu$1.displayName = MENU_NAME;
var ANCHOR_NAME = "MenuAnchor";
var MenuAnchor = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...anchorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
		...usePopperScope(__scopeMenu),
		...anchorProps,
		ref: forwardedRef
	});
});
MenuAnchor.displayName = ANCHOR_NAME;
var PORTAL_NAME$1 = "MenuPortal";
var [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME$1, { forceMount: void 0 });
var MenuPortal = (props) => {
	const { __scopeMenu, forceMount, children, container } = props;
	const context = useMenuContext(PORTAL_NAME$1, __scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: __scopeMenu,
		forceMount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, {
				asChild: true,
				container,
				children
			})
		})
	});
};
MenuPortal.displayName = PORTAL_NAME$1;
var CONTENT_NAME$1 = "MenuContent";
var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME$1);
var MenuContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeMenu,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeMenu,
				children: rootContext.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContentModal, {
					...contentProps,
					ref: forwardedRef
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContentNonModal, {
					...contentProps,
					ref: forwardedRef
				})
			})
		})
	});
});
var MenuRootContentModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	import_react.useEffect(() => {
		const content = ref.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
		...props,
		ref: composedRefs,
		trapFocus: context.open,
		disableOutsidePointerEvents: context.open,
		disableOutsideScroll: true,
		onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault(), { checkForDefaultPrevented: false }),
		onDismiss: () => context.onOpenChange(false)
	});
});
var MenuRootContentNonModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		disableOutsideScroll: false,
		onDismiss: () => context.onOpenChange(false)
	});
});
var Slot = createSlot("MenuContent.ScrollLock");
var MenuContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, loop = false, trapFocus, onOpenAutoFocus, onCloseAutoFocus, disableOutsidePointerEvents, onEntryFocus, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, disableOutsideScroll, ...contentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, __scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, __scopeMenu);
	const popperScope = usePopperScope(__scopeMenu);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
	const getItems = useCollection(__scopeMenu);
	const [currentItemId, setCurrentItemId] = import_react.useState(null);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
	const timerRef = import_react.useRef(0);
	const searchRef = import_react.useRef("");
	const pointerGraceTimerRef = import_react.useRef(0);
	const pointerGraceIntentRef = import_react.useRef(null);
	const pointerDirRef = import_react.useRef("right");
	const lastPointerXRef = import_react.useRef(0);
	const ScrollLockWrapper = disableOutsideScroll ? ReactRemoveScroll : import_react.Fragment;
	const scrollLockWrapperProps = disableOutsideScroll ? {
		as: Slot,
		allowPinchZoom: true
	} : void 0;
	const handleTypeaheadSearch = (key) => {
		const search = searchRef.current + key;
		const items = getItems().filter((item) => !item.disabled);
		const currentItem = document.activeElement;
		const currentMatch = items.find((item) => item.ref.current === currentItem)?.textValue;
		const nextMatch = getNextMatch(items.map((item) => item.textValue), search, currentMatch);
		const newItem = items.find((item) => item.textValue === nextMatch)?.ref.current;
		(function updateSearch(value) {
			searchRef.current = value;
			window.clearTimeout(timerRef.current);
			if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
		})(search);
		if (newItem) setTimeout(() => newItem.focus());
	};
	import_react.useEffect(() => {
		return () => window.clearTimeout(timerRef.current);
	}, []);
	useFocusGuards();
	const isPointerMovingToSubmenu = import_react.useCallback((event) => {
		return pointerDirRef.current === pointerGraceIntentRef.current?.side && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentProvider, {
		scope: __scopeMenu,
		searchRef,
		onItemEnter: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) event.preventDefault();
		}, [isPointerMovingToSubmenu]),
		onItemLeave: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) return;
			contentRef.current?.focus();
			setCurrentItemId(null);
		}, [isPointerMovingToSubmenu]),
		onTriggerLeave: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) event.preventDefault();
		}, [isPointerMovingToSubmenu]),
		pointerGraceTimerRef,
		onPointerGraceIntentChange: import_react.useCallback((intent) => {
			pointerGraceIntentRef.current = intent;
		}, []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollLockWrapper, {
			...scrollLockWrapperProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
				asChild: true,
				trapped: trapFocus,
				onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
					event.preventDefault();
					contentRef.current?.focus({ preventScroll: true });
				}),
				onUnmountAutoFocus: onCloseAutoFocus,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
					asChild: true,
					disableOutsidePointerEvents,
					onEscapeKeyDown,
					onPointerDownOutside,
					onFocusOutside,
					onInteractOutside,
					onDismiss,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
						asChild: true,
						...rovingFocusGroupScope,
						dir: rootContext.dir,
						orientation: "vertical",
						loop,
						currentTabStopId: currentItemId,
						onCurrentTabStopIdChange: setCurrentItemId,
						onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
							if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
						}),
						preventScrollOnEntryFocus: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": getOpenState(context.open),
							"data-radix-menu-content": "",
							dir: rootContext.dir,
							...popperScope,
							...contentProps,
							ref: composedRefs,
							style: {
								outline: "none",
								...contentProps.style
							},
							onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
								const isKeyDownInside = event.target.closest("[data-radix-menu-content]") === event.currentTarget;
								const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
								const isCharacterKey = event.key.length === 1;
								if (isKeyDownInside) {
									if (event.key === "Tab") event.preventDefault();
									if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
								}
								const content = contentRef.current;
								if (event.target !== content) return;
								if (!FIRST_LAST_KEYS.includes(event.key)) return;
								event.preventDefault();
								const candidateNodes = getItems().filter((item) => !item.disabled).map((item) => item.ref.current);
								if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
								focusFirst(candidateNodes);
							}),
							onBlur: composeEventHandlers(props.onBlur, (event) => {
								if (!event.currentTarget.contains(event.target)) {
									window.clearTimeout(timerRef.current);
									searchRef.current = "";
								}
							}),
							onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
								const target = event.target;
								const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
								if (event.currentTarget.contains(target) && pointerXHasChanged) {
									pointerDirRef.current = event.clientX > lastPointerXRef.current ? "right" : "left";
									lastPointerXRef.current = event.clientX;
								}
							}))
						})
					})
				})
			})
		})
	});
});
MenuContent.displayName = CONTENT_NAME$1;
var GROUP_NAME$1 = "MenuGroup";
var MenuGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...groupProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		role: "group",
		...groupProps,
		ref: forwardedRef
	});
});
MenuGroup.displayName = GROUP_NAME$1;
var LABEL_NAME$1 = "MenuLabel";
var MenuLabel = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...labelProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...labelProps,
		ref: forwardedRef
	});
});
MenuLabel.displayName = LABEL_NAME$1;
var ITEM_NAME$1 = "MenuItem";
var ITEM_SELECT = "menu.itemSelect";
var MenuItem = import_react.forwardRef((props, forwardedRef) => {
	const { disabled = false, onSelect, ...itemProps } = props;
	const ref = import_react.useRef(null);
	const rootContext = useMenuRootContext(ITEM_NAME$1, props.__scopeMenu);
	const contentContext = useMenuContentContext(ITEM_NAME$1, props.__scopeMenu);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const isPointerDownRef = import_react.useRef(false);
	const handleSelect = () => {
		const menuItem = ref.current;
		if (!disabled && menuItem) {
			const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
				bubbles: true,
				cancelable: true
			});
			menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), { once: true });
			dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
			if (itemSelectEvent.defaultPrevented) isPointerDownRef.current = false;
			else rootContext.onClose();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemImpl, {
		...itemProps,
		ref: composedRefs,
		disabled,
		onClick: composeEventHandlers(props.onClick, handleSelect),
		onPointerDown: (event) => {
			props.onPointerDown?.(event);
			isPointerDownRef.current = true;
		},
		onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
			if (!isPointerDownRef.current) event.currentTarget?.click();
		}),
		onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
			const isTypingAhead = contentContext.searchRef.current !== "";
			if (disabled || isTypingAhead && event.key === " ") return;
			if (SELECTION_KEYS.includes(event.key)) {
				event.currentTarget.click();
				event.preventDefault();
			}
		})
	});
});
MenuItem.displayName = ITEM_NAME$1;
var MenuItemImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
	const contentContext = useMenuContentContext(ITEM_NAME$1, __scopeMenu);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const [isFocused, setIsFocused] = import_react.useState(false);
	const [textContent, setTextContent] = import_react.useState("");
	import_react.useEffect(() => {
		const menuItem = ref.current;
		if (menuItem) setTextContent((menuItem.textContent ?? "").trim());
	}, [itemProps.children]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeMenu,
		disabled,
		textValue: textValue ?? textContent,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
			asChild: true,
			...rovingFocusGroupScope,
			focusable: !disabled,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				role: "menuitem",
				"data-highlighted": isFocused ? "" : void 0,
				"aria-disabled": disabled || void 0,
				"data-disabled": disabled ? "" : void 0,
				...itemProps,
				ref: composedRefs,
				onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
					if (disabled) contentContext.onItemLeave(event);
					else {
						contentContext.onItemEnter(event);
						if (!event.defaultPrevented) event.currentTarget.focus({ preventScroll: true });
					}
				})),
				onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => contentContext.onItemLeave(event))),
				onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
				onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
			})
		})
	});
});
var CHECKBOX_ITEM_NAME$1 = "MenuCheckboxItem";
var MenuCheckboxItem = import_react.forwardRef((props, forwardedRef) => {
	const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicatorProvider, {
		scope: props.__scopeMenu,
		checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			role: "menuitemcheckbox",
			"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
			...checkboxItemProps,
			ref: forwardedRef,
			"data-state": getCheckedState(checked),
			onSelect: composeEventHandlers(checkboxItemProps.onSelect, () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked), { checkForDefaultPrevented: false })
		})
	});
});
MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME$1;
var RADIO_GROUP_NAME$1 = "MenuRadioGroup";
var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(RADIO_GROUP_NAME$1, {
	value: void 0,
	onValueChange: () => {}
});
var MenuRadioGroup = import_react.forwardRef((props, forwardedRef) => {
	const { value, onValueChange, ...groupProps } = props;
	const handleValueChange = useCallbackRef(onValueChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, {
		scope: props.__scopeMenu,
		value,
		onValueChange: handleValueChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroup, {
			...groupProps,
			ref: forwardedRef
		})
	});
});
MenuRadioGroup.displayName = RADIO_GROUP_NAME$1;
var RADIO_ITEM_NAME$1 = "MenuRadioItem";
var MenuRadioItem = import_react.forwardRef((props, forwardedRef) => {
	const { value, ...radioItemProps } = props;
	const context = useRadioGroupContext(RADIO_ITEM_NAME$1, props.__scopeMenu);
	const checked = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicatorProvider, {
		scope: props.__scopeMenu,
		checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			role: "menuitemradio",
			"aria-checked": checked,
			...radioItemProps,
			ref: forwardedRef,
			"data-state": getCheckedState(checked),
			onSelect: composeEventHandlers(radioItemProps.onSelect, () => context.onValueChange?.(value), { checkForDefaultPrevented: false })
		})
	});
});
MenuRadioItem.displayName = RADIO_ITEM_NAME$1;
var ITEM_INDICATOR_NAME = "MenuItemIndicator";
var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(ITEM_INDICATOR_NAME, { checked: false });
var MenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
	const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			...itemIndicatorProps,
			ref: forwardedRef,
			"data-state": getCheckedState(indicatorContext.checked)
		})
	});
});
MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SEPARATOR_NAME$1 = "MenuSeparator";
var MenuSeparator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...separatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...separatorProps,
		ref: forwardedRef
	});
});
MenuSeparator.displayName = SEPARATOR_NAME$1;
var ARROW_NAME$1 = "MenuArrow";
var MenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...arrowProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
		...usePopperScope(__scopeMenu),
		...arrowProps,
		ref: forwardedRef
	});
});
MenuArrow.displayName = ARROW_NAME$1;
var SUB_NAME = "MenuSub";
var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
var MenuSub = (props) => {
	const { __scopeMenu, children, open = false, onOpenChange } = props;
	const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
	const popperScope = usePopperScope(__scopeMenu);
	const [trigger, setTrigger] = import_react.useState(null);
	const [content, setContent] = import_react.useState(null);
	const handleOpenChange = useCallbackRef(onOpenChange);
	import_react.useEffect(() => {
		if (parentMenuContext.open === false) handleOpenChange(false);
		return () => handleOpenChange(false);
	}, [parentMenuContext.open, handleOpenChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuProvider, {
			scope: __scopeMenu,
			open,
			onOpenChange: handleOpenChange,
			content,
			onContentChange: setContent,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSubProvider, {
				scope: __scopeMenu,
				contentId: useId(),
				triggerId: useId(),
				trigger,
				onTriggerChange: setTrigger,
				children
			})
		})
	});
};
MenuSub.displayName = SUB_NAME;
var SUB_TRIGGER_NAME$1 = "MenuSubTrigger";
var MenuSubTrigger = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const subContext = useMenuSubContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const contentContext = useMenuContentContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const openTimerRef = import_react.useRef(null);
	const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
	const scope = { __scopeMenu: props.__scopeMenu };
	const clearOpenTimer = import_react.useCallback(() => {
		if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
		openTimerRef.current = null;
	}, []);
	import_react.useEffect(() => clearOpenTimer, [clearOpenTimer]);
	import_react.useEffect(() => {
		const pointerGraceTimer = pointerGraceTimerRef.current;
		return () => {
			window.clearTimeout(pointerGraceTimer);
			onPointerGraceIntentChange(null);
		};
	}, [pointerGraceTimerRef, onPointerGraceIntentChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuAnchor, {
		asChild: true,
		...scope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemImpl, {
			id: subContext.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": context.open,
			"aria-controls": context.open ? subContext.contentId : void 0,
			"data-state": getOpenState(context.open),
			...props,
			ref: composeRefs(forwardedRef, subContext.onTriggerChange),
			onClick: (event) => {
				props.onClick?.(event);
				if (props.disabled || event.defaultPrevented) return;
				event.currentTarget.focus();
				if (!context.open) context.onOpenChange(true);
			},
			onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
				contentContext.onItemEnter(event);
				if (event.defaultPrevented) return;
				if (!props.disabled && !context.open && !openTimerRef.current) {
					contentContext.onPointerGraceIntentChange(null);
					openTimerRef.current = window.setTimeout(() => {
						context.onOpenChange(true);
						clearOpenTimer();
					}, 100);
				}
			})),
			onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => {
				clearOpenTimer();
				const contentRect = context.content?.getBoundingClientRect();
				if (contentRect) {
					const side = context.content?.dataset.side;
					const rightSide = side === "right";
					const bleed = rightSide ? -5 : 5;
					const contentNearEdge = contentRect[rightSide ? "left" : "right"];
					const contentFarEdge = contentRect[rightSide ? "right" : "left"];
					contentContext.onPointerGraceIntentChange({
						area: [
							{
								x: event.clientX + bleed,
								y: event.clientY
							},
							{
								x: contentNearEdge,
								y: contentRect.top
							},
							{
								x: contentFarEdge,
								y: contentRect.top
							},
							{
								x: contentFarEdge,
								y: contentRect.bottom
							},
							{
								x: contentNearEdge,
								y: contentRect.bottom
							}
						],
						side
					});
					window.clearTimeout(pointerGraceTimerRef.current);
					pointerGraceTimerRef.current = window.setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
				} else {
					contentContext.onTriggerLeave(event);
					if (event.defaultPrevented) return;
					contentContext.onPointerGraceIntentChange(null);
				}
			})),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				const isTypingAhead = contentContext.searchRef.current !== "";
				if (props.disabled || isTypingAhead && event.key === " ") return;
				if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
					context.onOpenChange(true);
					context.content?.focus();
					event.preventDefault();
				}
			})
		})
	});
});
MenuSubTrigger.displayName = SUB_TRIGGER_NAME$1;
var SUB_CONTENT_NAME$1 = "MenuSubContent";
var MenuSubContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
	const { forceMount = portalContext.forceMount, align = "start", ...subContentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
	const subContext = useMenuSubContext(SUB_CONTENT_NAME$1, props.__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeMenu,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeMenu,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
					id: subContext.contentId,
					"aria-labelledby": subContext.triggerId,
					...subContentProps,
					ref: composedRefs,
					align,
					side: rootContext.dir === "rtl" ? "left" : "right",
					disableOutsidePointerEvents: false,
					disableOutsideScroll: false,
					trapFocus: false,
					onOpenAutoFocus: (event) => {
						if (rootContext.isUsingKeyboardRef.current) ref.current?.focus();
						event.preventDefault();
					},
					onCloseAutoFocus: (event) => event.preventDefault(),
					onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
						if (event.target !== subContext.trigger) context.onOpenChange(false);
					}),
					onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
						rootContext.onClose();
						event.preventDefault();
					}),
					onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
						const isKeyDownInside = event.currentTarget.contains(event.target);
						const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
						if (isKeyDownInside && isCloseKey) {
							context.onOpenChange(false);
							subContext.trigger?.focus();
							event.preventDefault();
						}
					})
				})
			})
		})
	});
});
MenuSubContent.displayName = SUB_CONTENT_NAME$1;
function getOpenState(open) {
	return open ? "open" : "closed";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getCheckedState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst(candidates) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus();
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
	if (normalizedSearch.length === 1) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const ii = polygon[i];
		const jj = polygon[j];
		const xi = ii.x;
		const yi = ii.y;
		const xj = jj.x;
		const yj = jj.y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function isPointerInGraceArea(event, area) {
	if (!area) return false;
	return isPointInPolygon({
		x: event.clientX,
		y: event.clientY
	}, area);
}
function whenMouse(handler) {
	return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
var Root3 = Menu$1;
var Anchor2 = MenuAnchor;
var Portal = MenuPortal;
var Content2$1 = MenuContent;
var Group = MenuGroup;
var Label = MenuLabel;
var Item2$1 = MenuItem;
var CheckboxItem = MenuCheckboxItem;
var RadioGroup = MenuRadioGroup;
var RadioItem = MenuRadioItem;
var ItemIndicator = MenuItemIndicator;
var Separator = MenuSeparator;
var Arrow2 = MenuArrow;
var SubTrigger = MenuSubTrigger;
var SubContent = MenuSubContent;
var DROPDOWN_MENU_NAME = "DropdownMenu";
var [createDropdownMenuContext, createDropdownMenuScope] = createContextScope(DROPDOWN_MENU_NAME, [createMenuScope]);
var useMenuScope = createMenuScope();
var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
var DropdownMenu$1 = (props) => {
	const { __scopeDropdownMenu, children, dir, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const triggerRef = import_react.useRef(null);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DROPDOWN_MENU_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuProvider, {
		scope: __scopeDropdownMenu,
		triggerId: useId(),
		triggerRef,
		contentId: useId(),
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, {
			...menuScope,
			open,
			onOpenChange: setOpen,
			dir,
			modal,
			children
		})
	});
};
DropdownMenu$1.displayName = DROPDOWN_MENU_NAME;
var TRIGGER_NAME = "DropdownMenuTrigger";
var DropdownMenuTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
	const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor2, {
		asChild: true,
		...useMenuScope(__scopeDropdownMenu),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			id: context.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": context.open,
			"aria-controls": context.open ? context.contentId : void 0,
			"data-state": context.open ? "open" : "closed",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			...triggerProps,
			ref: composeRefs(forwardedRef, context.triggerRef),
			onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) {
					context.onOpenToggle();
					if (!context.open) event.preventDefault();
				}
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (disabled) return;
				if (["Enter", " "].includes(event.key)) context.onOpenToggle();
				if (event.key === "ArrowDown") context.onOpenChange(true);
				if ([
					"Enter",
					" ",
					"ArrowDown"
				].includes(event.key)) event.preventDefault();
			})
		})
	});
});
DropdownMenuTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DropdownMenuPortal";
var DropdownMenuPortal = (props) => {
	const { __scopeDropdownMenu, ...portalProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...useMenuScope(__scopeDropdownMenu),
		...portalProps
	});
};
DropdownMenuPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "DropdownMenuContent";
var DropdownMenuContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...contentProps } = props;
	const context = useDropdownMenuContext(CONTENT_NAME, __scopeDropdownMenu);
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const hasInteractedOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		id: context.contentId,
		"aria-labelledby": context.triggerId,
		...menuScope,
		...contentProps,
		ref: forwardedRef,
		onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
			if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
			hasInteractedOutsideRef.current = false;
			event.preventDefault();
		}),
		onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
			if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
		}),
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuContent$1.displayName = CONTENT_NAME;
var GROUP_NAME = "DropdownMenuGroup";
var DropdownMenuGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...groupProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
		...useMenuScope(__scopeDropdownMenu),
		...groupProps,
		ref: forwardedRef
	});
});
DropdownMenuGroup.displayName = GROUP_NAME;
var LABEL_NAME = "DropdownMenuLabel";
var DropdownMenuLabel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...labelProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		...useMenuScope(__scopeDropdownMenu),
		...labelProps,
		ref: forwardedRef
	});
});
DropdownMenuLabel$1.displayName = LABEL_NAME;
var ITEM_NAME = "DropdownMenuItem";
var DropdownMenuItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2$1, {
		...useMenuScope(__scopeDropdownMenu),
		...itemProps,
		ref: forwardedRef
	});
});
DropdownMenuItem$1.displayName = ITEM_NAME;
var CHECKBOX_ITEM_NAME = "DropdownMenuCheckboxItem";
var DropdownMenuCheckboxItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...checkboxItemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxItem, {
		...useMenuScope(__scopeDropdownMenu),
		...checkboxItemProps,
		ref: forwardedRef
	});
});
DropdownMenuCheckboxItem$1.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "DropdownMenuRadioGroup";
var DropdownMenuRadioGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioGroupProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
		...useMenuScope(__scopeDropdownMenu),
		...radioGroupProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "DropdownMenuRadioItem";
var DropdownMenuRadioItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioItemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioItem, {
		...useMenuScope(__scopeDropdownMenu),
		...radioItemProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioItem$1.displayName = RADIO_ITEM_NAME;
var INDICATOR_NAME = "DropdownMenuItemIndicator";
var DropdownMenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, {
		...useMenuScope(__scopeDropdownMenu),
		...itemIndicatorProps,
		ref: forwardedRef
	});
});
DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
var SEPARATOR_NAME = "DropdownMenuSeparator";
var DropdownMenuSeparator$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...separatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		...useMenuScope(__scopeDropdownMenu),
		...separatorProps,
		ref: forwardedRef
	});
});
DropdownMenuSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "DropdownMenuArrow";
var DropdownMenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...arrowProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow2, {
		...useMenuScope(__scopeDropdownMenu),
		...arrowProps,
		ref: forwardedRef
	});
});
DropdownMenuArrow.displayName = ARROW_NAME;
var SUB_TRIGGER_NAME = "DropdownMenuSubTrigger";
var DropdownMenuSubTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subTriggerProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTrigger, {
		...useMenuScope(__scopeDropdownMenu),
		...subTriggerProps,
		ref: forwardedRef
	});
});
DropdownMenuSubTrigger$1.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "DropdownMenuSubContent";
var DropdownMenuSubContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subContentProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent, {
		...useMenuScope(__scopeDropdownMenu),
		...subContentProps,
		ref: forwardedRef,
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuSubContent$1.displayName = SUB_CONTENT_NAME;
var Root2 = DropdownMenu$1;
var Trigger = DropdownMenuTrigger$1;
var Portal2 = DropdownMenuPortal;
var Content2 = DropdownMenuContent$1;
var Label2 = DropdownMenuLabel$1;
var Item2 = DropdownMenuItem$1;
var CheckboxItem2 = DropdownMenuCheckboxItem$1;
var RadioItem2 = DropdownMenuRadioItem$1;
var ItemIndicator2 = DropdownMenuItemIndicator;
var Separator2 = DropdownMenuSeparator$1;
var SubTrigger2 = DropdownMenuSubTrigger$1;
var SubContent2 = DropdownMenuSubContent$1;
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var NAV = [
	{
		group: "Principal",
		items: [{
			to: "/app/dashboard",
			label: "Dashboard",
			icon: LayoutDashboard
		}, {
			to: "/app/registro",
			label: "Registro Rápido",
			icon: CirclePlus
		}]
	},
	{
		group: "Operação",
		items: [
			{
				to: "/app/estoque",
				label: "Estoque",
				icon: Boxes
			},
			{
				to: "/app/produtos",
				label: "Produtos",
				icon: Package
			},
			{
				to: "/app/clientes",
				label: "Clientes",
				icon: Users
			},
			{
				to: "/app/fornecedores",
				label: "Fornecedores",
				icon: Truck
			}
		]
	},
	{
		group: "Comercial",
		items: [
			{
				to: "/app/compras",
				label: "Compras",
				icon: ShoppingBag
			},
			{
				to: "/app/vendas",
				label: "Vendas",
				icon: ShoppingCart
			},
			{
				to: "/app/dav",
				label: "DAV",
				icon: FileText
			},
			{
				to: "/app/pdv",
				label: "PDV",
				icon: Calculator
			},
			{
				to: "/app/vendedores",
				label: "Vendedores",
				icon: Users
			}
		]
	},
	{
		group: "Gestão",
		items: [
			{
				to: "/app/financeiro",
				label: "Financeiro",
				icon: Wallet
			},
			{
				to: "/app/logistica",
				label: "Logística",
				icon: Map$1
			},
			{
				to: "/app/fiscal",
				label: "Fiscal",
				icon: Receipt
			},
			{
				to: "/app/relatorios",
				label: "Relatórios",
				icon: ChartColumn
			}
		]
	},
	{
		group: "Canais",
		items: [{
			to: "/app/catalogo",
			label: "Catálogo Digital",
			icon: Globe
		}, {
			to: "/app/configuracoes",
			label: "Configurações",
			icon: Settings
		}]
	}
];
function AppShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [dark, setDark] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const fetchNotifications = async () => {
		try {
			const { data } = await supabase.from("notificacoes").select("*").order("created_at", { ascending: false }).limit(20);
			if (data) setNotifications(data);
		} catch (e) {
			console.error(e);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchNotifications();
		const channel = supabase.channel("schema-db-changes").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "notificacoes"
		}, () => {
			fetchNotifications();
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, []);
	const markAllAsRead = async () => {
		await supabase.from("notificacoes").update({ lida: true }).eq("lida", false);
		fetchNotifications();
	};
	const markAsRead = async (id) => {
		await supabase.from("notificacoes").update({ lida: true }).eq("id", id);
		fetchNotifications();
	};
	const unreadCount = notifications.filter((n) => !n.lida).length;
	const toggleDark = () => {
		setDark(!dark);
		document.documentElement.classList.toggle("dark");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 h-screen hidden md:flex print:hidden w-64 shrink-0 flex-col bg-gradient-sidebar text-sidebar-foreground border-r border-sidebar-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-5 border-b border-sidebar-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VivaverdeLogo, { size: "small" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 overflow-y-auto px-3 py-4 space-y-5",
						children: NAV.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50",
							children: g.group
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-0.5",
							children: g.items.map((it) => {
								const active = pathname === it.to;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: it.to,
									className: cn("group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: it.label
									})]
								}) }, it.to);
							})
						})] }, g.group))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 border-t border-sidebar-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-lg bg-sidebar-accent/40 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 shrink-0 rounded-full bg-gradient-brand grid place-items-center text-sm font-bold text-primary-foreground",
								children: "DA"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold truncate",
									children: "Douglas Almeida"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-sidebar-foreground/60 truncate",
									children: "Administrador"
								})]
							})]
						})
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/50",
					onClick: () => setOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "absolute left-0 top-0 h-full w-72 bg-gradient-sidebar text-sidebar-foreground p-4 overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VivaverdeLogo, { size: "small" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "text-sidebar-foreground",
							onClick: () => setOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), NAV.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50",
							children: g.group
						}), g.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: it.to,
							onClick: () => setOpen(false),
							className: cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm", pathname === it.to ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-4 w-4" }),
								" ",
								it.label
							]
						}, it.to))]
					}, g.group))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6 print:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "md:hidden",
							onClick: () => setOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative hidden md:block flex-1 max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Buscar produtos, clientes, pedidos…",
								className: "pl-9 bg-secondary/50 border-transparent focus-visible:bg-card"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 md:hidden" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: toggleDark,
							children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "icon",
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "absolute -right-0.5 -top-0.5 h-4 w-4 p-0 grid place-items-center text-[10px] bg-destructive text-destructive-foreground",
									children: unreadCount
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							className: "w-80 p-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between px-4 py-3 border-b",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-sm",
										children: "Notificações"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											className: "text-xs bg-brand/10 text-brand border-0",
											children: [unreadCount, " novas"]
										}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "h-6 w-6 text-muted-foreground hover:text-brand",
											onClick: markAllAsRead,
											title: "Marcar todas como lida",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4" })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-h-[300px] overflow-y-auto",
									children: notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-4 text-center text-sm text-muted-foreground",
										children: "Nenhuma notificação."
									}) : notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										onClick: () => !n.lida && markAsRead(n.id),
										className: cn("px-4 py-3 border-b cursor-pointer transition-colors", n.lida ? "bg-background hover:bg-muted/50" : "bg-brand/5 hover:bg-brand/10"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-start mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("text-sm", n.lida ? "font-medium text-muted-foreground" : "font-bold text-foreground"),
												children: n.titulo
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground whitespace-nowrap ml-2",
												children: new Date(n.created_at).toLocaleDateString()
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: n.mensagem
										})]
									}, n.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 border-t text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/app/notificacoes",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											className: "w-full text-xs text-brand hover:text-brand/80 h-8",
											children: "Ver todas as notificações"
										})
									})
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-secondary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-8 w-8 rounded-full bg-gradient-brand grid place-items-center text-xs font-bold text-primary-foreground",
										children: "DA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline text-sm font-medium",
										children: "Douglas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 text-muted-foreground" })
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							className: "w-56",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Minha Conta" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/app/configuracoes",
										className: "cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, { className: "mr-2 h-4 w-4" }), "Perfil"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/app/configuracoes",
										className: "cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "mr-2 h-4 w-4" }), "Configurações"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 h-4 w-4" }), "Sair"]
									})
								})
							]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-4 md:p-6 lg:p-8 print:p-0",
					children
				})]
			})
		]
	});
}
function PageHeader({ title, subtitle, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between print:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "truncate font-display text-2xl font-bold sm:text-3xl",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: subtitle
			})]
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 items-center gap-2",
			children: actions
		})]
	});
}
//#endregion
export { createCollection as a, Root as i, Item as n, createRovingFocusGroupScope as o, PageHeader as r, useDirection as s, AppShell as t };
