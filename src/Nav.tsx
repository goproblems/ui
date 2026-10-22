import {forwardRef, useContext} from 'react';
import {clsx} from 'clsx';
import {TabsContext} from './Tabs.js';
import {omitUiProps, renderAs, type AnyProps} from './utils.js';

const NavBase = forwardRef<HTMLElement, AnyProps>(
    ({as = 'div', children, className, fill, justify, variant, ...props}, ref) => {
        const Component = as;
        return (
            <Component
                {...omitUiProps(props)}
                ref={ref}
                className={clsx(
                    'flex flex-wrap',
                    variant === 'tabs' &&
                        'border-b border-neutral-200 dark:border-[var(--ui-border)]',
                    (fill || justify) && '[&>*]:flex-1',
                    className
                )}>
                {children}
            </Component>
        );
    }
);
const NavItem = (props: AnyProps) => renderAs('div', props);
const NavLink = forwardRef<HTMLElement, AnyProps>(
    (
        {active, as, children, className, disabled, eventKey, href, ...props},
        ref
    ) => {
        const tabs = useContext(TabsContext);
        const selected = active ?? tabs.activeKey === eventKey;
        const Component = as ?? (href ? 'a' : 'button');
        return (
            <Component
                {...omitUiProps(props)}
                ref={ref}
                href={href}
                type={Component === 'button' ? 'button' : undefined}
                disabled={Component === 'button' ? disabled : undefined}
                aria-current={selected ? 'page' : undefined}
                onClick={(event: any) => {
                    props.onClick?.(event);
                    if (!event.defaultPrevented && !disabled && eventKey != null) {
                        tabs.onSelect?.(eventKey);
                    }
                }}
                className={clsx(
                    'block rounded-md px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-[var(--ui-text-secondary)] dark:hover:bg-[var(--ui-surface-muted)] dark:hover:text-[var(--ui-text-emphasis)]',
                    selected &&
                        'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
                    disabled && 'pointer-events-none opacity-50',
                    className
                )}>
                {children}
            </Component>
        );
    }
);
export const Nav = Object.assign(NavBase, {
    Item: NavItem,
    Link: NavLink,
});
