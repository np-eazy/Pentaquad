import React, { useState } from "react";
import { Mode } from "../../game/GameState";
import {
  overlayWrapperStyle,
  verticalCenterAlignment,
} from "../BaseStyles";
import { ReturnToMenu } from "../mainMenu/ReturnToMenu";
import { Sound } from "../../audio/AudioController";
import { SlideNav } from "./SlideNav";
import { TOTAL_WIDTH } from "../../graphics/theme/Layout";
import { IntroSlide, ObjectiveSlide, PowerupSlide, SlideWrapper } from "./Slides";
import { FILLED_COLOR } from "../../graphics/theme/ColorScheme";


export const Tutorial = (props) => {
  const [slideNumber, setSlideNumber] = new useState(0);
  const SLIDE_FILES = [
    <IntroSlide />,
    <ObjectiveSlide />,
    <PowerupSlide />,
  ]

  return (
    <div style={{ ...overlayWrapperStyle }}>
      <div style={{textAlign: "center", marginTop: 20, color: FILLED_COLOR.getHex()}}>{"(Use arrow buttons to navigate)"}</div>
      <div style={{ ...verticalCenterAlignment, width: TOTAL_WIDTH, zIndex: 100 }}>
        <div style={{ float: "left" }}>
          <SlideNav
            direction={false}
            clickHandler={(e) =>
              setSlideNumber(
                slideNumber == 0 ? SLIDE_FILES.length - 1 : slideNumber - 1
              )
            }
          />
        </div>
        <div style={{ float: "right" }}>
          <SlideNav
            direction={true}
            clickHandler={(e) =>
              setSlideNumber((slideNumber + 1) % SLIDE_FILES.length)
            }
          />
        </div>
      </div>
      
      <SlideWrapper>
        {SLIDE_FILES[slideNumber]}
      </SlideWrapper>

      <ReturnToMenu
        clickHandler={(e) => {
          props.gameState.setMode(Mode.MAIN_MENU);
          props.audioController.queueSound(Sound.CLICK_BUTTON_B);
        }}
      />
    </div>
  );
};
