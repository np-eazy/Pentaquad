import React from "react";
import { scoresheetStyle } from "./Scoresheet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FILLED_COLOR, MARKER_COLOR, WHITE } from "../../graphics/theme/ColorScheme";
import { MAX_STRIKES } from "../../game/coreState/Scorekeeper";

export const Strikes = (props) => {
  const strikeIcon = (color) => 
    <FontAwesomeIcon
      icon={faSquareXmark}
      size={"2x"}
      color={color}
      style={{paddingLeft: 2}}
    />;
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
          .map(e => strikeIcon("white"))}
        {Array(MAX_STRIKES - props.scorekeeper.strikes)
          .fill(0)
          .map(e => (strikeIcon(MARKER_COLOR.getHex())))}
      </div>
    </div>
  );
};
