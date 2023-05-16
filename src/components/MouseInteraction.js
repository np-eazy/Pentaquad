import { useEffect, useState } from "react";
import { copy } from "../graphics/utils/Colors";
import { FILLED_COLOR, MARKER_COLOR } from "../graphics/theme/ColorScheme";
import { BACKGROUND_CHANGE_RATE, BORDER_CHANGE_RATE } from "./BaseStyles";
import { linInt } from "../graphics/utils/Functions";
import { REFRESH_MS } from "../game/rules/Constants";

export const MouseInteraction = (props) => {
  const [borderColor, setBorderColor] = new useState(copy(MARKER_COLOR));
  const [backgroundColor, setBackgroundColor] = new useState(
    copy(props.startingColor ? props.startingColor : MARKER_COLOR)
  );
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
      setBackgroundColor(
        backgroundColor.interpolateTo(
          MARKER_COLOR,
          BACKGROUND_CHANGE_RATE,
          linInt
        )
      );
    }, REFRESH_MS);
    return () => clearInterval(interval);
  }, [hover]);

  return (
    <div
      style={{
        ...props.style,
        backgroundColor: backgroundColor.getHex(),
        borderColor: borderColor.getHex(),
      }}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      onMouseDown={(e) => {
        if (!props.blocked) {
          props.clickHandler();
          setBackgroundColor(backgroundColor.set(FILLED_COLOR));
        }
      }}
    >
      {props.children}
    </div>
  );
};
