import { TOTAL_HEIGHT, TOTAL_WIDTH } from "../graphics/theme/Layout";
import {
  EMPTY_COLOR,
  FILLED_COLOR,
  MARKER_COLOR,
  WHITE,
} from "../graphics/theme/ColorScheme";

export const BORDER_CHANGE_RATE = 0.2;
export const BACKGROUND_CHANGE_RATE = 0.2;


export const mainStyle = {
  color: WHITE.getHex(),
  fontSize: "16px",
  textAlign: "center",
}

export const container = {
  position: "relative",
};

export const verticalCenterAlignment = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
};

export const centerAlignment = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
};

export const lowerRightAlignment = {
  position: "absolute",
  right: "0px",
  bottom: "0px",
}

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
};

export const titleStyle = {
  marginTop: "50px",
  marginBottom: "50px",

  textAlign: "center",
  color: WHITE.getHex(),
  fontSize: "48px",
};

export const buttonStyle = {
  maxWidth: "500px",
  minHeight: "30px",
  margin: "10px",
  padding: "10px",

  position: "relative",
  margin: "auto",
  width: "50%",
  marginTop: "20px",
  zIndex: "200",

  backgroundColor: MARKER_COLOR.getHex(),
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "5px",

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

export const entryWrapperStyle = {
  backgroundColor: EMPTY_COLOR.getHex(),
  borderRadius: "6px",
  fontSize: "16px",
  borderWidth: "0",
  textAlign: "center",
  padding: "3px",
}