import { displayNum } from "./Functions";

// Utility functions specifically for dealing with colors.
export function componentToHex(color) {
  var c = Math.min(255, Math.max(0, Math.round(color)));
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function interpolateColor(colorA, colorB, t, interpolationFunction) {
  return new Color({
    red: interpolationFunction(colorA.red, colorB.red, t),
    green: interpolationFunction(colorA.green, colorB.green, t),
    blue: interpolationFunction(colorA.blue, colorB.blue, t),
  });
}

export function copy(colorB) {
  return new Color(
    {red: colorB.red, green: colorB.green, blue:colorB.blue}
  )
}
// Utility class to work with Colors in both RGB and hexcode
export class Color {
  constructor({ red, green, blue }) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.hex = null;
  }

  add(colorB) {
    this.red += colorB.red;
    this.green += colorB.green;
    this.blue += colorB.blue;
  }

  set(colorB) {
    this.red = colorB.red;
    this.green = colorB.green;
    this.blue = colorB.blue;
    return this;
  }

  // Descructively interpolate colors to avoid piling up Color instances
  interpolateTo(colorB, t, interpolationFunction) {
    this.red = interpolationFunction(this.red, colorB.red, t);
    this.green = interpolationFunction(this.green, colorB.green, t);
    this.blue = interpolationFunction(this.blue, colorB.blue, t);
    this.hex = null;
    return this;
  }

  getHex() {
    if (!this.hex) {
      this.hex =
        "#" +
        componentToHex(this.red) +
        componentToHex(this.green) +
        componentToHex(this.blue);
    }
    return this.hex;
  }

  toString() {
    return (
      displayNum(this.red) +
      ", " +
      displayNum(this.green) +
      ", " +
      displayNum(this.blue)
    );
  }
}

export const Black = () => new Color({ red: 0, green: 0, blue: 0 });
