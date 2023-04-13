import { BOARD_SIZE, STAGE_WIDTH, WINDOW_SIZE } from "../Constants";

import { renderBoard, updateBoard } from "./compounds/Board";
import { renderStage, updateStage } from "./compounds/Stage";
import { drawPiece } from "./objects/piece/DrawPiece";
import { drawTargets } from "./objects/target/DrawTargets";
import { drawCursor } from "./objects/cursor/DrawCursor";
import { updatePiece } from "./objects/piece/UpdatePiece";
import { BOARD_HEIGHT, BOARD_WIDTH, TOTAL_HEIGHT, TOTAL_WIDTH } from "./Layout";
import { renderScoresheet } from "./compounds/Scoresheet";
import { renderPalette } from "./compounds/Palette";

const GameGraphics = (props) => {
  var board = props.gameState.coreState.board;
  var [xSize, ySize] = [board[0].length, board.length];
  var [xCellSize, yCellSize] = [
    BOARD_WIDTH / xSize,
    BOARD_HEIGHT / ySize,
  ];

  function graphicLoop(canvas) {
    renderBoard(canvas, 
      board, 
      xCellSize, yCellSize,
      {
        piece: props.gameState.coreState.currPiece,
        targets: props.gameState.coreState.targets,
        targetStage: props.gameState.coreState.targetStage,
        controller: props.gameState.controller,
      });

    renderStage(canvas, 
      props.gameState.coreState.pieceStage);

    // renderScoresheet(canvas, 
    //   undefined);
    // renderPalette(canvas, 
    //   undefined);
    
    updateBoard(board);

    updatePiece(props.gameState.coreState.currPiece);
    updateStage(props.gameState.coreState.pieceStage);
  }

  function emptyLoop(canvas) {}

  // Canvas and context wiring
  var canv = document.getElementById("gameGraphics");
  var ctx = canv != null ? canv.getContext("2d") : null;
  if (ctx != null && props.gameState != undefined) {
    ctx.clearRect(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT);
    props.gameState
      ? graphicLoop(ctx, props.gameState.coreState.board)
      : emptyLoop(ctx);
  }
};

export default GameGraphics;
