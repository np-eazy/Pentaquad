import { BOARD_SIZE, STAGE_WIDTH, WINDOW_SIZE } from "../Constants";

import { renderBoard, updateBoard } from "./sections/Board";
import { renderStage, updateStage } from "./sections/Stage";
import { drawPiece } from "./objects/piece/DrawPiece";
import { drawTargets } from "./objects/target/DrawTargets";
import { drawCursor } from "./objects/cursor/DrawCursor";
import { updatePiece } from "./objects/piece/UpdatePiece";
import { BOARD_HEIGHT, BOARD_WIDTH, SCORESHEET_X0, SCORESHEET_Y0, TOTAL_HEIGHT, TOTAL_WIDTH } from "./Layout";
import { renderScoresheet, updateScoresheet } from "./sections/Scoresheet";
import { renderPalette, updatePalette } from "./sections/Palette";
import { DEBUG, debugCell } from "../Debug";
import { inBounds } from "../coreState/utils/Functions";
import { useLayoutEffect } from "react";

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
    renderScoresheet(canvas, 
      undefined);
    renderPalette(canvas, 
      props.gameState.coreState.pieceStage);
    
    updateBoard(board, props.gameState.coreState.currPiece);
    updateStage(props.gameState.coreState.pieceStage);
    //updatePalette(props.gameState.coreState.pieceStage);
    updateScoresheet(undefined);

    if (DEBUG) {
      var [x, y] = props.gameState.controller.gridCursor(BOARD_HEIGHT, BOARD_SIZE);
      if (inBounds(x, y, board.length)) {
        debugCell(canvas, board[y][x], SCORESHEET_X0, SCORESHEET_Y0, x, y);
      }
    }
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
