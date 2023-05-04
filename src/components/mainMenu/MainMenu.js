import React from "react";
import {
  menuButtonStyle,
  overlayStyle,
  overlayWrapperStyle,
  titleStyle,
} from "../Styles";
import { Mode } from "../../game/GameState";
import { Sound } from "../../audio/AudioController";

export const MainMenu = (props) => {
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={titleStyle}>{"Pentaquad"}</div>
      <div
        style={menuButtonStyle}
        onClick={(e) => {
          props.gameState.setMode(Mode.TUTORIAL);
          props.audioController.queueSound(Sound.CLICK_BUTTON_A);
        }}
      >
        {"Tutorial"}
      </div>
      <div
        style={menuButtonStyle}
        onClick={(e) => {
            props.gameState.setMode(Mode.SINGLE_PLAYER, { startOver: true });
            props.audioController.queueSound(Sound.CLICK_BUTTON_A);
            props.audioController.queueSound(Sound.GAME_START);
          }
        }
      >
        {"Play"}
      </div>
    </div>
  );
};
