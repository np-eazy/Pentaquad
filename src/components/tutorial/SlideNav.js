import React from "react";
import { centerAlignment, container } from "../BaseStyles";
import { FILLED_COLOR } from "../../graphics/theme/ColorScheme";
import { MouseInteraction } from "../MouseInteraction";
import { REFRESH_MS } from "../../game/rules/Constants";
import { copy } from "../../graphics/utils/Colors";
import { faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { COLUMN_WIDTH } from "../../graphics/theme/Layout";

const slideNavStyle = {
  width: 40,
  height: 40,

  marginLeft: COLUMN_WIDTH,
  marginRight: COLUMN_WIDTH,

  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "5px",
  opacity: 0.5
};

const bracketStyle = {
  fontSize: 32,
  fontWeight: 700,
  color: "white",
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
