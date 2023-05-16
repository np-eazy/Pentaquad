import React from "react";
import { lowerRightAlignment, navButtonStyle } from "../BaseStyles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { Sound } from "../../audio/AudioController";
import { FILLED_COLOR } from "../../graphics/theme/ColorScheme";
import { MouseInteraction } from "../MouseInteraction";

const returnToMenuStyle = {
  ...navButtonStyle,
  ...lowerRightAlignment,
};
export const ReturnToMenu = (props) => {
  return (
    <MouseInteraction
      startingColor={FILLED_COLOR}
      style={returnToMenuStyle}
      clickHandler={(e) => {
        props.clickHandler();
        props.audioController.queueSound(Sound.CLICK_BUTTON_B);
      }}
    >
      <FontAwesomeIcon icon={faUndo} />
    </MouseInteraction>
  );
};
