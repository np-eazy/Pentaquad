import React, { useState, useEffect } from "react";

import GameState, { Mode } from "../game/GameState";
import CoreState from "../game/coreState/CoreState";
import GameController from "../game/control/GameController";

import GameGraphics from "../graphics/GameGraphics";
import { REFRESH_MS, DEBUG } from "../game/rules/Constants";
import { TOTAL_HEIGHT, TOTAL_WIDTH } from "../graphics/theme/Layout";
import Scoresheet from "./scoresheet/Scoresheet";
import { MainMenu } from "./mainMenu/MainMenu";
import { Tutorial } from "./tutorial/Tutorial";
import { Settings } from "./settings/Settings";
import { GoToSettings } from "./settings/GoToSettings";
import { overlayWrapperStyle } from "./Styles";
import { ReturnToMenu } from "./mainMenu/ReturnToMenu";
import { DebugDisplay } from "./debug/DebugDisplay";
import { AudioController } from "../audio/AudioController";

// The main component that displays the game. It is intended to hold nothing more than the game,
// and to be surrounded by other components that represent menus, settings, etc.
const Game = (props) => {
  // The global flow of tempo to facilitate the useEffect update loop
  const [canvasTimer, setCanvasTimer] = useState(0);
  const [gameController, setGameController] = useState(new GameController({}));
  const [audioController, setAudioController] = useState(new AudioController({}));
  const [gameState, setGameState] = useState(
    new GameState({
      coreState: new CoreState({}),
      controller: gameController,
      audioController: audioController,
    })
  );

  // Disable spacebar scrolling down
  window.onkeydown = function (e) {
    return e.keyCode !== 32 && e.key !== " ";
  };

  // Main update loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState) {
        setGameState(gameState.update());
      }
      audioController.consumeSound();
      setCanvasTimer(canvasTimer + 1);
    }, REFRESH_MS);
    return () => clearInterval(interval);
  }, [canvasTimer]);

  return (
    <div
      id="gameCanvas"
      tabIndex={0}
      onKeyDown={(e) => gameController.handleKeyDown(e)}
      onMouseMove={(e) => gameController.handleMouseMove(e)}
      onMouseDown={(e) => gameController.handleMouseDown(e)}
    >
      <canvas id="gameGraphics" width={TOTAL_WIDTH} height={TOTAL_HEIGHT}>
        <GameGraphics gameState={gameState} />
      </canvas>
      <div style={overlayWrapperStyle}>
        {DEBUG ? <DebugDisplay gameState={gameState}/> : ""}
        
        {gameState.mode == Mode.MAIN_MENU ? (
          <MainMenu gameState={gameState}  audioController={audioController} />
        ) : (
          ""
        )}
        {gameState.mode == Mode.TUTORIAL ? (
          <Tutorial gameState={gameState}  audioController={audioController} />
        ) : (
          ""
        )}
        {gameState.mode == Mode.SETTINGS ? (
          <Settings
            gameState={gameState}
            audioController={audioController} 
            togglePauseGame={(e) => gameState.togglePause()}
            startNewGame={(e) => gameState.startNewGame()}
          />
        ) : (
          ""
        )}
        {gameState.mode == Mode.SINGLE_PLAYER ? (
          <Scoresheet
            gameState={gameState}
            togglePauseGame={(e) => gameState.togglePause()}
            startNewGame={(e) => gameState.startNewGame()}
          />
        ) : (
          ""
        )}

        {gameState.mode == Mode.MAIN_MENU ||
        gameState.mode == Mode.SINGLE_PLAYER ? (
          <GoToSettings
            clickHandler={(e) => gameState.setMode(Mode.SETTINGS)}
            audioController={audioController} 
          />
        ) : (
          ""
        )}
        {gameState.mode == Mode.SETTINGS || gameState.mode == Mode.TUTORIAL ? (
          <ReturnToMenu
            clickHandler={(e) => {
              if (!gameState.isRunning) {
                gameState.setMode(Mode.MAIN_MENU);
              } else {
                gameState.setMode(Mode.SINGLE_PLAYER);
              }
            }}
            audioController={audioController} 
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Game;
