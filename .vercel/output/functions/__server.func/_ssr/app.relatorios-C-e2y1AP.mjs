import { a as require_jsx_runtime, i as __toESM, o as require_react } from "./react-dom-4oCbIcVr.mjs";
import { t as createLucideIcon } from "./createLucideIcon-DpFEVfIr.mjs";
import { i as supabase } from "./supabase-e8TdIE0G.mjs";
import { t as clsx } from "./utils-BgyBagvU.mjs";
import { t as Button } from "./button-DCabknOD.mjs";
import { a as Package } from "./dist-De42YJC_.mjs";
import { h as Users, r as ChartColumn, s as FileText, u as PageHeader } from "./app-shell-DXEQSuIT.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-Xhfpy7_x.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BjSIm1Ay.mjs";
import { t as DollarSign } from "./dollar-sign-1G9v5L3A.mjs";
import { A as hasClipDot, B as require_isEqual, G as uniqueId, S as formatAxisMap, T as getCateCoordinateOfLine, U as require_isNil, V as require_isFunction, _ as YAxis, a as Curve, b as filterProps, c as Global, d as Layer, f as ResponsiveContainer, g as XAxis, h as Tooltip, j as interpolateNumber$1, k as getValueByDataKey, n as BarChart, o as Dot, r as CartesianGrid, s as ErrorBar, t as Bar, u as LabelList, w as generateCategoricalChart, x as findAllByType, y as es6_default } from "./BarChart-5K7nuy9y.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CqNUCdRi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DthofAbc.mjs";
import { n as toast } from "./dist-WJ01chjq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.relatorios-C-e2y1AP.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Download = createLucideIcon("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileSpreadsheet = createLucideIcon("file-spreadsheet", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M8 13h2",
		key: "yr2amv"
	}],
	["path", {
		d: "M14 13h2",
		key: "un5t4a"
	}],
	["path", {
		d: "M8 17h2",
		key: "2yhykz"
	}],
	["path", {
		d: "M14 17h2",
		key: "10kma7"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_isFunction = /* @__PURE__ */ __toESM(require_isFunction());
var import_isNil = /* @__PURE__ */ __toESM(require_isNil());
var import_isEqual = /* @__PURE__ */ __toESM(require_isEqual());
var _excluded = [
	"type",
	"layout",
	"connectNulls",
	"ref"
], _excluded2 = ["key"];
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _toConsumableArray(arr) {
	return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	}
}
function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var Line = /*#__PURE__*/ function(_PureComponent) {
	function Line() {
		var _this;
		_classCallCheck(this, Line);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _callSuper(this, Line, [].concat(args));
		_defineProperty(_this, "state", {
			isAnimationFinished: true,
			totalLength: 0
		});
		_defineProperty(_this, "generateSimpleStrokeDasharray", function(totalLength, length) {
			return "".concat(length, "px ").concat(totalLength - length, "px");
		});
		_defineProperty(_this, "getStrokeDasharray", function(length, totalLength, lines) {
			var lineLength = lines.reduce(function(pre, next) {
				return pre + next;
			});
			if (!lineLength) return _this.generateSimpleStrokeDasharray(totalLength, length);
			var count = Math.floor(length / lineLength);
			var remainLength = length % lineLength;
			var restLength = totalLength - length;
			var remainLines = [];
			for (var i = 0, sum = 0; i < lines.length; sum += lines[i], ++i) if (sum + lines[i] > remainLength) {
				remainLines = [].concat(_toConsumableArray(lines.slice(0, i)), [remainLength - sum]);
				break;
			}
			var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
			return [].concat(_toConsumableArray(Line.repeat(lines, count)), _toConsumableArray(remainLines), emptyLines).map(function(line) {
				return "".concat(line, "px");
			}).join(", ");
		});
		_defineProperty(_this, "id", uniqueId("recharts-line-"));
		_defineProperty(_this, "pathRef", function(node) {
			_this.mainCurve = node;
		});
		_defineProperty(_this, "handleAnimationEnd", function() {
			_this.setState({ isAnimationFinished: true });
			if (_this.props.onAnimationEnd) _this.props.onAnimationEnd();
		});
		_defineProperty(_this, "handleAnimationStart", function() {
			_this.setState({ isAnimationFinished: false });
			if (_this.props.onAnimationStart) _this.props.onAnimationStart();
		});
		return _this;
	}
	_inherits(Line, _PureComponent);
	return _createClass(Line, [
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				if (!this.props.isAnimationActive) return;
				var totalLength = this.getTotalLength();
				this.setState({ totalLength });
			}
		},
		{
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				if (!this.props.isAnimationActive) return;
				var totalLength = this.getTotalLength();
				if (totalLength !== this.state.totalLength) this.setState({ totalLength });
			}
		},
		{
			key: "getTotalLength",
			value: function getTotalLength() {
				var curveDom = this.mainCurve;
				try {
					return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || 0;
				} catch (err) {
					return 0;
				}
			}
		},
		{
			key: "renderErrorBar",
			value: function renderErrorBar(needClip, clipPathId) {
				if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
				var _this$props = this.props, points = _this$props.points, xAxis = _this$props.xAxis, yAxis = _this$props.yAxis, layout = _this$props.layout, children = _this$props.children;
				var errorBarItems = findAllByType(children, ErrorBar);
				if (!errorBarItems) return null;
				var dataPointFormatter = function dataPointFormatter(dataPoint, dataKey) {
					return {
						x: dataPoint.x,
						y: dataPoint.y,
						value: dataPoint.value,
						errorVal: getValueByDataKey(dataPoint.payload, dataKey)
					};
				};
				var errorBarProps = { clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null };
				return /*#__PURE__*/ import_react.createElement(Layer, errorBarProps, errorBarItems.map(function(item) {
					return /*#__PURE__*/ import_react.cloneElement(item, {
						key: "bar-".concat(item.props.dataKey),
						data: points,
						xAxis,
						yAxis,
						layout,
						dataPointFormatter
					});
				}));
			}
		},
		{
			key: "renderDots",
			value: function renderDots(needClip, clipDot, clipPathId) {
				if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
				var _this$props2 = this.props, dot = _this$props2.dot, points = _this$props2.points, dataKey = _this$props2.dataKey;
				var lineProps = filterProps(this.props, false);
				var customDotProps = filterProps(dot, true);
				var dots = points.map(function(entry, i) {
					var dotProps = _objectSpread(_objectSpread(_objectSpread({
						key: "dot-".concat(i),
						r: 3
					}, lineProps), customDotProps), {}, {
						index: i,
						cx: entry.x,
						cy: entry.y,
						value: entry.value,
						dataKey,
						payload: entry.payload,
						points
					});
					return Line.renderDotItem(dot, dotProps);
				});
				var dotsProps = { clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null };
				return /*#__PURE__*/ import_react.createElement(Layer, _extends({
					className: "recharts-line-dots",
					key: "dots"
				}, dotsProps), dots);
			}
		},
		{
			key: "renderCurveStatically",
			value: function renderCurveStatically(points, needClip, clipPathId, props) {
				var _this$props3 = this.props, type = _this$props3.type, layout = _this$props3.layout, connectNulls = _this$props3.connectNulls;
				_this$props3.ref;
				var curveProps = _objectSpread(_objectSpread(_objectSpread({}, filterProps(_objectWithoutProperties(_this$props3, _excluded), true)), {}, {
					fill: "none",
					className: "recharts-line-curve",
					clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null,
					points
				}, props), {}, {
					type,
					layout,
					connectNulls
				});
				return /*#__PURE__*/ import_react.createElement(Curve, _extends({}, curveProps, { pathRef: this.pathRef }));
			}
		},
		{
			key: "renderCurveWithAnimation",
			value: function renderCurveWithAnimation(needClip, clipPathId) {
				var _this2 = this;
				var _this$props4 = this.props, points = _this$props4.points, strokeDasharray = _this$props4.strokeDasharray, isAnimationActive = _this$props4.isAnimationActive, animationBegin = _this$props4.animationBegin, animationDuration = _this$props4.animationDuration, animationEasing = _this$props4.animationEasing, animationId = _this$props4.animationId, animateNewValues = _this$props4.animateNewValues, width = _this$props4.width, height = _this$props4.height;
				var _this$state = this.state, prevPoints = _this$state.prevPoints, totalLength = _this$state.totalLength;
				return /*#__PURE__*/ import_react.createElement(es6_default, {
					begin: animationBegin,
					duration: animationDuration,
					isActive: isAnimationActive,
					easing: animationEasing,
					from: { t: 0 },
					to: { t: 1 },
					key: "line-".concat(animationId),
					onAnimationEnd: this.handleAnimationEnd,
					onAnimationStart: this.handleAnimationStart
				}, function(_ref) {
					var t = _ref.t;
					if (prevPoints) {
						var prevPointsDiffFactor = prevPoints.length / points.length;
						var stepData = points.map(function(entry, index) {
							var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
							if (prevPoints[prevPointIndex]) {
								var prev = prevPoints[prevPointIndex];
								var interpolatorX = interpolateNumber$1(prev.x, entry.x);
								var interpolatorY = interpolateNumber$1(prev.y, entry.y);
								return _objectSpread(_objectSpread({}, entry), {}, {
									x: interpolatorX(t),
									y: interpolatorY(t)
								});
							}
							if (animateNewValues) {
								var _interpolatorX = interpolateNumber$1(width * 2, entry.x);
								var _interpolatorY = interpolateNumber$1(height / 2, entry.y);
								return _objectSpread(_objectSpread({}, entry), {}, {
									x: _interpolatorX(t),
									y: _interpolatorY(t)
								});
							}
							return _objectSpread(_objectSpread({}, entry), {}, {
								x: entry.x,
								y: entry.y
							});
						});
						return _this2.renderCurveStatically(stepData, needClip, clipPathId);
					}
					var curLength = interpolateNumber$1(0, totalLength)(t);
					var currentStrokeDasharray;
					if (strokeDasharray) {
						var lines = "".concat(strokeDasharray).split(/[,\s]+/gim).map(function(num) {
							return parseFloat(num);
						});
						currentStrokeDasharray = _this2.getStrokeDasharray(curLength, totalLength, lines);
					} else currentStrokeDasharray = _this2.generateSimpleStrokeDasharray(totalLength, curLength);
					return _this2.renderCurveStatically(points, needClip, clipPathId, { strokeDasharray: currentStrokeDasharray });
				});
			}
		},
		{
			key: "renderCurve",
			value: function renderCurve(needClip, clipPathId) {
				var _this$props5 = this.props, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
				var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, totalLength = _this$state2.totalLength;
				if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !(0, import_isEqual.default)(prevPoints, points))) return this.renderCurveWithAnimation(needClip, clipPathId);
				return this.renderCurveStatically(points, needClip, clipPathId);
			}
		},
		{
			key: "render",
			value: function render() {
				var _filterProps;
				var _this$props6 = this.props, hide = _this$props6.hide, dot = _this$props6.dot, points = _this$props6.points, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, top = _this$props6.top, left = _this$props6.left, width = _this$props6.width, height = _this$props6.height, isAnimationActive = _this$props6.isAnimationActive, id = _this$props6.id;
				if (hide || !points || !points.length) return null;
				var isAnimationFinished = this.state.isAnimationFinished;
				var hasSinglePoint = points.length === 1;
				var layerClass = clsx("recharts-line", className);
				var needClipX = xAxis && xAxis.allowDataOverflow;
				var needClipY = yAxis && yAxis.allowDataOverflow;
				var needClip = needClipX || needClipY;
				var clipPathId = (0, import_isNil.default)(id) ? this.id : id;
				var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
					r: 3,
					strokeWidth: 2
				}, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
				var _ref3$clipDot = (hasClipDot(dot) ? dot : {}).clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
				var dotSize = r * 2 + strokeWidth;
				return /*#__PURE__*/ import_react.createElement(Layer, { className: layerClass }, needClipX || needClipY ? /*#__PURE__*/ import_react.createElement("defs", null, /*#__PURE__*/ import_react.createElement("clipPath", { id: "clipPath-".concat(clipPathId) }, /*#__PURE__*/ import_react.createElement("rect", {
					x: needClipX ? left : left - width / 2,
					y: needClipY ? top : top - height / 2,
					width: needClipX ? width : width * 2,
					height: needClipY ? height : height * 2
				})), !clipDot && /*#__PURE__*/ import_react.createElement("clipPath", { id: "clipPath-dots-".concat(clipPathId) }, /*#__PURE__*/ import_react.createElement("rect", {
					x: left - dotSize / 2,
					y: top - dotSize / 2,
					width: width + dotSize,
					height: height + dotSize
				}))) : null, !hasSinglePoint && this.renderCurve(needClip, clipPathId), this.renderErrorBar(needClip, clipPathId), (hasSinglePoint || dot) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
			}
		}
	], [
		{
			key: "getDerivedStateFromProps",
			value: function getDerivedStateFromProps(nextProps, prevState) {
				if (nextProps.animationId !== prevState.prevAnimationId) return {
					prevAnimationId: nextProps.animationId,
					curPoints: nextProps.points,
					prevPoints: prevState.curPoints
				};
				if (nextProps.points !== prevState.curPoints) return { curPoints: nextProps.points };
				return null;
			}
		},
		{
			key: "repeat",
			value: function repeat(lines, count) {
				var linesUnit = lines.length % 2 !== 0 ? [].concat(_toConsumableArray(lines), [0]) : lines;
				var result = [];
				for (var i = 0; i < count; ++i) result = [].concat(_toConsumableArray(result), _toConsumableArray(linesUnit));
				return result;
			}
		},
		{
			key: "renderDotItem",
			value: function renderDotItem(option, props) {
				var dotItem;
				if (/*#__PURE__*/ import_react.isValidElement(option)) dotItem = /*#__PURE__*/ import_react.cloneElement(option, props);
				else if ((0, import_isFunction.default)(option)) dotItem = option(props);
				else {
					var key = props.key, dotProps = _objectWithoutProperties(props, _excluded2);
					var className = clsx("recharts-line-dot", typeof option !== "boolean" ? option.className : "");
					dotItem = /*#__PURE__*/ import_react.createElement(Dot, _extends({ key }, dotProps, { className }));
				}
				return dotItem;
			}
		}
	]);
}(import_react.PureComponent);
_defineProperty(Line, "displayName", "Line");
_defineProperty(Line, "defaultProps", {
	xAxisId: 0,
	yAxisId: 0,
	connectNulls: false,
	activeDot: true,
	dot: true,
	legendType: "line",
	stroke: "#3182bd",
	strokeWidth: 1,
	fill: "#fff",
	points: [],
	isAnimationActive: !Global.isSsr,
	animateNewValues: true,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	hide: false,
	label: false
});
/**
* Compose the data of each group
* @param {Object} props The props from the component
* @param  {Object} xAxis   The configuration of x-axis
* @param  {Object} yAxis   The configuration of y-axis
* @param  {String} dataKey The unique key of a group
* @return {Array}  Composed data
*/
_defineProperty(Line, "getComposedData", function(_ref4) {
	var props = _ref4.props, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, dataKey = _ref4.dataKey, bandSize = _ref4.bandSize, displayedData = _ref4.displayedData, offset = _ref4.offset;
	var layout = props.layout;
	return _objectSpread({
		points: displayedData.map(function(entry, index) {
			var value = getValueByDataKey(entry, dataKey);
			if (layout === "horizontal") return {
				x: getCateCoordinateOfLine({
					axis: xAxis,
					ticks: xAxisTicks,
					bandSize,
					entry,
					index
				}),
				y: (0, import_isNil.default)(value) ? null : yAxis.scale(value),
				value,
				payload: entry
			};
			return {
				x: (0, import_isNil.default)(value) ? null : xAxis.scale(value),
				y: getCateCoordinateOfLine({
					axis: yAxis,
					ticks: yAxisTicks,
					bandSize,
					entry,
					index
				}),
				value,
				payload: entry
			};
		}),
		layout
	}, offset);
});
/**
* @fileOverview Line Chart
*/
var LineChart = generateCategoricalChart({
	chartName: "LineChart",
	GraphicalChild: Line,
	axisComponents: [{
		axisType: "xAxis",
		AxisComp: XAxis
	}, {
		axisType: "yAxis",
		AxisComp: YAxis
	}],
	formatAxisMap
});
var import_jsx_runtime = require_jsx_runtime();
function Relatorios() {
	const [vendas, setVendas] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedReport, setSelectedReport] = (0, import_react.useState)(null);
	const [periodo, setPeriodo] = (0, import_react.useState)("6m");
	(0, import_react.useEffect)(() => {
		async function fetchVendas() {
			const { data } = await supabase.from("vendas").select("*").in("tipo", ["VENDA", "PDV"]);
			if (data) setVendas(data);
			setLoading(false);
		}
		fetchVendas();
	}, []);
	const totalFaturamento = vendas.reduce((acc, v) => acc + Number(v.valor_total), 0);
	const totalPedidos = vendas.length;
	const ticketMedio = totalPedidos > 0 ? totalFaturamento / totalPedidos : 0;
	const getChartData = () => {
		const dataFiltrada = [...vendas];
		const hoje = /* @__PURE__ */ new Date();
		let dataLimite = /* @__PURE__ */ new Date();
		if (periodo === "7d") dataLimite.setDate(hoje.getDate() - 7);
		else if (periodo === "30d") dataLimite.setDate(hoje.getDate() - 30);
		else if (periodo === "6m") dataLimite.setMonth(hoje.getMonth() - 6);
		else if (periodo === "1y") dataLimite.setFullYear(hoje.getFullYear() - 1);
		const filtradas = dataFiltrada.filter((v) => new Date(v.created_at) >= dataLimite);
		if (periodo === "7d" || periodo === "30d") {
			const grouped = {};
			filtradas.forEach((v) => {
				const dateStr = new Date(v.created_at).toLocaleDateString("pt-BR", {
					day: "2-digit",
					month: "2-digit"
				});
				grouped[dateStr] = (grouped[dateStr] || 0) + Number(v.valor_total || 0);
			});
			return Object.entries(grouped).map(([m, v]) => ({
				m,
				v: v * 1e3
			})).sort((a, b) => a.m.localeCompare(b.m));
		} else {
			const grouped = {};
			filtradas.forEach((v) => {
				const d = new Date(v.created_at);
				d.toLocaleDateString("pt-BR", {
					month: "short",
					year: "2-digit"
				});
				const sortKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
				if (!grouped[sortKey]) grouped[sortKey] = 0;
				grouped[sortKey] += Number(v.valor_total || 0);
			});
			return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => {
				const [yy, mm] = k.split("-");
				return {
					m: new Date(Number(yy), Number(mm) - 1, 1).toLocaleDateString("pt-BR", { month: "short" }),
					v: v * 1e3
				};
			});
		}
	};
	let chartData = getChartData();
	if (chartData.length === 0) chartData = [{
		m: "Sem dados",
		v: 0
	}];
	else chartData = chartData.map((d) => ({
		m: d.m,
		v: d.v / 1e3
	}));
	const getChartDescription = () => {
		switch (periodo) {
			case "7d": return "Últimos 7 dias";
			case "30d": return "Últimos 30 dias";
			case "1y": return "Acumulado do ano";
			default: return "Últimos 6 meses";
		}
	};
	const reports = [
		{
			i: DollarSign,
			t: "Relatório de Vendas",
			d: "Faturamento, ticket médio, comissões"
		},
		{
			i: ChartColumn,
			t: "Relatório Financeiro",
			d: "DRE, fluxo de caixa, inadimplência"
		},
		{
			i: Package,
			t: "Relatório de Estoque",
			d: "Posição, giro, curva ABC"
		},
		{
			i: Users,
			t: "Relatório de Clientes",
			d: "Ativação, recompra, ranking"
		},
		{
			i: FileSpreadsheet,
			t: "Relatório de Produtos",
			d: "Mais vendidos, rentabilidade"
		},
		{
			i: FileText,
			t: "Relatório Fiscal",
			d: "Apuração ICMS, PIS, COFINS"
		}
	];
	const handleVisualizar = (titulo) => {
		setSelectedReport(titulo);
	};
	const handlePDF = (titulo) => {
		toast.success(`PDF Gerado!`, { description: `O ${titulo} está pronto para impressão/salvamento.` });
		setTimeout(() => {
			window.print();
		}, 800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Relatórios",
			subtitle: "Visões executivas e operacionais em tempo real",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-[180px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: periodo,
					onValueChange: setPeriodo,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "bg-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Período" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "7d",
							children: "Últimos 7 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "30d",
							children: "Últimos 30 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "6m",
							children: "Últimos 6 meses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "1y",
							children: "Este ano"
						})
					] })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-3 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground font-semibold uppercase tracking-wider",
							children: "Faturamento (Hoje)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-3xl font-bold text-success",
							children: ["R$ ", totalFaturamento.toFixed(2)]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground font-semibold uppercase tracking-wider",
							children: "Total de Pedidos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl font-bold text-primary",
							children: totalPedidos
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground font-semibold uppercase tracking-wider",
							children: "Ticket Médio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-3xl font-bold text-info",
							children: ["R$ ", ticketMedio.toFixed(2)]
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Faturamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: getChartDescription() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: chartData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#e2e8f0",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "m",
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false,
								tickFormatter: (v) => `R$${v / 1e3}k`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: { borderRadius: 12 },
								formatter: (value) => [`R$ ${value}`, "Faturamento"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "v",
								stroke: "#166534",
								strokeWidth: 3,
								dot: {
									fill: "#166534",
									r: 5
								}
							})
						]
					})
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Volume de Pedidos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Tendência de crescimento" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chartData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#e2e8f0",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "m",
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "#64748b",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: false,
								contentStyle: { borderRadius: 12 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "v",
								fill: "#22C55E",
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				}) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
			children: reports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card hover:shadow-elevated transition-shadow cursor-pointer group",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-primary-foreground group-hover:scale-110 transition-transform",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.i, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-lg font-bold",
							children: r.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: r.d
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => handleVisualizar(r.t),
								variant: "outline",
								size: "sm",
								children: "Visualizar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => handlePDF(r.t),
								variant: "ghost",
								size: "sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-3.5 w-3.5" }), "PDF"]
							})]
						})
					]
				})
			}, r.t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!selectedReport,
			onOpenChange: (open) => !open && setSelectedReport(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-4xl max-h-[85vh] overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: selectedReport }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Demonstrativo detalhado gerado em tempo real com dados consolidados." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 border rounded-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Data" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ref / Lançamento" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Classificação" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Valor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Status"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [vendas.slice(0, 15).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(v.created_at).toLocaleDateString("pt-BR") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "font-medium",
								children: ["Venda #", v.id.substring(0, 8).toUpperCase()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: selectedReport?.replace("Relatório de ", "") || "Geral" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "text-right font-medium",
								children: ["R$ ", Number(v.valor_total || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 bg-success/10 text-success rounded-full text-[10px] uppercase font-bold tracking-wider",
									children: v.status || "OK"
								})
							})
						] }, v.id)), vendas.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 5,
							className: "text-center text-muted-foreground py-4",
							children: "Nenhum dado real encontrado ainda."
						}) })] })] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => handlePDF(selectedReport || ""),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Baixar PDF Completo"]
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { Relatorios as component };
