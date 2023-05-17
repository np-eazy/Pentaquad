import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { EMPTY_COLOR, FILLED_COLOR } from "../../graphics/theme/ColorScheme";

export const ThreeOptionDisplay = (props) => {
  const getIcon = (color) => (
    <FontAwesomeIcon
      icon={faSquareXmark}
      color={color}
      style={{
        paddingLeft: "3px",
      }}
    />
  );

  return (
    <div>
      {Array(props.level)
        .fill(0)
        .map((e) => getIcon(FILLED_COLOR.getHex()))}
      {Array(3 - props.level)
        .fill(0)
        .map((e) => getIcon(EMPTY_COLOR.getHex()))}
    </div>
  );
};
