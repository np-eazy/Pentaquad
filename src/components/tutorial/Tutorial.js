import React from "react";
import { Mode } from "../../game/GameState";
import { menuButtonStyle, overlayWrapperStyle, titleStyle } from "../Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";

const wrapperStyle = {
    ...overlayWrapperStyle,
    backgroundColor: "#000000",
    opacity: "0.5",
}


export const Tutorial = (props) => {
    return (<div style={wrapperStyle}>
        <div style={titleStyle}>{"Tutorial coming soon!"}</div>
        <ReturnToMenu clickHandler={(e) => props.gameState.setMode(Mode.MAIN_MENU)} />
    </div>);
}