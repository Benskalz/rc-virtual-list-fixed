function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import { useRef } from 'react';
import findDOMNode from "rc-util/es/Dom/findDOMNode";
import CacheMap from '../utils/CacheMap';
export default function useHeights(getKey, onItemAdd, onItemRemove) {
  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      updatedMark = _React$useState2[0],
      setUpdatedMark = _React$useState2[1];

  var instanceRef = useRef(new Map());
  var heightsRef = useRef(new CacheMap());

  function setInstanceRef(item, instance) {
    var key = getKey(item);
    var origin = instanceRef.current.get(key);

    if (instance) {
      instanceRef.current.set(key, instance);
    } else {
      instanceRef.current.delete(key);
    } // Instance changed


    if (!origin !== !instance) {
      if (instance) {
        onItemAdd === null || onItemAdd === void 0 ? void 0 : onItemAdd(item);
      } else {
        onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(item);
      }
    }
  }

  function collectHeight() {
    var changed = false;
    instanceRef.current.forEach(function (element, key) {
      if (element && element.offsetParent) {
        var htmlElement = findDOMNode(element);
        var offsetHeight = htmlElement.offsetHeight;

        if (heightsRef.current.get(key) !== offsetHeight) {
          changed = true;
          heightsRef.current.set(key, htmlElement.offsetHeight);
        }
      }
    });

    if (changed) {
      setUpdatedMark(function (c) {
        return c + 1;
      });
    }
  }

  return [setInstanceRef, collectHeight, heightsRef.current, updatedMark];
}