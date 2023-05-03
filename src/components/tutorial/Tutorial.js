import React from "react";
import { TOTAL_HEIGHT, TOTAL_WIDTH } from "../game/graphics/Layout";
import { Mode } from "../game/GameState";

const overlayWrapperStyle = {
    width: TOTAL_WIDTH,
    height: TOTAL_HEIGHT,
    backgroundColor: "#000000",
    opacity: 0.5,
}

const menuButtonStyle = {
    borderStyle: "2px solid",
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: "10px",
    margin: "10px",
}

export const Tutorial = (props) => {
    return (<div style={overlayWrapperStyle}>
        <div style={menuButtonStyle} onClick={(e) => props.gameState.setMode(Mode.MAIN_MENU)}>{"Main menu"}</div>
    </div>);
}