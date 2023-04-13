import Cell from "./Cell";
import { CELL_TYPE } from "../../../Constants";
import { outlineRect } from "../../../graphics/Pipeline";
import {
    interpolateColor,
} from "../../../graphics/utils/Colors";
import {
    MARKER_COLOR, 
} from "../../../graphics/Theme";
import {
    linInt,
} from "../../../graphics/utils/Functions";


class DrillCell extends Cell {
    constructor() {
        super(CELL_TYPE.DRILL);
    }

    idleUpdate() {
        super.idleUpdate();
    }

    activeUpdate() {
        super.activeUpdate();
    }

    advanceUpdate() {
        super.advanceUpdate();
    }

    render(canvas, x0, y0, width, height) {
        var [x, y] = super.getPosition(x0, y0);

        if (this.currentColor) {
            var borderColor = interpolateColor(
              MARKER_COLOR,
              this.currentColor,
              1 - this.meter, 
              linInt,
            );
            outlineRect(canvas, x + 2, y + 2, width - 4, height - 4, borderColor.getHex());
          }
    }
}

export default DrillCell;