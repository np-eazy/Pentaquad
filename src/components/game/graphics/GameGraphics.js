import { drawRect, outlineRect } from "./Shapes";
import Cell from "../coreState/Cell";
import { drawCell } from "./DrawCell";
import { updateCell } from "./UpdateCell";
import { STAGE_WIDTH, WINDOW_SIZE } from "../Constants";

const STAGE_CELL_SIZE = WINDOW_SIZE / 24;

// The code in GameGraphics is short-lived and due for a refactor as soon as core logic is fleshed out.
// Disregard the spaghetti code, it's only to provide the most minimal UI for testing/debugging.
const GameGraphics = (props) => {
  var board = props.gameState.coreState.board;
  var [xSize, ySize] = [board[0].length, board.length];
  var [xCellSize, yCellSize] = [
    props.windowSize / xSize,
    props.windowSize / ySize,
  ];

  // Fill in cells from the coreState board
  function renderGrid(canvas, board) {
    // Draw grid cells
    for (var y = 0; y < ySize; y++) {
      for (var x = 0; x < xSize; x++) {
        drawCell(
          canvas,
          props.gameState.coreState.board[y][x],
          x * xCellSize,
          y * yCellSize,
          xCellSize,
          yCellSize
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

  function renderStage(canvas, board) {
    drawRect(canvas, WINDOW_SIZE, 0, STAGE_WIDTH, WINDOW_SIZE, "#000000");
    // Draw outlines of future pieces
    var stage = props.gameState.coreState.pieceStage;
    var [xOffset, yOffset] = [0, 0]; // These offsets will better be taken care of in Domain classes.
    for (var i = 0; i < stage.nextPieces.length; i++) {
      var preset = stage.nextPieces[i].preset;
      var [x_, y_] = [2.25, 2.5 + 6 * i];
      for (const [x, y] of preset) {
        drawCell(
          canvas,
          stage.nextPieces[i].mainCell,
          WINDOW_SIZE + xOffset + (x + x_) * STAGE_CELL_SIZE,
          yOffset + (y + y_) * STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
        );
      }
    }
    if (stage.heldPiece != null) {
      var preset = stage.heldPiece.preset;
      var [x_, y_] = [10.5, 4.5];
      for (const [x, y] of preset) {
        outlineRect(
          canvas,
          xOffset + (x + x_) * STAGE_CELL_SIZE,
          yOffset + (y + y_) * STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
          "#404040"
        );
      }
    }
  }

  function render(canvas) {
    renderGrid(canvas, board);
    renderStage(canvas, board);
  }

  function renderNull(canvas) {}

  // Canvas and context wiring
  var canv = document.getElementById("gameGraphics");
  var ctx = canv != null ? canv.getContext("2d") : null;
  if (ctx != null && props.gameState != undefined) {
    ctx.clearRect(0, 0, WINDOW_SIZE + STAGE_WIDTH, props.windowSize);
    props.gameState
      ? render(ctx, props.gameState.coreState.board)
      : renderNull(ctx);
  }
};

function renderGrid(canvas, board) {}

export default GameGraphics;
