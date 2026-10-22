import { c as _c } from "react/compiler-runtime";
import { createContext, useContext } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const defaultLabels = {
  close: 'Close',
  loading: 'Loading',
  toggleNavigation: 'Toggle navigation'
};
const UiLabelsContext = /*#__PURE__*/createContext(defaultLabels);
export const UiProvider = t0 => {
  const $ = _c(5);
  const {
    children,
    labels
  } = t0;
  let t1;
  if ($[0] !== labels) {
    t1 = {
      ...defaultLabels,
      ...labels
    };
    $[0] = labels;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  let t2;
  if ($[2] !== children || $[3] !== t1) {
    t2 = /*#__PURE__*/_jsx(UiLabelsContext.Provider, {
      value: t1,
      children: children
    });
    $[2] = children;
    $[3] = t1;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  return t2;
};
export const useUiLabels = () => {
  return useContext(UiLabelsContext);
};
//# sourceMappingURL=UiProvider.js.map
