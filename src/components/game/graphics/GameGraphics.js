import { inBounds } from "../coreState/utils/Functions";
import { BOARD_SIZE } from "../Constants";

import { renderBoard, updateBoard } from "./sections/Board";
import { renderStage, updateStage } from "./sections/Stage";
import { renderScoresheet, updateScoresheet } from "./sections/Scoresheet";
import { renderPalette } from "./sections/Palette";

import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  SCORESHEET_X0,
  SCORESHEET_Y0,
  TOTAL_HEIGHT,
  TOTAL_WIDTH,
} from "./Layout";

import { DEBUG, debugCell } from "../Debug";

// The class which organizes all canvas and graphics-related code. Each
const GameGraphics = (props) => {
  var board = props.gameState.coreState.board;
  var [xSize, ySize] = [board[0].length, board.length];
  var [xCellSize, yCellSize] = [BOARD_WIDTH / xSize, BOARD_HEIGHT / ySize];

  // A single loop of rendering and "updating"; these updates however are all downstream
  // from the CoreState and only include other props like timers/colors to aid with the
  // graphics. At this point all GameState values are set in stone.
  function graphicLoop(canvas) {
    renderBoard(canvas, board, xCellSize, yCellSize, {
      piece: props.gameState.coreState.currPiece,
      targets: props.gameState.coreState.targets,
      targetStage: props.gameState.coreState.targetStage,
      controller: props.gameState.controller,
    });
    renderStage(canvas, props.gameState.coreState.pieceStage);
    renderScoresheet(canvas, undefined);
    renderPalette(canvas, props.gameState.coreState.pieceStage);

    updateBoard(board, {
      piece: props.gameState.coreState.currPiece,
      targets: props.gameState.coreState.targets,
      targetStage: props.gameState.coreState.targetStage,
    });
    updateStage(props.gameState.coreState.pieceStage);
    //updatePalette(props.gameState.coreState.pieceStage);
    updateScoresheet(undefined);

    // Render all the selected cell's attributes in the scoresheet if this flag is up.
    if (DEBUG) {
      var [x, y] = props.gameState.controller.gridCursor(
        BOARD_HEIGHT,
        BOARD_SIZE
      );
      if (inBounds(x, y, board.length)) {
        debugCell(canvas, board[y][x], SCORESHEET_X0, SCORESHEET_Y0, x, y);
      }
    }
  }

  // A placeholder empty loop in case there is no GameState loaded
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
