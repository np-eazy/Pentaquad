// A wrapper state for CoreState, which controls the advancement of the game. GameState
// controls the flow of CoreState to effectively slow down, speed up, pause the game,
// or leave intervals for graphic transitions.

// Required props:
// - coreState: the CoreState of the game
// - controller: the GameController of the game

// Game props:
const DEFAULT_TICKS_TO_MOVE = 10 // Wait this many ticks between each idleMove() call on coreState

const GameState = class {
    constructor (props) {
        this.coreState = props.coreState
        this.controller = props.controller
        this.coreState.controller = this.controller
        this.ticksToMove = props.ticksToMove ? props.ticksToMove : DEFAULT_TICKS_TO_MOVE
        this.ticks = 0
    }

    update() {
        this.coreState.update(this.ticks % this.ticksToMove == 0)
        this.ticks += 1
        return this
    }

    executeAction(action) {
        this.coreState.executeAction()
    }
}

export default GameState