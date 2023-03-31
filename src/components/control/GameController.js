import { Angle, Dxn } from "../game/coreState/utils/Direction"
import { GameAction, ActionType } from "./GameAction"
// A class whose instance acts as a UseState for canvas to listen and hold onto keystrokes, to be consumed by a GameState on its update.

class GameController {
    constructor({windowSize, boardSize}) {
        this.actionQueue = []
        this.cursorX = 0
        this.cursorY = 0
        this.toggleMoveTo = false
        this.windowSize = windowSize
        this.boardSize = boardSize
    }
    // We should have two types of controls: holdable keys which follow the rule above, and single-press keys which already work as
    // intended with keyDown. Holdable keys include WASD movement, and single-press keys include SPACE and QE for placing/rotation.
    handleKeyDown(event) {
        var action = null
        var keycode = event.keyCode
        if (keycode == 87) { // W
            action = new GameAction(ActionType.MOVE, {dxn: Dxn[Angle.UP]})
        } else if (keycode == 65) { // A
            action = new GameAction(ActionType.MOVE, {dxn: Dxn[Angle.LEFT]})
        } else if (keycode == 83) { // S
            action = new GameAction(ActionType.MOVE, {dxn: Dxn[Angle.DOWN]})
        } else if (keycode == 68) { // D
            action = new GameAction(ActionType.MOVE, {dxn: Dxn[Angle.RIGHT]})
        } else if (keycode == 81) { // Q
            action = new GameAction(ActionType.ROTATE, {angle: 1})
        } else if (keycode == 69) { // E
            action = new GameAction(ActionType.ROTATE, {angle: -1})
        } else if (keycode == 70) { // F
            action = new GameAction(ActionType.FLIP, {})
        } else if (keycode == 32) { // SPACE
            action = new GameAction(ActionType.DROP, {})
        } else if (keycode == 82) { // R
            action = new GameAction(ActionType.PLACE, {})
        } else if (keycode == 67) { // C
            action = new GameAction(ActionType.HOLD, {})
        }
        if (action != null) {
            this.actionQueue.push(action)
        }
        return this
    }

    // Update the mouse position
    handleMouseMove(event) {
        this.cursorX = event.clientX
        this.cursorY = event.clientY
    }

    // Toggle the moveTo flag to continuously produce MOVE_TO actions.
    handleMouseDown(event) {
        this.toggleMoveTo = !this.toggleMoveTo
    }

    // Map the global location of the mouse with the in-game grid index of the cursor.
    gridCursor(windowSize, boardSize) {
        var x = Math.floor((this.cursorX / windowSize) * boardSize)
        var y = Math.floor((this.cursorY / windowSize) * boardSize)
        return [x, y]
    }

    // Consume the last action registered in the queue.
    consumeAction() {         
        var action = this.actionQueue.shift()
        if (action) {
            return action
        } else {
            if (this.toggleMoveTo) {
                var [x_, y_] = this.gridCursor(this.windowSize, this.boardSize)
                this.actionQueue.push(new GameAction(ActionType.MOVE_TO, {x: x_, y: y_}))               
            }
        }
    }
}
export default GameController
