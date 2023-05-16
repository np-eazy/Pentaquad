import React, { useEffect, useState } from "react";
import {
  BORDER_CHANGE_RATE,
  buttonStyle,
  centerStyle,
  containerStyle,
} from "../BaseStyles";
import { FILLED_COLOR, MARKER_COLOR } from "../../graphics/theme/ColorScheme";
import { linInt } from "../../graphics/utils/Functions";
import { copy } from "../../graphics/utils/Colors";
import { REFRESH_MS } from "../../game/rules/Constants";

export const MenuButton = (props) => {
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
      <div style={centerStyle}>{props.label}</div>
    </div>
  );
};
