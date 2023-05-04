export const Sound = {
    // Menu actions
    CLICK_BUTTON_A: 0,
    CLICK_BUTTON_B: 1,
    CLICK_BUTTON_X: 2,
    CLICK_BUTTON_Y: 3,

    // Game actions
    MOVE: 4,
    ROTATE: 5,
    FLIP: 6,
    DROP: 7,
    HOLD: 8,

    // Power-ups
    POWERUP_GHOST: 9,
    PLACE_GHOST: 10,
    POWERUP_BOMB: 11,
    PLACE_BOMB: 12,
    POWERUP_DRILL: 13,
    PLACE_DRILL: 14,
    POWERUP_TOWER: 15,
    PLACE_TOWER: 16,
    LOCK: 17,
    UNLOCK: 18,

    // Scorekeeper
    CLEAR_SINGLE_LINE: 19,
    CLEAR_MULTI_LINES: 20,
    CLEAR_SINGLE_TARGET: 21,
    CLEAR_MULTI_TARGET: 22,
    STRIKE: 23,
    GAME_START: 24,
    PLACEMENT: 25,
    GAME_OVER: 26,
}

export class AudioController {
    constructor({}) {
        this.soundQueue = [];
    }

    queueSound(soundNumber) {
        this.soundQueue.push(soundNumber);
    }

    consumeSound() {
        if (this.soundQueue.length > 0) {
            console.log(this.soundQueue.shift());
        }
    }
}
