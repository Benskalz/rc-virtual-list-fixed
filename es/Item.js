import * as React from 'react';
export function Item(_ref) {
  var children = _ref.children,
      setRef = _ref.setRef;
  var refFunc = React.useCallback(function (node) {
    setRef(node);
  }, []);
  return React.cloneElement(children, {
    ref: refFunc
  });
}