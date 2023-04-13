import { DEBUG, debugCell } from "../../Debug";
import { inBounds } from "../../coreState/utils/Functions";
import { SCORESHEET_HEIGHT, SCORESHEET_WIDTH, SCORESHEET_X0, SCORESHEET_Y0, drawBackground } from "../Layout"

export const renderScoresheet = (canvas, scoresheet) => {
    drawBackground(canvas, SCORESHEET_X0, SCORESHEET_Y0, SCORESHEET_WIDTH, SCORESHEET_HEIGHT);
}

export const updateScoresheet = (scoresheet) => {

}