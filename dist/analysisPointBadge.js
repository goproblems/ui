/** Badge appearance is independent of the point's colors and text layout. */
export function drawAnalysisPointBadge({
  ctx,
  x,
  y,
  radius,
  style,
  text,
  orderBadge,
  fontFamily,
  plainFontSize = radius / 1.5 * 0.68
}) {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 1;
  if (style === 'plain') {
    ctx.font = `600 ${plainFontSize}px ${fontFamily}`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
    ctx.fillText(text, x + radius, y - radius / 2);
  } else {
    const theme = getComputedStyle(ctx.canvas);
    const badgeRadius = radius * 0.75;
    const height = badgeRadius * 0.6;
    const centerY = y - radius * 0.75;
    ctx.font = `600 ${badgeRadius / 0.46 * 0.22}px ${fontFamily}`;
    const width = Math.max(badgeRadius * (orderBadge ? 0.64 : 1.35), ctx.measureText(text).width + badgeRadius * 0.24);
    const left = x + radius * 0.56;
    ctx.beginPath();
    ctx.roundRect(left, centerY - height / 2, width, height, badgeRadius / 0.46 * 0.04);
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = theme.getPropertyValue('--ui-surface').trim() || '#ffffff';
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = theme.getPropertyValue('--ui-text').trim() || '#171717';
    ctx.fillText(text, left + width / 2, centerY + badgeRadius * 0.01);
  }
  ctx.restore();
}
//# sourceMappingURL=analysisPointBadge.js.map
