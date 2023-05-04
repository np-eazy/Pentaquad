import React from "react";
import { menuButtonStyle, overlayWrapperStyle, titleStyle } from "../Styles";
import { Mode } from "../../game/GameState";
import { GoToSettings } from "../settings/GoToSettings";

const wrapperStyle = {
    ...overlayWrapperStyle,
    backgroundColor: "#000000",
    opacity: "0.5",
}

export const MainMenu = (props) => {
    return (<div style={wrapperStyle}>
        {/* <GoToSettings clickHandler={(e) => props.gameState.setMode(Mode.SETTINGS)} /> */}
        <div style={titleStyle}>{"Pentaquad"}</div>
        <div style={menuButtonStyle} onClick={(e) => props.gameState.setMode(Mode.TUTORIAL)}>{"Tutorial"}</div>
        <div style={menuButtonStyle} onClick={(e) => props.gameState.setMode(Mode.SINGLE_PLAYER, {startOver: true})}>{"Play"}</div>
    </div>);
}