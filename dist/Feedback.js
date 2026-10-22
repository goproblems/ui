import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { omitUiProps, renderAs } from './utils.js';
import { useUiLabels } from './UiProvider.js';
const alertClasses = {
    'primary': 'border-[var(--ui-accent-border)] bg-[var(--ui-accent-bg)] text-[var(--ui-accent)]',
    'success': 'border-[var(--ui-success-border)] bg-[var(--ui-success-bg)] text-[var(--ui-success)]',
    'danger': 'border-[var(--ui-danger-border)] bg-[var(--ui-danger-bg)] text-[var(--ui-danger)]',
    'warning': 'border-[var(--ui-warning-border)] bg-[var(--ui-warning-bg)] text-[var(--ui-warning)]',
    'info': 'border-[var(--ui-info-border)] bg-[var(--ui-info-bg)] text-[var(--ui-info)]',
    'secondary': 'border-[var(--ui-border)] bg-[var(--ui-surface-muted)] text-[var(--ui-text-secondary)]',
    'light': 'border-[var(--ui-border)] bg-[var(--ui-surface)] text-[var(--ui-text-secondary)]',
    'dark': 'border-[var(--ui-border)] bg-[var(--ui-surface-active)] text-[var(--ui-text-secondary)]',
};
const AlertBase = forwardRef(({ className, children, dismissible, onClose, show = true, variant = 'primary', ...props }, ref) => {
    const labels = useUiLabels();
    return show ? (_jsxs("div", { ...omitUiProps(props), ref: ref, role: props.role ?? 'alert', className: clsx('relative rounded-md border p-4', alertClasses[variant] ?? alertClasses.primary, dismissible && 'pr-10', className), children: [children, dismissible && (_jsx("button", { type: "button", onClick: onClose, "aria-label": labels.close, className: "absolute right-2 top-2 rounded p-1 text-current opacity-70 hover:opacity-100", children: "\u00D7" }))] })) : null;
});
const AlertHeading = (props) => renderAs('h4', props, 'mb-2 text-lg font-semibold');
export const Alert = Object.assign(AlertBase, {
    Heading: AlertHeading,
});
const softBadgeClasses = {
    primary: 'bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:ring-blue-800',
    secondary: 'bg-neutral-100 text-neutral-700 ring-1 ring-inset ring-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 dark:ring-neutral-600',
    success: 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800',
    danger: 'bg-red-100 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950 dark:text-red-200 dark:ring-red-800',
    warning: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-800',
    info: 'bg-cyan-100 text-cyan-800 ring-1 ring-inset ring-cyan-200 dark:bg-cyan-950 dark:text-cyan-200 dark:ring-cyan-800',
    light: 'bg-neutral-50 text-neutral-700 ring-1 ring-inset ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-700',
    dark: 'bg-neutral-800 text-neutral-100 ring-1 ring-inset ring-neutral-700 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600',
};
const solidBadgeClasses = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-neutral-600 text-white',
    success: 'bg-emerald-700 text-white',
    danger: 'bg-red-600 text-white',
    warning: 'bg-amber-400 text-neutral-950',
    info: 'bg-cyan-700 text-white',
    light: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100',
    dark: 'bg-neutral-900 text-white dark:bg-neutral-700',
};
export const Badge = forwardRef(({ appearance = 'soft', as = 'span', className, children, bg = 'secondary', pill, ...props }, ref) => {
    const Component = as;
    const color = bg;
    const appearanceClasses = appearance === 'solid' ? solidBadgeClasses : softBadgeClasses;
    return (_jsx(Component, { ...omitUiProps(props), ref: ref, className: clsx('badge inline-flex items-center whitespace-nowrap px-2 py-0.5 text-xs font-medium leading-4', pill ? 'rounded-full' : 'rounded', appearanceClasses[color] ?? appearanceClasses.secondary, className), children: children }));
});
Badge.displayName = 'Badge';
export const Spinner = forwardRef(({ className, animation, size, children, ...props }, ref) => {
    const labels = useUiLabels();
    return (_jsx("span", { ...omitUiProps(props), ref: ref, role: props.role ?? 'status', "aria-label": props['aria-label'] ?? labels.loading, className: clsx('inline-block animate-spin rounded-full border-2 border-current border-r-transparent align-[-0.125em]', size === 'sm' ? 'h-4 w-4' : 'h-6 w-6', className), children: children }));
});
export const Table = forwardRef(({ bordered, children, className, hover, responsive, size, striped, ...props }, ref) => {
    const compact = size === 'sm' ||
        String(className ?? '')
            .split(/\s+/)
            .includes('table-sm');
    const table = (_jsx("table", { ...omitUiProps(props), ref: ref, className: clsx('w-full border-collapse text-left align-middle text-base [&_td]:border-b [&_td]:border-[var(--ui-border)] [&_th]:border-b [&_th]:border-[var(--ui-border)] [&_th]:font-semibold', compact ? '[&_td]:p-1 [&_th]:p-1' : '[&_td]:p-2 [&_th]:p-2', bordered &&
            '[&_td]:border [&_th]:border [&_td]:border-[var(--ui-border)] [&_th]:border-[var(--ui-border)]', hover &&
            '[&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-[var(--ui-surface-hover)]', striped &&
            '[&_tbody_tr:nth-child(odd)]:bg-[var(--ui-surface-muted)]', className), children: children }));
    return responsive ? (_jsx("div", { className: "w-full overflow-x-auto", "data-ui": "table-scroll", children: table })) : (table);
});
//# sourceMappingURL=Feedback.js.map