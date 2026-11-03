import { c as _c } from "react/compiler-runtime";
import { createContext, forwardRef, useContext, useEffect } from 'react';
import { clsx } from 'clsx';
import { DraggableModalDialog, ModalDragContext } from './DraggableModalDialog.js';
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
  draggable = false,
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
  const Dialog = draggable ? DraggableModalDialog : 'div';
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
      children: /*#__PURE__*/_jsx(Dialog, {
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
  const $ = _c(16);
  const {
    closeButton,
    children,
    className,
    onPointerDown,
    ...props
  } = t0;
  const {
    onHide
  } = useContext(ModalContext);
  const startDrag = useContext(ModalDragContext);
  const labels = useUiLabels();
  const t1 = omitUiProps(props);
  let t2;
  if ($[0] !== onPointerDown || $[1] !== startDrag) {
    t2 = event => {
      onPointerDown?.(event);
      startDrag?.(event);
    };
    $[0] = onPointerDown;
    $[1] = startDrag;
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  const t3 = startDrag && "cursor-grab touch-none select-none active:cursor-grabbing";
  let t4;
  if ($[3] !== className || $[4] !== t3) {
    t4 = clsx("flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-[var(--ui-border)]", t3, className);
    $[3] = className;
    $[4] = t3;
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  let t5;
  if ($[6] !== closeButton || $[7] !== labels || $[8] !== onHide) {
    t5 = closeButton && /*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: onHide,
      "aria-label": labels.close,
      className: "ml-4 cursor-pointer rounded p-1 text-2xl leading-none opacity-60 hover:bg-neutral-100 hover:opacity-100 dark:hover:bg-[var(--ui-surface-muted)]",
      children: "×"
    });
    $[6] = closeButton;
    $[7] = labels;
    $[8] = onHide;
    $[9] = t5;
  } else {
    t5 = $[9];
  }
  let t6;
  if ($[10] !== children || $[11] !== t1 || $[12] !== t2 || $[13] !== t4 || $[14] !== t5) {
    t6 = /*#__PURE__*/_jsxs("div", {
      ...t1,
      onPointerDown: t2,
      className: t4,
      children: [children, t5]
    });
    $[10] = children;
    $[11] = t1;
    $[12] = t2;
    $[13] = t4;
    $[14] = t5;
    $[15] = t6;
  } else {
    t6 = $[15];
  }
  return t6;
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
