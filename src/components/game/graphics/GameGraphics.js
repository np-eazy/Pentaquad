function drawRect(canvas, x, y, xSize, ySize, color) {
    canvas.fillStyle = color;
    canvas.fillRect(x, y, xSize, ySize);
}
var DEBUG = true;

const GameGraphics = (props) => {
    function render(canvas, board) {
        // Fill in cells from the coreState board
        var [xSize, ySize] = [board[0].length, board.length]
        var [xCellSize, yCellSize] = [props.windowSize / xSize, props.windowSize / ySize]
        for (var y = 0; y < ySize; y++) {
            for (var x = 0; x < xSize; x++) {
                if (board[y][x].type > 0) {
                    drawRect(canvas, x * xCellSize, y * yCellSize, xCellSize, yCellSize, board[y][x].props.parent.color.getHex());
                }
            }
        }

        // Fill in cells from the coreState current piece.
        var [x, y] = [0, 0]
        var piece = props.gameState.coreState.currPiece
        if (piece != null) {
            // Fill in the hitboxes to debug collision detection.
            if (DEBUG) {
                for (var i = 0; i < 4; i++) {
                    for (const cell of piece.collisionSets[i]) {
                        [x, y] = [cell[1][0] + piece.cx, cell[1][1] + piece.cy]
                        drawRect(canvas, x * xCellSize, y * yCellSize, xCellSize, yCellSize, "#eeeeee");
                    }
                }
            }
            // Fill in the actual cell
            for (const cell of piece.cells) {
                [x, y] = [cell[1][0] + piece.cx, cell[1][1] + piece.cy]
                drawRect(canvas, x * xCellSize, y * yCellSize, xCellSize, yCellSize, piece.color.getHex());
            }
        }
    }

    // Canvas and context wiring
    var canv = document.getElementById("gameGraphics");
    var ctx = canv != null ? canv.getContext('2d') : null;
    if (ctx != null && props.gameState != undefined) {
        ctx.clearRect(0, 0, props.windowSize, props.windowSize);
        render(ctx, props.gameState.coreState.board);
    }
};

export default GameGraphics;
