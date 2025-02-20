function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-param-reassign */
import * as React from 'react';
import raf from "rc-util/es/raf";
export default function useScrollTo(containerRef, data, heights, itemHeight, getKey, collectHeight) {
  var scrollRef = React.useRef();
  return function (arg) {
    raf.cancel(scrollRef.current);

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


        scrollRef.current = raf(function () {
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