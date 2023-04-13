import Cell from "./Cell";
import { CELL_TYPE } from "../../Constants";
import { drawRect, outlineRect } from "../../graphics/Pipeline";
import {
    EMPTY_COLOR,
    LIGHT_AMPLITUDE,
    MARKER_COLOR,
} from "../../graphics/Theme";
import {
    interpolateColor,
} from "../../graphics/utils/Colors";
import {
    linInt,
} from "../../graphics/utils/Functions";

class BombCell extends Cell {
    constructor() {
        super(CELL_TYPE.BOMB);
    }

    idleUpdate() {
        super.idleUpdate();
        this.meter = 1 - 0.5 * Math.sin(this.timer * 0.03);
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
          var d = this.meter * LIGHT_AMPLITUDE + LIGHT_AMPLITUDE;

          outlineRect(canvas, x, y, width, height, borderColor.getHex());
          outlineRect(canvas, x + d, y + d, width - 2 * d, height - 2 * d, this.colorSuite.midLight.getHex());
          outlineRect(canvas, x + 2 * d, y + 2 * d, width - 4 * d, height - 4 * d, this.colorSuite.centerLight.getHex());
          outlineRect(canvas, x + 2, y + 2, width - 4, height - 4, borderColor.getHex());
    }
}

export default BombCell;