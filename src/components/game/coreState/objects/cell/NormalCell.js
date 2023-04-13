import Cell from "./Cell";
import { CELL_TYPE } from "../../../Constants";
import { drawRect, outlineRect } from "../../../graphics/Pipeline";
import {
    interpolateColor,
} from "../../../graphics/utils/Colors";
import {
    MARKER_COLOR, 
    LIGHT_AMPLITUDE,
} from "../../../graphics/Theme";
import {
    linInt,
} from "../../../graphics/utils/Functions";

class NormalCell extends Cell {
    constructor() {
        super(CELL_TYPE.NORMAL);
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
        super.render();
        var [x, y] = super.getPosition(x0, y0);

        if (this.currentColor) {
            var borderColor = interpolateColor(
              MARKER_COLOR,
              this.currentColor,
              1 - this.meter, 
              linInt,
            );
            var d = this.meter * LIGHT_AMPLITUDE + LIGHT_AMPLITUDE;
          
            drawRect(canvas, x, y, width, height, this.currentColor.getHex());
            drawRect(canvas, x + d, y + d, width - 2 * d, height - 2 * d, this.midLightColor.getHex());
            drawRect(canvas, x + 2 * d, y + 2 * d, width - 4 * d, height - 4 * d, this.centerLightColor.getHex());
            outlineRect(canvas, x + 2, y + 2, width - 4, height - 4, borderColor.getHex());
          }
    }
}

export default NormalCell;