import React from "react";
import pkg from "../../package.json";
import { EMPTY_COLOR, FILLED_COLOR } from "../graphics/theme/ColorScheme";
import { TOTAL_HEIGHT } from "../graphics/theme/Layout";

const footerStyle = {
  minWidth: 1000,
  minHeight: 1000,

  position: "relative",
  top: TOTAL_HEIGHT + 120,
  textAlign: "center",
  marginTop: 0,
  color: FILLED_COLOR.getHex(),
  fontSize: 16,
};

const linkStyle = {
  paddingTop: "10px",
  paddingBottom: "10px",
  color: FILLED_COLOR.getHex(),
};

const DESCRIPTION_MSG = "Pentaquad is a Tetris-based game based on filling up squares rather than lines. Difficulty, graphics, and keybindings can be changed in the Settings on the lower right."

export const Footer = (props) => {
  return (
    <div style={footerStyle}>
      <div style={{marginBottom: 100}}>
        <p>
          {DESCRIPTION_MSG}
        </p>
      </div>
      <div style={linkStyle}>{"Beta release v" + pkg.version}</div>
      <div style={linkStyle}>
        <a
          style={{ color: FILLED_COLOR.getHex() }}
          href={"https://github.com/np-eazy/Pentaquad"}
        >
          https://github.com/np-eazy/Pentaquad
        </a>
      </div>
      <div style={linkStyle}>
        <a
          style={{ color: FILLED_COLOR.getHex() }}
          href={"https://joeyjzhu.com"}
        >
          https://joeyjzhu.com
        </a>
      </div>
    </div>
  );
};
