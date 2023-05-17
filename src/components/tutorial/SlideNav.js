import React from "react";
import { centerAlignment, container } from "../BaseStyles";
import { FILLED_COLOR } from "../../graphics/theme/ColorScheme";
import { MouseInteraction } from "../MouseInteraction";

const slideNavStyle = {
  width: 40,
  height: 40,

  margin: 20,

  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "5px",
  opacity: 0.75
};

const bracketStyle = {
  color: FILLED_COLOR.getHex(),
  fontSize: 32,
  fontWeight: 700,
};

export const SlideNav = (props) => {
  return (
    <MouseInteraction
      style={{
        ...container,
        ...slideNavStyle,
      }}
      clickHandler={(e) => {
        props.clickHandler(e);
      }}
    >
      <div
        style={{
          ...centerAlignment,
          ...bracketStyle,
        }}
      >
        {props.direction ? "〉" : "〈"}
      </div>
    </MouseInteraction>
  );
};
