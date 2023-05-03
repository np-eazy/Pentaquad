import { TOTAL_HEIGHT, TOTAL_WIDTH } from "./game/graphics/Layout";
import { FILLED_COLOR } from "./game/theme/Theme";

export const overlayWrapperStyle = {
    position: "fixed", /* Sit on top of the page content */
    width: TOTAL_WIDTH,
    height: TOTAL_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100, /* Specify a stack order in case you're using a different order for other elements */
}

export const titleStyle = {
    textAlign: "center",
    margin: "50px",
    color: "#ffffff",
    fontSize: "48px",
}

export const basicButtonStyle = {
    padding: "10px",
    margin: "10px",

    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: FILLED_COLOR.getHex(),

    maxWidth: "150px",
    textAlign: "center",

    backgroundColor: "#000000",
    color: "#ffffff",
}