import React from "react";
import { lowerRightAlignment, navButtonStyle } from "../BaseStyles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Sound } from "../../audio/AudioController";
import { FILLED_COLOR } from "../../graphics/theme/ColorScheme";
import { MouseInteraction } from "../MouseInteraction";

const goToSettingsStyle = {
  ...navButtonStyle,
  ...lowerRightAlignment,
};

export const GoToSettings = (props) => {
  return (
    <MouseInteraction
      startingColor={FILLED_COLOR}
      style={goToSettingsStyle}
      clickHandler={(e) => {
        props.clickHandler();
        props.audioController.queueSound(Sound.CLICK_BUTTON_X);
      }}
    >
      <FontAwesomeIcon icon={faGear} />
    </MouseInteraction>
  );
};
