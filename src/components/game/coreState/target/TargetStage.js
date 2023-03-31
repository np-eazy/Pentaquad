import { randint } from "../utils/Functions";
import Target from "./Target";

import {
  TARGET_STAGE_MAX_LENGTH,
  TARGET_GRACE_PERIOD,
  TARGET_SPAWN_TIMER,
  TARGET_GROWTH_TIMER,
} from "../../Constants";

// A loading stage to provide Pieces for a CoreState and for the user to be
// able to see the next pieces, and also to hold/swap pieces.
class TargetStage {
  constructor(props) {
    this.coreState = props.coreState;
    this.minBound = props.minBound;
    this.maxBound = props.maxBound;
    this.maxLength = props.maxLength
      ? props.maxLength
      : TARGET_STAGE_MAX_LENGTH;
    this.nextTargets = [];
    this.gracePeriod = props.gracePeriod
      ? props.gracePeriod
      : TARGET_GRACE_PERIOD;
    this.ticksToSpawn = props.ticksToSpawn
      ? props.ticksToSpawn
      : TARGET_SPAWN_TIMER;
    this.ticksLeft = this.gracePeriod;
  }

  createNewTarget() {
    if (this.coreState) {
      var [x, y] = [
        randint(this.minBound, this.maxBound),
        randint(this.minBound, this.maxBound),
      ];
      return new Target({
        coreState: this.coreState,
        x0: x - 1,
        y0: y - 1,
        x1: x + 1,
        y1: y + 1,
        ticksToGrowth: TARGET_GROWTH_TIMER,
      });
    }
  }

  // To be called by CoreState when it needs another target
  consumeTarget() {
    if (this.ticksLeft == 0) {
      var target = this.nextTargets.shift();
      if (this.nextTargets.length < this.maxLength) {
        this.nextTargets.push(this.createNewTarget());
      }
      this.ticksLeft = this.ticksToSpawn;
      return target;
    } else {
      this.ticksLeft -= 1;
      return null;
    }
  }
}
export default TargetStage;
