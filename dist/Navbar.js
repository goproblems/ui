import { c as _c } from "react/compiler-runtime";
import { createContext, forwardRef, useContext, useEffect, useId, useState } from 'react';
import { clsx } from 'clsx';
import { Dropdown, DropdownDivider, DropdownItem } from './Dropdown.js';
import { omitUiProps } from './utils.js';
import { useUiLabels } from './UiProvider.js';
import { useForwardedRef } from './useForwardedRef.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NavbarContext = /*#__PURE__*/createContext(null);
const NavbarBase = /*#__PURE__*/forwardRef(({
  as = 'nav',
  children,
  className,
  defaultExpanded,
  collapseOnSelect = false,
  ...props
}, ref) => {
  const [open, setOpen] = useState(Boolean(defaultExpanded));
  const [openDropdown, setOpenDropdown] = useState(null);
  const [rootRef, setRootRef] = useForwardedRef(ref);
  useEffect(() => {
    if (!open && openDropdown === null) return;
    const closeWhenClickingOutside = event => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', closeWhenClickingOutside);
    return () => {
      document.removeEventListener('mousedown', closeWhenClickingOutside);
    };
  }, [open, openDropdown, rootRef]);
  const Component = as;
  return /*#__PURE__*/_jsx(NavbarContext.Provider, {
    value: {
      open,
      setOpen,
      openDropdown,
      setOpenDropdown,
      collapseOnSelect
    },
    children: /*#__PURE__*/_jsx(Component, {
      ...omitUiProps(props),
      ref: setRootRef,
      className: clsx('relative z-40 flex flex-wrap items-center justify-between bg-white py-2 dark:bg-[var(--ui-surface-muted)]', className),
      children: children
    })
  });
});
const NavbarToggle = props => {
  const $ = _c(15);
  const navbar = useContext(NavbarContext);
  const labels = useUiLabels();
  let t0;
  if ($[0] !== props) {
    t0 = omitUiProps(props);
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const t1 = navbar?.open;
  let t2;
  if ($[2] !== navbar) {
    t2 = () => {
      const nextOpen = !navbar?.open;
      navbar?.setOpen(nextOpen);
      if (!nextOpen) {
        navbar?.setOpenDropdown(null);
      }
    };
    $[2] = navbar;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  let t3;
  if ($[4] !== props.className) {
    t3 = clsx("inline-flex h-10 w-14 items-center justify-center rounded-md border border-black/15 px-3 py-1 dark:border-white/20 md:hidden", props.className);
    $[4] = props.className;
    $[5] = t3;
  } else {
    t3 = $[5];
  }
  let t4;
  if ($[6] !== labels.toggleNavigation) {
    t4 = /*#__PURE__*/_jsx("span", {
      className: "sr-only",
      children: labels.toggleNavigation
    });
    $[6] = labels.toggleNavigation;
    $[7] = t4;
  } else {
    t4 = $[7];
  }
  let t5;
  if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
    t5 = /*#__PURE__*/_jsxs("span", {
      "aria-hidden": "true",
      className: "flex h-[30px] w-[30px] flex-col items-center justify-center gap-[5px]",
      children: [/*#__PURE__*/_jsx("span", {
        className: "block h-0.5 w-6 rounded-full bg-black/55 dark:bg-white/70"
      }), /*#__PURE__*/_jsx("span", {
        className: "block h-0.5 w-6 rounded-full bg-black/55 dark:bg-white/70"
      }), /*#__PURE__*/_jsx("span", {
        className: "block h-0.5 w-6 rounded-full bg-black/55 dark:bg-white/70"
      })]
    });
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  let t6;
  if ($[9] !== t0 || $[10] !== t1 || $[11] !== t2 || $[12] !== t3 || $[13] !== t4) {
    t6 = /*#__PURE__*/_jsxs("button", {
      ...t0,
      type: "button",
      "aria-expanded": t1,
      onClick: t2,
      className: t3,
      children: [t4, t5]
    });
    $[9] = t0;
    $[10] = t1;
    $[11] = t2;
    $[12] = t3;
    $[13] = t4;
    $[14] = t6;
  } else {
    t6 = $[14];
  }
  return t6;
};
const NavbarCollapse = t0 => {
  const $ = _c(7);
  const {
    children,
    className,
    ...props
  } = t0;
  const navbar = useContext(NavbarContext);
  const t1 = omitUiProps(props);
  const t2 = navbar?.open ? "block" : "hidden";
  let t3;
  if ($[0] !== className || $[1] !== t2) {
    t3 = clsx("w-full grow basis-full md:flex md:w-auto md:flex-1 md:basis-auto md:items-center", t2, className);
    $[0] = className;
    $[1] = t2;
    $[2] = t3;
  } else {
    t3 = $[2];
  }
  let t4;
  if ($[3] !== children || $[4] !== t1 || $[5] !== t3) {
    t4 = /*#__PURE__*/_jsx("div", {
      ...t1,
      className: t3,
      children: children
    });
    $[3] = children;
    $[4] = t1;
    $[5] = t3;
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  return t4;
};
export const Navbar = Object.assign(NavbarBase, {
  Collapse: NavbarCollapse,
  Toggle: NavbarToggle
});
export const NavDropdown = Object.assign(({
  children,
  className,
  title,
  align,
  menuClassName,
  show,
  onSelect,
  onToggle,
  ['data-qa']: dataQa,
  ...props
}) => {
  const navbar = useContext(NavbarContext);
  const id = useId();
  const isNavbarManaged = navbar !== null && show === undefined;
  return /*#__PURE__*/_jsxs(Dropdown, {
    ...props,
    show: isNavbarManaged ? navbar.openDropdown === id : show,
    onSelect: key => {
      onSelect?.(key);
      if (navbar?.collapseOnSelect) navbar.setOpen(false);
    },
    onToggle: nextShow => {
      onToggle?.(nextShow);
      if (isNavbarManaged) {
        navbar.setOpenDropdown(nextShow ? id : null);
      }
    },
    className: clsx('w-full md:w-auto', className),
    children: [/*#__PURE__*/_jsxs(Dropdown.Toggle, {
      variant: "link",
      caret: false,
      "data-qa": dataQa,
      className: "group w-full justify-start gap-1.5 border-0 px-0 py-2 !text-base !font-normal !text-[rgba(0,0,0,0.65)] !no-underline hover:!text-[rgba(0,0,0,0.8)] hover:!no-underline dark:!text-[rgba(255,255,255,0.65)] dark:hover:!text-[rgba(255,255,255,0.8)] md:w-auto md:px-2",
      children: [title, /*#__PURE__*/_jsx("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 12 12",
        fill: "none",
        className: "h-3 w-3 translate-y-px shrink-0 opacity-60 transition-transform duration-150 group-aria-expanded:rotate-180",
        children: /*#__PURE__*/_jsx("path", {
          d: "m3 4.5 3 3 3-3",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })
      })]
    }), /*#__PURE__*/_jsx(Dropdown.Menu, {
      align: align,
      className: menuClassName,
      children: children
    })]
  });
}, {
  Divider: DropdownDivider,
  Item: DropdownItem
});
//# sourceMappingURL=Navbar.js.map
