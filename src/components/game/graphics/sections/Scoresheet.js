import { SCORESHEET_HEIGHT, SCORESHEET_WIDTH, SCORESHEET_X0, SCORESHEET_Y0, drawBackground } from "../Layout"

// See comment in ./Board.js for more about convention with objects and sections
export const renderScoresheet = (canvas, scoresheet) => {
    drawBackground(canvas, SCORESHEET_X0, SCORESHEET_Y0, SCORESHEET_WIDTH, SCORESHEET_HEIGHT);
}

export const updateScoresheet = (scoresheet) => {

}
