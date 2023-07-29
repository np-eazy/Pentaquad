import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import { BOARD_MARGIN, BOARD_SIZE } from "../../game/rules/Constants";
import { drawRect } from "../CanvasPipeline";
import { WHITE } from "../theme/ColorScheme";
import { BOARD_DIMENSIONS, BOARD_X0, BOARD_Y0 } from "../theme/Layout";

const FILL_MARKER_TTL = 30.0;
const FILL_MARKER_EXP_RATE = 1.2;

export class FillMarker {
    constructor(isRow, index) {
        this.isRow = isRow;
        this.index = index - BOARD_MARGIN;
        this.lifetime = FILL_MARKER_TTL;
        this.ttl = FILL_MARKER_TTL;
        this.expansionRate = FILL_MARKER_EXP_RATE;
        this.size = 0.5 * BOARD_DIMENSIONS / BOARD_SIZE;
    }

    render(canvas) {
        if (this.ttl > 0) {
            canvas.globalAlpha = this.ttl / this.lifetime;
            var cellSize = BOARD_DIMENSIONS / BOARD_SIZE;
            if (this.isRow) {
                drawRect(canvas,
                    BOARD_X0,
                    BOARD_Y0 + (this.index + 0.5) * cellSize - this.size,
                    BOARD_DIMENSIONS,
                    this.size * 2,
                    WHITE.getHex());
            } else {
                drawRect(canvas,
                    BOARD_X0 + (this.index + 0.5) * cellSize - this.size,
                    BOARD_Y0,
                    this.size * 2,
                    BOARD_DIMENSIONS,
                    WHITE.getHex());
            }
            canvas.globalAlpha = 1;
        } else {
            console.log("not deleted")
        }
    }

    idleUpdate() {
        this.size *= this.expansionRate;
        this.ttl -= 1;
    }
}