import { drawCell } from "../cell/DrawCell";
import { updateCell } from "../cell/UpdateCell";

export const updatePiece = (piece) => {
    // Fill in cells from the coreState current piece.
    var [x, y] = [0, 0];
    // TODO: Improve
    if (piece) {
        var mainCell = piece.mainCell;
        updateCell(piece.mainCell);
    }
}