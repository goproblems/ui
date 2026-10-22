import {createContext, useContext, useState, type ComponentType, type HTMLAttributes} from 'react';
import {clsx} from 'clsx';
import {omitUiProps, type AnyProps, type SelectKey} from './utils.js';

type AccordionContextValue = {
    active: SelectKey[];
    toggle: (key: SelectKey) => void;
};
type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
    activeKey?: SelectKey | SelectKey[];
    alwaysOpen?: boolean;
    defaultActiveKey?: SelectKey | SelectKey[];
    flush?: boolean;
    onSelect?: (key: string | string[] | null) => void;
};
const AccordionContext = createContext<AccordionContextValue>({
    active: [],
    toggle: () => undefined,
});
const AccordionItemContext = createContext<SelectKey>(null);
const AccordionBase = ({
    activeKey,
    alwaysOpen,
    children,
    className,
    defaultActiveKey,
    flush,
    onSelect,
}: AnyProps) => {
    const normalize = (key: any): SelectKey[] =>
        Array.isArray(key) ? key : key == null ? [] : [key];
    const [internalActive, setInternalActive] = useState<SelectKey[]>(
        normalize(defaultActiveKey)
    );
    const selected = activeKey === undefined ? internalActive : normalize(activeKey);
    const isFlush =
        flush ||
        String(className ?? '')
            .split(/\s+/)
            .includes('accordion-flush');
    const toggle = (key: SelectKey) => {
        const next =
            alwaysOpen && selected.includes(key)
                ? selected.filter(entry => entry !== key)
                : alwaysOpen
                  ? [...selected, key]
                  : selected.includes(key)
                    ? []
                    : [key];
        setInternalActive(next);
        onSelect?.(alwaysOpen ? next : (next[0] ?? null));
    };
    return (
        <AccordionContext.Provider value={{active: selected, toggle}}>
            <div
                className={clsx(
                    'overflow-hidden',
                    isFlush
                        ? 'divide-y divide-[var(--ui-border)]'
                        : 'divide-y divide-[var(--ui-border)] rounded-md border border-[var(--ui-border)]',
                    className
                )}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
};
const AccordionItem = ({children, eventKey, ...props}: AnyProps) => (
    <AccordionItemContext.Provider value={eventKey}>
        <div {...omitUiProps(props)}>{children}</div>
    </AccordionItemContext.Provider>
);
const AccordionHeader = ({children, className, ...props}: AnyProps) => {
    const key = useContext(AccordionItemContext);
    const accordion = useContext(AccordionContext);
    const open = accordion.active.includes(key);
    return (
        <h2 className="m-0">
            <button
                {...omitUiProps(props)}
                type="button"
                aria-expanded={open}
                onClick={() => accordion.toggle(key)}
                className={clsx(
                    'flex w-full items-center justify-between px-5 py-4 text-left text-base font-normal leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--ui-focus-ring)]',
                    open
                        ? 'bg-[var(--ui-surface-active)] text-[var(--ui-text-emphasis)]'
                        : 'bg-[var(--ui-surface)] text-[var(--ui-text)]',
                    className
                )}>
                {children}
                <span
                    aria-hidden="true"
                    className={clsx(
                        'mr-1 h-3 w-3 shrink-0 border-r border-b border-current transition-transform',
                        open ? 'rotate-[225deg]' : 'rotate-45'
                    )}
                />
            </button>
        </h2>
    );
};
const AccordionBody = ({children, className, ...props}: AnyProps) => {
    const key = useContext(AccordionItemContext);
    const accordion = useContext(AccordionContext);
    if (!accordion.active.includes(key)) return null;
    return (
        <div {...omitUiProps(props)} className={clsx('px-5 py-4', className)}>
            {children}
        </div>
    );
};
export const Accordion = Object.assign(AccordionBase, {
    Body: AccordionBody,
    Header: AccordionHeader,
    Item: AccordionItem,
}) as ComponentType<AccordionProps> & {
    Body: ComponentType<HTMLAttributes<HTMLDivElement>>;
    Header: ComponentType<HTMLAttributes<HTMLButtonElement>>;
    Item: ComponentType<HTMLAttributes<HTMLDivElement> & {eventKey: SelectKey}>;
};
