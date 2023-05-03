import React from "react";
import { basicButtonStyle, overlayWrapperStyle, titleStyle } from "../MenuUtils";
import { Mode } from "../game/GameState";

const wrapperStyle = {
    ...overlayWrapperStyle,
    backgroundColor: "#000000",
    opacity: "0.5",
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
    return (<div style={wrapperStyle}>
        <div style={titleStyle}>{"Pentaquad"}</div>
        <div style={basicButtonStyle} onClick={(e) => props.gameState.setMode(Mode.SETTINGS)}>{"Settings"}</div>
        <div style={basicButtonStyle} onClick={(e) => props.gameState.setMode(Mode.TUTORIAL)}>{"Tutorial"}</div>
        <div style={basicButtonStyle} onClick={(e) => props.gameState.setMode(Mode.SINGLE_PLAYER)}>{"Play"}</div>
    </div>);
}