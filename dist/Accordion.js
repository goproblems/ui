import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { omitUiProps } from './utils.js';
const AccordionContext = createContext({
    active: [],
    toggle: () => undefined,
});
const AccordionItemContext = createContext(null);
const AccordionBase = ({ activeKey, alwaysOpen, children, className, defaultActiveKey, flush, onSelect, }) => {
    const normalize = (key) => Array.isArray(key) ? key : key == null ? [] : [key];
    const [internalActive, setInternalActive] = useState(normalize(defaultActiveKey));
    const selected = activeKey === undefined ? internalActive : normalize(activeKey);
    const isFlush = flush ||
        String(className ?? '')
            .split(/\s+/)
            .includes('accordion-flush');
    const toggle = (key) => {
        const next = alwaysOpen && selected.includes(key)
            ? selected.filter(entry => entry !== key)
            : alwaysOpen
                ? [...selected, key]
                : selected.includes(key)
                    ? []
                    : [key];
        setInternalActive(next);
        onSelect?.(alwaysOpen ? next : (next[0] ?? null));
    };
    return (_jsx(AccordionContext.Provider, { value: { active: selected, toggle }, children: _jsx("div", { className: clsx('overflow-hidden', isFlush
                ? 'divide-y divide-[var(--ui-border)]'
                : 'divide-y divide-[var(--ui-border)] rounded-md border border-[var(--ui-border)]', className), children: children }) }));
};
const AccordionItem = ({ children, eventKey, ...props }) => (_jsx(AccordionItemContext.Provider, { value: eventKey, children: _jsx("div", { ...omitUiProps(props), children: children }) }));
const AccordionHeader = ({ children, className, ...props }) => {
    const key = useContext(AccordionItemContext);
    const accordion = useContext(AccordionContext);
    const open = accordion.active.includes(key);
    return (_jsx("h2", { className: "m-0", children: _jsxs("button", { ...omitUiProps(props), type: "button", "aria-expanded": open, onClick: () => accordion.toggle(key), className: clsx('flex w-full items-center justify-between px-5 py-4 text-left text-base font-normal leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--ui-focus-ring)]', open
                ? 'bg-[var(--ui-surface-active)] text-[var(--ui-text-emphasis)]'
                : 'bg-[var(--ui-surface)] text-[var(--ui-text)]', className), children: [children, _jsx("span", { "aria-hidden": "true", className: clsx('mr-1 h-3 w-3 shrink-0 border-r border-b border-current transition-transform', open ? 'rotate-[225deg]' : 'rotate-45') })] }) }));
};
const AccordionBody = ({ children, className, ...props }) => {
    const key = useContext(AccordionItemContext);
    const accordion = useContext(AccordionContext);
    if (!accordion.active.includes(key))
        return null;
    return (_jsx("div", { ...omitUiProps(props), className: clsx('px-5 py-4', className), children: children }));
};
export const Accordion = Object.assign(AccordionBase, {
    Body: AccordionBody,
    Header: AccordionHeader,
    Item: AccordionItem,
});
//# sourceMappingURL=Accordion.js.map