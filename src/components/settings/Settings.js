import React from "react";
import { Mode } from "../game/GameState";
import { basicButtonStyle, overlayWrapperStyle } from "../MenuUtils";

const wrapperStyle = {
    ...overlayWrapperStyle,
    backgroundColor: "#000000",
    opacity: "0.5",
}

export const Settings = (props) => {
    return (<div style={wrapperStyle}>
        <div style={basicButtonStyle} onClick={(e) => props.gameState.setMode(Mode.MAIN_MENU)}>{"Main menu"}</div>
    </div>);
}