const squareFills = new Map();
const textureSize = 128;
const maxCachedFills = 64;
function squareFill(color, softness) {
  const key = `${color}:${softness}`;
  const cached = squareFills.get(key);
  if (cached) return cached;
  if (!/^#[\da-f]{6}$/i.test(color)) return null;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = textureSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const channels = [1, 3, 5].map(offset => parseInt(color.slice(offset, offset + 2), 16));
  const pixels = ctx.createImageData(textureSize, textureSize);
  for (let row = 0; row < textureSize; row++) {
    for (let column = 0; column < textureSize; column++) {
      // Square distance keeps the contour square, even at full softness.
      const distance = Math.max(Math.abs((column + 0.5) * 2 / textureSize - 1), Math.abs((row + 0.5) * 2 / textureSize - 1));
      const fade = Math.max(0, (distance - (1 - softness)) / softness);
      const alpha = fade < 0.5 ? 1 - fade * 1.64 : (1 - fade) * 0.36;
      const offset = (row * textureSize + column) * 4;
      pixels.data[offset] = channels[0];
      pixels.data[offset + 1] = channels[1];
      pixels.data[offset + 2] = channels[2];
      pixels.data[offset + 3] = Math.round(alpha * 255);
    }
  }
  ctx.putImageData(pixels, 0, 0);
  if (squareFills.size >= maxCachedFills) {
    squareFills.delete(squareFills.keys().next().value);
  }
  squareFills.set(key, canvas);
  return canvas;
}
export function drawCompactAnalysisPoint({
  ctx,
  x,
  y,
  radius,
  shape,
  color,
  softness
}) {
  const amount = Math.max(0, Math.min(1, softness));
  if (shape === 'square' && amount > 0) {
    const fill = squareFill(color, amount);
    if (fill) {
      ctx.drawImage(fill, x - radius, y - radius, radius * 2, radius * 2);
      return;
    }
  }
  ctx.beginPath();
  if (shape === 'square') {
    ctx.roundRect(x - radius, y - radius, radius * 2, radius * 2, radius * 0.1);
    ctx.fillStyle = color;
  } else {
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (amount === 0) {
      ctx.fillStyle = color;
    } else {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, color);
      glow.addColorStop(1 - amount, color);
      glow.addColorStop(1 - amount / 2, /^#[\da-f]{6}$/i.test(color) ? `${color}2e` : color);
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
    }
  }
  ctx.fill();
}
//# sourceMappingURL=compactAnalysisPoint.js.map
