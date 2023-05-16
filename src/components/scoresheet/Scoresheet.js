import React from "react";
import {
  SCORESHEET_HEIGHT,
  BOARD_DIMENSIONS,
  QUEUE_WIDTH,
} from "../../graphics/theme/Layout";
import { Level } from "./Level";
import { Score } from "./Score";
import { Strikes } from "./Strikes";
import { overlayWrapperStyle } from "../BaseStyles";
import { WHITE } from "../../graphics/theme/ColorScheme";

const PADDING_DIMENSIONS = 10;
const SCORESHEET_HIDE_Y = 100;

const scoresheetWrapperStyle = {
  maxWidth: BOARD_DIMENSIONS.toString() + "px",

  height: "auto",
  margin: "0 auto",
  position: "relative",
};
export const scoresheetStyle = {
  minWidth: "100px",
  minHeight: "36px",
  padding: "10px",

  textAlign: "center",
  zIndex: "200",

  color: WHITE.getHex(),
  fontSize: "16px",
};

const labelContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: PADDING_DIMENSIONS.toString() + "px",
};

export const backgroundStyle = {
  minWidth: BOARD_DIMENSIONS,
  minHeight: SCORESHEET_HEIGHT,

  position: "absolute",
  marginLeft: QUEUE_WIDTH,

  zIndex: -1000,
  background:
    "linear-gradient(180deg, rgba(25,25,30,1) 0%, rgba(25,25,30,1) 35%, rgba(25,25,30,0) 100%)",
  opacity: 0.4,
};

const Scoresheet = (props) => {
  var cursorY = props.gameState.controller.cursorY;
  var opacity = cursorY < SCORESHEET_HIDE_Y ? cursorY / SCORESHEET_HIDE_Y : 1;
  if (
    props.gameState &&
    props.gameState.coreState &&
    props.gameState.coreState.scorekeeper
  ) {
    const scorekeeper = props.gameState.coreState.scorekeeper;
    return (
      <div style={{ ...overlayWrapperStyle, opacity: opacity }}>
        <div style={backgroundStyle}></div>
        <div style={scoresheetWrapperStyle}>
          <div style={labelContainerStyle}>
            <Level scorekeeper={scorekeeper} />
            <Score scorekeeper={scorekeeper} />
            <Strikes scorekeeper={scorekeeper} />
          </div>
        </div>
      </div>
    );
  }
};

export default Scoresheet;
