import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneElement, forwardRef, isValidElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import { omitUiProps, renderAs } from './utils.js';
const OVERLAY_GAP = 8;
const VIEWPORT_MARGIN = 8;
const getFloatingPosition = (triggerRect, overlayRect, requestedPlacement) => {
    const [requestedSide, requestedAlignment] = requestedPlacement.split('-');
    const alignment = requestedAlignment === 'start' || requestedAlignment === 'end'
        ? requestedAlignment
        : undefined;
    const availableSpace = {
        bottom: window.innerHeight - triggerRect.bottom - OVERLAY_GAP,
        left: triggerRect.left - OVERLAY_GAP,
        right: window.innerWidth - triggerRect.right - OVERLAY_GAP,
        top: triggerRect.top - OVERLAY_GAP,
    };
    let side = ['top', 'bottom', 'left', 'right'].includes(requestedSide)
        ? requestedSide
        : 'top';
    const oppositeSide = {
        bottom: 'top',
        left: 'right',
        right: 'left',
        top: 'bottom',
    };
    const overlaySize = side === 'top' || side === 'bottom'
        ? overlayRect.height
        : overlayRect.width;
    const opposite = oppositeSide[side];
    if (overlaySize > availableSpace[side] &&
        availableSpace[opposite] >
            availableSpace[side]) {
        side = opposite;
    }
    let top = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;
    let left = triggerRect.left + (triggerRect.width - overlayRect.width) / 2;
    if (side === 'top') {
        top = triggerRect.top - overlayRect.height - OVERLAY_GAP;
    }
    else if (side === 'bottom') {
        top = triggerRect.bottom + OVERLAY_GAP;
    }
    else if (side === 'left') {
        left = triggerRect.left - overlayRect.width - OVERLAY_GAP;
    }
    else {
        left = triggerRect.right + OVERLAY_GAP;
    }
    if (side === 'top' || side === 'bottom') {
        if (alignment === 'start')
            left = triggerRect.left;
        if (alignment === 'end')
            left = triggerRect.right - overlayRect.width;
    }
    else {
        if (alignment === 'start')
            top = triggerRect.top;
        if (alignment === 'end')
            top = triggerRect.bottom - overlayRect.height;
    }
    return {
        left: Math.min(Math.max(left, VIEWPORT_MARGIN), Math.max(VIEWPORT_MARGIN, window.innerWidth - overlayRect.width - VIEWPORT_MARGIN)),
        placement: alignment ? `${side}-${alignment}` : side,
        top: Math.min(Math.max(top, VIEWPORT_MARGIN), Math.max(VIEWPORT_MARGIN, window.innerHeight - overlayRect.height - VIEWPORT_MARGIN)),
    };
};
const PopoverBase = forwardRef(({ as = 'div', children, className, ...props }, ref) => {
    const Component = as;
    return (_jsx(Component, { ...omitUiProps(props), ref: ref, className: clsx('min-w-48 max-w-sm rounded-md border border-neutral-200 bg-white text-sm text-neutral-900 shadow-lg dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface)] dark:text-[var(--ui-text)]', className), children: children }));
});
const PopoverHeader = (props) => renderAs('div', props, 'border-b border-neutral-200 bg-neutral-50 px-3 py-2 font-semibold dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface-muted)]');
const PopoverBody = (props) => renderAs('div', props, 'p-3');
export const Popover = Object.assign(PopoverBase, {
    Body: PopoverBody,
    Header: PopoverHeader,
});
export { PopoverHeader };
export const Tooltip = forwardRef(({ children, className, ...props }, ref) => (_jsx("div", { ...omitUiProps(props), ref: ref, role: "tooltip", className: clsx('max-w-xs rounded bg-neutral-950 px-2 py-1 text-xs text-white shadow-lg', className), children: children })));
const resolveOverlay = (overlay, show, placement) => typeof overlay === 'function'
    ? overlay({
        'aria-hidden': !show,
        placement,
        popper: {},
        show,
    })
    : overlay;
export const OverlayTrigger = ({ children, defaultShow, onEnter, onExited, onToggle, overlay, placement = 'top', rootClose, show, trigger = ['hover', 'focus'], wrapperClassName, }) => {
    const [internalShow, setInternalShow] = useState(Boolean(defaultShow));
    const visible = show ?? internalShow;
    const previousVisible = useRef(visible);
    const wrapperRef = useRef(null);
    const overlayRef = useRef(null);
    const [floatingPosition, setFloatingPosition] = useState(null);
    const triggers = Array.isArray(trigger) ? trigger : [trigger];
    const setVisible = useCallback((next) => {
        if (show === undefined) {
            setInternalShow(next);
        }
        onToggle?.(next);
    }, [onToggle, show]);
    useEffect(() => {
        if (visible && !previousVisible.current) {
            onEnter?.();
        }
        if (!visible && previousVisible.current) {
            onExited?.();
        }
        previousVisible.current = visible;
    }, [onEnter, onExited, visible]);
    useEffect(() => {
        if (!rootClose || !visible)
            return undefined;
        const closeWhenClickingOutside = (event) => {
            if (!wrapperRef.current?.contains(event.target) &&
                !overlayRef.current?.contains(event.target)) {
                setVisible(false);
            }
        };
        document.addEventListener('mousedown', closeWhenClickingOutside);
        return () => {
            document.removeEventListener('mousedown', closeWhenClickingOutside);
        };
    }, [rootClose, setVisible, visible]);
    const updatePosition = useCallback(() => {
        if (!wrapperRef.current || !overlayRef.current)
            return;
        setFloatingPosition(getFloatingPosition(wrapperRef.current.getBoundingClientRect(), overlayRef.current.getBoundingClientRect(), placement));
    }, [placement]);
    useLayoutEffect(() => {
        if (!visible) {
            setFloatingPosition(null);
            return undefined;
        }
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [updatePosition, visible]);
    const child = isValidElement(children)
        ? cloneElement(children, {
            onMouseEnter: (event) => {
                children.props.onMouseEnter?.(event);
                if (triggers.includes('hover'))
                    setVisible(true);
            },
            onMouseLeave: (event) => {
                children.props.onMouseLeave?.(event);
                if (triggers.includes('hover'))
                    setVisible(false);
            },
            onFocus: (event) => {
                children.props.onFocus?.(event);
                if (triggers.includes('focus'))
                    setVisible(true);
            },
            onBlur: (event) => {
                children.props.onBlur?.(event);
                if (triggers.includes('focus'))
                    setVisible(false);
            },
            onClick: (event) => {
                children.props.onClick?.(event);
                if (triggers.includes('click'))
                    setVisible(!visible);
            },
        })
        : children;
    return (_jsxs("span", { ref: wrapperRef, className: clsx('relative inline-flex', wrapperClassName), children: [child, visible &&
                typeof document !== 'undefined' &&
                createPortal(_jsx("span", { ref: overlayRef, className: "fixed z-[1080]", style: {
                        left: floatingPosition?.left ?? 0,
                        top: floatingPosition?.top ?? 0,
                        visibility: floatingPosition
                            ? 'visible'
                            : 'hidden',
                    }, children: resolveOverlay(overlay, visible, floatingPosition?.placement ?? placement) }), document.body)] }));
};
export const Overlay = ({ children, placement = 'top', show, target, rootClose, onHide, ...props }) => {
    const overlayRef = useRef(null);
    const [floatingPosition, setFloatingPosition] = useState(null);
    const targetElement = target?.current ?? target;
    const updatePosition = useCallback(() => {
        if (!targetElement || !overlayRef.current)
            return;
        setFloatingPosition(getFloatingPosition(targetElement.getBoundingClientRect(), overlayRef.current.getBoundingClientRect(), placement));
    }, [placement, targetElement]);
    useLayoutEffect(() => {
        if (!show) {
            setFloatingPosition(null);
            return undefined;
        }
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        const resizeObserver = typeof ResizeObserver === 'undefined'
            ? null
            : new ResizeObserver(updatePosition);
        if (overlayRef.current)
            resizeObserver?.observe(overlayRef.current);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
            resizeObserver?.disconnect();
        };
    }, [show, updatePosition]);
    useEffect(() => {
        if (!rootClose || !show)
            return undefined;
        const closeWhenClickingOutside = (event) => {
            if (!targetElement?.contains(event.target) &&
                !overlayRef.current?.contains(event.target)) {
                onHide?.();
            }
        };
        document.addEventListener('mousedown', closeWhenClickingOutside);
        return () => {
            document.removeEventListener('mousedown', closeWhenClickingOutside);
        };
    }, [onHide, rootClose, show, targetElement]);
    if (!show || typeof document === 'undefined')
        return null;
    return createPortal(_jsx("div", { ...omitUiProps(props), ref: overlayRef, className: clsx('fixed z-[1080]', props.className), style: {
            ...props.style,
            left: floatingPosition?.left ?? 0,
            top: floatingPosition?.top ?? 0,
            visibility: floatingPosition ? 'visible' : 'hidden',
        }, children: typeof children === 'function'
            ? children({
                placement: floatingPosition?.placement ?? placement,
                popper: {},
                show,
            })
            : children }), document.body);
};
//# sourceMappingURL=Overlay.js.map