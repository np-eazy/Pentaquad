function drawRect(canvas, x, y, xSize, ySize, color) {
    canvas.fillStyle = color
    canvas.fillRect(x, y, xSize, ySize)
}

function outlineRect(canvas, x, y, xSize, ySize, color) {
    canvas.strokeStyle = color
    canvas.beginPath()
    canvas.strokeRect(x, y, xSize, ySize)
    canvas.closePath()
}

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
            // Fill in the actual cell
            for (const cell of piece.cells) {
                [x, y] = [cell[1][0] + piece.cx, cell[1][1] + piece.cy]
                drawRect(canvas, x * xCellSize, y * yCellSize, xCellSize, yCellSize, piece.color.getHex());
            }
        }

        // Draw outlines of TargetBlocks
        for (var t of props.gameState.coreState.targetBlocks) {
            outlineRect(canvas, t.x0 * xCellSize, t.y0 * yCellSize, (t.x1 - t.x0) * xCellSize, (t.y1 - t.y0) * yCellSize, "#000000")
        }

        [x, y] = props.gameState.controller.gridCursor(props.windowSize, board.length)
        outlineRect(canvas, x * xCellSize, y * yCellSize, xCellSize, yCellSize, "#000000")

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
