import {useLayoutEffect, useRef, type CSSProperties} from 'react';
import {drawAnalysisPoint, type AnalysisPointRenderOptions} from './drawAnalysisPoint.js';

export type AnalysisPointCanvasProps = {
    width: number; height: number;
    points: readonly Omit<AnalysisPointRenderOptions, 'ctx'>[];
    className?: string; style?: CSSProperties; label?: string;
    drawBackground?: (ctx: CanvasRenderingContext2D) => void;
    beforeDrawPoint?: (ctx: CanvasRenderingContext2D, point: Omit<AnalysisPointRenderOptions, 'ctx'>) => void;
};

/** Applications supply formatted values and optional background painting, without coupling to a board engine. */
export function AnalysisPointCanvas({width, height, points, className, style, label, drawBackground, beforeDrawPoint}: AnalysisPointCanvasProps) {
    const ref = useRef<HTMLCanvasElement>(null);
    useLayoutEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const paint = () => {
            const bounds = canvas.getBoundingClientRect();
            if (!bounds.width || !bounds.height) return;
            const ratio = window.devicePixelRatio || 1;
            canvas.width = Math.max(1, Math.round(bounds.width * ratio));
            canvas.height = Math.max(1, Math.round(bounds.height * ratio));
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
            drawBackground?.(ctx);
            for (const point of points) {
                beforeDrawPoint?.(ctx, point);
                drawAnalysisPoint({...point, ctx});
            }
        };
        const observer = new ResizeObserver(paint);
        observer.observe(canvas);
        let resolution: MediaQueryList;
        const watchResolution = () => {
            resolution?.removeEventListener('change', watchResolution);
            paint();
            resolution = window.matchMedia('(resolution: ' + (window.devicePixelRatio || 1) + 'dppx)');
            resolution.addEventListener('change', watchResolution);
        };
        watchResolution();
        return () => {observer.disconnect(); resolution.removeEventListener('change', watchResolution);};
    }, [width, height, points, drawBackground, beforeDrawPoint]);
    return <canvas ref={ref} className={className} style={{aspectRatio: width + '/' + height, ...style}} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}/>;
}
