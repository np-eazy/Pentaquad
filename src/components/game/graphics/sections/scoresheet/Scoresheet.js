import React, { useState, useEffect } from "react";
import { SCORESHEET_HEIGHT, SCORESHEET_WIDTH } from "../../Layout";


const scoresheetStyle = {
  minWidth: SCORESHEET_WIDTH,
  minHeight: SCORESHEET_HEIGHT,
}

const Scoresheet = (props) => {
  if (props.gameState) {
    const scorekeeper = props.gameState.coreState.scorekeeper;
    return (<div style={scoresheetStyle}>
      <div>{"Level: " + scorekeeper.level}</div>
      <div>{"Score: " + scorekeeper.score}</div>
      <div>{"Strikes: " + scorekeeper.strikes}</div>
    </div>)
  }
}

export default Scoresheet;

// import {
//   SCORESHEET_HEIGHT,
//   SCORESHEET_WIDTH,
//   SCORESHEET_X0,
//   SCORESHEET_Y0,
//   drawBackground,
// } from "../../Layout";
// import { FILLED_COLOR } from "../../../theme/Theme";

// // The scoresheet will be used to render scores, messages, and other CLI-style information
// // for the player. Its coordinates are also used to place debug messages, handled by GameGraphics.

// const SCORE_FONT_SIZE = 32;
// const SCORE_FONT_FAMILY = "Arial";
// const SCORE_FONT_XOFFSET = 50;
// const SCORE_FONT_YSPACE = 4;

// // See comment in ./Board.js for more about convention with objects and sections
// export const renderScoresheet = (canvas, scorekeeper) => {
//   drawBackground(
//     canvas,
//     SCORESHEET_X0,
//     SCORESHEET_Y0,
//     SCORESHEET_WIDTH,
//     SCORESHEET_HEIGHT
//   );
//   // TODO: Add more args to debugCell like x and y position or left/right align to render more of these

//   canvas.font = SCORE_FONT_SIZE.toString() + "px " + SCORE_FONT_FAMILY;
//   canvas.fillStyle = FILLED_COLOR.getHex();

//   canvas.fillText(
//     "Level: " + scorekeeper.level,
//     SCORESHEET_X0 + SCORE_FONT_XOFFSET,
//     SCORESHEET_Y0 + SCORE_FONT_SIZE + SCORE_FONT_YSPACE
//   );

//   canvas.fillText(
//     "Score: " + scorekeeper.score,
//     SCORESHEET_X0 + SCORE_FONT_XOFFSET,
//     SCORESHEET_Y0 + SCORE_FONT_SIZE * 2 + SCORE_FONT_YSPACE
//   );

//   canvas.fillText(
//     "Strikes: " + scorekeeper.strikes,
//     SCORESHEET_X0 + SCORE_FONT_XOFFSET,
//     SCORESHEET_Y0 + SCORE_FONT_SIZE * 3 + SCORE_FONT_YSPACE
//   );

  
// };

// export const updateScoresheet = (scoresheet) => {};
