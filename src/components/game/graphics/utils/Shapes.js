// Graphics building blocks to render the game

export function drawRect(canvas, x, y, xSize, ySize, color) {
  canvas.fillStyle = color;
  canvas.fillRect(x, y, xSize, ySize);
}

export function outlineRect(canvas, x, y, xSize, ySize, color) {
  canvas.strokeStyle = color;
  canvas.beginPath();
  canvas.strokeRect(x, y, xSize, ySize);
  canvas.closePath();
}
