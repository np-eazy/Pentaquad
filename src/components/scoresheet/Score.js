import React from "react";
import { scoresheetStyle } from "./Scoresheet";
import { WHITE } from "../../graphics/theme/ColorScheme";
import { displayNum } from "../../graphics/utils/Functions";

const scoreStyle = {
  fontFamily: "Staatliches",
  fontSize: "32px",
  color: WHITE.getHex(),
};
const targetComboStyle = {
  fontSize: "16px",
  color: WHITE.getHex(),
};
const lineComboStyle = {
  fontSize: "16px",
  color: WHITE.getHex(),
};
export const Score = (props) => {
  return (
    <div style={scoresheetStyle}>
      <div style={scoreStyle}>{props.scorekeeper.score.toString()}</div>
      <div style={targetComboStyle}>
        {displayNum(props.scorekeeper.targetCombo) + "x"}
      </div>
      <div style={lineComboStyle}>
        {displayNum(props.scorekeeper.lineCombo) + "x"}
      </div>
    </div>
  );
};
