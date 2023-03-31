import React, { useState, useEffect } from 'react'

import GameGraphics from'./graphics/GameGraphics'
import GameState from './GameState'
import CoreState from './coreState/CoreState'
import GameController from '../control/GameController'

import {
    WINDOW_SIZE,
    BOARD_SIZE,
    REFRESH_MS,
} from "./Constants"

// The main component that displays the game. It is intended to hold nothing more than the game,
// and to be surrounded by other components that represent menus, settings, etc.
const GameCanvas = (props) => {
    // The global flow of tempo to facilitate the useEffect update loop
    const [canvasTimer, setCanvasTimer] = useState(0)
    // Keypress logic
    const [gameController, setGameController] = useState(new GameController({
        boardSize: BOARD_SIZE,
        windowSize: WINDOW_SIZE,
    }))
    // TODO: Create a GameState that wraps around CoreState to control when active game logic takes place
    const [gameState, setGameState] = useState(new GameState({
        coreState: new CoreState({
            boardSize: BOARD_SIZE,
        }),
        controller: gameController,
    }))
    // The canvas is the root listener for keyDown events, which are delegated to the gameController to map to GameActions.
    const handleKeyDown = (event) => {
        gameController.handleKeyDown(event)
    }
    // MouseMove is also delegated to GameController gthough handled differently.
    const handleMouseMove = (event) => {
        gameController.handleMouseMove(event)
    }
    const handleMouseDown = (event) => {
        gameController.handleMouseDown(event)
    }
    // Disable spacebar scrolling down
    window.onkeydown = function(e) {
        return e.keyCode !== 32 && e.key !== " "
    }

    // Main update loop
    useEffect(() => {
        const interval = setInterval(() => {
            if (gameState != undefined) {
                setGameState(gameState.update())
            }
            setCanvasTimer(canvasTimer + 1)
        }, REFRESH_MS)
        return () => clearInterval(interval)
      }, [canvasTimer])

    return (
        <div id="gameCanvas" tabIndex={0} onKeyDown={handleKeyDown} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown}>
            <canvas id="gameGraphics" width={WINDOW_SIZE} height={WINDOW_SIZE}>
                <GameGraphics gameState={gameState} windowSize={WINDOW_SIZE} />
            </canvas>
        </div>
    )
}

export default GameCanvas
