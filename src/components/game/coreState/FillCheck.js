import { DXN } from "./Utils"
// Check for filled lines within a certain threshold and clear them Tetris-style, based
// on the current direction of gravity.
const checkFilledLines = ({threshold, angle, boardSize, board, emptyValue}) => {
    if (angle % 2 == 0) {
        for (var x = 0; x < boardSize; x++) {
            var count = 0
            for (var y = 0; y < boardSize; y++) {
                if (board[y][x].type > 0) {
                    count += 1
                }
            }
            // Horizontally shift the left or the right of the cleared line
            if (count >= threshold) {
                if (angle % 4 == DXN.RIGHT) {
                    for (var j = 0; j < x; j++) {
                        i = x - j - 1
                        for (var y_ = 0; y_ < boardSize; y_++) {
                            board[y_][i + 1] = board[y_][i]
                        }
                    }
                    for (var y_ = 0; y_ < boardSize; y_++) {
                        board[y_][0] = emptyValue()
                    }
                } else {
                    for (var i = x + 1; i < boardSize; i++) {
                        for (var y_ = 0; y_ < boardSize; y_++) {
                            board[y_][i - 1] = board[y_][i]
                        }
                    }
                    for (var y_ = 0; y_ < boardSize; y_++) {
                        board[y_][boardSize - 1] = emptyValue()
                    }
                }
            }
        }
    } else {
        for (var y = 0; y < boardSize; y++) {
            var count = 0;
            for (var x = 0; x < boardSize; x++) {
                if (board[y][x].type > 0) {
                    count += 1;
                }
            }
            // Horizontally shift the left or the right of the cleared line
            if (count >= threshold) {
                if (angle % 4 == DXN.DOWN) {
                    for (var j = 0; j < y; j++) {
                        i = y - j - 1
                        for (var x_ = 0; x_ < boardSize; x_++) {
                            board[i + 1][x_] = board[i][x_]
                        }
                    }
                    for (var x_ = 0; x_ < boardSize; x_++) {
                        board[0][x_] = emptyValue()
                    }
                } else {
                    for (var i = y + 1; i < boardSize; i++) {
                        for (var x_ = 0; x_ < boardSize; x_++) {
                            board[i - 1][x_] = board[i][x_]
                        }
                    }
                    for (var x_ = 0; x_ < boardSize; x_++) {
                        board[boardSize - 1][x_] = emptyValue()
                    }
                }
                break
            }
        }
    }
}
export default checkFilledLines