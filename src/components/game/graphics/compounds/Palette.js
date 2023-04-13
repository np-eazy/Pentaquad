import { PALETTE_HEIGHT, PALETTE_WIDTH, PALETTE_X0, PALETTE_Y0, drawBackground } from "../Layout"

export const renderPalette = (canvas, palette) => {
    drawBackground(canvas, PALETTE_X0, PALETTE_Y0, PALETTE_WIDTH, PALETTE_HEIGHT);
}

export const updatePalette = (palette) => {

}