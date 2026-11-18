import {drawAnalysisPointBadge, type AnalysisPointBadgeStyle} from './analysisPointBadge.js';
import {drawCompactAnalysisPoint} from './compactAnalysisPoint.js';

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
export function drawAnalysisPoint(options: AnalysisPointRenderOptions) {
    const {ctx, x, y, shape, color, topMove, compact} = options;
    const classic = options.variant === 'classic' && !compact;
    const fontFamily = classic ? '\"Helvetica Neue\", Helvetica, Arial, sans-serif' : 'ui-sans-serif, system-ui, sans-serif';
    const space = options.space * options.scale;
    const radius = space * 0.46;
    const brightness = /^#[\da-f]{6}$/i.test(color)
        ? [1, 3, 5].reduce(
              (sum, offset, index) =>
                  sum +
                  parseInt(color.slice(offset, offset + 2), 16) *
                      [0.299, 0.587, 0.114][index],
              0
          )
        : 0;
    const darkText = classic ? brightness >= (options.lines.length === 1 ? 150 : 120) : brightness >= 150 && (options.colorContrast || !topMove);
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.globalAlpha = options.opacity;
    ctx.beginPath();
    if (compact) {
        drawCompactAnalysisPoint({
            ctx,
            x,
            y,
            shape,
            color,
            radius:
                shape === 'square'
                    ? radius * 0.86
                    : space * (0.24 / options.compactScale),
            softness: options.compactSoftness,
        });
        ctx.restore();
        return;
    }

    const pointPath = () => {
        ctx.beginPath();
        if (shape === 'square') {
            const half = radius * 0.86;
            ctx.roundRect(x - half, y - half, half * 2, half * 2, space * 0.04);
        } else {
            ctx.arc(x, y, radius, 0, Math.PI * 2);
        }
    };
    pointPath();
    ctx.fillStyle = color;
    ctx.fill();
    if (topMove && options.topMoveOutline) {
        pointPath();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = options.topMoveOutline;
        ctx.lineWidth = Math.max(1, radius * 0.07);
        ctx.stroke();
    }

    const {lines} = options;
    const fontWeight = classic ? lines.length === 1 ? 700 : 650 : 600;
    // Fit formatted labels to the marker so long counts remain legible.
    const textRadius = space * 0.47;
    const singleLine = lines.length === 1;
    const offsets = singleLine
        ? [0]
        : lines.length === 2
          ? [-0.3, 0.36]
          : [-0.48, 0.08, 0.62];
    const baseFontSize =
        (textRadius / 1.5) *
        (singleLine ? 1.32 : lines.length === 2 ? 0.9 : 0.78);
    const maxTextWidth = textRadius * (shape === 'square' ? 1.42 : 1.58);
    const fontSizes = lines.map((text, index) => {
        const digitScale =
            singleLine && options.orderLine
                ? text.length === 1
                    ? 1.2
                    : text.length === 2
                      ? 1.1
                      : 1
                : 1;
        let size =
            baseFontSize *
            digitScale *
            (lines.length === 3 ? (index === 1 ? 1.12 : 0.9) : 1);
        ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
        const measuredWidth = ctx.measureText(text).width;
        if (measuredWidth > 0) {
            if (!singleLine) {
                const targetWidth =
                    textRadius *
                    (lines.length === 3
                        ? shape === 'square'
                            ? 1.12
                            : 1.2
                        : shape === 'square'
                          ? 1.18
                          : 1.28);
                size *= Math.min(
                    lines.length === 3 ? 1.08 : 1.35,
                    Math.max(1, targetWidth / measuredWidth),
                    maxTextWidth / measuredWidth
                );
            } else {
                size *= Math.min(1, maxTextWidth / measuredWidth);
            }
        }
        return singleLine ? size : Math.min(size, textRadius * 0.72);
    });
    if (options.scoreLineIndex >= 0) {
        for (
            let index = options.scoreLineIndex + 1;
            index < lines.length;
            index++
        ) {
            fontSizes[index] = Math.min(
                fontSizes[index],
                fontSizes[options.scoreLineIndex]
            );
        }
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'miter';
    ctx.lineWidth = space * 0.02;
    ctx.strokeStyle = darkText ? '#ffffff' : '#000000';
    ctx.fillStyle = darkText ? '#171717' : '#ffffff';
    lines.forEach((text, index) => {
        ctx.font = `${fontWeight} ${fontSizes[index]}px ${fontFamily}`;
        const textY = y + textRadius * offsets[index];
        ctx.globalAlpha = darkText ? 0.56 : 0.76;
        ctx.strokeText(text, x, textY);
        ctx.globalAlpha = 1;
        ctx.fillText(text, x, textY);
    });

    if (options.badge !== null) {
        drawAnalysisPointBadge({
            ctx,
            x,
            y,
            radius,
            style: options.badgeStyle,
            text: options.badge,
            orderBadge: options.orderBadge,
            fontFamily,
            plainFontSize: (textRadius / 1.5) * 0.68,
        });
    }
    ctx.restore();
}
