import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { clsx } from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { omitUiProps, renderAs } from './utils.js';
import { useUiLabels } from './UiProvider.js';
const OffcanvasContext = createContext({});
const OffcanvasBase = ({ backdrop = true, children, className, onHide, placement = 'start', show, ...props }) => {
    const labels = useUiLabels();
    const shouldReduceMotion = useReducedMotion();
    const placementClass = {
        start: 'left-0 top-0 h-full w-80',
        end: 'right-0 top-0 h-full w-80',
        top: 'left-0 top-0 w-full',
        bottom: 'bottom-0 left-0 w-full',
    };
    const hiddenPosition = shouldReduceMotion
        ? { opacity: 0 }
        : placement === 'bottom'
            ? { opacity: 0.98, y: '100%' }
            : placement === 'top'
                ? { opacity: 0.98, y: '-100%' }
                : placement === 'end'
                    ? { opacity: 0.98, x: '100%' }
                    : { opacity: 0.98, x: '-100%' };
    const transition = {
        duration: shouldReduceMotion ? 0 : 0.24,
        ease: [0.22, 1, 0.36, 1],
    };
    return (_jsxs(OffcanvasContext.Provider, { value: { onHide }, children: [_jsx(AnimatePresence, { children: show && backdrop && (_jsx(motion.button, { type: "button", "aria-label": labels.close, onClick: onHide, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: shouldReduceMotion ? 0 : 0.18 }, className: "fixed inset-0 z-40 bg-neutral-950/50" }, "offcanvas-backdrop")) }), _jsx(AnimatePresence, { children: show && (_jsx(motion.aside, { ...omitUiProps(props), role: "dialog", "aria-modal": "true", initial: hiddenPosition, animate: { opacity: 1, x: 0, y: 0 }, exit: hiddenPosition, transition: transition, className: clsx('fixed z-50 overflow-y-auto border-black/20 bg-white text-neutral-900 shadow-2xl dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface)] dark:text-[var(--ui-text)]', placementClass[placement] ?? placementClass.start, className), children: children }, `offcanvas-${placement}`)) })] }));
};
const OffcanvasHeader = ({ closeButton, children, className, ...props }) => {
    const { onHide } = useContext(OffcanvasContext);
    const labels = useUiLabels();
    return (_jsxs("div", { ...omitUiProps(props), className: clsx('flex items-center justify-between border-b border-black/20 bg-black/[0.03] p-4 dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface-muted)]', className), children: [children, closeButton && (_jsx("button", { type: "button", onClick: onHide, "aria-label": labels.close, className: "ml-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded text-xl leading-none text-neutral-500 transition-colors hover:bg-neutral-200/70 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-100", children: _jsx("span", { "aria-hidden": "true", children: "\u00D7" }) }))] }));
};
const OffcanvasTitle = (props) => renderAs('h5', props, 'text-lg font-semibold');
const OffcanvasBody = (props) => renderAs('div', props, 'p-4');
export const Offcanvas = Object.assign(OffcanvasBase, {
    Body: OffcanvasBody,
    Header: OffcanvasHeader,
    Title: OffcanvasTitle,
});
export const Collapse = ({ children, className, in: expanded, ...props }) => expanded ? (_jsx("div", { ...omitUiProps(props), className: className, children: children })) : null;
//# sourceMappingURL=Offcanvas.js.map