import {createContext, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type HTMLAttributes, type PointerEvent, type PointerEventHandler} from 'react';

type Offset = {x: number; y: number};
type Bounds = {left: number; right: number; top: number; bottom: number};
type Drag = {pointerId: number; handle: HTMLDivElement; pointer: Offset; offset: Offset; bounds: Bounds};

export const ModalDragContext = createContext<PointerEventHandler<HTMLDivElement> | undefined>(undefined);

const constrain = (offset: Offset, bounds: Bounds): Offset => ({
    x: Math.max(bounds.left, Math.min(bounds.right, offset.x)),
    y: Math.max(bounds.top, Math.min(bounds.bottom, offset.y)),
});

export const DraggableModalDialog = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({style, onPointerMove, onPointerUp, onPointerCancel, onLostPointerCapture, ...props}, ref) => {
        const dialogRef = useRef<HTMLDivElement>(null);
        const drag = useRef<Drag | null>(null);
        const currentOffset = useRef<Offset>({x: 0, y: 0});
        const [offset, setOffset] = useState<Offset>({x: 0, y: 0});
        useImperativeHandle(ref, () => dialogRef.current!, []);

        const moveTo = useCallback((next: Offset) => {
            if (next.x === currentOffset.current.x && next.y === currentOffset.current.y) return;
            currentOffset.current = next;
            setOffset(next);
        }, []);
        const readBounds = useCallback((): Bounds | null => {
            const rect = dialogRef.current?.getBoundingClientRect();
            if (!rect) return null;
            const viewport = window.visualViewport;
            const left = (viewport?.offsetLeft ?? 0) + 16;
            const top = (viewport?.offsetTop ?? 0) + 16;
            const originX = rect.left - currentOffset.current.x;
            const originY = rect.top - currentOffset.current.y;
            return {
                left: left - originX,
                right: Math.max(left, left + (viewport?.width ?? window.innerWidth) - 32 - rect.width) - originX,
                top: top - originY,
                bottom: Math.max(top, top + (viewport?.height ?? window.innerHeight) - 32 - rect.height) - originY,
            };
        }, []);
        const cancelDrag = useCallback(() => {
            const active = drag.current;
            drag.current = null;
            if (active?.handle.hasPointerCapture(active.pointerId)) active.handle.releasePointerCapture(active.pointerId);
        }, []);
        useEffect(() => {
            const dialog = dialogRef.current;
            if (!dialog) return;
            const keepVisible = () => {
                const bounds = readBounds();
                if (!bounds) return;
                if (drag.current) drag.current.bounds = bounds;
                moveTo(constrain(currentOffset.current, bounds));
            };
            const observer = new ResizeObserver(keepVisible);
            observer.observe(dialog);
            window.addEventListener('resize', keepVisible);
            window.visualViewport?.addEventListener('resize', keepVisible);
            window.addEventListener('blur', cancelDrag);
            return () => {
                observer.disconnect();
                window.removeEventListener('resize', keepVisible);
                window.visualViewport?.removeEventListener('resize', keepVisible);
                window.removeEventListener('blur', cancelDrag);
                cancelDrag();
            };
        }, [cancelDrag, moveTo, readBounds]);

        const startDrag: PointerEventHandler<HTMLDivElement> = event => {
            if (!event.isPrimary || event.button !== 0 || event.defaultPrevented) return;
            if ((event.target as Element).closest('button, a, input, select, textarea, summary, [role="button"], [contenteditable]:not([contenteditable="false"])')) return;
            const bounds = readBounds();
            if (!bounds) return;
            event.preventDefault();
            drag.current = {pointerId: event.pointerId, handle: event.currentTarget, pointer: {x: event.clientX, y: event.clientY}, offset: currentOffset.current, bounds};
            event.currentTarget.setPointerCapture(event.pointerId);
        };
        const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
            const active = drag.current;
            if (!active || active.pointerId !== event.pointerId) return;
            moveTo(constrain({x: active.offset.x + event.clientX - active.pointer.x, y: active.offset.y + event.clientY - active.pointer.y}, active.bounds));
        };
        const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
            if (drag.current?.pointerId !== event.pointerId) return;
            if (event.type === 'pointerup') moveDrag(event);
            cancelDrag();
        };
        return <ModalDragContext.Provider value={startDrag}>
            <div {...props} ref={dialogRef} style={{...style, translate: `${offset.x}px ${offset.y}px`}}
                onPointerMove={event => {onPointerMove?.(event); moveDrag(event);}}
                onPointerUp={event => {onPointerUp?.(event); finishDrag(event);}}
                onPointerCancel={event => {onPointerCancel?.(event); finishDrag(event);}}
                onLostPointerCapture={event => {onLostPointerCapture?.(event); finishDrag(event);}}
            />
        </ModalDragContext.Provider>;
    }
);
