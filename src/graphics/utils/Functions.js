// Not to be confused with Functions.js in coreState, whose functions
// are discrete and used to make grid code easier. Here, the code is more
// continuous and used to generate more complex colors, blends, and gradients.

// Linear interpolation function for color gradients.
export const linInt = (a, b, t) => {
  return a + (b - a) * t;
};

export const sinusoid = ({ level, frequency, amplitude }, t) => {
  return level + amplitude * Math.sin(frequency * t);
};
