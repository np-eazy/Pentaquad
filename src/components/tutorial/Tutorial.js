import React from "react";
import { Mode } from "../../game/GameState";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../Styles";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";
import { Sound } from "../../audio/AudioController";

export const Tutorial = (props) => {
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={titleStyle}>{"Tutorial coming soon!"}</div>
      <ReturnToMenu
        clickHandler={(e) => {
          props.gameState.setMode(Mode.MAIN_MENU);
          props.audioController.queueSound(Sound.CLICK_BUTTON_B);
        }}
      />
    </div>
  );
};
