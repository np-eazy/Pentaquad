import { GameAction, ActionType } from "./coreState/GameAction"
// A class whose instance acts as a UseState for canvas to listen and hold onto keystrokes, to be consumed by a GameState on its update.

const CLIENT_PADDING_X = 160;
const CLIENT_PADDING_Y = 0;

class GameController {
    constructor() {
        this.actionQueue = []
        this.cursorX = 0
        this.cursorY = 0
    }

    // TODO: Right now the default keyDown event doesn't immediately repeat keys held down. Change the implementation for certain keys
    // such that a keyDown event adds to a keyset and a corresponding keyUp event removes from the keyset, and replace consumeAction
    // with a function that simply returns the mapped actions from the.
    
    // We should have two types of controls: holdable keys which follow the rule above, and single-press keys which already work as
    // intended with keyDown. Holdable keys include WASD movement, and single-press keys include SPACE and QE for placing/rotation.
    handleKeyDown(key) {
        var action = null;
        if (key == "w") { // W
            action = new GameAction(ActionType.MOVE, {angle: 1})
        } else if (key == "a") { // A
            action = new GameAction(ActionType.MOVE, {angle: 2})
        } else if (key == "s") { // S
            action = new GameAction(ActionType.MOVE, {angle: 3})
        } else if (key == "d") { // D
            action = new GameAction(ActionType.MOVE, {angle: 0})
        
        // TODO: Change handleKeypress to take in the whole event so keyCode can be invoked for arrow keys.
        } else if (key == "q") { // Q
            action = new GameAction(ActionType.ROTATE, {angle: 1})
        } else if (key == "e") { // E
            action = new GameAction(ActionType.ROTATE, {angle: -1})

        } else if (key == "f") { // E
            action = new GameAction(ActionType.FLIP, {})

        } else if (key == " ") { // SPACE
            action = new GameAction(ActionType.DROP, {})
        
        } else if (key == "r") { // SPACE
            action = new GameAction(ActionType.PLACE, {})
        }
        if (action != null) {
            this.actionQueue.push(action)
        }
        return this;
    }

    // Update the mouse position
    handleMouseMove(event) {
        this.cursorX = event.clientX - CLIENT_PADDING_X
        this.cursorY = event.clientY - CLIENT_PADDING_Y
        
    }

    handleMouseDown(event, windowSize, boardSize) {
        var [x_, y_] = this.gridCursor(windowSize, boardSize)
        this.actionQueue.push(new GameAction(ActionType.MOVE_TO, {x: x_, y: y_}))
    }

    // Map the global location of the mouse with the in-game grid index of the cursor.
    gridCursor(windowSize, boardSize) {
        var x = Math.floor((this.cursorX / windowSize) * boardSize)
        var y = Math.floor((this.cursorY / windowSize) * boardSize)
        return [x, y]
    }

    // Consume the last action registered in the queue.
    consumeAction() {         
        return this.actionQueue.shift()
    }
}

export default GameController;