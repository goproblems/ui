import { c as _c } from "react/compiler-runtime";
import { createContext, forwardRef, useContext, useEffect } from 'react';
import { clsx } from 'clsx';
import { omitUiProps, renderAs } from './utils.js';
import { useUiLabels } from './UiProvider.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ModalContext = /*#__PURE__*/createContext({});
const ModalBase = /*#__PURE__*/forwardRef(({
  backdrop = true,
  centered,
  children,
  className,
  dialogClassName,
  fullscreen,
  onHide,
  show,
  size,
  ...props
}, ref) => {
  useEffect(() => {
    if (!show) return;
    const onKeyDown = event => {
      if (event.key === 'Escape') onHide?.();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onHide, show]);
  if (!show) return null;
  return /*#__PURE__*/_jsx(ModalContext.Provider, {
    value: {
      onHide
    },
    children: /*#__PURE__*/_jsx("div", {
      className: clsx('fixed inset-0 z-[1050] flex overflow-y-auto bg-neutral-950/55 p-4', centered ? 'items-center' : 'items-start', className),
      onMouseDown: event_0 => {
        if (backdrop && event_0.target === event_0.currentTarget) {
          onHide?.();
        }
      },
      children: /*#__PURE__*/_jsx("div", {
        ...omitUiProps(props),
        ref: ref,
        role: "dialog",
        "aria-modal": "true",
        className: clsx('relative mx-auto my-auto w-full overflow-visible rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-2xl dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface)] dark:text-[var(--ui-text)]', size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-4xl' : size === 'xl' ? 'max-w-6xl' : 'max-w-lg', fullscreen && 'h-full max-w-none rounded-none', dialogClassName),
        children: children
      })
    })
  });
});
const ModalHeader = t0 => {
  const $ = _c(11);
  const {
    closeButton,
    children,
    className,
    ...props
  } = t0;
  const {
    onHide
  } = useContext(ModalContext);
  const labels = useUiLabels();
  const t1 = omitUiProps(props);
  let t2;
  if ($[0] !== className) {
    t2 = clsx("flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-[var(--ui-border)]", className);
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
      className: "ml-4 rounded p-1 text-2xl leading-none opacity-60 hover:bg-neutral-100 hover:opacity-100 dark:hover:bg-[var(--ui-surface-muted)]",
      children: "×"
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
const ModalTitle = props => renderAs('h5', props, 'text-lg font-semibold');
const ModalBody = props => renderAs('div', props, 'p-4');
const ModalFooter = props => renderAs('div', props, 'flex flex-wrap items-center justify-end gap-2 border-t border-neutral-200 px-4 py-3 dark:border-[var(--ui-border)]');
export const Modal = Object.assign(ModalBase, {
  Body: ModalBody,
  Footer: ModalFooter,
  Header: ModalHeader,
  Title: ModalTitle
});
//# sourceMappingURL=Modal.js.map
