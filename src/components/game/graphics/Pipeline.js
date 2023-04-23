// Graphics building blocks to render the game

// Every action in graphics that draws shapes will boil down to a sequence
// of function calls from the functions below. As of now they deal with JS/HTML
// Canvas, which is very limited and slow, but in the future these functions will
// serve as entry points to call Rust/WASM/WebGL functions and APIs for more
// powerful rendering.

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

export function drawRectOffset(canvas, x, y, xSize, ySize, color, offset) {
  canvas.fillStyle = color;
  canvas.fillRect(x + offset, y + offset, xSize - 2 * offset, ySize - 2 * offset);
}


export function outlineRectOffset(canvas, x, y, xSize, ySize, color, offset) {
  canvas.strokeStyle = color;
  canvas.beginPath();
  canvas.strokeRect(x + offset, y + offset, xSize - 2 * offset, ySize - 2 * offset);
  canvas.closePath();
}
