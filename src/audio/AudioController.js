import { Setting } from "../game/control/SettingsController";

export const Sound = {
  NOP: ["NOP", 1],
  // Menu actions
  CLICK_BUTTON_A: ["CLICK_BUTTON_A", 0.25],
  CLICK_BUTTON_B: ["CLICK_BUTTON_A", 0.25],
  CLICK_BUTTON_X: ["CLICK_BUTTON_X", 0.25],
  CLICK_BUTTON_Y: ["CLICK_BUTTON_A", 0.25],

  // Game actions
  MOVE: ["MOVE", 0.04],
  ROTATE: ["ROTATE", 0.1],
  FLIP: ["ROTATE", 0.1],
  DROP: ["DROP", 0.4],
  HOLD: ["ROTATE", 0.1],

  // Power-ups
  POWERUP_GHOST: ["SPIN", 0.5],
  POWERUP_BOMB: ["SPIN", 0.5],
  PLACE_BOMB: ["", 0.4],
  POWERUP_DRILL: ["SPIN", 0.5],
  PLACE_DRILL: ["BIG_BOOM", 0.4],
  POWERUP_TOWER: ["SPIN", 0.5],
  PLACE_TOWER: ["BIG_BOOM", 0.4],
  LOCK: ["SPIN", 0.5],

  // Scorekeeper
  CLEAR_SINGLE_LINE: ["FILL", 0.35],
  CLEAR_MULTI_LINES: ["FILL", 0.35],
  CLEAR_SINGLE_TARGET: ["FILL", 0.35],
  CLEAR_MULTI_TARGET: ["FILL", 0.35],
  STRIKE: ["STRIKE", 0.4],
  LEVEL_UP: ["LEVEL_UP", 0.4],
  GAME_START: ["GAME_START", 0.4],
  PLACEMENT: ["", 0.4],
  GAME_OVER: ["GAME_START", 0.4],
};

const PATH_PREFIX = "assets/sounds/";
const EXTENSION = ".wav";
const MASTER_VOLUME = 0.4;

export class AudioController {
  constructor(props) {
    this.soundQueue = [];
    this.settingsController = props.settingsController;
  }

  queueSound(soundNumber) {
    if (soundNumber != Sound.NOP) {
      var audio = new Audio(PATH_PREFIX + soundNumber[0] + EXTENSION);
      audio.volume = 0;
      if (this.settingsController) {
        if (this.settingsController.soundLevel == Setting.HIGH) {
          audio.volume = soundNumber[1] * MASTER_VOLUME;
        } else if (this.settingsController.soundLevel == Setting.MED) {
          audio.volume = soundNumber[1] * MASTER_VOLUME * 0.25;
        }
      }
      this.soundQueue.push(audio);
    }
  }

  consumeSound() {
    if (this.soundQueue.length > 0) {
      this.soundQueue.shift().play();
    }
  }
}
