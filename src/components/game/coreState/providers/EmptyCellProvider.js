import EmptyCell from "../../coreObjects/cell/EmptyCell";

// A class tasked with providing new empty cells
export class EmptyCellProvider {
    constructor() {
        this.emptyCellGenerator = () => new EmptyCell();
    }

    newCell() {
        return this.emptyCellGenerator();
    }
}
