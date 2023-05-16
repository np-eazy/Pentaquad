import React from "react";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../BaseStyles";
import { Mode } from "../../game/GameState";
import { Sound } from "../../audio/AudioController";
import { MenuButton } from "./MenuButton";

export const MainMenu = (props) => {
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={titleStyle}>{"Pentaquad"}</div>
      <MenuButton
        label={"Tutorial"}
        clickHandler={(e) => {
          props.gameState.setMode(Mode.TUTORIAL);
          props.audioController.queueSound(Sound.CLICK_BUTTON_A);
        }}
      />
      <MenuButton
        label={"Play"}
        clickHandler={(e) => {
          props.gameState.setMode(Mode.SINGLE_PLAYER, { startOver: true });
          props.audioController.queueSound(Sound.CLICK_BUTTON_A);
          props.audioController.queueSound(Sound.GAME_START);
        }}
      />
    </div>
  );
};
