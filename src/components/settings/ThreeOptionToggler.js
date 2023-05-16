import React, { useEffect, useState } from "react";
import {
  BORDER_CHANGE_RATE,
  buttonStyle,
  containerStyle,
  verticalCenterStyle,
} from "../BaseStyles";
import { ThreeOptionDisplay } from "./ThreeOptionDisplay";
import { FILLED_COLOR, MARKER_COLOR } from "../../graphics/theme/ColorScheme";
import { linInt } from "../../graphics/utils/Functions";
import { copy } from "../../graphics/utils/Colors";
import { REFRESH_MS } from "../../game/rules/Constants";

const labelStyle = {
  color: FILLED_COLOR.getHex(),
};

const valueStyle = {
  right: "20px",
  textAlign: "right",
  minWidth: "150px",
};

const DISABLED_OPACITY = 0.25;

export const ThreeOptionToggler = (props) => {
  const [borderColor, setBorderColor] = new useState(copy(MARKER_COLOR));
  const [hover, setHover] = new useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setBorderColor(
        borderColor.interpolateTo(
          hover ? FILLED_COLOR : MARKER_COLOR,
          BORDER_CHANGE_RATE,
          linInt
        )
      );
    }, REFRESH_MS);
    return () => clearInterval(interval);
  }, [hover]);

  const blocked = props.blocked ? true : false;

  return (
    <div
      style={{
        ...containerStyle,
        ...buttonStyle,
        borderColor: borderColor.getHex(),
        borderWidth: "1px",
        borderStyle: "solid",
      }}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      onMouseDown={(e) => (props.blocked ? null : props.clickHandler())}
    >
      <div style={{ ...verticalCenterStyle, float: "left" }}>{props.name}:</div>
      <div
        style={{
          ...verticalCenterStyle,
          ...valueStyle,
          opacity: blocked ? DISABLED_OPACITY : 1,
        }}
      >
        <div style={{ ...labelStyle, float: "left" }}>
          {props.labels[props.getSetting]}
        </div>
        <ThreeOptionDisplay
          level={props.getSetting + 1}
          style={{ float: "right" }}
        />
      </div>
    </div>
  );
};
