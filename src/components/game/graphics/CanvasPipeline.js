// Graphics building blocks to render the game

// Every action in graphics that draws shapes will boil down to a sequence
// of function calls from the functions below. As of now they deal with JS/HTML
// Canvas, which is very limited and slow, but in the future these functions will
// serve as entry points to call Rust/WASM/WebGL functions and APIs for more
// powerful rendering.

export function drawRect(canvas, x, y, width, height, color) {
  canvas.fillStyle = color;
  canvas.fillRect(x, y, width, height);
}

export function outlineRect(canvas, x, y, width, height, color) {
  canvas.strokeStyle = color;
  canvas.beginPath();
  canvas.strokeRect(x, y, width, height);
  canvas.closePath();
}

export function drawRectOffset(canvas, x, y, width, height, color, offset) {
  canvas.fillStyle = color;
  canvas.fillRect(
    x + offset,
    y + offset,
    width - 2 * offset,
    height - 2 * offset
  );
}

export function outlineRectOffset(canvas, x, y, width, height, color, offset) {
  canvas.strokeStyle = color;
  canvas.beginPath();
  canvas.strokeRect(
    x + offset,
    y + offset,
    width - 2 * offset,
    height - 2 * offset
  );
  canvas.closePath();
}
