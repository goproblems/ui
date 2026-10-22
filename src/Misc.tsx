import {forwardRef, type ReactNode} from 'react';
import {clsx} from 'clsx';
import {omitUiProps, renderAs, type AnyProps} from './utils.js';

const progressClasses: Record<string, string> = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-neutral-600 text-white',
    success: 'bg-emerald-700 text-white',
    danger: 'bg-red-600 text-white',
    warning: 'bg-amber-400 text-neutral-950',
    info: 'bg-cyan-700 text-white',
    light: 'bg-neutral-100 text-neutral-800',
    dark: 'bg-neutral-900 text-white',
};

const PaginationItem = forwardRef<HTMLElement, AnyProps>(
    ({active, as = 'button', children, className, disabled, ...props}, ref) => {
        const Component = as;
        return (
            <Component
                {...omitUiProps(props)}
                ref={ref}
                type={Component === 'button' ? 'button' : undefined}
                disabled={Component === 'button' ? disabled : undefined}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                    'inline-flex h-9 min-w-9 items-center justify-center border border-neutral-300 px-2 text-sm hover:bg-neutral-100 dark:border-[var(--ui-border)] dark:hover:bg-[var(--ui-surface-muted)]',
                    active && 'border-blue-600 bg-blue-600 text-white',
                    disabled && 'pointer-events-none opacity-50',
                    className
                )}>
                {children}
            </Component>
        );
    }
);
const paginationControl =
    (label: string, fallback: ReactNode) =>
    ({children, ...props}: AnyProps) => (
        <PaginationItem {...props} aria-label={label}>
            {children ?? fallback}
        </PaginationItem>
    );
const PaginationBase = (props: AnyProps) =>
    renderAs(
        'nav',
        props,
        'inline-flex overflow-hidden rounded-md [&>*:not(:first-child)]:-ml-px'
    );
export const Pagination = Object.assign(PaginationBase, {
    Ellipsis: paginationControl('More pages', '…'),
    First: paginationControl('First page', '«'),
    Item: PaginationItem,
    Last: paginationControl('Last page', '»'),
    Next: paginationControl('Next page', '›'),
    Prev: paginationControl('Previous page', '‹'),
});

export const ProgressBar = forwardRef<HTMLDivElement, AnyProps>(
    (
        {
            animated,
            children,
            className,
            label,
            max = 100,
            min = 0,
            now = 0,
            striped,
            variant = 'primary',
            visuallyHidden,
            ...props
        },
        ref
    ) => {
        const percentage = Math.min(
            100,
            Math.max(0, ((Number(now) - min) / (max - min)) * 100)
        );
        return (
            <div
                {...omitUiProps(props)}
                ref={ref}
                role="progressbar"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={now}
                className={clsx(
                    'h-4 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-[var(--ui-surface-active)]',
                    className
                )}>
                <div
                    className={clsx(
                        'flex h-full items-center justify-center text-xs font-medium transition-[width]',
                        progressClasses[variant] ?? progressClasses.primary,
                        striped &&
                            'bg-[linear-gradient(45deg,rgba(255,255,255,.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.2)_50%,rgba(255,255,255,.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]',
                        animated && 'animate-pulse'
                    )}
                    style={{width: `${percentage}%`}}>
                    <span className={visuallyHidden ? 'sr-only' : ''}>
                        {label ?? children}
                    </span>
                </div>
            </div>
        );
    }
);

export const Placeholder = forwardRef<HTMLElement, AnyProps>(
    ({as = 'span', className, xs, ...props}, ref) => {
        const Component = as;
        return (
            <Component
                {...omitUiProps(props)}
                ref={ref}
                aria-hidden="true"
                className={clsx(
                    'inline-block min-h-4 animate-pulse rounded bg-neutral-300 dark:bg-[var(--ui-surface-active)]',
                    xs && `w-${xs}/12`,
                    className
                )}
            />
        );
    }
);

export const Image = forwardRef<HTMLImageElement, AnyProps>(
    ({className, fluid, rounded, roundedCircle, thumbnail, ...props}, ref) => (
        <img
            {...omitUiProps(props)}
            ref={ref}
            className={clsx(
                fluid && 'h-auto max-w-full',
                rounded && 'rounded',
                roundedCircle && 'rounded-full',
                thumbnail &&
                    'rounded border border-neutral-200 bg-white p-1 dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface)]',
                className
            )}
        />
    )
);
