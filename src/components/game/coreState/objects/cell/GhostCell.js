import Cell from "./Cell";
import { CELL_TYPE } from "../../../Constants";
import { drawRect, outlineRect } from "../../../graphics/Pipeline";
import {
    interpolateColor,
} from "../../../graphics/utils/Colors";
import {
    EMPTY_COLOR,
    LIGHT_AMPLITUDE,
} from "../../../graphics/Theme";
import {
    linInt,
} from "../../../graphics/utils/Functions";


class GhostCell extends Cell {
    constructor() {
        super(CELL_TYPE.GHOST);
    }

    idleUpdate() {
        super.idleUpdate();
        this.meter = 1 - 0.5 * Math.sin(this.timer * 0.03);
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
            var d = this.meter * LIGHT_AMPLITUDE * 0.5 + LIGHT_AMPLITUDE;
            var g = 0.5 + 0.1 * Math.sin(this.timer * 0.1)
          
            drawRect(canvas, x, y, width, height, interpolateColor(this.currentColor, EMPTY_COLOR, g, linInt).getHex());
            drawRect(canvas, x + d, y + d, width - 2 * d, height - 2 * d, interpolateColor(this.midLightColor, EMPTY_COLOR, g, linInt).getHex());
            drawRect(canvas, x + 2 * d, y + 2 * d, width - 4 * d, height - 4 * d, interpolateColor(this.centerLightColor, EMPTY_COLOR, g, linInt).getHex());
            outlineRect(canvas, x + 2, y + 2, width - 4, height - 4, EMPTY_COLOR.getHex());
        }
    }
}

export default GhostCell;