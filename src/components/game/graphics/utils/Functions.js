// Linear interpolation function for color gradients
export const linInt = (a, b, t) => {
  return a + (b - a) * t;
};
