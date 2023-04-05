import { drawRect, outlineRect } from "./Shapes";
import Cell from "../coreState/Cell";
import { drawCell } from "./DrawCell";
import { updateCell } from "./UpdateCell";

// The code in GameGraphics is short-lived and due for a refactor as soon as core logic is fleshed out.
// Disregard the spaghetti code, it's only to provide the most minimal UI for testing/debugging.
const GameGraphics = (props) => {
  function render(canvas, board) {
    // Fill in cells from the coreState board
    var [xSize, ySize] = [board[0].length, board.length];
    var [xCellSize, yCellSize] = [
      props.windowSize / xSize,
      props.windowSize / ySize,
    ];

    // Draw grid cells
    for (var y = 0; y < ySize; y++) {
      for (var x = 0; x < xSize; x++) {
        drawCell(
          canvas,
          props.gameState.coreState.board[y][x],
          x * xCellSize,
          y * yCellSize,
          xCellSize,
          yCellSize,
          {} // TODO: Keep a GraphicProps map
        );
      }
    }

    // Update grid cells
    for (var y = 0; y < ySize; y++) {
      for (var x = 0; x < xSize; x++) {
        updateCell(props.gameState.coreState.board[y][x]);
      }
    }

    // Fill in cells from the coreState current piece.
    var [x, y] = [0, 0];
    var piece = props.gameState.coreState.currPiece;
    // TODO: Improve
    if (piece) {
      var mainCell = new Cell(1, {
        dxn: props.gameState.coreState.gravity,
        baseColor: piece.baseColor,
      });
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
    
    // Draw outlines of Targets
    for (var t of props.gameState.coreState.targets) {
      outlineRect(
        canvas,
        t.x0 * xCellSize,
        t.y0 * yCellSize,
        (t.x1 - t.x0) * xCellSize,
        (t.y1 - t.y0) * yCellSize,
        "#000000"
      );
    }
    [x, y] = props.gameState.controller.gridCursor(
      props.windowSize,
      board.length
    );
    outlineRect(
      canvas,
      x * xCellSize,
      y * yCellSize,
      xCellSize,
      yCellSize,
      "#000000"
    );

    // Draw outlines of future pieces
    // var stage = props.gameState.coreState.pieceStage
    // var [xOffset, yOffset] = [0, 0] // These offsets will better be taken care of in Domain classes.
    // for (var i = 0; i < stage.nextPieces.length; i++) {
    //     var preset = stage.nextPieces[i].preset
    //     var [x_, y_] = [4.5, 4.5 + 6 * i]
    //     for (const [x, y] of preset) {
    //         outlineRect(
    //             canvas, xOffset + (x + x_) * xCellSize, yOffset + (y + y_) * yCellSize,
    //             xCellSize, yCellSize, "#404040")
    //     }
    // }
    // if (stage.heldPiece != null) {
    //     var preset = stage.heldPiece.preset
    //     var [x_, y_] = [10.5, 4.5]
    //     for (const [x, y] of preset) {
    //         outlineRect(
    //             canvas, xOffset + (x + x_) * xCellSize, yOffset + (y + y_) * yCellSize,
    //             xCellSize, yCellSize, "#404040")
    //     }
    // }

    var stage = props.gameState.coreState.targetStage;
    for (const target of stage.nextTargets) {
      outlineRect(
        canvas,
        target.x0 * xCellSize,
        target.y0 * yCellSize,
        (target.x1 - target.x0) * xCellSize,
        (target.y1 - target.y0) * yCellSize,
        "#a0a0a0"
      );
    }
  }

  function renderNull(canvas) {}

  // Canvas and context wiring
  var canv = document.getElementById("gameGraphics");
  var ctx = canv != null ? canv.getContext("2d") : null;
  if (ctx != null && props.gameState != undefined) {
    ctx.clearRect(0, 0, props.windowSize, props.windowSize);
    props.gameState
      ? render(ctx, props.gameState.coreState.board)
      : renderNull(ctx);
  }
};

export default GameGraphics;
