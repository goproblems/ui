import { type CSSProperties } from 'react';
import { type AnalysisPointRenderOptions } from './drawAnalysisPoint.js';
export type AnalysisPointCanvasProps = {
    width: number;
    height: number;
    points: readonly Omit<AnalysisPointRenderOptions, 'ctx'>[];
    className?: string;
    style?: CSSProperties;
    label?: string;
    drawBackground?: (ctx: CanvasRenderingContext2D) => void;
    beforeDrawPoint?: (ctx: CanvasRenderingContext2D, point: Omit<AnalysisPointRenderOptions, 'ctx'>) => void;
};
/** Applications supply formatted values and optional background painting, without coupling to a board engine. */
export declare function AnalysisPointCanvas({ width, height, points, className, style, label, drawBackground, beforeDrawPoint }: AnalysisPointCanvasProps): import("react").JSX.Element;
//# sourceMappingURL=AnalysisPointCanvas.d.ts.map