import { STAGE_WIDTH, WINDOW_SIZE } from "../Constants";

import { renderBoard, updateBoard } from "./objects/board/Board";
import { renderStage, updateStage } from "./objects/stage/Stage";
import { drawPiece } from "./objects/piece/DrawPiece";
import { drawTargets } from "./objects/target/DrawTargets";
import { drawCursor } from "./objects/cursor/DrawCursor";
import { updatePiece } from "./objects/piece/UpdatePiece";

const GameGraphics = (props) => {
  var board = props.gameState.coreState.board;
  var [xSize, ySize] = [board[0].length, board.length];
  var [xCellSize, yCellSize] = [
    props.windowSize / xSize,
    props.windowSize / ySize,
  ];

  function graphicLoop(canvas) {
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
    updatePiece(props.gameState.coreState.currPiece);
    updateStage(props.gameState.coreState.pieceStage);
  }

  function emptyLoop(canvas) {}

  // Canvas and context wiring
  var canv = document.getElementById("gameGraphics");
  var ctx = canv != null ? canv.getContext("2d") : null;
  if (ctx != null && props.gameState != undefined) {
    ctx.clearRect(0, 0, WINDOW_SIZE + STAGE_WIDTH, props.windowSize);
    props.gameState
      ? graphicLoop(ctx, props.gameState.coreState.board)
      : emptyLoop(ctx);
  }
};

export default GameGraphics;
