import React, { useState } from "react";
import { Mode } from "../../game/GameState";
import {
  overlayStyle,
  overlayWrapperStyle,
  titleStyle,
  verticalCenterAlignment,
} from "../BaseStyles";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";
import { AudioEvents } from "../../audio/AudioEventController";
import { ThreeOptionToggler } from "./ThreeOptionToggler";
import { Keybinding } from "./Keybinding";
import { KeyActions } from "../../game/control/SettingsController";
import { TOTAL_WIDTH } from "../../graphics/theme/Layout";
import { SlideNav } from "../tutorial/SlideNav";
import { BooleanToggler } from "./BooleanToggler";
import { MenuButton } from "../mainMenu/MenuButton";

const TOTAL_SLIDES = 4;

export const Settings = (props) => {
  const [slideNumber, setSlideNumber] = new useState(0);

  return (
    <div style={overlayWrapperStyle}>
      <div style={overlayStyle}></div>
      <div
        style={{ ...verticalCenterAlignment, width: TOTAL_WIDTH, zIndex: 100 }}
      >
        <div style={{ float: "left" }}>
          <SlideNav
            direction={false}
            clickHandler={(e) =>
              setSlideNumber(
                slideNumber == 0 ? TOTAL_SLIDES - 1 : slideNumber - 1
              )
            }
          />
        </div>
        <div style={{ float: "right" }}>
          <SlideNav
            direction={true}
            clickHandler={(e) =>
              setSlideNumber((slideNumber + 1) % TOTAL_SLIDES)
            }
          />
        </div>
      </div>

      {slideNumber == 0 ? (
        <>
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
            clickHandler={() =>
              props.settingsController.toggleGraphicsLevel(() =>
                props.gameState.resetBaseColors()
              )
            }
            gameState={props.gameState}
          />

          <ThreeOptionToggler
            name={"Volume"}
            labels={["MUTE", "QUIET", "NORMAL"]}
            getSetting={props.settingsController.soundLevel}
            clickHandler={() => props.settingsController.toggleSoundLevel()}
            gameState={props.gameState}
          />

          <BooleanToggler
            name={"Cursor control"}
            getSetting={props.settingsController.isUsingCursor}
            clickHandler={() => props.settingsController.toggleIsUsingCursor()}
            gameState={props.gameState}
          />

          <MenuButton
            clickHandler={(e) => props.settingsController.reset()}
            label={"Reset to defaults"}
          />
        </>
      ) : slideNumber == 1 ? (
        <>
          <div style={titleStyle}>{"Controls"}</div>
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Drop"}
            action={KeyActions.DROP}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Rotate"}
            action={KeyActions.ROTATE}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Flip"}
            action={KeyActions.FLIP}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Lock"}
            action={KeyActions.LOCK}
          />
        </>
      ) : slideNumber == 2 ? (
        <>
          <div style={titleStyle}>{"Controls"}</div>
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Holding Slot 1"}
            action={KeyActions.HOLD_1}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Holding Slot 2"}
            action={KeyActions.HOLD_2}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Holding Slot 3"}
            action={KeyActions.HOLD_3}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Holding Slot 4"}
            action={KeyActions.HOLD_4}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Holding Slot 5"}
            action={KeyActions.HOLD_5}
          />
        </>
      ) : slideNumber == 3 ? (
        <>
          <div style={titleStyle}>{"Alternative Controls"}</div>
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Move Up"}
            action={KeyActions.MOVE_UP}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Move Left"}
            action={KeyActions.MOVE_LEFT}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Move Down"}
            action={KeyActions.MOVE_DOWN}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Move Right"}
            action={KeyActions.MOVE_RIGHT}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Rotate Left"}
            action={KeyActions.ROTATE_LEFT}
          />
          <Keybinding
            settingsController={props.settingsController}
            actionName={"Rotate Right"}
            action={KeyActions.ROTATE_RIGHT}
          />
        </>
      ) : (
        ""
      )}

      <ReturnToMenu
        clickHandler={(e) => {
          props.gameState.setMode(
            props.gameState.isRunning ? Mode.SINGLE_PLAYER : Mode.MAIN_MENU
          );
          props.audioController.queueAudioEvent(AudioEvents.CLICK_BUTTON_B, {});
        }}
      />
    </div>
  );
};
