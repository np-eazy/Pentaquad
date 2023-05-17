import React from "react";
import Game from "../components/Game";
import { EMPTY_COLOR } from "../graphics/theme/ColorScheme";
import { TOTAL_WIDTH } from "../graphics/theme/Layout";
import { Footer } from "./Footer";
import { Header } from "./Header";

const bodyStyle = {
  backgroundColor: EMPTY_COLOR.getHex(),
  height: "2000px",
};

const gameWrapper = {
  position: "relative",
};

export const Page = (props) => {
  return (
    <body style={bodyStyle}>
      <div style={gameWrapper}>
        <Header style={{ clear: "both" }} />
      </div>
      <div style={gameWrapper}>
        <div
          id="gameWrapper"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: -TOTAL_WIDTH / 2,
            marginTop: 100,
          }}
        >
          <Game style={{ border: 0 }} />
        </div>
      </div>

      <div style={gameWrapper}>
        <Footer style={{ clear: "both" }} />
      </div>
    </body>
  );
};
