import { c as _c } from "react/compiler-runtime";
import { useLayoutEffect, useRef } from 'react';
import { drawAnalysisPoint } from './drawAnalysisPoint.js';
import { jsx as _jsx } from "react/jsx-runtime";
/** Applications supply formatted values and optional background painting, without coupling to a board engine. */
export function AnalysisPointCanvas(t0) {
  const $ = _c(16);
  const {
    width,
    height,
    points,
    className,
    style,
    label,
    drawBackground,
    beforeDrawPoint
  } = t0;
  const ref = useRef(null);
  let t1;
  let t2;
  if ($[0] !== beforeDrawPoint || $[1] !== drawBackground || $[2] !== height || $[3] !== points || $[4] !== width) {
    t1 = () => {
      const canvas = ref.current;
      if (!canvas) {
        return;
      }
      const paint = () => {
        const bounds = canvas.getBoundingClientRect();
        if (!bounds.width || !bounds.height) {
          return;
        }
        const ratio = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.round(bounds.width * ratio));
        canvas.height = Math.max(1, Math.round(bounds.height * ratio));
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return;
        }
        ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
        drawBackground?.(ctx);
        for (const point of points) {
          beforeDrawPoint?.(ctx, point);
          drawAnalysisPoint({
            ...point,
            ctx
          });
        }
      };
      const observer = new ResizeObserver(paint);
      observer.observe(canvas);
      let resolution;
      const watchResolution = () => {
        resolution?.removeEventListener("change", watchResolution);
        paint();
        resolution = window.matchMedia("(resolution: " + (window.devicePixelRatio || 1) + "dppx)");
        resolution.addEventListener("change", watchResolution);
      };
      watchResolution();
      return () => {
        observer.disconnect();
        resolution.removeEventListener("change", watchResolution);
      };
    };
    t2 = [width, height, points, drawBackground, beforeDrawPoint];
    $[0] = beforeDrawPoint;
    $[1] = drawBackground;
    $[2] = height;
    $[3] = points;
    $[4] = width;
    $[5] = t1;
    $[6] = t2;
  } else {
    t1 = $[5];
    t2 = $[6];
  }
  useLayoutEffect(t1, t2);
  const t3 = width + "/" + height;
  let t4;
  if ($[7] !== style || $[8] !== t3) {
    t4 = {
      aspectRatio: t3,
      ...style
    };
    $[7] = style;
    $[8] = t3;
    $[9] = t4;
  } else {
    t4 = $[9];
  }
  const t5 = label ? "img" : undefined;
  const t6 = label ? undefined : true;
  let t7;
  if ($[10] !== className || $[11] !== label || $[12] !== t4 || $[13] !== t5 || $[14] !== t6) {
    t7 = /*#__PURE__*/_jsx("canvas", {
      ref: ref,
      className: className,
      style: t4,
      role: t5,
      "aria-label": label,
      "aria-hidden": t6
    });
    $[10] = className;
    $[11] = label;
    $[12] = t4;
    $[13] = t5;
    $[14] = t6;
    $[15] = t7;
  } else {
    t7 = $[15];
  }
  return t7;
}
//# sourceMappingURL=AnalysisPointCanvas.js.map
