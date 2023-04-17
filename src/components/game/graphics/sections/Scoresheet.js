import { SCORESHEET_HEIGHT, SCORESHEET_WIDTH, SCORESHEET_X0, SCORESHEET_Y0, drawBackground } from "../Layout"
import { FILLED_COLOR } from "../Theme";

// The scoresheet will be used to render scores, messages, and other CLI-style information
// for the player. Its coordinates are also used to place debug messages, handled by GameGraphics.

// See comment in ./Board.js for more about convention with objects and sections
export const renderScoresheet = (canvas, scorekeeper) => {
    drawBackground(canvas, SCORESHEET_X0, SCORESHEET_Y0, SCORESHEET_WIDTH, SCORESHEET_HEIGHT);
// TODO: Add more args to debugCell like x and y position or left/right align to render more of these

    canvas.font = (32).toString() + "px Arial";
    canvas.fillStyle = FILLED_COLOR.getHex();
  
    canvas.fillText(
      "Score: " + scorekeeper.score,
      SCORESHEET_X0 + 50,
      SCORESHEET_Y0 + 36,
    );
  


}

export const updateScoresheet = (scoresheet) => {

}
