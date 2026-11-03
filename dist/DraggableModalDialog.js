import { c as _c } from "react/compiler-runtime";
import { createContext, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const ModalDragContext = /*#__PURE__*/createContext(undefined);
const constrain = (offset, bounds) => ({
  x: Math.max(bounds.left, Math.min(bounds.right, offset.x)),
  y: Math.max(bounds.top, Math.min(bounds.bottom, offset.y))
});
export const DraggableModalDialog = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(37);
  let onLostPointerCapture;
  let onPointerCancel;
  let onPointerMove;
  let onPointerUp;
  let props;
  let style;
  if ($[0] !== t0) {
    ({
      style,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onLostPointerCapture,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = onLostPointerCapture;
    $[2] = onPointerCancel;
    $[3] = onPointerMove;
    $[4] = onPointerUp;
    $[5] = props;
    $[6] = style;
  } else {
    onLostPointerCapture = $[1];
    onPointerCancel = $[2];
    onPointerMove = $[3];
    onPointerUp = $[4];
    props = $[5];
    style = $[6];
  }
  const dialogRef = useRef(null);
  const drag = useRef(null);
  let t1;
  if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = {
      x: 0,
      y: 0
    };
    $[7] = t1;
  } else {
    t1 = $[7];
  }
  const currentOffset = useRef(t1);
  let t2;
  if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = {
      x: 0,
      y: 0
    };
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  const [offset, setOffset] = useState(t2);
  let t3;
  let t4;
  if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
    t3 = () => dialogRef.current;
    t4 = [];
    $[9] = t3;
    $[10] = t4;
  } else {
    t3 = $[9];
    t4 = $[10];
  }
  useImperativeHandle(ref, t3, t4);
  let t5;
  if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
    t5 = next => {
      if (next.x === currentOffset.current.x && next.y === currentOffset.current.y) {
        return;
      }
      currentOffset.current = next;
      setOffset(next);
    };
    $[11] = t5;
  } else {
    t5 = $[11];
  }
  const moveTo = t5;
  let t6;
  if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
    t6 = () => {
      const rect = dialogRef.current?.getBoundingClientRect();
      if (!rect) {
        return null;
      }
      const viewport = window.visualViewport;
      const left = (viewport?.offsetLeft ?? 0) + 16;
      const top = (viewport?.offsetTop ?? 0) + 16;
      const originX = rect.left - currentOffset.current.x;
      const originY = rect.top - currentOffset.current.y;
      return {
        left: left - originX,
        right: Math.max(left, left + (viewport?.width ?? window.innerWidth) - 32 - rect.width) - originX,
        top: top - originY,
        bottom: Math.max(top, top + (viewport?.height ?? window.innerHeight) - 32 - rect.height) - originY
      };
    };
    $[12] = t6;
  } else {
    t6 = $[12];
  }
  const readBounds = t6;
  let t7;
  if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
    t7 = () => {
      const active = drag.current;
      drag.current = null;
      if (active?.handle.hasPointerCapture(active.pointerId)) {
        active.handle.releasePointerCapture(active.pointerId);
      }
    };
    $[13] = t7;
  } else {
    t7 = $[13];
  }
  const cancelDrag = t7;
  let t8;
  let t9;
  if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
    t8 = () => {
      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }
      const keepVisible = () => {
        const bounds = readBounds();
        if (!bounds) {
          return;
        }
        if (drag.current) {
          drag.current.bounds = bounds;
        }
        moveTo(constrain(currentOffset.current, bounds));
      };
      const observer = new ResizeObserver(keepVisible);
      observer.observe(dialog);
      window.addEventListener("resize", keepVisible);
      window.visualViewport?.addEventListener("resize", keepVisible);
      window.addEventListener("blur", cancelDrag);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", keepVisible);
        window.visualViewport?.removeEventListener("resize", keepVisible);
        window.removeEventListener("blur", cancelDrag);
        cancelDrag();
      };
    };
    t9 = [cancelDrag, moveTo, readBounds];
    $[14] = t8;
    $[15] = t9;
  } else {
    t8 = $[14];
    t9 = $[15];
  }
  useEffect(t8, t9);
  let t10;
  if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
    t10 = event => {
      if (!event.isPrimary || event.button !== 0 || event.defaultPrevented) {
        return;
      }
      if (event.target.closest("button, a, input, select, textarea, summary, [role=\"button\"], [contenteditable]:not([contenteditable=\"false\"])")) {
        return;
      }
      const bounds_0 = readBounds();
      if (!bounds_0) {
        return;
      }
      event.preventDefault();
      drag.current = {
        pointerId: event.pointerId,
        handle: event.currentTarget,
        pointer: {
          x: event.clientX,
          y: event.clientY
        },
        offset: currentOffset.current,
        bounds: bounds_0
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    };
    $[16] = t10;
  } else {
    t10 = $[16];
  }
  const startDrag = t10;
  let t11;
  if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
    t11 = event_0 => {
      const active_0 = drag.current;
      if (!active_0 || active_0.pointerId !== event_0.pointerId) {
        return;
      }
      moveTo(constrain({
        x: active_0.offset.x + event_0.clientX - active_0.pointer.x,
        y: active_0.offset.y + event_0.clientY - active_0.pointer.y
      }, active_0.bounds));
    };
    $[17] = t11;
  } else {
    t11 = $[17];
  }
  const moveDrag = t11;
  let t12;
  if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
    t12 = event_1 => {
      if (drag.current?.pointerId !== event_1.pointerId) {
        return;
      }
      if (event_1.type === "pointerup") {
        moveDrag(event_1);
      }
      cancelDrag();
    };
    $[18] = t12;
  } else {
    t12 = $[18];
  }
  const finishDrag = t12;
  const t13 = `${offset.x}px ${offset.y}px`;
  let t14;
  if ($[19] !== style || $[20] !== t13) {
    t14 = {
      ...style,
      translate: t13
    };
    $[19] = style;
    $[20] = t13;
    $[21] = t14;
  } else {
    t14 = $[21];
  }
  let t15;
  if ($[22] !== onPointerMove) {
    t15 = event_2 => {
      onPointerMove?.(event_2);
      moveDrag(event_2);
    };
    $[22] = onPointerMove;
    $[23] = t15;
  } else {
    t15 = $[23];
  }
  let t16;
  if ($[24] !== onPointerUp) {
    t16 = event_3 => {
      onPointerUp?.(event_3);
      finishDrag(event_3);
    };
    $[24] = onPointerUp;
    $[25] = t16;
  } else {
    t16 = $[25];
  }
  let t17;
  if ($[26] !== onPointerCancel) {
    t17 = event_4 => {
      onPointerCancel?.(event_4);
      finishDrag(event_4);
    };
    $[26] = onPointerCancel;
    $[27] = t17;
  } else {
    t17 = $[27];
  }
  let t18;
  if ($[28] !== onLostPointerCapture) {
    t18 = event_5 => {
      onLostPointerCapture?.(event_5);
      finishDrag(event_5);
    };
    $[28] = onLostPointerCapture;
    $[29] = t18;
  } else {
    t18 = $[29];
  }
  let t19;
  if ($[30] !== props || $[31] !== t14 || $[32] !== t15 || $[33] !== t16 || $[34] !== t17 || $[35] !== t18) {
    t19 = /*#__PURE__*/_jsx(ModalDragContext.Provider, {
      value: startDrag,
      children: /*#__PURE__*/_jsx("div", {
        ...props,
        ref: dialogRef,
        style: t14,
        onPointerMove: t15,
        onPointerUp: t16,
        onPointerCancel: t17,
        onLostPointerCapture: t18
      })
    });
    $[30] = props;
    $[31] = t14;
    $[32] = t15;
    $[33] = t16;
    $[34] = t17;
    $[35] = t18;
    $[36] = t19;
  } else {
    t19 = $[36];
  }
  return t19;
});
//# sourceMappingURL=DraggableModalDialog.js.map
