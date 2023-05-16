import React from "react";
import { scoresheetStyle, settingButtonStyle } from "../Styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleTimes } from "@fortawesome/free-solid-svg-icons";
import {
    EMPTY_COLOR,
    FILLED_COLOR,
  MARKER_COLOR,
  WHITE,
} from "../../graphics/theme/ColorScheme";
import { MAX_STRIKES } from "../../game/coreState/Scorekeeper";

export const ThreeOptionDisplay = (props) => {
  const getIcon = (color) => (
  <FontAwesomeIcon
    icon={faRectangleTimes}
    color={color}
    style={{
        paddingLeft: "3px",
    }}/>)

  return (
      <div>
        {Array(props.level)
          .fill(0)
          .map((e) => getIcon(FILLED_COLOR.getHex()))}
        {Array(props.maxLevel - props.level)
          .fill(0)
          .map((e) => getIcon(EMPTY_COLOR.getHex()))}
      </div>
  );
};
