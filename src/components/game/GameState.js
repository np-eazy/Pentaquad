// A wrapper state for CoreState, which controls the advancement of the game. GameState
// controls the flow of CoreState to effectively slow down, speed up, pause the game,
// or leave intervals for graphic transitions.

// Required props:
// - coreState: the CoreState of the game
// - controller: the GameController of the game
const GameState = class {
    constructor (props) {
        this.coreState = props.coreState
        this.controller = props.controller
        this.coreState.controller = this.controller
    }

    update() {
        this.coreState.update()
        return this
    }

    executeAction(action) {
        this.coreState.executeAction()
    }
}

export default GameState