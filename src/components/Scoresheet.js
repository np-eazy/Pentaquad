import React, { useState, useEffect } from "react";
import { SCORESHEET_HEIGHT, SCORESHEET_WIDTH } from "../graphics/theme/Layout";
import { EMPTY_COLOR, FILLED_COLOR, MARKER_COLOR } from "../graphics/theme/ColorScheme";

const PADDING_DIMENSIONS = 10;
const FONT_SIZE = 16;

const scoresheetStyle = {
  width: (SCORESHEET_WIDTH - PADDING_DIMENSIONS).toString() + "px",
  height: (SCORESHEET_HEIGHT - PADDING_DIMENSIONS).toString() + "px",
  padding: PADDING_DIMENSIONS.toString() + "px",
  backgroundColor: EMPTY_COLOR.getHex(),
}

const labelContainerStyle = {
  borderWidth: "2px",
  borderStyle: "solid",
  padding: PADDING_DIMENSIONS.toString() + "px",
  borderColor: MARKER_COLOR.getHex(),
}

const labelStyle = {
  height: "20px",
  minWidth: "200px",
  margin: PADDING_DIMENSIONS.toString() + "px",
  padding: PADDING_DIMENSIONS.toString() + "px",
  fontSize: FONT_SIZE.toString() + "px",
  fontFamily: "Verdana, Arial, sans-serif",
  backgroundColor: MARKER_COLOR.getHex(),
  color: "#ffffff",
}

const buttonStyle = {
  height: "20px",
  minWidth: "200px",
  margin: PADDING_DIMENSIONS.toString() + "px",
  padding: PADDING_DIMENSIONS.toString() + "px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: FILLED_COLOR.getHex(),

  fontSize: FONT_SIZE.toString() + "px",
  fontFamily: "Verdana, Arial, sans-serif",
  color: "#ffffff",}


const Scoresheet = (props) => {
  if (props.gameState) {
    const scorekeeper = props.gameState.coreState.scorekeeper;
    return (<div style={scoresheetStyle}>
      <div style={{...labelContainerStyle, float: "left"}}>
        <div style={labelStyle}>{"Level: " + scorekeeper.level}</div>
        <div style={labelStyle}>{"Score: " + scorekeeper.score}</div>
        <div style={labelStyle}>{"Strikes: " + scorekeeper.strikes}</div>
      </div>
      
      <div style={{...labelContainerStyle, float: "right"}}>
        <div style={labelStyle}>{props.gameState.coreState.scorekeeper.gameOver ? "Game over" : "Game not over"}</div>
        <div style={buttonStyle} onMouseDown={props.togglePauseGame}>{props.gameState.isRunning ? "Pause game" : "Resume game"}</div>
        <div style={buttonStyle} onMouseDown={props.startNewGame}>{"New game"}</div>
      </div>
    </div>)
  }
}

export default Scoresheet;
