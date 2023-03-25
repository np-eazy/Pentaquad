Pentaquad is a web game of a more complex Tetris variant, which features different gravity modes and objectives for clearing
specific targets rather than filled lines in the original game.

Holdable controls: (TODO: implement different logic for holdable controls)d
- W: move piece up
- A: move piece left
- S: move piece down
- D: move piece right

Single-press Controls
- Left arrow: rotate piece left (TODO: implement rotation)
- Right arrow: rotate piece right (TODO: implement rotation)
- Up/Down arrows: mirror the piece (TODO: implement mirroring)
- Space: force-place current piece by dropping it all the way down
- E: hold the current piece, if a piece is already held then swap that one in. A block must be placed before this can happen again
- F: force-place current piece where it is
- Q: activate an ability and/or spike the next blocksd

Initial Release Game Rules 
Mode 0: "base" game (TODO: Implement better GameController and CoreState, and set k, h, f, t, etc. as CONSTANT_VALUES)
- Every k ticks, a piece idly moves in its main direction; if its hitbox in that main direction hits a block, its contact timer goes up by 1
- If the contact timer reaches a threshold h, the piece is placed. Otherwise, if lost contact in its main direction, reset the timer.
- Every tick, a piece can take in movement actions; if its hitbox in its active direction hits a block, prevent it from moving any further in the active direction.
- A row can be fully cleared if it is fully filled, just like the normal game Tetris.

Mode 1: target blocks (TODO: Implement in CoreState)
- Target blocks are squares that need to be solidly filled to remove and to score points.
- Every time a block is placed, a new 1x1 target block spawns in a random location.
- Every time a block is placed, all existing target blocks increment their timers
- If timers hit a threshold t, their edges each grow out by 1 and the timer resets. 
- Once a target block covers the whole board, the game is over

Mode 2: target block specializations/patterns (TODO: design)
- Target blocks can spawn in special patterns, like many consecutive ones in a row or column
- Some target blocks can grow faster than the others
- Some blocks don't grow, but if not reached within a certain number of turns will immediately end the game

Special abilities (TODO: design)
- Force-place: allow the user to force-place a block before it hits an appropriate surface
- Explosion: blow up a 5x5 area upon contact with an appropriate surface
- Freeze: Freeze the growth of new target blocks for f block placements

Scoring factors (TODO: design)
- Filling up lines: same scoring system as Tetris
- Hitting targets: bonus points for combos


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
