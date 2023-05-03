import React from "react";
import { TOTAL_HEIGHT, TOTAL_WIDTH } from "../game/graphics/Layout";
import { Mode } from "../game/GameState";

const overlayWrapperStyle = {
    width: TOTAL_WIDTH,
    height: TOTAL_HEIGHT,
    backgroundColor: "#000000",
}

const menuButtonStyle = {
    width: "100px",
    height: "100px",
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: "10px",
    margin: "10px",
}

export const MainMenu = (props) => {
    return (<div style={overlayWrapperStyle}>
        <div style={menuButtonStyle} onClick={(e) => props.gameState.setMode(Mode.SETTINGS)}>{"Settings"}</div>
        <div style={menuButtonStyle} onClick={(e) => props.gameState.setMode(Mode.TUTORIAL)}>{"Tutorial"}</div>
        <div style={menuButtonStyle} onClick={(e) => props.gameState.setMode(Mode.SINGLE_PLAYER)}>{"Play"}</div>
    </div>);
}