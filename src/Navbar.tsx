import {createContext, forwardRef, useContext, useEffect, useId, useState} from 'react';
import {clsx} from 'clsx';
import {Dropdown, DropdownDivider, DropdownItem} from './Dropdown.js';
import {omitUiProps, type AnyProps} from './utils.js';
import {useUiLabels} from './UiProvider.js';
import {useForwardedRef} from './useForwardedRef.js';

type NavbarContextValue = {
    collapseOnSelect: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
    openDropdown: string | null;
    setOpenDropdown: (id: string | null) => void;
};
const NavbarContext = createContext<NavbarContextValue | null>(null);
const NavbarBase = forwardRef<HTMLElement, AnyProps>(
    ({as = 'nav', children, className, defaultExpanded, collapseOnSelect = false, ...props}, ref) => {
        const [open, setOpen] = useState(Boolean(defaultExpanded));
        const [openDropdown, setOpenDropdown] = useState<string | null>(null);
        const [rootRef, setRootRef] = useForwardedRef(ref);

        useEffect(() => {
            if (!open && openDropdown === null) return;

            const closeWhenClickingOutside = (event: MouseEvent) => {
                if (
                    event.target instanceof Node &&
                    !rootRef.current?.contains(event.target)
                ) {
                    setOpen(false);
                    setOpenDropdown(null);
                }
            };

            document.addEventListener('mousedown', closeWhenClickingOutside);
            return () => {
                document.removeEventListener(
                    'mousedown',
                    closeWhenClickingOutside
                );
            };
        }, [open, openDropdown, rootRef]);

        const Component = as;
        return (
            <NavbarContext.Provider
                value={{open, setOpen, openDropdown, setOpenDropdown, collapseOnSelect}}>
                <Component
                    {...omitUiProps(props)}
                    ref={setRootRef}
                    className={clsx(
                        'relative z-40 flex flex-wrap items-center justify-between bg-white py-2 dark:bg-[var(--ui-surface-muted)]',
                        className
                    )}>
                    {children}
                </Component>
            </NavbarContext.Provider>
        );
    }
);
const NavbarToggle = (props: AnyProps) => {
    const navbar = useContext(NavbarContext);
    const labels = useUiLabels();
    return (
        <button
            {...omitUiProps(props)}
            type="button"
            aria-expanded={navbar?.open}
            onClick={() => {
                const nextOpen = !navbar?.open;
                navbar?.setOpen(nextOpen);
                if (!nextOpen) navbar?.setOpenDropdown(null);
            }}
            className={clsx(
                'inline-flex h-10 w-14 items-center justify-center rounded-md border border-black/15 px-3 py-1 dark:border-white/20 md:hidden',
                props.className
            )}>
            <span className="sr-only">{labels.toggleNavigation}</span>
            <span
                aria-hidden="true"
                className="flex h-[30px] w-[30px] flex-col items-center justify-center gap-[5px]">
                <span className="block h-0.5 w-6 rounded-full bg-black/55 dark:bg-white/70" />
                <span className="block h-0.5 w-6 rounded-full bg-black/55 dark:bg-white/70" />
                <span className="block h-0.5 w-6 rounded-full bg-black/55 dark:bg-white/70" />
            </span>
        </button>
    );
};
const NavbarCollapse = ({children, className, ...props}: AnyProps) => {
    const navbar = useContext(NavbarContext);
    return (
        <div
            {...omitUiProps(props)}
            className={clsx(
                'w-full grow basis-full md:flex md:w-auto md:flex-1 md:basis-auto md:items-center',
                navbar?.open ? 'block' : 'hidden',
                className
            )}>
            {children}
        </div>
    );
};
export const Navbar = Object.assign(NavbarBase, {
    Collapse: NavbarCollapse,
    Toggle: NavbarToggle,
});

export const NavDropdown = Object.assign(
    ({
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
    }: AnyProps) => {
        const navbar = useContext(NavbarContext);
        const id = useId();
        const isNavbarManaged = navbar !== null && show === undefined;

        return (
            <Dropdown
                {...props}
                show={isNavbarManaged ? navbar.openDropdown === id : show}
                onSelect={key => {
                    onSelect?.(key);
                    if (navbar?.collapseOnSelect) navbar.setOpen(false);
                }}
                onToggle={nextShow => {
                    onToggle?.(nextShow);
                    if (isNavbarManaged) {
                        navbar.setOpenDropdown(nextShow ? id : null);
                    }
                }}
                className={clsx('w-full md:w-auto', className)}>
                <Dropdown.Toggle
                    variant="link"
                    caret={false}
                    data-qa={dataQa}
                    className="group w-full justify-start gap-1.5 border-0 px-0 py-2 !text-base !font-normal !text-[rgba(0,0,0,0.65)] !no-underline hover:!text-[rgba(0,0,0,0.8)] hover:!no-underline dark:!text-[rgba(255,255,255,0.65)] dark:hover:!text-[rgba(255,255,255,0.8)] md:w-auto md:px-2">
                    {title}
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="h-3 w-3 translate-y-px shrink-0 opacity-60 transition-transform duration-150 group-aria-expanded:rotate-180">
                        <path
                            d="m3 4.5 3 3 3-3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu align={align} className={menuClassName}>
                    {children}
                </Dropdown.Menu>
            </Dropdown>
        );
    },
    {
        Divider: DropdownDivider,
        Item: DropdownItem,
    }
);
