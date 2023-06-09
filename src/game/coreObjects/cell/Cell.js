import { CELL_TYPE, NORMAL_CELL_LIFETIME } from "../../rules/Constants";

import { Color, copy, interpolateColor } from "../../../graphics/utils/Colors";
import { linInt } from "../../../graphics/utils/Functions";
import {
  EMPTY_COLOR,
  FILLED_COLOR,
  LIGHT_2H,
  LIGHT_4H,
  CELL_BASE_COLOR_BLEND,
  BLACK,
  THEME_RED,
} from "../../../graphics/theme/ColorScheme";
import { LIGHT_UPDATE_THRESHOLD } from "../../coreState/utils/Params";
import {
  CELL_DAMP_RATE,
  CELL_DIM_RATE,
} from "../../../graphics/theme/Dynamics";
import { Setting } from "../../control/SettingsController";

// Decay rate of X and Y offsets after row breaks.
export const CELL_BORDER_OFFSET = 2;

// A Cell is the base unit of this game, which is played on a 2D array of them. The different structures and pieces
// formed by Cells intercellularly is handled by CoreState, whereas the Cell class itself focuses on intracellular
// interactions mostly decoupled from everything else, mainly control-system-like variables that change how the piece
// is rendered and animated.
class Cell {
  constructor(type, coreState) {
    this.type = type;
    this.coreState = coreState;
    this.setDefaults();

    this.baseColor = copy(EMPTY_COLOR); // A non-changing base color for this Cell, which is used to derive all other colors
    this.lightColor = copy(BLACK);
    this.currentColor = copy(EMPTY_COLOR); // A dynamically changing main color derived from interpolating the baseColor
    this.colorSuite = {
      // A set of colors derived from the main color and can be updated very sparingly
      shade2H: copy(EMPTY_COLOR),
      shade4H: copy(EMPTY_COLOR),
    };
    this.updateCurrentColor();
    this.updateColorSuite();
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

  setTTL(ttl) {
    this.lifetime = ttl;
    this.ttl = ttl;
  }

  // Copy props from another Cell, regardless of what type/subclass of cell it is. This is useful for
  // transition graphics when a Cell changes its type.
  getAttributesFrom(other) {
    this.coreState = other.coreState;
    this.baseColor = other.baseColor;
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
    if (this.type == CELL_TYPE.TOWER) {
      this.baseColor = FILLED_COLOR;
    } else if (this.type == CELL_TYPE.DRILL) {
      this.baseColor = THEME_RED;
    } else {
      this.baseColor = color;
    }
    this.updateCurrentColor();
    this.updateColorSuite();
  }

  // Update the cell's main color based on its TTL; this is the default update color but it can
  // be overridden by extensions for cooler effects.
  updateCurrentColor() {
    if (this.ttl != -1 && this.currentColor) {
      this.currentColor = interpolateColor(
        FILLED_COLOR,
        this.baseColor,
        CELL_BASE_COLOR_BLEND,
        linInt
      )
      if (
        this.coreState &&
        this.coreState.settingsController &&
        this.coreState.settingsController.graphicsLevel == Setting.HIGH
      ) {
        this.currentColor.add(this.lightColor);
      }
    } else {
      this.currentColor = this.baseColor;
    }
  }

  // Each time the current color changes, everything else follows
  updateColorSuite() {
    this.colorSuite.shade2H = new Color({
      red: this.currentColor.red + LIGHT_2H,
      green: this.currentColor.green + LIGHT_2H,
      blue: this.currentColor.blue + LIGHT_2H,
    });
    this.colorSuite.shade4H = new Color({
      red: this.currentColor.red + LIGHT_4H,
      green: this.currentColor.green + LIGHT_4H,
      blue: this.currentColor.blue + LIGHT_4H,
    });
  }

  // Add this cell's baseColor to its lightColor to brighten it, idleUpdate will take
  // care of dimming it back down.
  lightUp(color) {
    this.lightColor.add(color);
  }

  // A quick function for getting x and y positions with adding the offset, it is used by every extension
  // so I moved it to a separate method; cannot super() it because its intention is purely to make local
  // vars easier.
  getPosition(x0, y0, cellSize) {
    return [x0 + this.xOffset * cellSize, y0 + this.yOffset * cellSize];
  }

  // Called at the end of each frame to update timers and to control certain variable dynamics.
  idleUpdate() {
    this.xOffset *= CELL_DAMP_RATE;
    this.yOffset *= CELL_DAMP_RATE;
    if (
      this.coreState &&
      this.coreState.settingsController &&
      this.coreState.settingsController.graphicsLevel == Setting.HIGH &&
      this.lightColor.red > LIGHT_UPDATE_THRESHOLD
    ) {
      this.lightColor.interpolateTo(BLACK, CELL_DIM_RATE, linInt);
      this.updateCurrentColor();
      this.updateColorSuite();
    }
    this.timer += 1;
  }

  fallingUpdate() {}

  // Called whenever a piece is placed down and the game places a piece.
  placementUpdate(computeColors = false) {
    this.ttl -= 1;
    this.updateCurrentColor();
    this.updateColorSuite();
  }

  // No matter what subclass, they should all have render() with these arguments set
  render(canvas, x0, y0, width, height) {

  }
}

export default Cell;
