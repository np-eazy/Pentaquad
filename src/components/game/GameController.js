import { GameAction, ActionType } from "./coreState/GameAction"
// A class whose instance acts as a UseState for canvas to listen and hold onto keystrokes, to be consumed by a GameState on its update.
class GameController {
    constructor() {
        this.actionQueue = [];
    }

    // TODO: Right now the default keyDown event doesn't immediately repeat keys held down. Change the implementation for certain keys
    // such that a keyDown event adds to a keyset and a corresponding keyUp event removes from the keyset, and replace consumeAction
    // with a function that simply returns the mapped actions from the.
    
    // We should have two types of controls: holdable keys which follow the rule above, and single-press keys which already work as
    // intended with keyDown. Holdable keys include WASD movement, and single-press keys include SPACE and QE for placing/rotation.
    handleKeyDown(key) {
        var action = null;
        if (key == "w") {
            action = new GameAction(ActionType.MOVE, {angle: 1})
        } else if (key == "a") {
            action = new GameAction(ActionType.MOVE, {angle: 2})
        } else if (key == "s") {
            action = new GameAction(ActionType.MOVE, {angle: 3})
        } else if (key == "d") {
            action = new GameAction(ActionType.MOVE, {angle: 0})
        
        // TODO: Change handleKeypress to take in the whole event so keyCode can be invoked for arrow keys.
        } else if (key == "q") {
            action = new GameAction(ActionType.ROTATE, {angle: 1})
        } else if (key == "e") {
            action = new GameAction(ActionType.ROTATE, {angle: -1})

        } else if (key == " ") {
            action = new GameAction(ActionType.PLACE, {})
        }
        if (action != null) {
            this.actionQueue.push(action)
        }
        return this;
    }

    // Consume the last action registered in the queue.
    consumeAction() {         
        return this.actionQueue.shift()
    }
}

export default GameController;