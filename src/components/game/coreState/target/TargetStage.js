import { randint } from "../Utils"
import Target from "./Target"

const DEFAULT_MAX_LENGTH = 4

// A loading stage to provide Pieces for a CoreState and for the user to be
// able to see the next pieces, and also to hold/swap pieces.
class TargetStage {
    constructor(props) {
        this.coreState = props.coreState
        this.minBound = props.minBound
        this.maxBound = props.maxBound
        this.maxLength = props.maxLength ? props.maxLength : DEFAULT_MAX_LENGTH
        this.nextTargets = []
        for (var i = 0; i < this.maxLength; i++) {
            this.nextTargets.push(this.createNewTarget())
        }
    }

    createNewTarget() {
        var [x, y] = [randint(this.minBound, this.maxBound), randint(this.minBound, this.maxBound)]
        return new Target({
            coreState: this.coreState,
            x0: x - 1,
            y0: y - 1,
            x1: x + 1,
            y1: y + 1,
        })
    }

    // To be called by CoreState when it needs another target
    consumeTarget() {
        var target = this.nextTargets.shift()
        if (this.nextTargets.length < this.maxLength) {
            this.nextTargets.push(this.createNewTarget())
        }
        return target
    }
}
export default TargetStage
