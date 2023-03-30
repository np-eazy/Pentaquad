import { getPID } from "./Utils"
import { DXN } from "./Direction"

// A container class to hold CollisionSets for quick
// collision detection.

// TODO: Utilize CollisionSets to do faster collision checks for the whole of
// CoreState.
class BoundarySets {
    constructor(boardSize, boundaryMargin, pidSize) {
        this.boundarySets = []
        var [xSize, ySize] = [boardSize, boardSize]
        var pid 
        for (var i = 0; i < 4; i++) {
            this.boundarySets.push(new Map())
        }
        for (var i = -boundaryMargin; i < ySize + boundaryMargin; i++) {
            pid = getPID(xSize, i, pidSize)
            this.boundarySets[DXN.RIGHT].set(pid, [xSize, i])

            pid = getPID(i, -1, pidSize)
            this.boundarySets[DXN.UP].set(pid, [i, -1])

            pid = getPID(-1, i, pidSize)
            this.boundarySets[DXN.LEFT].set(pid, [-1, i])

            pid = getPID(i, ySize, pidSize)
            this.boundarySets[DXN.DOWN].set(pid, [i, ySize])
        }
    }
}
export default BoundarySets
