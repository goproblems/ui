import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, } from 'react';
import { clsx } from 'clsx';
import { omitUiProps } from './utils.js';
export const variantClasses = {
    'primary': 'border-blue-600 bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500',
    'secondary': 'border-neutral-600 bg-neutral-600 text-white hover:border-neutral-700 hover:bg-neutral-700 focus-visible:ring-neutral-500',
    'success': 'border-emerald-700 bg-emerald-700 text-white hover:border-emerald-800 hover:bg-emerald-800 focus-visible:ring-emerald-500',
    'danger': 'border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 focus-visible:ring-red-500',
    'warning': 'border-amber-400 bg-amber-400 text-neutral-950 hover:border-amber-500 hover:bg-amber-500 focus-visible:ring-amber-500',
    'info': 'border-cyan-700 bg-cyan-700 text-white hover:border-cyan-800 hover:bg-cyan-800 focus-visible:ring-cyan-500',
    'light': 'border-[var(--ui-border)] bg-[var(--ui-surface-muted)] text-[var(--ui-text)] hover:border-[var(--ui-border-strong)] hover:bg-[var(--ui-surface-active)] focus-visible:ring-[var(--ui-focus-ring)]',
    'dark': 'border-neutral-800 bg-neutral-800 text-white hover:border-neutral-950 hover:bg-neutral-950 focus-visible:ring-neutral-500',
    'link': 'border-transparent bg-transparent text-[var(--ui-link)] underline underline-offset-2 hover:text-[var(--ui-link-hover)] focus-visible:ring-[var(--ui-focus-ring)]',
    'outline-secondary': 'border-[var(--ui-border)] bg-transparent text-[var(--ui-text-secondary)] hover:border-[var(--ui-border-strong)] hover:bg-[var(--ui-surface-hover)] hover:text-[var(--ui-text-emphasis)] focus-visible:ring-[var(--ui-focus-ring)]',
    'outline-primary': 'border-[var(--ui-accent-border)] bg-transparent text-[var(--ui-accent)] hover:border-[var(--ui-accent)] hover:bg-[var(--ui-accent-bg)] focus-visible:ring-[var(--ui-focus-ring)]',
    'outline-success': 'border-[var(--ui-success-border)] bg-transparent text-[var(--ui-success)] hover:border-[var(--ui-success)] hover:bg-[var(--ui-success-bg)] focus-visible:ring-[var(--ui-focus-ring)]',
    'outline-danger': 'border-[var(--ui-danger-border)] bg-transparent text-[var(--ui-danger)] hover:border-[var(--ui-danger)] hover:bg-[var(--ui-danger-bg)] focus-visible:ring-[var(--ui-focus-ring)]',
    'outline-warning': 'border-[var(--ui-warning-border)] bg-transparent text-[var(--ui-warning)] hover:border-[var(--ui-warning)] hover:bg-[var(--ui-warning-bg)] focus-visible:ring-[var(--ui-focus-ring)]',
    'outline-info': 'border-[var(--ui-info-border)] bg-transparent text-[var(--ui-info)] hover:border-[var(--ui-info)] hover:bg-[var(--ui-info-bg)] focus-visible:ring-[var(--ui-focus-ring)]',
};
export const sizeClasses = {
    sm: 'rounded px-2 py-1 text-sm leading-[21px]',
    lg: 'rounded-lg px-4 py-2 text-xl leading-[30px]',
};
export const Button = forwardRef(function Button({ as, className, children, disabled, href, size, type, variant = 'primary', ...props }, ref) {
    const Component = as ?? (href ? 'a' : 'button');
    return (_jsx(Component, { ...omitUiProps(props), ref: ref, "data-ui": "button", href: href, type: Component === 'button' ? (type ?? 'button') : undefined, "aria-disabled": disabled || undefined, disabled: Component === 'button' ? disabled : undefined, className: clsx('inline-flex items-center justify-center border font-normal transition-colors focus:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-65', size
            ? sizeClasses[size]
            : 'rounded-md px-3 py-1.5 text-base leading-6', variantClasses[variant] ?? variantClasses.primary, className), children: children }));
});
//# sourceMappingURL=Button.js.map