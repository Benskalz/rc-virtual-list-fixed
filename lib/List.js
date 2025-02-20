"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawList = RawList;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Filler = _interopRequireDefault(require("./Filler"));

var _useChildren = _interopRequireDefault(require("./hooks/useChildren"));

var _useHeights3 = _interopRequireDefault(require("./hooks/useHeights"));

var _useInRange = _interopRequireDefault(require("./hooks/useInRange"));

var _useScrollTo = _interopRequireDefault(require("./hooks/useScrollTo"));

var _useDiffItem3 = _interopRequireDefault(require("./hooks/useDiffItem"));

var _useFrameWheel = _interopRequireDefault(require("./hooks/useFrameWheel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EMPTY_DATA = [];
var ScrollStyle = {
  overflowY: 'auto',
  overflowAnchor: 'none'
};

function RawList(props, ref) {
  var prefixCls = props.prefixCls,
      className = props.className,
      height = props.height,
      itemHeight = props.itemHeight,
      _props$fullHeight = props.fullHeight,
      fullHeight = _props$fullHeight === void 0 ? true : _props$fullHeight,
      style = props.style,
      data = props.data,
      children = props.children,
      itemKey = props.itemKey,
      virtual = props.virtual,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      restProps = _objectWithoutProperties(props, ["prefixCls", "className", "height", "itemHeight", "fullHeight", "style", "data", "children", "itemKey", "virtual", "component"]); // ================================= MISC =================================


  var inVirtual = virtual !== false && height && itemHeight && data && itemHeight * data.length > height;

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      scrollTop = _React$useState2[0],
      setScrollTop = _React$useState2[1];

  var mergedClassName = (0, _classnames.default)(prefixCls, className);
  var mergedData = data || EMPTY_DATA;
  var componentRef = (0, React.useRef)(); // =============================== Item Key ===============================

  var getKey = React.useCallback(function (item) {
    if (typeof itemKey === 'function') {
      return itemKey(item);
    }

    return item[itemKey];
  }, [itemKey]);
  var sharedConfig = {
    getKey: getKey
  }; // ================================ Legacy ================================
  // Put ref here since the range is generate by follow

  var rangeRef = (0, React.useRef)({
    start: 0,
    end: mergedData.length
  });
  var diffItemRef = (0, React.useRef)();

  var _useDiffItem = (0, _useDiffItem3.default)(mergedData, getKey),
      _useDiffItem2 = _slicedToArray(_useDiffItem, 1),
      diffItem = _useDiffItem2[0];

  diffItemRef.current = diffItem; // ================================ Height ================================

  var _useHeights = (0, _useHeights3.default)(getKey, null, null),
      _useHeights2 = _slicedToArray(_useHeights, 4),
      setInstanceRef = _useHeights2[0],
      collectHeight = _useHeights2[1],
      heights = _useHeights2[2],
      heightUpdatedMark = _useHeights2[3]; // ========================== Visible Calculation =========================


  var _React$useMemo = React.useMemo(function () {
    if (!inVirtual) {
      return {
        scrollHeight: undefined,
        start: 0,
        end: mergedData.length - 1,
        offset: undefined
      };
    }

    var itemTop = 0;
    var startIndex;
    var startOffset;
    var endIndex;
    var dataLen = mergedData.length;

    for (var i = 0; i < dataLen; i += 1) {
      var item = mergedData[i];
      var key = getKey(item);
      var cacheHeight = heights.get(key);
      var currentItemBottom = itemTop + (cacheHeight === undefined ? itemHeight : cacheHeight); // Check item top in the range

      if (currentItemBottom >= scrollTop && startIndex === undefined) {
        startIndex = i;
        startOffset = itemTop;
      } // Check item bottom in the range. We will render additional one item for motion usage


      if (currentItemBottom > scrollTop + height && endIndex === undefined) {
        endIndex = i;
      }

      itemTop = currentItemBottom;
    } // Fallback to normal if not match


    if (startIndex === undefined) {
      startIndex = 0;
      startOffset = 0;
    }

    if (endIndex === undefined) {
      endIndex = mergedData.length - 1;
    } // Give cache to improve scroll experience


    endIndex = Math.min(endIndex + 1, mergedData.length);
    return {
      scrollHeight: itemTop,
      start: startIndex,
      end: endIndex,
      offset: startOffset
    };
  }, [inVirtual, scrollTop, mergedData, heightUpdatedMark, height]),
      scrollHeight = _React$useMemo.scrollHeight,
      start = _React$useMemo.start,
      end = _React$useMemo.end,
      offset = _React$useMemo.offset;

  rangeRef.current.start = start;
  rangeRef.current.end = end; // =============================== In Range ===============================

  var keepInRange = (0, _useInRange.default)(scrollHeight, height); // ================================ Scroll ================================
  // Since this added in global,should use ref to keep update

  var onRawWheel = (0, _useFrameWheel.default)(inVirtual, function (offsetY) {
    setScrollTop(function (top) {
      var newTop = keepInRange(top + offsetY);
      componentRef.current.scrollTop = newTop;
      return newTop;
    });
  }); // Additional handle the scroll which not trigger by wheel

  function onRawScroll(event) {
    var newScrollTop = event.target.scrollTop;
    var newTop = keepInRange(newScrollTop);

    if (newTop !== scrollTop) {
      setScrollTop(newTop);
    }
  }

  React.useEffect(function () {
    componentRef.current.addEventListener('wheel', onRawWheel);
    if (componentRef.current){
      return function () {
        componentRef.current.removeEventListener('wheel', onRawWheel);
      };
    }
  }, [inVirtual]); // ================================= Ref ==================================

  var scrollTo = (0, _useScrollTo.default)(componentRef, mergedData, heights, itemHeight, getKey, collectHeight);
  React.useImperativeHandle(ref, function () {
    return {
      scrollTo: scrollTo
    };
  }); // ================================ Render ================================

  var listChildren = (0, _useChildren.default)(mergedData, start, end, setInstanceRef, children, sharedConfig);
  return React.createElement(Component, Object.assign({
    style: height ? _objectSpread(_objectSpread({}, style), {}, _defineProperty({}, fullHeight ? 'height' : 'maxHeight', height), ScrollStyle) : style,
    className: mergedClassName
  }, restProps, {
    ref: componentRef,
    onScroll: onRawScroll
  }), React.createElement(_Filler.default, {
    prefixCls: prefixCls,
    height: scrollHeight,
    offset: offset,
    onInnerResize: collectHeight
  }, listChildren));
}

var List = React.forwardRef(RawList);
List.displayName = 'List';
var _default = List;
exports.default = _default;