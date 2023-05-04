import React, { useState, useEffect } from "react";

import GameState, { Mode } from "../game/GameState";
import CoreState from "../game/coreState/CoreState";
import GameController from "../game/control/GameController";

import GameGraphics from "../graphics/GameGraphics";
import { WINDOW_DIMENSIONS, BOARD_SIZE, REFRESH_MS, DEBUG } from "../game/rules/Constants";
import { TOTAL_HEIGHT, TOTAL_WIDTH } from "../graphics/Layout";
import Scoresheet from "./Scoresheet";
import { MainMenu } from "./mainMenu/MainMenu";
import { Tutorial } from "./tutorial/Tutorial";
import { Settings } from "./settings/Settings";
import { GoToSettings } from "./settings/GoToSettings";
import { overlayWrapperStyle } from "./Styles";
import { ReturnToMenu } from "./mainMenu/ReturnToMenu";
import { DebugDisplay } from "./debug/DebugDisplay";

// The main component that displays the game. It is intended to hold nothing more than the game,
// and to be surrounded by other components that represent menus, settings, etc.
const GameCanvas = (props) => {
  // The global flow of tempo to facilitate the useEffect update loop
  const [canvasTimer, setCanvasTimer] = useState(0);
  // Keypress logic
  const [gameController, setGameController] = useState(
    new GameController({
      boardSize: BOARD_SIZE,
      windowDimensions: WINDOW_DIMENSIONS,
    })
  );
  // TODO: Create a GameState that wraps around CoreState to control when active game logic takes place
  const [gameState, setGameState] = useState(
    new GameState({
      coreState: new CoreState({
        boardSize: BOARD_SIZE,
      }),
      controller: gameController,
    })
  );
  // The canvas is the root listener for keyDown events, which are delegated to the gameController to map to GameActions.
  const handleKeyDown = (event) => {
    gameController.handleKeyDown(event);
  };
  // MouseMove is also delegated to GameController gthough handled differently.
  const handleMouseMove = (event) => {
    gameController.handleMouseMove(event);
  };
  const handleMouseDown = (event) => {
    gameController.handleMouseDown(event);
  };

  const togglePauseGame = (e) => {
    gameState.togglePause();
  };
  const startNewGame = (e) => {
    gameState.startOver();
  }

  // Disable spacebar scrolling down
  window.onkeydown = function (e) {
    return e.keyCode !== 32 && e.key !== " ";
  };

  // Main update loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState != undefined) {
        setGameState(gameState.update());
      }
      setCanvasTimer(canvasTimer + 1);
    }, REFRESH_MS);
    return () => clearInterval(interval);
  }, [canvasTimer]);

  return (
    <div
      id="gameCanvas"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
    >

      <canvas id="gameGraphics" width={TOTAL_WIDTH} height={TOTAL_HEIGHT}>
        <GameGraphics gameState={gameState} />
      </canvas>
      <div style={overlayWrapperStyle}>
        {DEBUG ?
          <DebugDisplay gameState={gameState} />
        : ""}
        {gameState.mode == Mode.MAIN_MENU ?
          <MainMenu gameState={gameState}/>
        : ""} 
        {gameState.mode == Mode.TUTORIAL ?
          <Tutorial gameState={gameState}/>
        : ""} 
        {gameState.mode == Mode.SETTINGS ?
          <Settings gameState={gameState}/>
        : ""} 
        {gameState.mode == Mode.MAIN_MENU || gameState.mode == Mode.SINGLE_PLAYER ?
          <GoToSettings clickHandler={(e) => gameState.setMode(Mode.SETTINGS)} /> 
        : ""}
        {gameState.mode == Mode.SETTINGS || gameState.mode == Mode.TUTORIAL ?
          <ReturnToMenu clickHandler={(e) => {
            if (!gameState.isRunning) {
              gameState.setMode(Mode.MAIN_MENU)
            } else {
              gameState.setMode(Mode.SINGLE_PLAYER)
            }
          }} /> 
        : ""}
      </div>
      <Scoresheet gameState={gameState} togglePauseGame={togglePauseGame} startNewGame={startNewGame}/>
    </div>
  );
};

export default GameCanvas;
