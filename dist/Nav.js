import { c as _c } from "react/compiler-runtime";
import { forwardRef, useContext } from 'react';
import { clsx } from 'clsx';
import { TabsContext } from './Tabs.js';
import { omitUiProps, renderAs } from './utils.js';
import { jsx as _jsx } from "react/jsx-runtime";
const NavBase = /*#__PURE__*/forwardRef(({
  as = 'div',
  children,
  className,
  fill,
  justify,
  variant,
  ...props
}, ref) => {
  const Component = as;
  return /*#__PURE__*/_jsx(Component, {
    ...omitUiProps(props),
    ref: ref,
    className: clsx('flex flex-wrap', variant === 'tabs' && 'border-b border-neutral-200 dark:border-[var(--ui-border)]', (fill || justify) && '[&>*]:flex-1', className),
    children: children
  });
});
const NavItem = props => renderAs('div', props);
const NavLink = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(20);
  const {
    active,
    as,
    children,
    className,
    disabled,
    eventKey,
    href,
    ...props
  } = t0;
  const tabs = useContext(TabsContext);
  const selected = active ?? tabs.activeKey === eventKey;
  const Component = as ?? (href ? "a" : "button");
  const t1 = omitUiProps(props);
  const t2 = Component === "button" ? "button" : undefined;
  const t3 = Component === "button" ? disabled : undefined;
  const t4 = selected ? "page" : undefined;
  let t5;
  if ($[0] !== disabled || $[1] !== eventKey || $[2] !== props || $[3] !== tabs) {
    t5 = event => {
      props.onClick?.(event);
      if (!event.defaultPrevented && !disabled && eventKey != null) {
        tabs.onSelect?.(eventKey);
      }
    };
    $[0] = disabled;
    $[1] = eventKey;
    $[2] = props;
    $[3] = tabs;
    $[4] = t5;
  } else {
    t5 = $[4];
  }
  const t6 = selected && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
  const t7 = disabled && "pointer-events-none opacity-50";
  let t8;
  if ($[5] !== className || $[6] !== t6 || $[7] !== t7) {
    t8 = clsx("block rounded-md px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-[var(--ui-text-secondary)] dark:hover:bg-[var(--ui-surface-muted)] dark:hover:text-[var(--ui-text-emphasis)]", t6, t7, className);
    $[5] = className;
    $[6] = t6;
    $[7] = t7;
    $[8] = t8;
  } else {
    t8 = $[8];
  }
  let t9;
  if ($[9] !== Component || $[10] !== children || $[11] !== href || $[12] !== ref || $[13] !== t1 || $[14] !== t2 || $[15] !== t3 || $[16] !== t4 || $[17] !== t5 || $[18] !== t8) {
    t9 = /*#__PURE__*/_jsx(Component, {
      ...t1,
      ref: ref,
      href: href,
      type: t2,
      disabled: t3,
      "aria-current": t4,
      onClick: t5,
      className: t8,
      children: children
    });
    $[9] = Component;
    $[10] = children;
    $[11] = href;
    $[12] = ref;
    $[13] = t1;
    $[14] = t2;
    $[15] = t3;
    $[16] = t4;
    $[17] = t5;
    $[18] = t8;
    $[19] = t9;
  } else {
    t9 = $[19];
  }
  return t9;
});
export const Nav = Object.assign(NavBase, {
  Item: NavItem,
  Link: NavLink
});
//# sourceMappingURL=Nav.js.map
