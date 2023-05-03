import React from "react";
import { Mode } from "../game/GameState";
import { basicButtonStyle, overlayWrapperStyle, titleStyle } from "../MenuUtils";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";

const wrapperStyle = {
    ...overlayWrapperStyle,
    backgroundColor: "#000000",
    opacity: "0.5",
}

export const Settings = (props) => {
    return (<div style={wrapperStyle}>
        <div style={titleStyle}>{"Settings coming soon!"}</div>
        <ReturnToMenu clickHandler={(e) => props.gameState.setMode(Mode.MAIN_MENU)} />
    </div>);
}