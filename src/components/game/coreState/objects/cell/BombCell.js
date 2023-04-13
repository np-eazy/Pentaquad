import Cell from "./Cell";
import { CELL_TYPE } from "../../../Constants";
import { drawRect, outlineRect } from "../../../graphics/Pipeline";
import {
    EMPTY_COLOR,
} from "../../../graphics/Theme";


class BombCell extends Cell {
    constructor() {
        super(CELL_TYPE.BOMB);
    }

    idleUpdate() {
        super.idleUpdate();
    }

    activeUpdate() {
        super.activeUpdate();
    }

    advanceUpdate(computeColors) {
        super.advanceUpdate(computeColors);
    }

    render(canvas, x0, y0, width, height) {
        var [x, y] = super.getPosition(x0, y0);

        drawRect(canvas, x, y, width, height, EMPTY_COLOR.getHex());
        outlineRect(canvas, x + 2, y + 2, width - 4, height - 4, this.currentColor.getHex());
        outlineRect(canvas, x + 4, y + 4, width - 8, height - 8, this.colorSuite.midLight.getHex());
        outlineRect(canvas, x + 6, y + 6, width - 12, height - 12, this.colorSuite.centerLight.getHex());
    }
}

export default BombCell;