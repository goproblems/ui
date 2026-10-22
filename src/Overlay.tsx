import {cloneElement, forwardRef, isValidElement, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {clsx} from 'clsx';
import {createPortal} from 'react-dom';
import {omitUiProps, renderAs, type AnyProps} from './utils.js';

const OVERLAY_GAP = 8;
const VIEWPORT_MARGIN = 8;

type FloatingPosition = {
    left: number;
    placement: string;
    top: number;
};

const getFloatingPosition = (
    triggerRect: DOMRect,
    overlayRect: DOMRect,
    requestedPlacement: string
): FloatingPosition => {
    const [requestedSide, requestedAlignment] = requestedPlacement.split('-');
    const alignment =
        requestedAlignment === 'start' || requestedAlignment === 'end'
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
    const oppositeSide: Record<string, string> = {
        bottom: 'top',
        left: 'right',
        right: 'left',
        top: 'bottom',
    };
    const overlaySize =
        side === 'top' || side === 'bottom'
            ? overlayRect.height
            : overlayRect.width;
    const opposite = oppositeSide[side];

    if (
        overlaySize > availableSpace[side as keyof typeof availableSpace] &&
        availableSpace[opposite as keyof typeof availableSpace] >
            availableSpace[side as keyof typeof availableSpace]
    ) {
        side = opposite;
    }

    let top = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;
    let left = triggerRect.left + (triggerRect.width - overlayRect.width) / 2;

    if (side === 'top') {
        top = triggerRect.top - overlayRect.height - OVERLAY_GAP;
    } else if (side === 'bottom') {
        top = triggerRect.bottom + OVERLAY_GAP;
    } else if (side === 'left') {
        left = triggerRect.left - overlayRect.width - OVERLAY_GAP;
    } else {
        left = triggerRect.right + OVERLAY_GAP;
    }

    if (side === 'top' || side === 'bottom') {
        if (alignment === 'start') left = triggerRect.left;
        if (alignment === 'end') left = triggerRect.right - overlayRect.width;
    } else {
        if (alignment === 'start') top = triggerRect.top;
        if (alignment === 'end') top = triggerRect.bottom - overlayRect.height;
    }

    return {
        left: Math.min(
            Math.max(left, VIEWPORT_MARGIN),
            Math.max(
                VIEWPORT_MARGIN,
                window.innerWidth - overlayRect.width - VIEWPORT_MARGIN
            )
        ),
        placement: alignment ? `${side}-${alignment}` : side,
        top: Math.min(
            Math.max(top, VIEWPORT_MARGIN),
            Math.max(
                VIEWPORT_MARGIN,
                window.innerHeight - overlayRect.height - VIEWPORT_MARGIN
            )
        ),
    };
};

const PopoverBase = forwardRef<HTMLDivElement, AnyProps>(
    ({as = 'div', children, className, ...props}, ref) => {
        const Component = as;
        return (
            <Component
                {...omitUiProps(props)}
                ref={ref}
                className={clsx(
                    'min-w-48 max-w-sm rounded-md border border-neutral-200 bg-white text-sm text-neutral-900 shadow-lg dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface)] dark:text-[var(--ui-text)]',
                    className
                )}>
                {children}
            </Component>
        );
    }
);
const PopoverHeader = (props: AnyProps) =>
    renderAs(
        'div',
        props,
        'border-b border-neutral-200 bg-neutral-50 px-3 py-2 font-semibold dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface-muted)]'
    );
const PopoverBody = (props: AnyProps) => renderAs('div', props, 'p-3');
export const Popover = Object.assign(PopoverBase, {
    Body: PopoverBody,
    Header: PopoverHeader,
});
export {PopoverHeader};

export const Tooltip = forwardRef<HTMLDivElement, AnyProps>(
    ({children, className, ...props}, ref) => (
        <div
            {...omitUiProps(props)}
            ref={ref}
            role="tooltip"
            className={clsx(
                'max-w-xs rounded bg-neutral-950 px-2 py-1 text-xs text-white shadow-lg',
                className
            )}>
            {children}
        </div>
    )
);

const resolveOverlay = (
    overlay: AnyProps['overlay'],
    show: boolean,
    placement: string
) =>
    typeof overlay === 'function'
        ? overlay({
              'aria-hidden': !show,
              placement,
              popper: {},
              show,
          })
        : overlay;

export const OverlayTrigger = ({
    children,
    defaultShow,
    onEnter,
    onExited,
    onToggle,
    overlay,
    placement = 'top',
    rootClose,
    show,
    trigger = ['hover', 'focus'],
    wrapperClassName,
}: AnyProps) => {
    const [internalShow, setInternalShow] = useState(Boolean(defaultShow));
    const visible = show ?? internalShow;
    const previousVisible = useRef(visible);
    const wrapperRef = useRef<HTMLSpanElement>(null);
    const overlayRef = useRef<HTMLSpanElement>(null);
    const [floatingPosition, setFloatingPosition] =
        useState<FloatingPosition | null>(null);
    const triggers = Array.isArray(trigger) ? trigger : [trigger];
    const setVisible = useCallback(
        (next: boolean) => {
            if (show === undefined) {
                setInternalShow(next);
            }
            onToggle?.(next);
        },
        [onToggle, show]
    );

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
        if (!rootClose || !visible) return undefined;

        const closeWhenClickingOutside = (event: MouseEvent) => {
            if (
                !wrapperRef.current?.contains(event.target as Node) &&
                !overlayRef.current?.contains(event.target as Node)
            ) {
                setVisible(false);
            }
        };

        document.addEventListener('mousedown', closeWhenClickingOutside);
        return () => {
            document.removeEventListener('mousedown', closeWhenClickingOutside);
        };
    }, [rootClose, setVisible, visible]);

    const updatePosition = useCallback(() => {
        if (!wrapperRef.current || !overlayRef.current) return;
        setFloatingPosition(
            getFloatingPosition(
                wrapperRef.current.getBoundingClientRect(),
                overlayRef.current.getBoundingClientRect(),
                placement
            )
        );
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

    const child = isValidElement<AnyProps>(children)
        ? cloneElement(children, {
            onMouseEnter: (event: any) => {
                children.props.onMouseEnter?.(event);
                if (triggers.includes('hover')) setVisible(true);
            },
            onMouseLeave: (event: any) => {
                children.props.onMouseLeave?.(event);
                if (triggers.includes('hover')) setVisible(false);
            },
            onFocus: (event: any) => {
                children.props.onFocus?.(event);
                if (triggers.includes('focus')) setVisible(true);
            },
            onBlur: (event: any) => {
                children.props.onBlur?.(event);
                if (triggers.includes('focus')) setVisible(false);
            },
            onClick: (event: any) => {
                children.props.onClick?.(event);
                if (triggers.includes('click')) setVisible(!visible);
            },
          })
        : children;
    return (
        <span
            ref={wrapperRef}
            className={clsx('relative inline-flex', wrapperClassName)}>
            {child}
            {visible &&
                typeof document !== 'undefined' &&
                createPortal(
                    <span
                        ref={overlayRef}
                        className="fixed z-[1080]"
                        style={{
                            left: floatingPosition?.left ?? 0,
                            top: floatingPosition?.top ?? 0,
                            visibility: floatingPosition
                                ? 'visible'
                                : 'hidden',
                        }}>
                        {resolveOverlay(
                            overlay,
                            visible,
                            floatingPosition?.placement ?? placement
                        )}
                    </span>,
                    document.body
                )}
        </span>
    );
};

export const Overlay = ({
    children,
    placement = 'top',
    show,
    target,
    rootClose,
    onHide,
    ...props
}: AnyProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [floatingPosition, setFloatingPosition] =
        useState<FloatingPosition | null>(null);
    const targetElement = target?.current ?? target;

    const updatePosition = useCallback(() => {
        if (!targetElement || !overlayRef.current) return;
        setFloatingPosition(
            getFloatingPosition(
                targetElement.getBoundingClientRect(),
                overlayRef.current.getBoundingClientRect(),
                placement
            )
        );
    }, [placement, targetElement]);

    useLayoutEffect(() => {
        if (!show) {
            setFloatingPosition(null);
            return undefined;
        }

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        const resizeObserver =
            typeof ResizeObserver === 'undefined'
                ? null
                : new ResizeObserver(updatePosition);
        if (overlayRef.current) resizeObserver?.observe(overlayRef.current);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
            resizeObserver?.disconnect();
        };
    }, [show, updatePosition]);

    useEffect(() => {
        if (!rootClose || !show) return undefined;

        const closeWhenClickingOutside = (event: MouseEvent) => {
            if (
                !targetElement?.contains(event.target as Node) &&
                !overlayRef.current?.contains(event.target as Node)
            ) {
                onHide?.();
            }
        };

        document.addEventListener('mousedown', closeWhenClickingOutside);
        return () => {
            document.removeEventListener('mousedown', closeWhenClickingOutside);
        };
    }, [onHide, rootClose, show, targetElement]);

    if (!show || typeof document === 'undefined') return null;

    return createPortal(
        <div
            {...omitUiProps(props)}
            ref={overlayRef}
            className={clsx('fixed z-[1080]', props.className)}
            style={{
                ...props.style,
                left: floatingPosition?.left ?? 0,
                top: floatingPosition?.top ?? 0,
                visibility: floatingPosition ? 'visible' : 'hidden',
            }}>
            {typeof children === 'function'
                ? children({
                      placement: floatingPosition?.placement ?? placement,
                      popper: {},
                      show,
                  })
                : children}
        </div>,
        document.body
    );
};
