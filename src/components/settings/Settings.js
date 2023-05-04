import React from "react";
import { Mode } from "../../game/GameState";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../Styles";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";

export const Settings = (props) => {
    return (<div style={overlayWrapperStyle}>
        <div style={overlayStyle}></div>
        <div style={titleStyle}>{"Settings coming soon!"}</div>
        <ReturnToMenu clickHandler={(e) => props.gameState.setMode(props.gameState.isRunning ? Mode.SINGLE_PLAYER : Mode.MAIN_MENU)} />
    </div>);
}
