import React from "react";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../BaseStyles";
import { Mode } from "../../game/GameState";
import { Sound } from "../../audio/AudioController";
import { MenuButton } from "../mainMenu/MenuButton";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";

export const GameOver = (props) => {
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={titleStyle}>{"Game Over"}</div>

      <div style={titleStyle}>
        {"Score: " + props.gameState.coreState.scorekeeper.score.toString()}
      </div>

      <MenuButton
        label={"Play again"}
        clickHandler={(e) => {
          props.gameState.audioController.queueSound(Sound.CLICK_BUTTON_A);
          props.gameState.audioController.queueSound(Sound.GAME_START);
          props.gameState.setMode(Mode.SINGLE_PLAYER, { startOver: true });
        }}
      />
      <ReturnToMenu
        clickHandler={(e) => {
          props.gameState.setMode(Mode.MAIN_MENU, {});
        }}
        audioController={props.gameState.audioController}
      />
    </div>
  );
};
