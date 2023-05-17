import React from "react";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../BaseStyles";
import { Mode } from "../../game/GameState";
import { AudioEvents } from "../../audio/AudioEventController";
import { MenuButton } from "./MenuButton";

export const MainMenu = (props) => {
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={titleStyle}>{""}</div>
      <MenuButton
        label={"TUTORIAL"}
        bolded={true}
        clickHandler={(e) => {
          props.gameState.setMode(Mode.TUTORIAL);
          props.audioController.queueAudioEvent(AudioEvents.CLICK_BUTTON_A, {});
        }}
      />
      <MenuButton
        label={"PLAY"}
        bolded={true}
        clickHandler={(e) => {
          props.gameState.setMode(Mode.SINGLE_PLAYER, { startOver: true });
          props.audioController.queueAudioEvent(AudioEvents.CLICK_BUTTON_A, {});
          props.audioController.queueAudioEvent(AudioEvents.GAME_START, {});
        }}
      />
    </div>
  );
};
