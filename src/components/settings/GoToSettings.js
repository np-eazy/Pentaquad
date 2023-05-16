import React from "react";
import { navButtonStyle } from "../BaseStyles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Sound } from "../../audio/AudioController";

const goToSettingsStyle = {
  ...navButtonStyle,
  position: "absolute",
  right: "0px",
  bottom: "0px",
};
export const GoToSettings = (props) => {
  return (
    <div
      style={goToSettingsStyle}
      onMouseDown={(e) => {
        props.clickHandler();
        props.audioController.queueSound(Sound.CLICK_BUTTON_X);
      }}
    >
      <FontAwesomeIcon icon={faGear} />
    </div>
  );
};
