// A class that is not in use for the CoreState but will be important for implementing
// more complex graphics, particles, etc.
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(other) {
    this.x += other.x;
  }
  subtract(other) {
    this.y += other.y;
  }
  createSum(other) {
    return new Point(this.x + other.x, this.y + other.y);
  }
  createDelta(other) {
    return Point(other.x - this.x, other.y - this.y);
  }
  createInterpolation(other, fraction) {
    return Point(
      this.x + fraction * (other.x - this.x),
      this.y + fraction * (other.y - this.y)
    );
  }
  normSquared() {
    return this.x * this.x + this.y * this.y;
  }
  norm() {
    return Math.sqrt(this.normSquared());
  }
  distanceSquared(other) {
    return this.createDelta(other).normSquared();
  }
  distance(other) {
    return this.createDelta(other).norm();
  }
}
export default Point;
