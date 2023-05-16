import React from "react";
import { scoresheetStyle } from "./Scoresheet";

export const Level = (props) => {
  return (
    <div style={{ ...scoresheetStyle, textAlign: "left" }}>
      <div>{"Level: " + props.scorekeeper.level.toString()}</div>
    </div>
  );
};
