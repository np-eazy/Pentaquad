import React from "react";
import { buttonStyle, centerAlignment, container } from "../BaseStyles";
import { MouseInteraction } from "../MouseInteraction";

export const MenuButton = (props) => {
  return (
    <MouseInteraction
      style={{
        ...container,
        ...buttonStyle,
      }}
      clickHandler={props.clickHandler}
    >
      <div style={centerAlignment}>{props.label}</div>
    </MouseInteraction>
  );
};
