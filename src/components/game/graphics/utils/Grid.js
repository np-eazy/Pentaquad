// A class (not in use yet) to facilitate cool graphics algorithms
export class Grid {
  constructor(xSize, ySize) {
    this.array = new Array(ySize);
    this.xSize = xSize;
    this.ySize = ySize;
    for (var y = 0; y < ySize; y++) {
      this.array[y] = new Array(xSize);
      for (var x = 0; x < xSize; x++) {
        this.array[y][x] = 0;
      }
    }
  }
  getVal = (x, y) => this.array[y][x];

  setVal = (x, y, val) => {
    this.array[y][x] = val;
  };

  // Desctructive addition of new grid
  add(other) {
    for (var y = 0; y < this.ySize; y++) {
      for (var x = 0; x < this.xSize; x++) {
        this.array[y][x] += other.array[y][x];
      }
    }
  }

  // Desctructive subtraction of new grid
  subtract(other) {
    for (var y = 0; y < this.ySize; y++) {
      for (var x = 0; x < this.xSize; x++) {
        this.array[y][x] -= other.array[y][x];
      }
    }
  }

  // Destructive scaling of all grid values
  scale(factor) {
    for (var y = 0; y < this.ySize; y++) {
      for (var x = 0; x < this.xSize; x++) {
        this.array[y][x] *= factor;
      }
    }
  }

  // Destructively blend with another grid
  interpolate(other, fraction) {
    for (var y = 0; y < this.ySize; y++) {
      for (var x = 0; x < this.xSize; x++) {
        this.array[y][x] =
          this.array[y][x] + fraction * (other.array[y][x] - this.array[y][x]);
      }
    }
  }

  // Deepcopy this grid's values to another grid
  copyTo(other) {
    for (var y = 0; y < this.ySize; y++) {
      for (var x = 0; x < this.xSize; x++) {
        other.setVal(x, y, this.getVal(x, y));
      }
    }
  }

  // Constructive addition of new grid
  createSum(other) {
    var newGrid = new Grid(this.xSize, this.ySize);
    for (var y = 0; y < this.ySize; y++) {
      for (var x = 0; x < this.xSize; x++) {
        newGrid.array[y][x] = this.array[y][x] + other.array[y][x];
      }
    }
    return newGrid;
  }

  // Constructive subtraction of new grid
  createDelta(other) {
    var newGrid = new Grid(this.xSize, this.ySize);
    for (var y = 0; y < this.ySize; y++) {
      for (var x = 0; x < this.xSize; x++) {
        newGrid.array[y][x] = this.array[y][x] + other.array[y][x];
      }
    }
    return newGrid;
  }

  // Destructive scaling of all grid values
  createScale(factor) {
    var newGrid = new Grid(this.xSize, this.ySize);
    for (var y = 0; y < this.ySize; y++) {
      for (var x = 0; x < this.xSize; x++) {
        newGrid.array[y][x] = this.array[y][x] * factor;
      }
    }
    return newGrid;
  }

  createInterpolation(other, fraction) {
    var newGrid = new Grid(this.xSize, this.ySize);
    for (var y = 0; y < this.ySize; y++) {
      for (var x = 0; x < this.xSize; x++) {
        newGrid.array[y][x] =
          this.array[y][x] + fraction * (other.array[y][x] - this.array[y][x]);
      }
    }
    return newGrid;
  }
}
