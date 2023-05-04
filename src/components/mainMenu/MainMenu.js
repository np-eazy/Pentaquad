import React from "react";
import {
  menuButtonStyle,
  overlayStyle,
  overlayWrapperStyle,
  titleStyle,
} from "../Styles";
import { Mode } from "../../game/GameState";

export const MainMenu = (props) => {
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={titleStyle}>{"Pentaquad"}</div>
      <div
        style={menuButtonStyle}
        onClick={(e) => props.gameState.setMode(Mode.TUTORIAL)}
      >
        {"Tutorial"}
      </div>
      <div
        style={menuButtonStyle}
        onClick={(e) =>
          props.gameState.setMode(Mode.SINGLE_PLAYER, { startOver: true })
        }
      >
        {"Play"}
      </div>
    </div>
  );
};
