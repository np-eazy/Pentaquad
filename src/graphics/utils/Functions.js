// Not to be confused with Functions.js in coreState, whose functions
// are discrete and used to make grid code easier. Here, the code is more
// continuous and used to generate more complex colors, blends, and gradients.

import { ROUNDING_FACTOR } from "../../game/coreState/utils/Params";

// Linear interpolation function for color gradients.
export const linInt = (a, b, t) => {
  return a + (b - a) * t;
};

export const sinusoid = ({ level, frequency, amplitude }, t) => {
  return level + amplitude * Math.sin(frequency * t);
};

export const displayNum = (n) => {
  return (Math.round(n * ROUNDING_FACTOR) / ROUNDING_FACTOR).toString();
};
