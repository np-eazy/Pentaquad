import React from "react";
import {
  buttonStyle,
  container,
  entryWrapperStyle,
  verticalCenterAlignment,
} from "../BaseStyles";
import { ThreeOptionDisplay } from "./ThreeOptionDisplay";
import { FILLED_COLOR, MARKER_COLOR } from "../../graphics/theme/ColorScheme";
import { MouseInteraction } from "../MouseInteraction";

const labelStyle = {
  color: FILLED_COLOR.getHex(),
};

const valueStyle = {
  right: "20px",
  textAlign: "right",
  minWidth: "175px",
};

const DISABLED_OPACITY = 0.25;

export const ThreeOptionToggler = (props) => {
  return (
    <MouseInteraction
      style={{ ...container, ...buttonStyle }}
      startingColor={MARKER_COLOR}
      blocked={props.blocked}
      clickHandler={(e) => {
        props.clickHandler();
      }}
    >
      <div style={{ ...verticalCenterAlignment, float: "left" }}>{props.name}:</div>
      <div
        style={{
          ...verticalCenterAlignment,
          ...valueStyle,
          opacity: props.blocked ? DISABLED_OPACITY : 1,
        }}
      >
        <div style={{ ...labelStyle, ...entryWrapperStyle, width: 100, float: "left" }}>
          {props.labels[props.getSetting]}
        </div>
        <ThreeOptionDisplay
          level={props.getSetting + 1}
          style={{ float: "right" }}
        />
      </div>
    </MouseInteraction>
  );
};
