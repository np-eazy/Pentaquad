import { drawCell } from "./DrawCell";

export const renderPiece = (canvas, piece, xCellSize, yCellSize) => {
    // Fill in cells from the coreState current piece.
    var [x, y] = [0, 0];
    // TODO: Improve
    if (piece) {
        var mainCell = piece.mainCell;
        if (piece != null) {
            for (const cell of piece.cells) {
            [x, y] = [cell[1][0] + piece.cx, cell[1][1] + piece.cy];
            drawCell(
                canvas,
                mainCell,
                x * xCellSize,
                y * yCellSize,
                xCellSize,
                yCellSize,
                {} // TODO: Keep a GraphicProps map
            );
            }
        }
    }
}