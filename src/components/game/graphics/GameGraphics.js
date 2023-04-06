import { drawRect, outlineRect } from "./Shapes";
import Cell from "../coreState/Cell";
import { drawCell } from "./DrawCell";
import { updateCell } from "./UpdateCell";
import { STAGE_WIDTH, WINDOW_SIZE } from "../Constants";

import { renderBoard, updateBoard } from "./Board";
import { renderStage } from "./Stage";
import { renderPiece } from "./Piece";
import { renderTargets } from "./Targets";
import { renderCursor } from "./Cursor";



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
    renderBoard(canvas, 
      board, 
      xCellSize, yCellSize);   

    renderPiece(canvas, 
      props.gameState.coreState.currPiece, 
      xCellSize, yCellSize);

    renderTargets(canvas, 
      props.gameState.coreState.targets, 
      props.gameState.coreState.targetStage, 
      xCellSize, yCellSize);

    renderCursor(canvas,
      props.gameState.coreState.board,
      props.gameState.controller,
      WINDOW_SIZE,
      xCellSize, yCellSize);

    updateBoard(board);
  }


  function render(canvas) {
    renderGrid(canvas, board);
    renderStage(canvas, props.gameState.coreState.pieceStage);
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
