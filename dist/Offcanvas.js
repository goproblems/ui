import { c as _c } from "react/compiler-runtime";
import { createContext, useContext } from 'react';
import { clsx } from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { omitUiProps, renderAs } from './utils.js';
import { useUiLabels } from './UiProvider.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const OffcanvasContext = /*#__PURE__*/createContext({});
const OffcanvasBase = ({
  backdrop = true,
  children,
  className,
  onHide,
  placement = 'start',
  show,
  ...props
}) => {
  const labels = useUiLabels();
  const shouldReduceMotion = useReducedMotion();
  const placementClass = {
    start: 'left-0 top-0 h-full w-80',
    end: 'right-0 top-0 h-full w-80',
    top: 'left-0 top-0 w-full',
    bottom: 'bottom-0 left-0 w-full'
  };
  const hiddenPosition = shouldReduceMotion ? {
    opacity: 0
  } : placement === 'bottom' ? {
    opacity: 0.98,
    y: '100%'
  } : placement === 'top' ? {
    opacity: 0.98,
    y: '-100%'
  } : placement === 'end' ? {
    opacity: 0.98,
    x: '100%'
  } : {
    opacity: 0.98,
    x: '-100%'
  };
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.24,
    ease: [0.22, 1, 0.36, 1]
  };
  return /*#__PURE__*/_jsxs(OffcanvasContext.Provider, {
    value: {
      onHide
    },
    children: [/*#__PURE__*/_jsx(AnimatePresence, {
      children: show && backdrop && /*#__PURE__*/_jsx(motion.button, {
        type: "button",
        "aria-label": labels.close,
        onClick: onHide,
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        exit: {
          opacity: 0
        },
        transition: {
          duration: shouldReduceMotion ? 0 : 0.18
        },
        className: "fixed inset-0 z-40 bg-neutral-950/50"
      }, "offcanvas-backdrop")
    }), /*#__PURE__*/_jsx(AnimatePresence, {
      children: show && /*#__PURE__*/_jsx(motion.aside, {
        ...omitUiProps(props),
        role: "dialog",
        "aria-modal": "true",
        initial: hiddenPosition,
        animate: {
          opacity: 1,
          x: 0,
          y: 0
        },
        exit: hiddenPosition,
        transition: transition,
        className: clsx('fixed z-50 overflow-y-auto border-black/20 bg-white text-neutral-900 shadow-2xl dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface)] dark:text-[var(--ui-text)]', placementClass[placement] ?? placementClass.start, className),
        children: children
      }, `offcanvas-${placement}`)
    })]
  });
};
const OffcanvasHeader = t0 => {
  const $ = _c(11);
  const {
    closeButton,
    children,
    className,
    ...props
  } = t0;
  const {
    onHide
  } = useContext(OffcanvasContext);
  const labels = useUiLabels();
  const t1 = omitUiProps(props);
  let t2;
  if ($[0] !== className) {
    t2 = clsx("flex items-center justify-between border-b border-black/20 bg-black/[0.03] p-4 dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface-muted)]", className);
    $[0] = className;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  let t3;
  if ($[2] !== closeButton || $[3] !== labels || $[4] !== onHide) {
    t3 = closeButton && /*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: onHide,
      "aria-label": labels.close,
      className: "ml-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded text-xl leading-none text-neutral-500 transition-colors hover:bg-neutral-200/70 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-100",
      children: /*#__PURE__*/_jsx("span", {
        "aria-hidden": "true",
        children: "×"
      })
    });
    $[2] = closeButton;
    $[3] = labels;
    $[4] = onHide;
    $[5] = t3;
  } else {
    t3 = $[5];
  }
  let t4;
  if ($[6] !== children || $[7] !== t1 || $[8] !== t2 || $[9] !== t3) {
    t4 = /*#__PURE__*/_jsxs("div", {
      ...t1,
      className: t2,
      children: [children, t3]
    });
    $[6] = children;
    $[7] = t1;
    $[8] = t2;
    $[9] = t3;
    $[10] = t4;
  } else {
    t4 = $[10];
  }
  return t4;
};
const OffcanvasTitle = props => renderAs('h5', props, 'text-lg font-semibold');
const OffcanvasBody = props => renderAs('div', props, 'p-4');
export const Offcanvas = Object.assign(OffcanvasBase, {
  Body: OffcanvasBody,
  Header: OffcanvasHeader,
  Title: OffcanvasTitle
});
export const Collapse = t0 => {
  const $ = _c(2);
  let t1;
  if ($[0] !== t0) {
    const {
      children,
      className,
      in: expanded,
      ...props
    } = t0;
    t1 = expanded ? /*#__PURE__*/_jsx("div", {
      ...omitUiProps(props),
      className: className,
      children: children
    }) : null;
    $[0] = t0;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
};
//# sourceMappingURL=Offcanvas.js.map
