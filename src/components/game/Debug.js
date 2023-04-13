import { FILLED_COLOR } from "./graphics/Theme";

export const DEBUG = true;
export const MESSAGE_SIZE = 24;
export const MESSAGE_OFFSET = 10;

// TODO: Add more args to debugCell like x and y position or left/right align to render more of these
export function debugCell(canvas, cell, x0, y0, boardX, boardY) {
    canvas.font = (MESSAGE_SIZE - 4).toString() + "px Arial";
    canvas.fillStyle = FILLED_COLOR.getHex();

    canvas.fillText(boardX.toString() + ", " + boardY.toString(), x0 + MESSAGE_OFFSET, y0 + MESSAGE_SIZE);
    canvas.fillText("type: " + cell.type.toString(), x0 + MESSAGE_OFFSET, y0 + MESSAGE_SIZE * 2);
    canvas.fillText("baseColor: " + cell.baseColor.toString(), x0 + MESSAGE_OFFSET, y0 + MESSAGE_SIZE * 3);
    canvas.fillText("currentColor: " + cell.baseColor.toString(), x0 + MESSAGE_OFFSET,y0 +  MESSAGE_SIZE * 4);
    canvas.fillText("x offset: " + cell.xOffset.toString(), x0 + MESSAGE_OFFSET, y0 + MESSAGE_SIZE * 5);
    canvas.fillText("y offset: " + cell.yOffset.toString(), x0 + MESSAGE_OFFSET, y0 + MESSAGE_SIZE * 6);
    canvas.fillText("timer: " + cell.timer.toString(), x0 + MESSAGE_OFFSET, y0 + MESSAGE_SIZE * 7);
    canvas.fillText("meter: " + cell.meter.toString(), x0 + MESSAGE_OFFSET, y0 + MESSAGE_SIZE * 8);
    canvas.fillText("lifetime: " + cell.lifetime.toString(), x0 + MESSAGE_OFFSET, y0 + MESSAGE_SIZE * 9);
    canvas.fillText("ttl: " + cell.ttl.toString(), x0 + MESSAGE_OFFSET, y0 + MESSAGE_SIZE * 10);
}