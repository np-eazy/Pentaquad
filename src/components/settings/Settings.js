import React from "react";
import { Mode } from "../../game/GameState";
import { menuButtonStyle, overlayWrapperStyle, titleStyle } from "../Styles";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";

const wrapperStyle = {
    ...overlayWrapperStyle,
    backgroundColor: "#000000",
    opacity: "0.5",
}

export const Settings = (props) => {
    return (<div style={wrapperStyle}>
        <div style={titleStyle}>{"Settings coming soon!"}</div>
        <ReturnToMenu clickHandler={(e) => {
            if (!props.gameState.isRunning) {
                props.gameState.setMode(Mode.MAIN_MENU)
            } else {
                props.gameState.setMode(Mode.SINGLE_PLAYER)
            }
        }} />
    </div>);
}