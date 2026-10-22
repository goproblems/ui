import { c as _c } from "react/compiler-runtime";
import { Children, createContext, isValidElement, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { omitUiProps, renderAs } from './utils.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TabsContext = /*#__PURE__*/createContext({});
const TabContainer = t0 => {
  const $ = _c(8);
  const {
    activeKey,
    children,
    defaultActiveKey,
    onSelect
  } = t0;
  const [internalKey, setInternalKey] = useState(defaultActiveKey ?? null);
  const selectedKey = activeKey ?? internalKey;
  let t1;
  if ($[0] !== onSelect) {
    t1 = key => {
      setInternalKey(key);
      onSelect?.(key);
    };
    $[0] = onSelect;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  let t2;
  if ($[2] !== selectedKey || $[3] !== t1) {
    t2 = {
      activeKey: selectedKey,
      onSelect: t1
    };
    $[2] = selectedKey;
    $[3] = t1;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  let t3;
  if ($[5] !== children || $[6] !== t2) {
    t3 = /*#__PURE__*/_jsx(TabsContext.Provider, {
      value: t2,
      children: children
    });
    $[5] = children;
    $[6] = t2;
    $[7] = t3;
  } else {
    t3 = $[7];
  }
  return t3;
};
const TabContent = props => renderAs('div', props, 'mt-3');
const TabPane = t0 => {
  const $ = _c(8);
  const {
    children,
    className,
    eventKey,
    ...props
  } = t0;
  const {
    activeKey
  } = useContext(TabsContext);
  const t1 = omitUiProps(props);
  const t2 = activeKey !== eventKey;
  const t3 = activeKey !== eventKey && "hidden";
  let t4;
  if ($[0] !== className || $[1] !== t3) {
    t4 = clsx(t3, className);
    $[0] = className;
    $[1] = t3;
    $[2] = t4;
  } else {
    t4 = $[2];
  }
  let t5;
  if ($[3] !== children || $[4] !== t1 || $[5] !== t2 || $[6] !== t4) {
    t5 = /*#__PURE__*/_jsx("div", {
      ...t1,
      role: "tabpanel",
      hidden: t2,
      className: t4,
      children: children
    });
    $[3] = children;
    $[4] = t1;
    $[5] = t2;
    $[6] = t4;
    $[7] = t5;
  } else {
    t5 = $[7];
  }
  return t5;
};
const TabBase = t0 => {
  const $ = _c(3);
  const {
    children,
    className
  } = t0;
  let t1;
  if ($[0] !== children || $[1] !== className) {
    t1 = /*#__PURE__*/_jsx("div", {
      className: className,
      children: children
    });
    $[0] = children;
    $[1] = className;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  return t1;
};
export const Tab = Object.assign(TabBase, {
  Container: TabContainer,
  Content: TabContent,
  Pane: TabPane
});
const TabsBase = t0 => {
  const $ = _c(12);
  const {
    activeKey,
    children,
    className,
    defaultActiveKey,
    fill,
    justify,
    onSelect
  } = t0;
  const entries = Children.toArray(children).filter(isValidElement);
  const firstKey = entries[0]?.props.eventKey ?? null;
  const [internalKey, setInternalKey] = useState(defaultActiveKey ?? firstKey);
  const selectedKey = activeKey ?? internalKey;
  let t1;
  if ($[0] !== onSelect) {
    t1 = key => {
      setInternalKey(key);
      onSelect?.(key);
    };
    $[0] = onSelect;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const select = t1;
  let t2;
  if ($[2] !== select || $[3] !== selectedKey) {
    t2 = {
      activeKey: selectedKey,
      onSelect: select
    };
    $[2] = select;
    $[3] = selectedKey;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const t3 = (fill || justify) && "[&>*]:flex-1";
  let t4;
  if ($[5] !== t3) {
    t4 = clsx("flex flex-wrap border-b border-neutral-200 dark:border-[var(--ui-border)]", t3);
    $[5] = t3;
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  let t5;
  if ($[7] !== select || $[8] !== selectedKey) {
    t5 = entry => /*#__PURE__*/_jsx("button", {
      type: "button",
      role: "tab",
      "aria-selected": selectedKey === entry.props.eventKey,
      onClick: () => select(entry.props.eventKey),
      className: clsx("-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors", selectedKey === entry.props.eventKey ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"),
      children: entry.props.title
    }, String(entry.props.eventKey));
    $[7] = select;
    $[8] = selectedKey;
    $[9] = t5;
  } else {
    t5 = $[9];
  }
  let t6;
  if ($[10] !== selectedKey) {
    t6 = entry_0 => /*#__PURE__*/_jsx("div", {
      role: "tabpanel",
      hidden: selectedKey !== entry_0.props.eventKey,
      className: clsx("pt-3", selectedKey !== entry_0.props.eventKey && "hidden"),
      children: entry_0.props.children
    }, String(entry_0.props.eventKey));
    $[10] = selectedKey;
    $[11] = t6;
  } else {
    t6 = $[11];
  }
  return /*#__PURE__*/_jsx(TabsContext.Provider, {
    value: t2,
    children: /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [/*#__PURE__*/_jsx("div", {
        role: "tablist",
        className: t4,
        children: entries.map(t5)
      }), entries.map(t6)]
    })
  });
};
export const Tabs = TabsBase;
//# sourceMappingURL=Tabs.js.map
