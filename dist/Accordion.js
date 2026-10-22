import { c as _c } from "react/compiler-runtime";
import { createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { omitUiProps } from './utils.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AccordionContext = /*#__PURE__*/createContext({
  active: [],
  toggle: () => undefined
});
const AccordionItemContext = /*#__PURE__*/createContext(null);
const AccordionBase = t0 => {
  const $ = _c(21);
  const {
    activeKey,
    alwaysOpen,
    children,
    className,
    defaultActiveKey,
    flush,
    onSelect
  } = t0;
  const normalize = _temp;
  let t1;
  if ($[0] !== defaultActiveKey) {
    t1 = normalize(defaultActiveKey);
    $[0] = defaultActiveKey;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const [internalActive, setInternalActive] = useState(t1);
  let t2;
  if ($[2] !== activeKey || $[3] !== internalActive) {
    t2 = activeKey === undefined ? internalActive : normalize(activeKey);
    $[2] = activeKey;
    $[3] = internalActive;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const selected = t2;
  const isFlush = flush || String(className ?? "").split(/\s+/).includes("accordion-flush");
  let t3;
  if ($[5] !== alwaysOpen || $[6] !== onSelect || $[7] !== selected) {
    t3 = key_0 => {
      const next = alwaysOpen && selected.includes(key_0) ? selected.filter(entry => entry !== key_0) : alwaysOpen ? [...selected, key_0] : selected.includes(key_0) ? [] : [key_0];
      setInternalActive(next);
      onSelect?.(alwaysOpen ? next : next[0] ?? null);
    };
    $[5] = alwaysOpen;
    $[6] = onSelect;
    $[7] = selected;
    $[8] = t3;
  } else {
    t3 = $[8];
  }
  const toggle = t3;
  let t4;
  if ($[9] !== selected || $[10] !== toggle) {
    t4 = {
      active: selected,
      toggle
    };
    $[9] = selected;
    $[10] = toggle;
    $[11] = t4;
  } else {
    t4 = $[11];
  }
  const t5 = isFlush ? "divide-y divide-[var(--ui-border)]" : "divide-y divide-[var(--ui-border)] rounded-md border border-[var(--ui-border)]";
  let t6;
  if ($[12] !== className || $[13] !== t5) {
    t6 = clsx("overflow-hidden", t5, className);
    $[12] = className;
    $[13] = t5;
    $[14] = t6;
  } else {
    t6 = $[14];
  }
  let t7;
  if ($[15] !== children || $[16] !== t6) {
    t7 = /*#__PURE__*/_jsx("div", {
      className: t6,
      children: children
    });
    $[15] = children;
    $[16] = t6;
    $[17] = t7;
  } else {
    t7 = $[17];
  }
  let t8;
  if ($[18] !== t4 || $[19] !== t7) {
    t8 = /*#__PURE__*/_jsx(AccordionContext.Provider, {
      value: t4,
      children: t7
    });
    $[18] = t4;
    $[19] = t7;
    $[20] = t8;
  } else {
    t8 = $[20];
  }
  return t8;
};
const AccordionItem = t0 => {
  const $ = _c(12);
  let T0;
  let children;
  let t1;
  let t2;
  if ($[0] !== t0) {
    const {
      children: t3,
      eventKey,
      ...props
    } = t0;
    children = t3;
    T0 = AccordionItemContext.Provider;
    t2 = eventKey;
    t1 = omitUiProps(props);
    $[0] = t0;
    $[1] = T0;
    $[2] = children;
    $[3] = t1;
    $[4] = t2;
  } else {
    T0 = $[1];
    children = $[2];
    t1 = $[3];
    t2 = $[4];
  }
  let t3;
  if ($[5] !== children || $[6] !== t1) {
    t3 = /*#__PURE__*/_jsx("div", {
      ...t1,
      children: children
    });
    $[5] = children;
    $[6] = t1;
    $[7] = t3;
  } else {
    t3 = $[7];
  }
  let t4;
  if ($[8] !== T0 || $[9] !== t2 || $[10] !== t3) {
    t4 = /*#__PURE__*/_jsx(T0, {
      value: t2,
      children: t3
    });
    $[8] = T0;
    $[9] = t2;
    $[10] = t3;
    $[11] = t4;
  } else {
    t4 = $[11];
  }
  return t4;
};
const AccordionHeader = t0 => {
  const $ = _c(20);
  const {
    children,
    className,
    ...props
  } = t0;
  const key = useContext(AccordionItemContext);
  const accordion = useContext(AccordionContext);
  let t1;
  if ($[0] !== accordion.active || $[1] !== key) {
    t1 = accordion.active.includes(key);
    $[0] = accordion.active;
    $[1] = key;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  const open = t1;
  const t2 = "m-0";
  const t3 = omitUiProps(props);
  let t4;
  if ($[3] !== accordion || $[4] !== key) {
    t4 = () => accordion.toggle(key);
    $[3] = accordion;
    $[4] = key;
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  const t5 = open ? "bg-[var(--ui-surface-active)] text-[var(--ui-text-emphasis)]" : "bg-[var(--ui-surface)] text-[var(--ui-text)]";
  let t6;
  if ($[6] !== className || $[7] !== t5) {
    t6 = clsx("flex w-full items-center justify-between px-5 py-4 text-left text-base font-normal leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--ui-focus-ring)]", t5, className);
    $[6] = className;
    $[7] = t5;
    $[8] = t6;
  } else {
    t6 = $[8];
  }
  const t7 = open ? "rotate-[225deg]" : "rotate-45";
  let t8;
  if ($[9] !== t7) {
    t8 = clsx("mr-1 h-3 w-3 shrink-0 border-r border-b border-current transition-transform", t7);
    $[9] = t7;
    $[10] = t8;
  } else {
    t8 = $[10];
  }
  let t9;
  if ($[11] !== t8) {
    t9 = /*#__PURE__*/_jsx("span", {
      "aria-hidden": "true",
      className: t8
    });
    $[11] = t8;
    $[12] = t9;
  } else {
    t9 = $[12];
  }
  let t10;
  if ($[13] !== children || $[14] !== open || $[15] !== t3 || $[16] !== t4 || $[17] !== t6 || $[18] !== t9) {
    t10 = /*#__PURE__*/_jsx("h2", {
      className: t2,
      children: /*#__PURE__*/_jsxs("button", {
        ...t3,
        type: "button",
        "aria-expanded": open,
        onClick: t4,
        className: t6,
        children: [children, t9]
      })
    });
    $[13] = children;
    $[14] = open;
    $[15] = t3;
    $[16] = t4;
    $[17] = t6;
    $[18] = t9;
    $[19] = t10;
  } else {
    t10 = $[19];
  }
  return t10;
};
const AccordionBody = t0 => {
  const $ = _c(6);
  const {
    children,
    className,
    ...props
  } = t0;
  const key = useContext(AccordionItemContext);
  const accordion = useContext(AccordionContext);
  if (!accordion.active.includes(key)) {
    return null;
  }
  const t1 = omitUiProps(props);
  let t2;
  if ($[0] !== className) {
    t2 = clsx("px-5 py-4", className);
    $[0] = className;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  let t3;
  if ($[2] !== children || $[3] !== t1 || $[4] !== t2) {
    t3 = /*#__PURE__*/_jsx("div", {
      ...t1,
      className: t2,
      children: children
    });
    $[2] = children;
    $[3] = t1;
    $[4] = t2;
    $[5] = t3;
  } else {
    t3 = $[5];
  }
  return t3;
};
export const Accordion = Object.assign(AccordionBase, {
  Body: AccordionBody,
  Header: AccordionHeader,
  Item: AccordionItem
});
function _temp(key) {
  return Array.isArray(key) ? key : key == null ? [] : [key];
}
//# sourceMappingURL=Accordion.js.map
