import { Angle, Dxn } from "../coreState/utils/Direction";
import { BOARD_X0, BOARD_Y0 } from "../../graphics/Layout";
import { GameAction, ActionType } from "./GameAction";

// A class whose instance acts as a UseState for canvas to listen and hold onto keystrokes, to be consumed by a GameState on its update.
class GameController {
  constructor({ windowDimensions, boardSize }) {
    this.actionQueue = [];
    this.cursorX = 0;
    this.cursorY = 0;
    this.toggleMoveTo = false;
    this.windowDimensions = windowDimensions;
    this.boardSize = boardSize;
  }
  // We should have two types of controls: holdable keys which follow the rule above, and single-press keys which already work as
  // intended with keyDown. Holdable keys include WASD movement, and single-press keys include SPACE and QE for placing/rotation.
  handleKeyDown(event) {
    var action = null;
    var keycode = event.keyCode;
    if (keycode === 87) {
      // W
      action = new GameAction(ActionType.MOVE, { dxn: Dxn[Angle.UP] });
    } else if (keycode === 65) {
      // A
      action = new GameAction(ActionType.MOVE, { dxn: Dxn[Angle.LEFT] });
    } else if (keycode === 83) {
      // S
      action = new GameAction(ActionType.MOVE, { dxn: Dxn[Angle.DOWN] });
    } else if (keycode === 68) {
      // D
      action = new GameAction(ActionType.MOVE, { dxn: Dxn[Angle.RIGHT] });
    } else if (keycode === 81) {
      // Q
      action = new GameAction(ActionType.ROTATE, { angle: 1 });
    } else if (keycode === 69) {
      // E
      action = new GameAction(ActionType.ROTATE, { angle: -1 });
    } else if (keycode === 70) {
      // F
      action = new GameAction(ActionType.FLIP, {});
    } else if (keycode === 32) {
      // SPACE
      action = new GameAction(ActionType.DROP, {});
    } else if (keycode === 82) {
      // R
      action = new GameAction(ActionType.ROTATE, { angle: 1 });
    } else if (keycode === 49) {
      // 1
      action = new GameAction(ActionType.HOLD, { item: 0 });
    } else if (keycode === 50) {
      // 2
      action = new GameAction(ActionType.HOLD, { item: 1 });
    } else if (keycode === 51) {
      // 3
      action = new GameAction(ActionType.HOLD, { item: 2 });
    } else if (keycode === 52) {
      // 4
      action = new GameAction(ActionType.HOLD, { item: 3 });
    } else if (keycode === 53) {
      // 5
      action = new GameAction(ActionType.HOLD, { item: 4 });
    } else if (keycode === 67) {
      // C
      action = new GameAction(ActionType.LOCK, {});
    }
    if (action != null) {
      this.actionQueue.push(action);
    }
    return this;
  }

  // Update the mouse position
  handleMouseMove(event) {
    this.cursorX = event.clientX - BOARD_X0;
    this.cursorY = event.clientY - BOARD_Y0;
  }

  // Toggle the moveTo flag to continuously produce MOVE_TO actions.
  handleMouseDown(event) {
    this.toggleMoveTo = !this.toggleMoveTo;
  }

  // Map the global location of the mouse with the in-game grid index of the cursor.
  getCursorCoords(windowDimensions, boardSize) {
    var x = Math.floor((this.cursorX / windowDimensions) * boardSize);
    var y = Math.floor((this.cursorY / windowDimensions) * boardSize);
    return [x, y];
  }

  // Consume the last action registered in the queue.
  consumeAction() {
    var action = this.actionQueue.shift();
    if (action) {
      return action;
    } else {
      if (this.toggleMoveTo) {
        var [x_, y_] = this.getCursorCoords(
          this.windowDimensions,
          this.boardSize
        );
        this.actionQueue.push(
          new GameAction(ActionType.MOVE_TO, { x: x_, y: y_ })
        );
      }
    }
  }
}
export default GameController;
