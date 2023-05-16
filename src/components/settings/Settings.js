import React from "react";
import { Mode } from "../../game/GameState";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../BaseStyles";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";
import { Sound } from "../../audio/AudioController";
import { ThreeOptionToggler } from "./ThreeOptionToggler";

export const Settings = (props) => {
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={titleStyle}>{"Settings"}</div>
      <ThreeOptionToggler
        name={"Game Difficulty"}
        labels={["EASY", "NORMAL", "HARD"]}
        getSetting={props.settingsController.gameDifficulty}
        clickHandler={() => props.settingsController.toggleGameDifficulty()}
        gameState={props.gameState}
        blocked={props.gameState.isRunning}
      />

      <ThreeOptionToggler
        name={"Graphics"}
        labels={["FAST", "NORMAL", "FANCY"]}
        getSetting={props.settingsController.graphicsLevel}
        clickHandler={() => props.settingsController.toggleGraphicsLevel()}
        gameState={props.gameState}
      />

      <ThreeOptionToggler
        name={"Volume"}
        labels={["MUTE", "QUIET", "NORMAL"]}
        getSetting={props.settingsController.soundLevel}
        clickHandler={() => props.settingsController.toggleSoundLevel()}
        gameState={props.gameState}
      />

      <ReturnToMenu
        clickHandler={(e) => {
          props.gameState.setMode(
            props.gameState.isRunning ? Mode.SINGLE_PLAYER : Mode.MAIN_MENU
          );
          props.audioController.queueSound(Sound.CLICK_BUTTON_B);
        }}
      />
    </div>
  );
};
