import React, { useEffect, useState } from "react";
import { MouseInteraction } from "../MouseInteraction";
import {
  buttonStyle,
  container,
  entryWrapperStyle,
  verticalCenterAlignment,
} from "../BaseStyles";
import {
  FILLED_COLOR,
  MARKER_COLOR,
} from "../../graphics/theme/ColorScheme";
import { BOARD_DIMENSIONS } from "../../graphics/theme/Layout";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt } from "../../graphics/utils/Functions";

const labelStyle = {
  color: FILLED_COLOR.getHex(),
};

const valueStyle = {
  right: "20px",
  textAlign: "right",
  minWidth: "150px",
};

// Resolves the difference between keycodes in text and normal keycode inputs
const capsLock = (c) => {
  var code = c.charCodeAt(0);
  return String.fromCharCode(code >= 97 && code < 123 ? code - 32 : code);
};

// A component that allows the user to change keybindings
export const Keybinding = (props) => {
  const [keyname, setKeyname] = new useState(
    String.fromCharCode(props.settingsController.keybindings.get(props.action))
  );

  useEffect(() => {
    // Update the document title using the browser API
    var c = String.fromCharCode(
      props.settingsController.keybindings.get(props.action)
    );
    setKeyname(c == " " ? "SPACE" : c);
  });

  const changeHandler = (e) => {
    var val = e.target.value;
    if (val.length > 0) {
      var c = capsLock(val[val.length - 1]);
      if (c) {
        if (
          props.settingsController &&
          props.settingsController.validateKeybindings(
            props.action,
            c.charCodeAt(0)
          ) == true
        ) {
          setKeyname(c);
          props.settingsController.setKeybinding(props.action, c.charCodeAt(0));
        }
      }
    }
  };

  // Spaces don't trigger the onChange hook so we need special logic for this one.
  const spacebarHandler = (e) => {
    if (e.keyCode == " ".charCodeAt(0)) {
      if (
        props.settingsController &&
        props.settingsController.validateKeybindings(props.action, e.keyCode) ==
          true
      ) {
        setKeyname("SPACE");
        props.settingsController.setKeybinding(props.action, e.keyCode);
      }
    }
  };

  return (
    <div>
      <MouseInteraction
        clickHandler={() => {}}
        style={{ ...container, ...buttonStyle, width: BOARD_DIMENSIONS / 2 }}
      >
        <div style={{ ...verticalCenterAlignment, float: "left" }}>
          {props.actionName}:
        </div>
        <div
          style={{
            ...verticalCenterAlignment,
            ...valueStyle,
          }}
        >
          <div style={{ ...labelStyle }}>
            <input
              type={"text"}
              value={keyname}
              onChange={(e) => changeHandler(e)}
              onKeyDown={(e) => spacebarHandler(e)}
              size={6}
              style={{
                ...labelStyle,
                ...entryWrapperStyle,
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: interpolateColor(
                  MARKER_COLOR,
                  FILLED_COLOR,
                  0.35,
                  linInt
                ).getHex(),
              }}
            />
          </div>
        </div>
      </MouseInteraction>
    </div>
  );
};
