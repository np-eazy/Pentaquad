import React from "react";
import { SCORESHEET_HEIGHT, BOARD_DIMENSIONS, QUEUE_WIDTH } from "../../graphics/theme/Layout";
import { Level } from "./Level";
import { Score } from "./Score";
import { Strikes } from "./Strikes";
import { overlayWrapperStyle } from "../Styles";

const PADDING_DIMENSIONS = 10;
const SCORESHEET_HIDE_Y = 100;

const scoresheetStyle = {
  maxWidth: BOARD_DIMENSIONS.toString() + "px",

  height: "auto",
  margin: "0 auto",
  position: "relative",
}

const labelContainerStyle = {
  display: "flex", 
  justifyContent: "space-between",
  padding: PADDING_DIMENSIONS.toString() + "px",
}

export const backgroundStyle = {
  minWidth: BOARD_DIMENSIONS,
  minHeight: SCORESHEET_HEIGHT,

  position: "absolute",
  marginLeft: QUEUE_WIDTH,
  
  zIndex: -1000,
  background: "linear-gradient(180deg, rgba(25,25,30,1) 0%, rgba(25,25,30,1) 35%, rgba(25,25,30,0) 100%)",
  opacity: 0.4,
}


const Scoresheet = (props) => {
  var cursorY = props.gameState.controller.cursorY;
  var opacity = cursorY < SCORESHEET_HIDE_Y ? cursorY / SCORESHEET_HIDE_Y : 1;
  if (props.gameState && props.gameState.coreState && props.gameState.coreState.scorekeeper) {
    const scorekeeper = props.gameState.coreState.scorekeeper;
    return (<div style={{...overlayWrapperStyle, opacity:opacity}}>
      <div style={backgroundStyle}></div>
      <div style={scoresheetStyle}>
        <div style={labelContainerStyle}>
          <Level scorekeeper={scorekeeper} />
          <Score scorekeeper={scorekeeper} />
          <Strikes scorekeeper={scorekeeper} />
        </div>
      </div>
    </div>
    )
  }
}

export default Scoresheet;
