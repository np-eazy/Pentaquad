import { NORMAL_CELL_LIFETIME } from "../../Constants";

import { Color, interpolateColor } from "../../graphics/utils/Colors";
import { linInt } from "../../graphics/utils/Functions";
import {
  EMPTY_COLOR,
  FILLED_COLOR,
  CELL_MID_LIGHT,
  CELL_CENTER_LIGHT,
  CELL_BASE_COLOR_BLEND,
} from "../../graphics/Theme";

// Decay rate of X and Y offsets after row breaks.
const OFFSET_DECAY_RATE = 0.9;
const LIGHT_DECAY_RATE = 0.02;
const BLACK = new Color({
  red: 0,
  green: 0, 
  blue: 0,
});

// A Cell is the base unit of this game, which is played on a 2D array of them. The different structures and pieces
// formed by Cells intercellularly is handled by CoreState, whereas the Cell class itself focuses on intracellular
// interactions mostly decoupled from everything else, mainly control-system-like variables that change how the piece
// is rendered and animated.
class Cell {
  constructor(type) {
    this.type = type;
    this.setDefaults();

    this.baseColor = EMPTY_COLOR; // A non-changing base color for this Cell, which is used to derive all other colors
    this.lightColor = new Color({
      red: 0,
      green: 0, 
      blue: 0,
    });
    this.currentColor = EMPTY_COLOR; // A dynamically changing main color derived from interpolating the baseColor
    this.colorSuite = {
      // A set of colors derived from the main color and can be updated very sparingly
      midLight: EMPTY_COLOR,
      centerLight: EMPTY_COLOR,
    };
  }

  // Default values that a Cell is initialized with
  setDefaults() {
    this.xOffset = 0;
    this.yOffset = 0;
    this.timer = 0;
    this.meter = 0;
    this.lifetime = NORMAL_CELL_LIFETIME;
    this.ttl = NORMAL_CELL_LIFETIME;

    this.marked = false;
  }

  // Copy props from another Cell, regardless of what type/subclass of cell it is. This is useful for
  // transition graphics when a Cell changes its type.
  getAttributesFrom(other) {
    this.baseColor = other.baseColor;
    // this.lightColor = other.lightColor;
    // this.currentColor = other.currentColor;
    // this.colorSuite = other.colorSuite;

    this.xOffset = other.xOffset;
    this.yOffset = other.yOffset;
    this.timer = other.timer;
    this.meter = other.meter;
    this.lifetime = other.lifetime;
    this.ttl = other.ttl;

    this.marked = other.marked;
  }

  // Set this Cell's base color and propagate the update to the current color and ColorSuite.
  setBaseColor(color) {
    this.baseColor = interpolateColor(
      FILLED_COLOR,
      color,
      CELL_BASE_COLOR_BLEND,
      linInt
    );
    this.updateCurrentColor();
    this.updateColorSuite();
  }

  // Update the cell's main color based on its TTL; this is the default update color but it can
  // be overridden by extensions for cooler effects.
  updateCurrentColor() {
    if (this.ttl != -1 && this.currentColor) {
      this.currentColor = interpolateColor(
        EMPTY_COLOR,
        this.baseColor,
        this.ttl / this.lifetime,
        linInt
      );
      this.currentColor.add(this.lightColor);
    } else {
      this.currentColor = this.baseColor;
    }
  }

  // Each time the current color changes, everything else follows
  updateColorSuite() {
    this.colorSuite.midLight = new Color({
      red: this.currentColor.red + CELL_MID_LIGHT,
      green: this.currentColor.green + CELL_MID_LIGHT,
      blue: this.currentColor.blue + CELL_MID_LIGHT,
    });
    this.colorSuite.centerLight = new Color({
      red: this.currentColor.red + CELL_CENTER_LIGHT,
      green: this.currentColor.green + CELL_CENTER_LIGHT,
      blue: this.currentColor.blue + CELL_CENTER_LIGHT,
    });
  }

  // A quick function for getting x and y positions with adding the offset, it is used by every extension
  // so I moved it to a separate method; cannot super() it because its intention is purely to make local
  // vars easier.
  getPosition(x0, y0) {
    return [x0 + this.xOffset, y0 + this.yOffset];
  }

  // Called at the end of each frame to update timers and to control certain variable dynamics.
  idleUpdate() {
    this.xOffset *= OFFSET_DECAY_RATE;
    this.yOffset *= OFFSET_DECAY_RATE;
    this.lightColor.interpolateTo(BLACK, LIGHT_DECAY_RATE, linInt);
    if (this.lightColor.red > 0.1) {
      this.updateCurrentColor();
      this.updateColorSuite();
    }
    this.timer += 1;
  }

  activeUpdate() {}

  // Called whenever a piece is placed down and the game advances.
  advanceUpdate(computeColors = false) {
    this.ttl -= 1;
    this.updateCurrentColor();
    this.updateColorSuite();
  }

  // No matter what subclass, they should all have render() with these arguments set
  render(canvas, x0, y0, width, height) {}
}

export default Cell;
