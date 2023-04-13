import Cell from "./Cell";
import { CELL_TYPE } from "../../../Constants";
import { drawRect } from "../../../graphics/Pipeline";
import {
    EMPTY_COLOR,
    MARKER_COLOR, 
} from "../../../graphics/Theme";

class EmptyCell extends Cell {
    constructor() {
        super(CELL_TYPE.EMPTY);
    }

    idleUpdate() {
        super.idleUpdate();
        if (this.marked) {
            this.meter *= 0.9;
          } else {
            this.meter += (1 - this.meter) * 0.1;
          }
    }

    activeUpdate() {
        super.activeUpdate();
    }

    advanceUpdate() {
        super.advanceUpdate();
    }

    render(canvas, x0, y0, width, height) {
        var [x, y] = super.getPosition(x0, y0);

        drawRect(canvas, x, y, width, height, EMPTY_COLOR.getHex());
        var d = this.meter * width / 2;
        drawRect(canvas, x + d, y + d, width - 2 * d, height - 2 * d, MARKER_COLOR.getHex());
    }
}

export default EmptyCell;