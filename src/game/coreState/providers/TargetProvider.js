import {
  TARGET_PROVIDER_MAX_LENGTH,
  TARGET_GRACE_PERIOD,
  TARGET_SPAWN_TIMER,
} from "../../rules/Constants";
import { TARGET_SPAWN_RADIUS_LVL } from "../../rules/Levels";
import { generateRandomTarget } from "../../rules/RandomGeneration";

// A loading stage to provide Pieces for a CoreState and for the user to be
// able to see the next pieces, and also to hold/swap pieces.
class TargetProvider {
  constructor(props) {
    this.coreState = props.coreState;
    this.minBound = props.minBound;
    this.maxBound = props.maxBound;
    this.maxLength = props.maxLength
      ? props.maxLength
      : TARGET_PROVIDER_MAX_LENGTH;
    this.gracePeriod = props.gracePeriod
      ? props.gracePeriod
      : TARGET_GRACE_PERIOD;
    this.ticksToSpawn = props.ticksToSpawn
      ? props.ticksToSpawn
      : TARGET_SPAWN_TIMER;
    this.ticksLeft = this.gracePeriod;

    this.nextTargets = [];
  }

  // To be called by CoreState when it needs another target
  consumeTarget() {
    if (this.ticksLeft == 0) {
      var target = this.nextTargets.shift();
      if (this.nextTargets.length < this.maxLength) {
        this.nextTargets.push(
          generateRandomTarget(
            this.coreState,
            this.minBound,
            this.maxBound,
            TARGET_SPAWN_RADIUS_LVL[this.coreState.scorekeeper.level]
          )
        );
      }
      this.ticksLeft = this.ticksToSpawn;
      if (target) {
        target.activate();
      }
      return target;
    } else {
      this.ticksLeft -= 1;
      return null;
    }
  }
}
export default TargetProvider;
