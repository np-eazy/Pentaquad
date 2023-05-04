import { TOTAL_HEIGHT, TOTAL_WIDTH } from "../graphics/theme/Layout";
import { EMPTY_COLOR, FILLED_COLOR, WHITE } from "../graphics/theme/ColorScheme";

export const overlayWrapperStyle = {
  width: TOTAL_WIDTH,
  height: TOTAL_HEIGHT,

  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 100,
};

export const overlayStyle = {
    minWidth: TOTAL_WIDTH,
    minHeight: TOTAL_HEIGHT,
    position: "absolute",
    zIndex: -1000,
    backgroundColor: EMPTY_COLOR.getHex(),
    opacity: 0.75,
}

export const titleStyle = {
  marginTop: "50px",
  marginBottom: "150px",

  textAlign: "center",
  color: WHITE.getHex(),
  fontSize: "48px",
};

export const menuButtonStyle = {
  maxWidth: "150px",
  padding: "10px",

  margin: "auto",
  width: "50%",
  marginTop: "20px",
  zIndex: "200",

  backgroundColor: EMPTY_COLOR.getHex(),
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "5px",
  borderColor: FILLED_COLOR.getHex(),

  textAlign: "center",
  color: WHITE.getHex(),
};

export const navButtonStyle = {
  maxWidth: "25px",
  maxHeight: "25px",
  padding: "10px",

  margin: "auto",
  width: "50%",
  marginBottom: "20px",
  marginRight: "20px",
  zIndex: "200",

  backgroundColor: EMPTY_COLOR.getHex(),
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "5px",
  borderColor: FILLED_COLOR.getHex(),

  textAlign: "center",
  color: FILLED_COLOR.getHex(),
  fontSize: "20px",
};
