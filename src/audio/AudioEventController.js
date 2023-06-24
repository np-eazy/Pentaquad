import { Setting } from "../game/control/SettingsController";
import { WHITE } from "../graphics/theme/ColorScheme";

// This class aims to organize event-driven interaction when going upstream in the dependencies,
// the reason it is tightly coupled with the audio is because originally it was only for the latter
// but was easily extensible. I am keeping the convention of associating most events with audio
// so it more closely aligns with the user interface.
export const TRANSITION_DELAY_TICKS = 60;

export const AudioEvents = {
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
  LOCK: ["FILL", 0.35, (eventData) => {
    if (eventData.gameState) {
      eventData.gameState.setDelayTimer(TRANSITION_DELAY_TICKS);
      // TODO: Initiate a callback animation in GameState
      eventData.gameState.coreState.currPiece.mainCell.lightUp(WHITE);
    }
}],

  // Scorekeeper
  CLEAR_SINGLE_LINE: ["FILL", 0.35, (eventData) => {
    if (eventData.gameState) {
      eventData.gameState.setDelayTimer(TRANSITION_DELAY_TICKS);

    };
  }],
  CLEAR_MULTI_LINES: ["FILL", 0.35],
  CLEAR_SINGLE_TARGET: ["FILL", 0.35, (eventData) => {
    if (eventData.gameState) {
      eventData.gameState.setDelayTimer(TRANSITION_DELAY_TICKS);
    };
  }],
  CLEAR_MULTI_TARGET: ["FILL", 0.35],
  STRIKE: ["STRIKE", 0.4],
  LEVEL_UP: ["LEVEL_UP", 0.4],
  GAME_START: ["GAME_START", 0.4],
  PLACEMENT: ["", 0.4],
  GAME_OVER: ["GAME_START", 0.4],
}

const PATH_PREFIX = "assets/sounds/";
const EXTENSION = ".wav";
const MASTER_VOLUME = 0.4;
const QUIET_COEFFICIENT = 0.25;

export class AudioEventController {
  constructor(props) {
    this.soundQueue = [];
    this.settingsController = props.settingsController;
  }

  // Most events only play a sound, but with event data and with the right callback function then
  // upstream interactions can be organized very well.
  queueAudioEvent(audioEvent, eventData) {
    if (audioEvent != AudioEvents.NOP) {
      var audio = new Audio(PATH_PREFIX + audioEvent[0] + EXTENSION);
      audio.volume = 0;
      if (this.settingsController) {
        if (this.settingsController.soundLevel == Setting.HIGH) {
          audio.volume = audioEvent[1] * MASTER_VOLUME;
        } else if (this.settingsController.soundLevel == Setting.MED) {
          audio.volume = audioEvent[1] * MASTER_VOLUME * QUIET_COEFFICIENT;
        }
      }
      this.soundQueue.push(audio);
      if (audioEvent.length == 3 && eventData) {
        audioEvent[2](eventData);
      }
    }
  }

  consumeSound() {
    if (this.soundQueue.length > 0) {
      this.soundQueue.shift().play();
    }
  }
}
