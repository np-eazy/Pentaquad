import Cell from "./Cell";
import { CELL_TYPE } from "../../../Constants";
import { drawRect, outlineRect } from "../../../graphics/Pipeline";

import {
    EMPTY_COLOR,
    LIGHT_AMPLITUDE,
} from "../../../graphics/Theme";
import {
    interpolateColor,
} from "../../../graphics/utils/Colors";
import {
    linInt,
} from "../../../graphics/utils/Functions";


class TowerCell extends Cell {
    constructor() {
        super(CELL_TYPE.TOWER);
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

        if (this.currentColor) {
            var d = this.meter * LIGHT_AMPLITUDE * 0.5 + LIGHT_AMPLITUDE;
            var g = 0.5 + 0.2 * Math.sin(this.timer * 0.2)
          
            drawRect(canvas, x, y, width, height, interpolateColor(this.currentColor, EMPTY_COLOR, g, linInt).getHex());
            drawRect(canvas, x + d, y + d, width - 2 * d, height - 2 * d, interpolateColor(this.colorSuite.midLight, EMPTY_COLOR, g, linInt).getHex());
            drawRect(canvas, x + 2 * d, y + 2 * d, width - 4 * d, height - 4 * d, interpolateColor(this.colorSuite.centerLight, EMPTY_COLOR, g, linInt).getHex());
            outlineRect(canvas, x + 2, y + 2, width - 4, height - 4, EMPTY_COLOR.getHex());

            var innerLength = (1 - ((this.timer / 100) % 1)) * width / 2;
            outlineRect(canvas, x + innerLength, y + innerLength, width - innerLength * 2, height - innerLength * 2, this.colorSuite.centerLight.getHex());
          }
    }
}

export default TowerCell;