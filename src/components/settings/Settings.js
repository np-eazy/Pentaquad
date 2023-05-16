import React from "react";
import { Mode } from "../../game/GameState";
import { overlayStyle, overlayWrapperStyle, titleStyle } from "../Styles";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";
import { Sound } from "../../audio/AudioController";
import { LevelToggler } from "./LevelToggler";

export const Settings = (props) => {
  var settings = props.controlPanel;
  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div style={titleStyle}>{"Settings coming soon!"}</div>
      <LevelToggler 
        name={"Game Difficulty"}
        getSetting={() => props.controlPanel.getGameDifficulty()} 
        clickHandler={() => props.controlPanel.toggleGameDifficulty()} />

      <LevelToggler 
        name={"Graphics"}
        getSetting={() => props.controlPanel.getGraphicsLevel()} 
        clickHandler={() => props.controlPanel.toggleGraphicsLevel()} />

      <LevelToggler 
        name={"Sound"}
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
