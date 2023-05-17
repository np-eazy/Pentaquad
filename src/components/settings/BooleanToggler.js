import React from "react";
import {
  buttonStyle,
  container,
  entryWrapperStyle,
  verticalCenterAlignment,
} from "../BaseStyles";
import { ThreeOptionDisplay } from "./ThreeOptionDisplay";
import {
  EMPTY_COLOR,
  FILLED_COLOR,
  MARKER_COLOR,
} from "../../graphics/theme/ColorScheme";
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

export const BooleanToggler = (props) => {
  return (
    <MouseInteraction
      style={{ ...container, ...buttonStyle }}
      startingColor={MARKER_COLOR}
      blocked={props.blocked}
      clickHandler={(e) => {
        props.clickHandler();
      }}
    >
      <div style={{ ...verticalCenterAlignment }}>
        {props.name}:
      </div>
      <div
        style={{
          ...verticalCenterAlignment,
          ...valueStyle,
          opacity: props.blocked ? DISABLED_OPACITY : 1,
        }}
      >
        <div
          style={{
            ...labelStyle,
            ...entryWrapperStyle,
            width: 100,
            backgroundColor: props.getSetting
              ? FILLED_COLOR.getHex()
              : EMPTY_COLOR.getHex(),
            color: props.getSetting
              ? EMPTY_COLOR.getHex()
              : FILLED_COLOR.getHex(),
          }}
        >
          {props.getSetting ? "ON" : "OFF"}
        </div>
      </div>
    </MouseInteraction>
  );
};
