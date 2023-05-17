import React from "react";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../BaseStyles";
import { Mode } from "../../game/GameState";
import { AudioEvents } from "../../audio/AudioEventController";
import { MenuButton } from "../mainMenu/MenuButton";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";
import { FILLED_COLOR, WHITE } from "../../graphics/theme/ColorScheme";

const subtitleStyle = {
    color: WHITE.getHex(),
    textAlign: "center",
    fontSize: 32,
}
const statStyle = {
    color: FILLED_COLOR.getHex(),
    textAlign: "center",
    fontSize: 20,
}
export const GameOver = (props) => {
  var scorekeeper = props.gameState.coreState.scorekeeper
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={{...titleStyle, paddingBottom: 50,}}>{"Game Over"}</div>

      <div style={subtitleStyle}>
        {"Score: " + scorekeeper.score.toString()}
      </div>
      <div style={statStyle}>
        {"Level: " + scorekeeper.level.toString()}
      </div>

      <MenuButton
        label={"Play again"}
        clickHandler={(e) => {
          props.gameState.audioController.queueAudioEvent(AudioEvents.CLICK_BUTTON_A, {});
          props.gameState.audioController.queueAudioEvent(AudioEvents.GAME_START, {});
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
