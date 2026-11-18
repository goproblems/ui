import type { AnalysisPointBadgeStyle } from './analysisPointConfig.js';
export type { AnalysisPointBadgeStyle } from './analysisPointConfig.js';
type AnalysisPointBadgeOptions = {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    style: AnalysisPointBadgeStyle;
    text: string;
    orderBadge: boolean;
    fontFamily: string;
    plainFontSize?: number;
};
/** Badge appearance is independent of the point's colors and text layout. */
export declare function drawAnalysisPointBadge({ ctx, x, y, radius, style, text, orderBadge, fontFamily, plainFontSize, }: AnalysisPointBadgeOptions): void;
//# sourceMappingURL=analysisPointBadge.d.ts.map