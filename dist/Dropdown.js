import { c as _c } from "react/compiler-runtime";
import { Children, cloneElement, createContext, forwardRef, isValidElement, useCallback, useContext, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { sizeClasses, variantClasses } from './Button.js';
import { omitUiProps } from './utils.js';
import { useForwardedRef } from './useForwardedRef.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DropdownContext = /*#__PURE__*/createContext(null);
const DropdownBase = /*#__PURE__*/forwardRef(({
  as: Component = 'div',
  children,
  className,
  defaultShow,
  onSelect,
  onToggle,
  show,
  ...props
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(Boolean(defaultShow));
  const [rootRef, setRootRef] = useForwardedRef(ref);
  const isOpen = show ?? internalOpen;
  const setOpen = useCallback(next => {
    setInternalOpen(next);
    onToggle?.(next);
  }, [onToggle]);
  useEffect(() => {
    if (!isOpen) return;
    const closeWhenClickingOutside = event => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', closeWhenClickingOutside);
    return () => {
      document.removeEventListener('mousedown', closeWhenClickingOutside);
    };
  }, [isOpen, rootRef, setOpen]);
  return /*#__PURE__*/_jsx(DropdownContext.Provider, {
    value: {
      open: isOpen,
      setOpen,
      onSelect: key => {
        onSelect?.(key);
        setOpen(false);
      }
    },
    children: /*#__PURE__*/_jsx(Component, {
      ...omitUiProps(props),
      ref: setRootRef,
      className: clsx('relative inline-flex', isOpen && 'z-[1000]', className),
      children: children
    })
  });
});
const DropdownToggle = /*#__PURE__*/forwardRef((props, ref) => {
  const $ = _c(21);
  const dropdown = useContext(DropdownContext);
  let t0;
  if ($[0] !== props) {
    t0 = omitUiProps(props);
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const t1 = ref;
  const t2 = props.disabled;
  const t3 = dropdown?.open;
  let t4;
  if ($[2] !== dropdown || $[3] !== props) {
    t4 = event => {
      props.onClick?.(event);
      if (event.defaultPrevented || props.disabled) {
        return;
      }
      dropdown?.setOpen(!dropdown.open);
    };
    $[2] = dropdown;
    $[3] = props;
    $[4] = t4;
  } else {
    t4 = $[4];
  }
  const t5 = variantClasses[props.variant ?? "primary"] ?? variantClasses.primary;
  const t6 = props.size && sizeClasses[props.size];
  const t7 = props.disabled && "pointer-events-none opacity-50";
  let t8;
  if ($[5] !== props.className || $[6] !== t5 || $[7] !== t6 || $[8] !== t7) {
    t8 = clsx("inline-flex list-none items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-base font-normal leading-6 transition-colors focus:outline-none focus-visible:ring-2", t5, t6, t7, props.className);
    $[5] = props.className;
    $[6] = t5;
    $[7] = t6;
    $[8] = t7;
    $[9] = t8;
  } else {
    t8 = $[9];
  }
  let t9;
  if ($[10] !== props.caret) {
    t9 = props.caret !== false && /*#__PURE__*/_jsx("span", {
      "aria-hidden": "true",
      children: "▾"
    });
    $[10] = props.caret;
    $[11] = t9;
  } else {
    t9 = $[11];
  }
  let t10;
  if ($[12] !== props.children || $[13] !== props.disabled || $[14] !== t0 || $[15] !== t1 || $[16] !== t3 || $[17] !== t4 || $[18] !== t8 || $[19] !== t9) {
    t10 = /*#__PURE__*/_jsxs("button", {
      ...t0,
      ref: t1,
      type: "button",
      disabled: t2,
      "aria-expanded": t3,
      "aria-haspopup": "menu",
      onClick: t4,
      className: t8,
      children: [props.children, t9]
    });
    $[12] = props.children;
    $[13] = props.disabled;
    $[14] = t0;
    $[15] = t1;
    $[16] = t3;
    $[17] = t4;
    $[18] = t8;
    $[19] = t9;
    $[20] = t10;
  } else {
    t10 = $[20];
  }
  return t10;
});
const DropdownMenu = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(8);
  const {
    align,
    children,
    className,
    ...props
  } = t0;
  const dropdown = useContext(DropdownContext);
  if (!dropdown?.open) {
    return null;
  }
  const t1 = omitUiProps(props);
  const t2 = align === "end" ? "right-0" : "left-0";
  let t3;
  if ($[0] !== className || $[1] !== t2) {
    t3 = clsx("absolute top-full z-[1000] mt-1 w-max min-w-44 max-w-[calc(100vw-1rem)] rounded-md border border-neutral-200 bg-white p-1 shadow-lg transition-opacity dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface)]", "visible pointer-events-auto opacity-100", t2, className);
    $[0] = className;
    $[1] = t2;
    $[2] = t3;
  } else {
    t3 = $[2];
  }
  let t4;
  if ($[3] !== children || $[4] !== ref || $[5] !== t1 || $[6] !== t3) {
    t4 = /*#__PURE__*/_jsx("div", {
      ...t1,
      ref: ref,
      role: "menu",
      className: t3,
      children: children
    });
    $[3] = children;
    $[4] = ref;
    $[5] = t1;
    $[6] = t3;
    $[7] = t4;
  } else {
    t4 = $[7];
  }
  return t4;
});
const DropdownItem = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(19);
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
  const dropdown = useContext(DropdownContext);
  const Component = as ?? (href ? "a" : "button");
  const t1 = omitUiProps(props);
  const t2 = Component === "button" ? "button" : undefined;
  const t3 = Component === "button" ? disabled : undefined;
  let t4;
  if ($[0] !== disabled || $[1] !== dropdown || $[2] !== eventKey || $[3] !== props) {
    t4 = event => {
      props.onClick?.(event);
      if (!event.defaultPrevented && !disabled) {
        dropdown?.onSelect?.(eventKey ?? null);
        dropdown?.setOpen(false);
      }
    };
    $[0] = disabled;
    $[1] = dropdown;
    $[2] = eventKey;
    $[3] = props;
    $[4] = t4;
  } else {
    t4 = $[4];
  }
  const t5 = active && "bg-blue-50 text-blue-700 dark:bg-blue-950";
  const t6 = disabled && "pointer-events-none opacity-50";
  let t7;
  if ($[5] !== className || $[6] !== t5 || $[7] !== t6) {
    t7 = clsx("flex w-full items-center break-words rounded px-3 py-2 text-left text-sm whitespace-normal text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-[var(--ui-text)] dark:hover:bg-[var(--ui-surface-muted)] md:whitespace-nowrap", t5, t6, className);
    $[5] = className;
    $[6] = t5;
    $[7] = t6;
    $[8] = t7;
  } else {
    t7 = $[8];
  }
  let t8;
  if ($[9] !== Component || $[10] !== children || $[11] !== href || $[12] !== ref || $[13] !== t1 || $[14] !== t2 || $[15] !== t3 || $[16] !== t4 || $[17] !== t7) {
    t8 = /*#__PURE__*/_jsx(Component, {
      ...t1,
      ref: ref,
      href: href,
      role: "menuitem",
      type: t2,
      disabled: t3,
      onClick: t4,
      className: t7,
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
    $[17] = t7;
    $[18] = t8;
  } else {
    t8 = $[18];
  }
  return t8;
});
const DropdownDivider = props => {
  const $ = _c(7);
  let t0;
  if ($[0] !== props) {
    t0 = omitUiProps(props);
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  let t1;
  if ($[2] !== props.className) {
    t1 = clsx("my-1 border-neutral-200 dark:border-[var(--ui-border)]", props.className);
    $[2] = props.className;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[4] !== t0 || $[5] !== t1) {
    t2 = /*#__PURE__*/_jsx("hr", {
      ...t0,
      className: t1
    });
    $[4] = t0;
    $[5] = t1;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
};
export const Dropdown = Object.assign(DropdownBase, {
  Divider: DropdownDivider,
  Item: DropdownItem,
  Menu: DropdownMenu,
  Toggle: DropdownToggle
});
export const DropdownButton = t0 => {
  const $ = _c(18);
  let children;
  let id;
  let onSelect;
  let props;
  let title;
  let variant;
  if ($[0] !== t0) {
    ({
      children,
      id,
      onSelect,
      title,
      variant,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = id;
    $[3] = onSelect;
    $[4] = props;
    $[5] = title;
    $[6] = variant;
  } else {
    children = $[1];
    id = $[2];
    onSelect = $[3];
    props = $[4];
    title = $[5];
    variant = $[6];
  }
  let t1;
  if ($[7] !== id || $[8] !== title || $[9] !== variant) {
    t1 = /*#__PURE__*/_jsx(Dropdown.Toggle, {
      id: id,
      variant: variant,
      children: title
    });
    $[7] = id;
    $[8] = title;
    $[9] = variant;
    $[10] = t1;
  } else {
    t1 = $[10];
  }
  let t2;
  if ($[11] !== children) {
    t2 = /*#__PURE__*/_jsx(Dropdown.Menu, {
      children: children
    });
    $[11] = children;
    $[12] = t2;
  } else {
    t2 = $[12];
  }
  let t3;
  if ($[13] !== onSelect || $[14] !== props || $[15] !== t1 || $[16] !== t2) {
    t3 = /*#__PURE__*/_jsxs(Dropdown, {
      ...props,
      onSelect: onSelect,
      children: [t1, t2]
    });
    $[13] = onSelect;
    $[14] = props;
    $[15] = t1;
    $[16] = t2;
    $[17] = t3;
  } else {
    t3 = $[17];
  }
  return t3;
};
export const ButtonGroup = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(13);
  let children;
  let className;
  let t1;
  let vertical;
  if ($[0] !== t0) {
    const {
      className: t2,
      children: t3,
      vertical: t4,
      ...props
    } = t0;
    className = t2;
    children = t3;
    vertical = t4;
    t1 = omitUiProps(props);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = t1;
    $[4] = vertical;
  } else {
    children = $[1];
    className = $[2];
    t1 = $[3];
    vertical = $[4];
  }
  const t2 = vertical && "flex-col [&>*:not(:first-child)]:-mt-px [&>*]:ml-0 [&>label:first-child>span]:rounded-b-none [&>label:first-child>span]:rounded-t-md [&>label:last-child>span]:rounded-b-md [&>label:last-child>span]:rounded-t-none";
  let t3;
  if ($[5] !== className || $[6] !== t2) {
    t3 = clsx("isolate inline-flex [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>button:has(+[role=menu])]:!rounded-r-md [&>label:first-child>span]:rounded-r-none [&>label:last-child>span]:rounded-l-none [&>label:not(:first-child):not(:last-child)>span]:rounded-none", t2, className);
    $[5] = className;
    $[6] = t2;
    $[7] = t3;
  } else {
    t3 = $[7];
  }
  let t4;
  if ($[8] !== children || $[9] !== ref || $[10] !== t1 || $[11] !== t3) {
    t4 = /*#__PURE__*/_jsx("div", {
      ...t1,
      ref: ref,
      role: "group",
      className: t3,
      children: children
    });
    $[8] = children;
    $[9] = ref;
    $[10] = t1;
    $[11] = t3;
    $[12] = t4;
  } else {
    t4 = $[12];
  }
  return t4;
});
export const ToggleButton = /*#__PURE__*/forwardRef(({
  checked,
  children,
  className,
  id,
  name,
  onChange,
  type = 'checkbox',
  value,
  variant = 'outline-primary',
  ...props
}, ref) => /*#__PURE__*/_jsxs("label", {
  className: clsx('relative cursor-pointer', className),
  children: [/*#__PURE__*/_jsx("input", {
    ...omitUiProps(props),
    ref: ref,
    id: id,
    name: name,
    type: type,
    value: value,
    checked: checked,
    onChange: onChange,
    className: "peer sr-only"
  }), /*#__PURE__*/_jsx("span", {
    className: clsx('relative inline-flex min-h-9 items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors peer-checked:z-10 peer-focus-visible:z-20 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600/20', variantClasses[variant], 'peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white'),
    children: children
  })]
}));
export const ToggleButtonGroup = t0 => {
  const $ = _c(20);
  let children;
  let className;
  let onChange;
  let props;
  let type;
  let value;
  if ($[0] !== t0) {
    ({
      children,
      className,
      onChange,
      type,
      value,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = onChange;
    $[4] = props;
    $[5] = type;
    $[6] = value;
  } else {
    children = $[1];
    className = $[2];
    onChange = $[3];
    props = $[4];
    type = $[5];
    value = $[6];
  }
  let t1;
  if ($[7] !== children || $[8] !== onChange || $[9] !== type || $[10] !== value) {
    let t2;
    if ($[12] !== onChange || $[13] !== type || $[14] !== value) {
      t2 = child => /*#__PURE__*/isValidElement(child) ? /*#__PURE__*/cloneElement(child, {
        checked: type === "checkbox" ? Array.isArray(value) && value.includes(child.props.value) : value === child.props.value,
        onChange: event => {
          child.props.onChange?.(event);
          if (type === "checkbox") {
            const next = new Set(Array.isArray(value) ? value : []);
            event.target.checked ? next.add(child.props.value) : next.delete(child.props.value);
            onChange?.([...next]);
          } else {
            onChange?.(child.props.value);
          }
        }
      }) : child;
      $[12] = onChange;
      $[13] = type;
      $[14] = value;
      $[15] = t2;
    } else {
      t2 = $[15];
    }
    t1 = Children.map(children, t2);
    $[7] = children;
    $[8] = onChange;
    $[9] = type;
    $[10] = value;
    $[11] = t1;
  } else {
    t1 = $[11];
  }
  let t2;
  if ($[16] !== className || $[17] !== props || $[18] !== t1) {
    t2 = /*#__PURE__*/_jsx(ButtonGroup, {
      ...props,
      className: className,
      children: t1
    });
    $[16] = className;
    $[17] = props;
    $[18] = t1;
    $[19] = t2;
  } else {
    t2 = $[19];
  }
  return t2;
};
export { DropdownDivider, DropdownItem };
//# sourceMappingURL=Dropdown.js.map
