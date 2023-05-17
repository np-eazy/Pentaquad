import React from "react";
import { FILLED_COLOR, WHITE } from "../../graphics/theme/ColorScheme";
import { BOARD_DIMENSIONS, COLUMN_WIDTH } from "../../graphics/theme/Layout";
import { container } from "../BaseStyles";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt } from "../../graphics/utils/Functions";

const INTRO_MSG = "Welcome to Pentaquad! This is a more complex variant of Tetris, with larger pieces that fall both down and right."
const INTRO_LOCATION = {
    maxWidth: BOARD_DIMENSIONS - 100,
    padding: 10,
    position: "absolute", 
    left: 0,
    top: 0,
    marginLeft: COLUMN_WIDTH,
    textAlign: "left",
}
const MOVE_CONTROLS_MSG = "Use the MOUSE to guide the piece. Use R to rotate, F to flip, and SPACE to drop the piece."
const MOVE_CONTROLS_LOCATION = {
    maxWidth: BOARD_DIMENSIONS - 100,
    padding: 10,
    position: "absolute", 
    left: 0,
    top: 100,
    marginLeft: COLUMN_WIDTH,
    textAlign: "left",
}
const PALETTE_MSG = "The current piece can also be held for later use in an inventory slot, specified by pressing any number key between 1-5. If the slot already has a piece, that piece will become the current one."
const PALETTE_LOCATION = {
    maxWidth: 250,
    padding: 10,
    position: "absolute", 
    right: 0,
    top: BOARD_DIMENSIONS / 2,
    marginRight: COLUMN_WIDTH,
    textAlign: "right",
}
const QUEUE_MSG = "The column on the left shows you the incoming pieces."
const QUEUE_LOCATION = {
    maxWidth: 250,
    padding: 10,
    position: "absolute", 
    left: 0,
    top: BOARD_DIMENSIONS / 2,
    marginLeft: COLUMN_WIDTH,
    textAlign: "left",
}

const OBJECTIVE_MSG = "Clearing lines both horizontally and vertically will earn points just like in Tetris, but this game revolves around filling square targets. "
const OBJECTIVE_LOCATION = {
    maxWidth: BOARD_DIMENSIONS - 100,
    padding: 10,
    position: "absolute", 
    left: 0,
    marginLeft: COLUMN_WIDTH,
    textAlign: "left",
}
const TARGET_MSG = "Targets that are not cleared in time result in a strike, of which three end the game. If a target is cleared, it destroys bonus blocks around it and gives a power-up to the next piece."
const TARGET_LOCATION = {
    maxWidth: BOARD_DIMENSIONS - 100,
    padding: 10,
    position: "absolute", 
    left: 0,
    marginLeft: COLUMN_WIDTH,
    textAlign: "left",
}

const POWERUP_MSG = "There are four different types of power-ups."
const GHOST_PIECE_MSG = "Ghost pieces can only be dropped in mid-air, but can freely pass through any blocks already placed. Can be obtained from the queue."
const BOMB_PIECE_MSG = "Bomb pieces destroy a 5x5 area around them upon being placed. Can be obtained from the queue."
const DRILL_PIECE_MSG = "Drill pieces destroy everything in their path when dropped. Can be obtained from filling targets."
const TOWER_PIECE_MSG = "Tower pieces when dropped cover their entire path in blocks, essentially the opposite of a drill piece. Can be obtained from filling targets."

const LOCK_MSG = "If available, you have the option to lock the current piece by pressing [C]. You will get to place this identical piece another five times, and combined with a tower or drill block can place or clear huge areas of the board."
const LOCK_LOCATION = {
    maxWidth: 200,
    padding: 10,
    position: "absolute", 
    right: 0,
    top: 0,
    marginRight: COLUMN_WIDTH,
    textAlign: "right",
}

export const tutorialEntryStyle = {
    margin: 50,
    textAlign: "center",
}

export const slideStyle = {
    color: interpolateColor(WHITE, FILLED_COLOR, 0.5, linInt).getHex(),
}

export const SlideWrapper = (props) => {
    return (<div style={{...container, ...slideStyle}}>
        {props.children}
    </div>)
}

export const IntroSlide = () => {
    return (<div>
        <div>
            <div style={{...tutorialEntryStyle, ...INTRO_LOCATION}}>
                {INTRO_MSG}
            </div>
            <div style={{...tutorialEntryStyle, ...MOVE_CONTROLS_LOCATION }}>
                {MOVE_CONTROLS_MSG}
            </div>
            <div style={{...tutorialEntryStyle, ...PALETTE_LOCATION }}>
                {PALETTE_MSG}
            </div>
            <div style={{...tutorialEntryStyle, ...QUEUE_LOCATION }}>
                {QUEUE_MSG}
            </div>
        </div>
    </div>)
}

export const ObjectiveSlide = () => {
    return (<div>
        <div>
            <div style={{...tutorialEntryStyle, ...OBJECTIVE_LOCATION}}>
                {OBJECTIVE_MSG}
            </div>
            <div style={{...tutorialEntryStyle, ...TARGET_LOCATION, top: 100 }}>
                {TARGET_MSG}
            </div>
        </div>
    </div>)
}

const powerupEntryStyle = {
    marginLeft: COLUMN_WIDTH,
    maxWidth: BOARD_DIMENSIONS / 2,
    minHeight: 50,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
}
export const PowerupSlide = () => {
    return (<div>
        <div>
            <div style={powerupEntryStyle}>
                {POWERUP_MSG}
            </div>
            <div style={powerupEntryStyle}>
                {GHOST_PIECE_MSG}
            </div>
            <div style={powerupEntryStyle}>
                {BOMB_PIECE_MSG}
            </div>
            <div style={powerupEntryStyle}>
                {DRILL_PIECE_MSG}
            </div>
            <div style={powerupEntryStyle}>
                {TOWER_PIECE_MSG}
            </div>
            <div style={{...tutorialEntryStyle, ...LOCK_LOCATION}}>
                {LOCK_MSG}
            </div>
        </div>
    </div>)
}