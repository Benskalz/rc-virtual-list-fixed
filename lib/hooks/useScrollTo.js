"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useScrollTo;

var React = _interopRequireWildcard(require("react"));

var _raf = _interopRequireDefault(require("rc-util/lib/raf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function useScrollTo(containerRef, data, heights, itemHeight, getKey, collectHeight) {
  var scrollRef = React.useRef();
  return function (arg) {
    _raf.default.cancel(scrollRef.current);

    if (typeof arg === 'number') {
      containerRef.current.scrollTop = arg;
    } else if (arg && _typeof(arg) === 'object') {
      var index;
      var align = arg.align;

      if ('index' in arg) {
        index = arg.index;
      } else {
        index = data.findIndex(function (item) {
          return getKey(item) === arg.key;
        });
      } // We will retry 3 times in case dynamic height shaking


      var syncScroll = function syncScroll(times, targetAlign) {
        if (times < 0 || !containerRef.current) return;
        var height = containerRef.current.clientHeight;
        var mergedAlign = targetAlign || align; // Get top & bottom

        var stackTop = 0;
        var itemTop = 0;
        var itemBottom = 0;
        var needCollectHeight = false;

        for (var i = 0; i <= index; i += 1) {
          var key = getKey(data[i]);
          itemTop = stackTop;
          var cacheHeight = heights.get(key);
          itemBottom = itemTop + (cacheHeight === undefined ? itemHeight : cacheHeight);
          stackTop = itemBottom;

          if (i === index && cacheHeight === undefined) {
            needCollectHeight = true;
          }
        } // Scroll to


        var targetTop = null;
        var newTargetAlign = targetAlign;

        switch (mergedAlign) {
          case 'top':
            targetTop = itemTop;
            break;

          case 'bottom':
            targetTop = itemBottom - height;
            break;

          default:
            {
              var scrollTop = containerRef.current.scrollTop;
              var scrollBottom = scrollTop + height;

              if (itemTop < scrollTop) {
                newTargetAlign = 'top';
              } else if (itemBottom > scrollBottom) {
                newTargetAlign = 'bottom';
              }
            }
        }

        if (targetTop !== null && targetTop !== containerRef.current.scrollTop) {
          containerRef.current.scrollTop = targetTop;
        } // We will retry since element may not sync height as it described


        scrollRef.current = (0, _raf.default)(function () {
          if (needCollectHeight) {
            collectHeight();
          }

          syncScroll(times - 1, newTargetAlign);
        });
      };

      syncScroll(3);
    }
  };
}