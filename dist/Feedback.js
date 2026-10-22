import { c as _c } from "react/compiler-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { omitUiProps, renderAs } from './utils.js';
import { useUiLabels } from './UiProvider.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const alertClasses = {
  'primary': 'border-[var(--ui-accent-border)] bg-[var(--ui-accent-bg)] text-[var(--ui-accent)]',
  'success': 'border-[var(--ui-success-border)] bg-[var(--ui-success-bg)] text-[var(--ui-success)]',
  'danger': 'border-[var(--ui-danger-border)] bg-[var(--ui-danger-bg)] text-[var(--ui-danger)]',
  'warning': 'border-[var(--ui-warning-border)] bg-[var(--ui-warning-bg)] text-[var(--ui-warning)]',
  'info': 'border-[var(--ui-info-border)] bg-[var(--ui-info-bg)] text-[var(--ui-info)]',
  'secondary': 'border-[var(--ui-border)] bg-[var(--ui-surface-muted)] text-[var(--ui-text-secondary)]',
  'light': 'border-[var(--ui-border)] bg-[var(--ui-surface)] text-[var(--ui-text-secondary)]',
  'dark': 'border-[var(--ui-border)] bg-[var(--ui-surface-active)] text-[var(--ui-text-secondary)]'
};
const AlertBase = /*#__PURE__*/forwardRef(({
  className,
  children,
  dismissible,
  onClose,
  show = true,
  variant = 'primary',
  ...props
}, ref) => {
  const labels = useUiLabels();
  return show ? /*#__PURE__*/_jsxs("div", {
    ...omitUiProps(props),
    ref: ref,
    role: props.role ?? 'alert',
    className: clsx('relative rounded-md border p-4', alertClasses[variant] ?? alertClasses.primary, dismissible && 'pr-10', className),
    children: [children, dismissible && /*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: onClose,
      "aria-label": labels.close,
      className: "absolute right-2 top-2 rounded p-1 text-current opacity-70 hover:opacity-100",
      children: "×"
    })]
  }) : null;
});
const AlertHeading = props => renderAs('h4', props, 'mb-2 text-lg font-semibold');
export const Alert = Object.assign(AlertBase, {
  Heading: AlertHeading
});
const softBadgeClasses = {
  primary: 'bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:ring-blue-800',
  secondary: 'bg-neutral-100 text-neutral-700 ring-1 ring-inset ring-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 dark:ring-neutral-600',
  success: 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800',
  danger: 'bg-red-100 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950 dark:text-red-200 dark:ring-red-800',
  warning: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-800',
  info: 'bg-cyan-100 text-cyan-800 ring-1 ring-inset ring-cyan-200 dark:bg-cyan-950 dark:text-cyan-200 dark:ring-cyan-800',
  light: 'bg-neutral-50 text-neutral-700 ring-1 ring-inset ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-700',
  dark: 'bg-neutral-800 text-neutral-100 ring-1 ring-inset ring-neutral-700 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600'
};
const solidBadgeClasses = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-neutral-600 text-white',
  success: 'bg-emerald-700 text-white',
  danger: 'bg-red-600 text-white',
  warning: 'bg-amber-400 text-neutral-950',
  info: 'bg-cyan-700 text-white',
  light: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100',
  dark: 'bg-neutral-900 text-white dark:bg-neutral-700'
};
export const Badge = /*#__PURE__*/forwardRef(({
  appearance = 'soft',
  as = 'span',
  className,
  children,
  bg = 'secondary',
  pill,
  ...props
}, ref) => {
  const Component = as;
  const color = bg;
  const appearanceClasses = appearance === 'solid' ? solidBadgeClasses : softBadgeClasses;
  return /*#__PURE__*/_jsx(Component, {
    ...omitUiProps(props),
    ref: ref,
    className: clsx('badge inline-flex items-center whitespace-nowrap px-2 py-0.5 text-xs font-medium leading-4', pill ? 'rounded-full' : 'rounded', appearanceClasses[color] ?? appearanceClasses.secondary, className),
    children: children
  });
});
Badge.displayName = 'Badge';
export const Spinner = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(10);
  const {
    className,
    animation,
    size,
    children,
    ...props
  } = t0;
  const labels = useUiLabels();
  const t1 = omitUiProps(props);
  const t2 = props.role ?? "status";
  const t3 = props["aria-label"] ?? labels.loading;
  const t4 = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  let t5;
  if ($[0] !== className || $[1] !== t4) {
    t5 = clsx("inline-block animate-spin rounded-full border-2 border-current border-r-transparent align-[-0.125em]", t4, className);
    $[0] = className;
    $[1] = t4;
    $[2] = t5;
  } else {
    t5 = $[2];
  }
  let t6;
  if ($[3] !== children || $[4] !== ref || $[5] !== t1 || $[6] !== t2 || $[7] !== t3 || $[8] !== t5) {
    t6 = /*#__PURE__*/_jsx("span", {
      ...t1,
      ref: ref,
      role: t2,
      "aria-label": t3,
      className: t5,
      children: children
    });
    $[3] = children;
    $[4] = ref;
    $[5] = t1;
    $[6] = t2;
    $[7] = t3;
    $[8] = t5;
    $[9] = t6;
  } else {
    t6 = $[9];
  }
  return t6;
});
export const Table = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(23);
  let bordered;
  let children;
  let className;
  let compact;
  let hover;
  let responsive;
  let striped;
  let t1;
  if ($[0] !== t0) {
    const {
      bordered: t2,
      children: t3,
      className: t4,
      hover: t5,
      responsive: t6,
      size,
      striped: t7,
      ...props
    } = t0;
    bordered = t2;
    children = t3;
    className = t4;
    hover = t5;
    responsive = t6;
    striped = t7;
    compact = size === "sm" || String(className ?? "").split(/\s+/).includes("table-sm");
    t1 = omitUiProps(props);
    $[0] = t0;
    $[1] = bordered;
    $[2] = children;
    $[3] = className;
    $[4] = compact;
    $[5] = hover;
    $[6] = responsive;
    $[7] = striped;
    $[8] = t1;
  } else {
    bordered = $[1];
    children = $[2];
    className = $[3];
    compact = $[4];
    hover = $[5];
    responsive = $[6];
    striped = $[7];
    t1 = $[8];
  }
  const t2 = compact ? "[&_td]:p-1 [&_th]:p-1" : "[&_td]:p-2 [&_th]:p-2";
  const t3 = bordered && "[&_td]:border [&_th]:border [&_td]:border-[var(--ui-border)] [&_th]:border-[var(--ui-border)]";
  const t4 = hover && "[&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-[var(--ui-surface-hover)]";
  const t5 = striped && "[&_tbody_tr:nth-child(odd)]:bg-[var(--ui-surface-muted)]";
  let t6;
  if ($[9] !== className || $[10] !== t2 || $[11] !== t3 || $[12] !== t4 || $[13] !== t5) {
    t6 = clsx("w-full border-collapse text-left align-middle text-base [&_td]:border-b [&_td]:border-[var(--ui-border)] [&_th]:border-b [&_th]:border-[var(--ui-border)] [&_th]:font-semibold", t2, t3, t4, t5, className);
    $[9] = className;
    $[10] = t2;
    $[11] = t3;
    $[12] = t4;
    $[13] = t5;
    $[14] = t6;
  } else {
    t6 = $[14];
  }
  let t7;
  if ($[15] !== children || $[16] !== ref || $[17] !== t1 || $[18] !== t6) {
    t7 = /*#__PURE__*/_jsx("table", {
      ...t1,
      ref: ref,
      className: t6,
      children: children
    });
    $[15] = children;
    $[16] = ref;
    $[17] = t1;
    $[18] = t6;
    $[19] = t7;
  } else {
    t7 = $[19];
  }
  const table = t7;
  let t8;
  if ($[20] !== responsive || $[21] !== table) {
    t8 = responsive ? /*#__PURE__*/_jsx("div", {
      className: "w-full overflow-x-auto",
      "data-ui": "table-scroll",
      children: table
    }) : table;
    $[20] = responsive;
    $[21] = table;
    $[22] = t8;
  } else {
    t8 = $[22];
  }
  return t8;
});
//# sourceMappingURL=Feedback.js.map
