import React from "react";
import { Mode } from "../../game/GameState";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../Styles";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";
import { Sound } from "../../audio/AudioController";
import { ThreeOptionToggler } from "./ThreeOptionToggler";

export const Settings = (props) => {
  var settings = props.controlPanel;
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={titleStyle}>{"Settings"}</div>
      <ThreeOptionToggler 
        name={"Game Difficulty"}
        labels={["EASY", "NORMAL", "HARD"]}
        getSetting={() => props.controlPanel.getGameDifficulty()} 
        clickHandler={() => props.controlPanel.toggleGameDifficulty()} />

      <ThreeOptionToggler 
        name={"Graphics"}
        labels={["FAST", "NORMAL", "FANCY"]}
        getSetting={() => props.controlPanel.getGraphicsLevel()} 
        clickHandler={() => props.controlPanel.toggleGraphicsLevel()} />

      <ThreeOptionToggler 
        name={"Volume"}
        labels={["MUTE", "QUIET", "NORMAL"]}
        getSetting={() => props.controlPanel.getSoundLevel()} 
        clickHandler={() => props.controlPanel.toggleSoundLevel()} />

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
