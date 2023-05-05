
Playing the Alpha release here: https://pentaquad.uc.r.appspot.com 

https://user-images.githubusercontent.com/10951707/236352504-9efac17b-6c6e-493f-867b-aae775ef95e6.mp4

Pentaquad is a web game of a more complex Tetris variant, which features different gravity modes and objectives for clearing
specific targets rather than filled lines in the original game.

## To download/start the game:
- Clone this Github repository to your local drive
- `$ cd` into the Pentaquad folder, if this is the first time running then run `$ npm install` before anything else.
- Run `$ npm start`.
- A new Chrome window should pop up with the game running. 

## Game Rules (Alpha)
- The game drops pieces in alternating downwards and rightwards direction.
- Placed blocks will expire after a certain time.
- Filled lines are cleared as they are in Tetris.
- As the game progresses, targets will spawn in random areas around the board. 
- When a target is filled, it destroys an area slightly larger than itself, and may grant a power-up to the next normal piece in the queue.
- They must be filled before they expire, otherwise the player gets a strike.
- When the player gets three strikes, the game ends.

### Special Piece Types
- Ghost: marked by solid blocks with slowly flashing colors. A ghost piece can pas through previously placed pieces
- Bomb: marked by hollow blocks with an oscillating double border. A bomb pieces destroys a 5x5 area around it when placed.
- Drill: marked by hollow blocks with a border continually shrinking inwards. A drill piece destroys every placed block in its path when dropped.
- Tower: marked by solid blocks with quickly flashing colors and a border continually growing outwards. A tower piece when dropped fills the entire area under it.

### Controls
- Space: drop the current piece towards its boundary
- Click: Toggle whether or not the piece follows the cursor position
- F: flip the piece 
- R: rotate the piece
- C: "lock" the current piece for another 5 moves.
- Numkeys 1-5: Hold the current piece in the corresponding slot on the inventory

- If piece following cursor is not on:
- W: move piece up
- A: move piece left
- S: move piece down
- D: move piece right
- For WASD controls, if going in the opposite direction of the falling direction, the piece rotates right instead.


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
