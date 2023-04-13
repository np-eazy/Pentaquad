import Cell from "./Cell";
import { CELL_TYPE } from "../../../Constants";
import { outlineRect } from "../../../graphics/Pipeline";
import {
    interpolateColor,
} from "../../../graphics/utils/Colors";
import {
    EMPTY_COLOR,
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

    advanceUpdate(computeColors) {
        super.advanceUpdate(computeColors);
    }

    render(canvas, x0, y0, width, height) {
        var [x, y] = super.getPosition(x0, y0);
        var borderColor = interpolateColor(
            MARKER_COLOR,
            this.currentColor,
            1 - this.meter, 
            linInt,
          );
          outlineRect(canvas, x + 2, y + 2, width - 4, height - 4, borderColor.getHex());

        var clock = ((this.timer / 100) % 1);
        var innerLength = clock * width / 2
        var innerColor = interpolateColor(this.colorSuite.midLight, EMPTY_COLOR, clock, linInt);
        outlineRect(canvas, x + innerLength, y + innerLength, width - innerLength * 2, height - innerLength * 2, innerColor.getHex());
    }
}

export default DrillCell;