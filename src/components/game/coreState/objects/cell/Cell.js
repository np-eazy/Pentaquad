import { TEMP_LIFETIME } from "../../../Constants";
import { Color, interpolateColor } from "../../../graphics/utils/Colors";
import { linInt } from "../../../graphics/utils/Functions";
import {
  EMPTY_COLOR,
  FILLED_COLOR,
  CELL_MID_LIGHT,
  CELL_CENTER_LIGHT,
  CELL_BASE_COLOR_BLEND,
} from "../../../graphics/Theme";


class Cell {
  constructor(type) {
    this.type = type;
    this.baseColor = new Color({ red: 0, green: 0, blue: 0 });
    this.setDefaults();
  }

  setDefaults() {
    this.xOffset = 0;
    this.yOffset = 0;
    this.timer = 0;
    this.meter = 0;
    this.lifetime = TEMP_LIFETIME;
    this.ttl = TEMP_LIFETIME;   
    if (this.baseColor) {
      this.advanceUpdate(true);
    }
  }

  getPosition(x0, y0) {
    return [x0 + this.xOffset, y0 + this.yOffset];
  }

  idleUpdate() {
    this.xOffset *= 0.8;
    this.yOffset *= 0.8;
    this.timer += 1;
  }

  activeUpdate() {

  }

  advanceUpdate(computeColors = false) {
    this.ttl -= 1;

    if (computeColors) {
      if (this.baseColor) {
        this.currentColor = interpolateColor(
          FILLED_COLOR,
          this.baseColor,
          CELL_BASE_COLOR_BLEND, 
          linInt,
        );
        if (this.ttl != -1) {
          this.currentColor = interpolateColor(
            EMPTY_COLOR,
            this.currentColor,
            this.ttl / this.lifetime,
            linInt,
          )
        }
        if (this.currentColor) {
          this.midLightColor = new Color({
            red: this.currentColor.red + CELL_MID_LIGHT,
            green: this.currentColor.green + CELL_MID_LIGHT,
            blue: this.currentColor.blue + CELL_MID_LIGHT,
          })
          this.centerLightColor = new Color({
            red: this.currentColor.red + CELL_CENTER_LIGHT,
            green: this.currentColor.green + CELL_CENTER_LIGHT,
            blue: this.currentColor.blue + CELL_CENTER_LIGHT,
          })
        }
      }
    } 
  }

  render(canvas, x0, y0, width, height) {
    x0 += this.xOffset;
    y0 += this.yOffset;
  }
}

export default Cell;