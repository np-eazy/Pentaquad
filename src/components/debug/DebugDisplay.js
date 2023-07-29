import React from "react";
import { overlayWrapperStyle } from "../BaseStyles";
import { BOARD_DIMENSIONS } from "../../graphics/theme/Layout";
import { GLOBAL_SIZE, PLACEMENT_COUNTDOWN } from "../../game/rules/Constants";
import { inBounds, insideTarget } from "../../game/coreState/utils/Functions";
import {
  FALLING_COUNTDOWN_LVL,
  LEVEL_SCORE_THRESHOLDS,
  POWERUP_RARITY_LVL,
  TARGET_SPAWN_RADIUS_LVL,
} from "../../game/rules/Levels";
import { WHITE } from "../../graphics/theme/ColorScheme";
import { displayNum } from "../../graphics/utils/Functions";

const debugSectionStyle = {
  margin: "10px",

  color: WHITE.getHex(),
  fontSize: "16px",
};

const debugSubsectionStyle = {
  margin: "20px",

  textShadow: "2px 2px #000000",
};

export const DebugDisplay = (props) => {
  const gameState = props.gameState;
  const coreState = gameState.coreState;
  const currPiece = coreState.currPiece;
  const scorekeeper = coreState.scorekeeper;
  const level = scorekeeper.level;

  var [x, y] = gameState.controller.getCursorCoords(
    BOARD_DIMENSIONS,
    GLOBAL_SIZE
  );

  const targetDisplay = (target) => {
    return (
      <div style={debugSubsectionStyle}>
        <div>
          {"Target at " + target.x0.toString() + ", " + target.y0.toString()}
        </div>
        <div>
          {"Size: " +
            (target.x1 - target.x0).toString() +
            ", " +
            (target.y1 - target.y0).toString()}
        </div>
        <div>{"Activated: " + target.activated.toString()}</div>
        <div>{"Growing penalty: " + target.isGrowing.toString()}</div>
        <div>
          {"Penalty countdown: " +
            target.penaltyCounter.toString() +
            "/" +
            target.placementsToPenalty.toString()}
        </div>
        <div>{"Powerup type: " + target.mainCell.type.toString()}</div>
      </div>
    );
  };

  var cell = inBounds(x, y, GLOBAL_SIZE) ? coreState.board[y][x] : undefined;
  return (
    <div style={overlayWrapperStyle}>
      <div style={{ ...debugSectionStyle, float: "left" }}>
        <div style={debugSubsectionStyle}>
          <div>{"Level: " + level.toString()}</div>
          <div>
            {"Points to next level: " + LEVEL_SCORE_THRESHOLDS[level - 1]}
          </div>
          <div>
            {"Falling Countdown: " + FALLING_COUNTDOWN_LVL[coreState.settingsController.gameDifficulty][level] + " frames"}
          </div>
          <div>{"Powerup Rarity: 1/" + POWERUP_RARITY_LVL[coreState.settingsController.gameDifficulty][level]}</div>
          <div>
            {"Target spawn size: " + (1 + 2 * TARGET_SPAWN_RADIUS_LVL[coreState.settingsController.gameDifficulty][level])}
          </div>
        </div>

        <div style={debugSubsectionStyle}>
          <div>
            {"Cursor on: " + coreState.controller.toggleMoveTo.toString()}
          </div>
          <div>{"readyToPlace: " + coreState.readyToPlace.toString()}</div>
          <div>{"Timer: " + coreState.timer.toString()}</div>
          <div>
            {"Collision timer: " +
              coreState.collisionTimer.toString() +
              "/" +
              PLACEMENT_COUNTDOWN.toString()}
          </div>
          <div>
            {"Gravity direction: " + coreState.gravity.angle.toString()}
          </div>
        </div>

        {currPiece ? (
          <div style={debugSubsectionStyle}>
            <div>
              {"Piece at x: " +
                currPiece.cx.toString() +
                ", y: " +
                currPiece.cy.toString()}
            </div>
            <div>{"Cell type: " + currPiece.mainCell.type.toString()}</div>
            <div>{"Falling direction: " + currPiece.dxn.angle.toString()}</div>
            <div>{"Shape type: " + currPiece.shapeIndex.toString()}</div>
            <div>{"Activated: " + currPiece.activated.toString()}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      {cell ? (
        <div
          style={{ ...debugSectionStyle, textAlign: "right", float: "right" }}
        >
          <div style={debugSubsectionStyle}>
            <div>{"Cell at " + x.toString() + ", " + y.toString()}</div>
            <div>{"Type: " + cell.type.toString()}</div>
            <div>
              {"Offset: " +
                cell.xOffset.toString() +
                ", " +
                cell.yOffset.toString()}
            </div>
            <div>{"Timer: " + cell.timer.toString()}</div>
            <div>{"Meter: " + displayNum(cell.meter)}</div>
            <div>
              {"TTL: " + cell.ttl.toString() + "/" + cell.lifetime.toString()}
            </div>
            <div>{"Marked: " + cell.marked.toString()}</div>

            <div>{"Base color: " + cell.baseColor.toString()}</div>
            <div>{"Current color: " + cell.currentColor.toString()}</div>
            <div>{"Light color: " + cell.lightColor.toString()}</div>
          </div>

          {coreState.targets
            .filter((target) => insideTarget(x, y, target))
            .map(targetDisplay)}
          {coreState.targetProvider.nextTargets
            .filter((target) => insideTarget(x, y, target))
            .map(targetDisplay)}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
