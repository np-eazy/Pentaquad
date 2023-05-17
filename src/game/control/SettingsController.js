export const Setting = {
  LOW: 0,
  MED: 1,
  HIGH: 2,
};

// For convenience the default keybindings are held in the enum itself
export const KeyActions = {
  MOVE_UP: "W",
  MOVE_LEFT: "A",
  MOVE_DOWN: "S",
  MOVE_RIGHT: "D",
  ROTATE_LEFT: "Q",
  ROTATE_RIGHT: "E",
  FLIP: "F",
  DROP: " ",
  ROTATE: "R",
  HOLD_1: "1",
  HOLD_2: "2",
  HOLD_3: "3",
  HOLD_4: "4",
  HOLD_5: "5",
  LOCK: "C"
}

export const DEFAULTS = {
  gameDifficulty: Setting.HIGH,
  graphicsLevel: Setting.HIGH,
  soundLevel: Setting.HIGH,
  keybindings: new Map([
    [KeyActions.MOVE_UP, KeyActions.MOVE_UP.charCodeAt(0)],
    [KeyActions.MOVE_LEFT, KeyActions.MOVE_LEFT.charCodeAt(0)],
    [KeyActions.MOVE_DOWN, KeyActions.MOVE_DOWN.charCodeAt(0)],
    [KeyActions.MOVE_RIGHT, KeyActions.MOVE_UP.charCodeAt(0)],
    [KeyActions.ROTATE_LEFT, KeyActions.ROTATE_LEFT.charCodeAt(0)],
    [KeyActions.ROTATE_RIGHT, KeyActions.ROTATE_RIGHT.charCodeAt(0)],
    [KeyActions.FLIP, KeyActions.FLIP.charCodeAt(0)],
    [KeyActions.DROP, KeyActions.DROP.charCodeAt(0)],
    [KeyActions.ROTATE, KeyActions.ROTATE.charCodeAt(0)],
    [KeyActions.HOLD_1, KeyActions.HOLD_1.charCodeAt(0)],
    [KeyActions.HOLD_2, KeyActions.HOLD_2.charCodeAt(0)],
    [KeyActions.HOLD_3, KeyActions.HOLD_3.charCodeAt(0)],
    [KeyActions.HOLD_4, KeyActions.HOLD_4.charCodeAt(0)],
    [KeyActions.HOLD_5, KeyActions.HOLD_5.charCodeAt(0)],
    [KeyActions.LOCK, KeyActions.LOCK.charCodeAt(0)],
  ])
};

// A state-only class used to organize/facilitate controls that can
// be changed by interacting with the Settings component
export class SettingsController {
  constructor() {
    this.gameDifficulty = DEFAULTS.gameDifficulty;
    this.graphicsLevel = DEFAULTS.graphicsLevel;
    this.soundLevel = DEFAULTS.graphicsLevel;
    this.keybindings = DEFAULTS.keybindings;
  }
  toggleGameDifficulty = () => {
    this.gameDifficulty = (this.gameDifficulty + 1) % 3;
  };

  toggleGraphicsLevel = (callback) => {
    this.graphicsLevel = (this.graphicsLevel + 1) % 3;
    if (callback) {
      callback();
    }
  };

  toggleSoundLevel = () => {
    this.soundLevel = (this.soundLevel + 1) % 3;
  };

  setKeybinding(action, keycode) {
    this.keybindings.set(action, keycode)
  }

  validateKeybindings(action, keycode) {
    for (const [key, val] of this.keybindings) {
      if (key != action && val == keycode) {
        return false;
      }
    } return true;
  }
}
