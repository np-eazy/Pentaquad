import React from "react";
import { navButtonStyle } from "../BaseStyles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { Sound } from "../../audio/AudioController";

const returnToMenuStyle = {
  ...navButtonStyle,
  position: "absolute",
  right: "0px",
  bottom: "0px",
};
export const ReturnToMenu = (props) => {
  return (
    <div
      style={returnToMenuStyle}
      onMouseDown={(e) => {
        props.clickHandler();
        props.audioController.queueSound(Sound.CLICK_BUTTON_B);
      }}
    >
      <FontAwesomeIcon icon={faUndo} />
    </div>
  );
};
