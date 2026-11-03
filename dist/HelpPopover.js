import { useId, useState } from 'react';
import { clsx } from 'clsx';
import { OverlayTrigger } from './Overlay.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const HelpPopover = ({
  label,
  children,
  title,
  titleIcon,
  footer,
  placement = 'top-start',
  className,
  popoverClassName
}) => {
  const id = useId();
  const [show, setShow] = useState(false);
  return /*#__PURE__*/_jsx(OverlayTrigger, {
    show: show,
    onToggle: setShow,
    trigger: ['hover', 'focus'],
    rootClose: true,
    placement: placement,
    overlay: /*#__PURE__*/_jsxs("div", {
      id: id,
      role: "tooltip",
      "data-ui": "help-popover",
      className: clsx('ui-help-popover', popoverClassName),
      children: [title && /*#__PURE__*/_jsxs("div", {
        className: "ui-help-popover-heading",
        children: [titleIcon && /*#__PURE__*/_jsx("span", {
          className: "ui-help-popover-icon",
          "aria-hidden": "true",
          children: titleIcon
        }), title]
      }), /*#__PURE__*/_jsx("div", {
        className: "ui-help-popover-body",
        children: children
      }), footer && /*#__PURE__*/_jsx("div", {
        className: "ui-help-popover-footer",
        children: footer
      })]
    }),
    children: /*#__PURE__*/_jsx("button", {
      type: "button",
      "data-ui": "help-popover-trigger",
      className: clsx('ui-help-popover-trigger', className),
      "aria-label": label,
      "aria-describedby": show ? id : undefined,
      "aria-expanded": show,
      onClick: () => setShow(true),
      onKeyDown: event => {
        if (event.key === 'Escape') setShow(false);
      },
      children: /*#__PURE__*/_jsxs("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.8",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        focusable: "false",
        children: [/*#__PURE__*/_jsx("circle", {
          cx: "12",
          cy: "12",
          r: "10"
        }), /*#__PURE__*/_jsx("path", {
          d: "M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"
        }), /*#__PURE__*/_jsx("path", {
          d: "M12 17h.01"
        })]
      })
    })
  });
};
//# sourceMappingURL=HelpPopover.js.map
