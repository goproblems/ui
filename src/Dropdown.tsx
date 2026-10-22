import {Children, cloneElement, createContext, forwardRef, isValidElement, useCallback, useContext, useEffect, useState, type ElementType, type ForwardRefExoticComponent, type HTMLAttributes, type Ref, type RefAttributes} from 'react';
import {clsx} from 'clsx';
import {sizeClasses, variantClasses} from './Button.js';
import {omitUiProps, type AnyProps, type SelectKey} from './utils.js';
import {useForwardedRef} from './useForwardedRef.js';

type DropdownContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSelect?: (key: SelectKey) => void;
};
type DropdownProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
    align?: string;
    as?: ElementType;
    defaultShow?: boolean;
    onSelect?: (key: string | null) => void;
    onToggle?: (show: boolean) => void;
    show?: boolean;
};
const DropdownContext = createContext<DropdownContextValue | null>(null);

const DropdownBase = forwardRef<HTMLDivElement, AnyProps>(
    (
        {
            as: Component = 'div',
            children,
            className,
            defaultShow,
            onSelect,
            onToggle,
            show,
            ...props
        },
        ref
    ) => {
        const [internalOpen, setInternalOpen] = useState(Boolean(defaultShow));
        const [rootRef, setRootRef] = useForwardedRef(ref);
        const isOpen = show ?? internalOpen;
        const setOpen = useCallback((next: boolean) => {
            setInternalOpen(next);
            onToggle?.(next);
        }, [onToggle]);

        useEffect(() => {
            if (!isOpen) return;

            const closeWhenClickingOutside = (event: MouseEvent) => {
                if (
                    event.target instanceof Node &&
                    !rootRef.current?.contains(event.target)
                ) {
                    setOpen(false);
                }
            };

            document.addEventListener('mousedown', closeWhenClickingOutside);
            return () => {
                document.removeEventListener(
                    'mousedown',
                    closeWhenClickingOutside
                );
            };
        }, [isOpen, rootRef, setOpen]);

        return (
            <DropdownContext.Provider
                value={{
                    open: isOpen,
                    setOpen,
                    onSelect: key => {
                        onSelect?.(key);
                        setOpen(false);
                    },
                }}>
                <Component
                    {...omitUiProps(props)}
                    ref={setRootRef as Ref<HTMLElement>}
                    className={clsx(
                        'relative inline-flex',
                        isOpen && 'z-[1000]',
                        className
                    )}>
                    {children}
                </Component>
            </DropdownContext.Provider>
        );
    }
);
const DropdownToggle = forwardRef<HTMLElement, AnyProps>((props, ref) => {
    const dropdown = useContext(DropdownContext);
    return (
        <button
            {...omitUiProps(props)}
            ref={ref as Ref<HTMLButtonElement>}
            type="button"
            disabled={props.disabled}
            aria-expanded={dropdown?.open}
            aria-haspopup="menu"
            onClick={(event: any) => {
                props.onClick?.(event);
                if (event.defaultPrevented || props.disabled) return;
                dropdown?.setOpen(!dropdown.open);
            }}
            className={clsx(
                'inline-flex list-none items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-base font-normal leading-6 transition-colors focus:outline-none focus-visible:ring-2',
                variantClasses[props.variant ?? 'primary'] ??
                    variantClasses.primary,
                props.size && sizeClasses[props.size],
                props.disabled && 'pointer-events-none opacity-50',
                props.className
            )}>
            {props.children}
            {props.caret !== false && <span aria-hidden="true">▾</span>}
        </button>
    );
});
const DropdownMenu = forwardRef<HTMLDivElement, AnyProps>(
    ({align, children, className, ...props}, ref) => {
        const dropdown = useContext(DropdownContext);
        if (!dropdown?.open) return null;

        return (
            <div
                {...omitUiProps(props)}
                ref={ref}
                role="menu"
                className={clsx(
                    'absolute top-full z-[1000] mt-1 w-max min-w-44 max-w-[calc(100vw-1rem)] rounded-md border border-neutral-200 bg-white p-1 shadow-lg transition-opacity dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface)]',
                    'visible pointer-events-auto opacity-100',
                    align === 'end' ? 'right-0' : 'left-0',
                    className
                )}>
                {children}
            </div>
        );
    }
);
const DropdownItem = forwardRef<HTMLElement, AnyProps>(
    (
        {
            active,
            as,
            children,
            className,
            disabled,
            eventKey,
            href,
            ...props
        },
        ref
    ) => {
        const dropdown = useContext(DropdownContext);
        const Component = as ?? (href ? 'a' : 'button');
        return (
            <Component
                {...omitUiProps(props)}
                ref={ref}
                href={href}
                role="menuitem"
                type={Component === 'button' ? 'button' : undefined}
                disabled={Component === 'button' ? disabled : undefined}
                onClick={(event: any) => {
                    props.onClick?.(event);
                    if (!event.defaultPrevented && !disabled) {
                        dropdown?.onSelect?.(eventKey ?? null);
                        dropdown?.setOpen(false);
                    }
                }}
                className={clsx(
                    'flex w-full items-center break-words rounded px-3 py-2 text-left text-sm whitespace-normal text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-[var(--ui-text)] dark:hover:bg-[var(--ui-surface-muted)] md:whitespace-nowrap',
                    active && 'bg-blue-50 text-blue-700 dark:bg-blue-950',
                    disabled && 'pointer-events-none opacity-50',
                    className
                )}>
                {children}
            </Component>
        );
    }
);
const DropdownDivider = (props: AnyProps) => (
    <hr
        {...omitUiProps(props)}
        className={clsx(
            'my-1 border-neutral-200 dark:border-[var(--ui-border)]',
            props.className
        )}
    />
);
export const Dropdown = Object.assign(
    DropdownBase as ForwardRefExoticComponent<
        DropdownProps & RefAttributes<HTMLDivElement>
    >,
    {
        Divider: DropdownDivider,
        Item: DropdownItem,
        Menu: DropdownMenu,
        Toggle: DropdownToggle,
    }
);

export const DropdownButton = ({
    children,
    id,
    onSelect,
    title,
    variant,
    ...props
}: AnyProps) => (
    <Dropdown {...props} onSelect={onSelect}>
        <Dropdown.Toggle id={id} variant={variant}>
            {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
);

export const ButtonGroup = forwardRef<HTMLDivElement, AnyProps>(
    ({className, children, vertical, ...props}, ref) => (
        <div
            {...omitUiProps(props)}
            ref={ref}
            role="group"
            className={clsx(
                'isolate inline-flex [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>button:has(+[role=menu])]:!rounded-r-md [&>label:first-child>span]:rounded-r-none [&>label:last-child>span]:rounded-l-none [&>label:not(:first-child):not(:last-child)>span]:rounded-none',
                vertical &&
                    'flex-col [&>*:not(:first-child)]:-mt-px [&>*]:ml-0 [&>label:first-child>span]:rounded-b-none [&>label:first-child>span]:rounded-t-md [&>label:last-child>span]:rounded-b-md [&>label:last-child>span]:rounded-t-none',
                className
            )}>
            {children}
        </div>
    )
);

export const ToggleButton = forwardRef<HTMLInputElement, AnyProps>(
    (
        {
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
        },
        ref
    ) => (
        <label className={clsx('relative cursor-pointer', className)}>
            <input
                {...omitUiProps(props)}
                ref={ref}
                id={id}
                name={name}
                type={type}
                value={value}
                checked={checked}
                onChange={onChange}
                className="peer sr-only"
            />
            <span
                className={clsx(
                    'relative inline-flex min-h-9 items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors peer-checked:z-10 peer-focus-visible:z-20 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600/20',
                    variantClasses[variant],
                    'peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white'
                )}>
                {children}
            </span>
        </label>
    )
);

export const ToggleButtonGroup = ({
    children,
    className,
    onChange,
    type,
    value,
    ...props
}: AnyProps) => (
    <ButtonGroup {...props} className={className}>
        {Children.map(children, child =>
            isValidElement<AnyProps>(child)
                ? cloneElement(child, {
                      checked:
                          type === 'checkbox'
                              ? Array.isArray(value) &&
                                value.includes(child.props.value)
                              : value === child.props.value,
                      onChange: (event: any) => {
                          child.props.onChange?.(event);
                          if (type === 'checkbox') {
                              const next = new Set(Array.isArray(value) ? value : []);
                              event.target.checked
                                  ? next.add(child.props.value)
                                  : next.delete(child.props.value);
                              onChange?.([...next]);
                          } else {
                              onChange?.(child.props.value);
                          }
                      },
                  })
                : child
        )}
    </ButtonGroup>
);

export {DropdownDivider, DropdownItem};
