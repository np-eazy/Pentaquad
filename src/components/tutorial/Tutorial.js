import React from "react";
import { Mode } from "../../game/GameState";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../Styles";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";

export const Tutorial = (props) => {
    return (<div style={overlayWrapperStyle}>
        <div style={overlayStyle}></div>
        <div style={titleStyle}>{"Tutorial coming soon!"}</div>
        <ReturnToMenu clickHandler={(e) => props.gameState.setMode(Mode.MAIN_MENU)} />
    </div>);
}
