import { TOTAL_HEIGHT, TOTAL_WIDTH } from "./game/graphics/Layout";
import { FILLED_COLOR } from "./game/theme/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const overlayWrapperStyle = {
    position: "absolute", /* Sit on top of the page content */
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
    marginTop: "50px",
    marginBottom: "150px",
    color: "#ffffff",
    fontSize: "48px",
}

export const basicButtonStyle = {
    padding: "10px",
    margin: "auto",
    marginTop: "20px",
    width: "50%",

    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "5px",
    borderColor: FILLED_COLOR.getHex(),

    maxWidth: "150px",
    textAlign: "center",

    backgroundColor: "#000000",
    color: "#ffffff",
}

export const navButtonStyle = {
    maxWidth: "25px",
    maxHeight: "25px",
    
    padding: "10px",
    margin: "auto",
    marginBottom: "20px",
    marginRight: "20px",
    width: "50%",

    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: FILLED_COLOR.getHex(),

    textAlign: "center",

    backgroundColor: "#000000",
    color: FILLED_COLOR.getHex(),
    fontSize: "20px",
}