import { Angle, Dxn } from "../coreState/utils/Direction";
import { BOARD_DIMENSIONS, BOARD_X0, BOARD_Y0 } from "../../graphics/theme/Layout";
import { GameAction, ActionType } from "./GameAction";
import { BOARD_MARGIN, BOARD_SIZE, WINDOW_DIMENSIONS } from "../rules/Constants";
import { KeyActions } from "./SettingsController";


// This action is specifically reserved for user input delays; when NOP is at the front of the queue, its multiple references are consumed one by one,
// as opposed to dumping the queue normally.
const NOP = new GameAction(ActionType.NOP, {});
const DELAY_BUFFER = 4;

// A class whose instance acts as a UseState for canvas to listen and hold onto keystrokes, to be consumed by a GameState on its update.
class GameController {
  constructor(props) {
    this.actionQueue = [];

    this.cursorX = 0;
    this.cursorY = 0;

    this.settingsController = props.settingsController;
    this.windowDimensions = WINDOW_DIMENSIONS;
  }

  reset() {
    this.actionQueue = [];
  }
  // We should have two types of controls: holdable keys which follow the rule above, and single-press keys which already work as
  // intended with keyDown. Holdable keys include WASD movement, and single-press keys include SPACE and QE for placing/rotation.
  handleKeyDown(event) {
    var action = null;
    var keycode = event.keyCode;
    if (this.settingsController) {
      var keybindings = this.settingsController.keybindings;
      if (keycode === keybindings.get(KeyActions.MOVE_UP)) {
        action = new GameAction(ActionType.MOVE, { dxn: Dxn[Angle.UP] });
      } else if (keycode === keybindings.get(KeyActions.MOVE_LEFT)) {
        action = new GameAction(ActionType.MOVE, { dxn: Dxn[Angle.LEFT] });
      } else if (keycode === keybindings.get(KeyActions.MOVE_DOWN)) {
        action = new GameAction(ActionType.MOVE, { dxn: Dxn[Angle.DOWN] });
      } else if (keycode === keybindings.get(KeyActions.MOVE_RIGHT)) {
        action = new GameAction(ActionType.MOVE, { dxn: Dxn[Angle.RIGHT] });
      } else if (keycode === keybindings.get(KeyActions.ROTATE_LEFT)) {
        action = new GameAction(ActionType.ROTATE, { angle: 1 });
      } else if (keycode === keybindings.get(KeyActions.ROTATE_RIGHT)) {
        action = new GameAction(ActionType.ROTATE, { angle: -1 });
      } else if (keycode === keybindings.get(KeyActions.FLIP)) {
        action = new GameAction(ActionType.FLIP, {});
      } else if (keycode === keybindings.get(KeyActions.DROP)) {
        action = new GameAction(ActionType.DROP, {});
      } else if (keycode === keybindings.get(KeyActions.ROTATE)) {
        action = new GameAction(ActionType.ROTATE, { angle: 1 });
      } else if (keycode === keybindings.get(KeyActions.HOLD_1)) {
        action = new GameAction(ActionType.HOLD, { item: 0 });
      } else if (keycode === keybindings.get(KeyActions.HOLD_2)) {
        action = new GameAction(ActionType.HOLD, { item: 1 });
      } else if (keycode === keybindings.get(KeyActions.HOLD_3)) {
        action = new GameAction(ActionType.HOLD, { item: 2 });
      } else if (keycode === keybindings.get(KeyActions.HOLD_4)) {
        action = new GameAction(ActionType.HOLD, { item: 3 });
      } else if (keycode === keybindings.get(KeyActions.HOLD_5)) {
        action = new GameAction(ActionType.HOLD, { item: 4 });
      } else if (keycode === keybindings.get(KeyActions.LOCK)) {
        action = new GameAction(ActionType.LOCK, {});
      }
    }

    if (action != null) {
      for (var i = 0; i < DELAY_BUFFER; i++) {
        this.actionQueue.push(NOP);
      }
      this.actionQueue.push(action);
    }
    return this;
  }

  handleMouseDown(event) {
  }

  // Update the mouse position
  handleMouseMove(event) {
    this.cursorX = event.clientX - BOARD_X0;
    this.cursorY = event.clientY - BOARD_Y0;
  }


  // Map the global location of the mouse with the in-game grid index of the cursor.
  getCursorCoords(windowDimensions) {
    var element = document.getElementById("gameWrapper");
    var rect = element.getBoundingClientRect();
    var cellSize = BOARD_DIMENSIONS / BOARD_SIZE;
    var x = Math.floor((((this.cursorX + cellSize * BOARD_MARGIN) - rect.left) / windowDimensions) * BOARD_SIZE);
    var y = Math.floor((((this.cursorY + cellSize * BOARD_MARGIN) - rect.top) / windowDimensions) * BOARD_SIZE);
    return [x, y];
  }

  // Consume the last action registered in the queue.
  consumeAction() {
    var action = this.actionQueue.shift();
    if (action) {
      return action;
    } else {
      if (this.settingsController.isUsingCursor) {
        var [x_, y_] = this.getCursorCoords(this.windowDimensions);
        this.actionQueue.push(
          new GameAction(ActionType.MOVE_TO, { x: x_, y: y_ })
        );
      }
    }
  }
}
export default GameController;
