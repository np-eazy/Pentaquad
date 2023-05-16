import React from "react";
import { scoresheetStyle } from "./Scoresheet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MARKER_COLOR, WHITE } from "../../graphics/theme/ColorScheme";
import { MAX_STRIKES } from "../../game/coreState/Scorekeeper";

export const Strikes = (props) => {
  return (
    <div
      style={{
        ...scoresheetStyle,
        display: "inline-block",
        verticalAlign: "top",
        lineHeight: "1",
        size: "30",
      }}
    >
      <div style={{ maxHeight: "40px" }}>
        {Array(props.scorekeeper.strikes)
          .fill(0)
          .map((e) => (
            <FontAwesomeIcon
              icon={faXmark}
              size={"2x"}
              color={WHITE.getHex()}
            />
          ))}
        {Array(MAX_STRIKES - props.scorekeeper.strikes)
          .fill(0)
          .map((e) => (
            <FontAwesomeIcon
              icon={faXmark}
              size={"2x"}
              color={MARKER_COLOR.getHex()}
            />
          ))}
      </div>
    </div>
  );
};
