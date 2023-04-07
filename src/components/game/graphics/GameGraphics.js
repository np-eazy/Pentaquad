import { drawRect, outlineRect } from "./utils/Shapes";
import Cell from "../coreState/objects/cell/Cell";
import { drawCell } from "./objects/cell/DrawCell";
import { STAGE_WIDTH, WINDOW_SIZE } from "../Constants";

import { renderBoard, updateBoard } from "./sections/Board";
import { renderStage } from "./sections/Stage";
import { drawPiece } from "./objects/piece/DrawPiece";
import { drawTargets } from "./objects/target/DrawTargets";
import { drawCursor } from "./objects/cursor/DrawCursor";



// The code in GameGraphics is short-lived and due for a refactor as soon as core logic is fleshed out.
// Disregard the spaghetti code, it's only to provide the most minimal UI for testing/debugging.
const GameGraphics = (props) => {
  var board = props.gameState.coreState.board;
  var [xSize, ySize] = [board[0].length, board.length];
  var [xCellSize, yCellSize] = [
    props.windowSize / xSize,
    props.windowSize / ySize,
  ];

  function render(canvas) {
    renderBoard(canvas, 
      board, 
      xCellSize, yCellSize);

    renderStage(canvas, 
      props.gameState.coreState.pieceStage);

    drawPiece(canvas, 
      props.gameState.coreState.currPiece, 
      xCellSize, yCellSize);

    drawTargets(canvas, 
      props.gameState.coreState.targets, 
      props.gameState.coreState.targetStage, 
      xCellSize, yCellSize);

    drawCursor(canvas,
      props.gameState.coreState.board,
      props.gameState.controller,
      WINDOW_SIZE,
      xCellSize, yCellSize);

    updateBoard(board);
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

export default GameGraphics;
