export const Setting = {
    LOW: 0,
    MED: 1,
    HIGH: 2,
}

export const DEFAULTS = {
    gameDifficulty: Setting.HIGH,
    graphicsLevel: Setting.HIGH,
    soundLevel: Setting.HIGH,
    keybindings: {
        MOVE_UP: 87, // W
        MOVE_LEFT: 65, // A
        MOVE_DOWN: 83, // S
        MOVE_RIGHT: 68, // D
        ROTATE_LEFT: 81, // Q (obsolete)
        ROTATE_RIGHT: 69, // E (obsolete)
        FLIP: 70, // F
        DROP: 32, // Space
        ROTATE: 82, // R
        HOLD_1: 49, // 1
        HOLD_2: 50, // 2
        HOLD_3: 51, // 3
        HOLD_4: 52, // 4
        HOLD_5: 53, // 5
        LOCK: 67, // C
    }
}

// A state-only class used to organize/facilitate controls that can
// be changed by interacting with the Settings component
export class ControlPanel {
    constructor() {
        this.gameDifficulty = DEFAULTS.gameDifficulty;
        this.graphicsLevel = DEFAULTS.graphicsLevel;
        this.soundLevel = DEFAULTS.graphicsLevel;
    }
    getGameDifficulty = () => this.gameDifficulty;
    toggleGameDifficulty = () => {this.gameDifficulty = (this.gameDifficulty + 1) % 3;}

    getGraphicsLevel = () => this.graphicsLevel;
    toggleGraphicsLevel = () => {this.graphicsLevel = (this.graphicsLevel + 1) % 3;}

    getSoundLevel = () => this.soundLevel;
    toggleSoundLevel = () => {this.soundLevel = (this.soundLevel + 1) % 3;}
};