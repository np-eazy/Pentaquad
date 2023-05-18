import React from "react";
import pkg from "../../package.json";
import { EMPTY_COLOR, FILLED_COLOR } from "../graphics/theme/ColorScheme";
import { TOTAL_HEIGHT } from "../graphics/theme/Layout";

const footerStyle = {
  minWidth: 1000,
  minHeight: 1000,

  position: "relative",
  top: TOTAL_HEIGHT + 200,
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

export const Footer = (props) => {
  return (
    <div style={footerStyle}>
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
