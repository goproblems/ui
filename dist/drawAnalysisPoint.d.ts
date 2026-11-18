import { type AnalysisPointBadgeStyle } from './analysisPointBadge.js';
export type AnalysisPointRenderOptions = {
    ctx: CanvasRenderingContext2D;
    variant?: 'standard' | 'classic';
    x: number;
    y: number;
    space: number;
    scale: number;
    compactScale: number;
    compactSoftness: number;
    shape: 'circle' | 'square';
    color: string;
    topMove: boolean;
    colorContrast?: boolean;
    opacity: number;
    compact: boolean;
    lines: string[];
    scoreLineIndex: number;
    orderLine: boolean;
    badge: string | null;
    badgeStyle: AnalysisPointBadgeStyle;
    orderBadge: boolean;
    topMoveOutline: string | null;
};
/** Candidate markers with adaptive text sizing, compact fills and independent badges. */
export declare function drawAnalysisPoint(options: AnalysisPointRenderOptions): void;
//# sourceMappingURL=drawAnalysisPoint.d.ts.map