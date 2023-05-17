import React, { useState } from "react";
import { MouseInteraction } from "../MouseInteraction";
import { buttonStyle, container, verticalCenterAlignment } from "../BaseStyles";
import { FILLED_COLOR } from "../../graphics/theme/ColorScheme";

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
}

// A component that allows the user to change keybindings
export const Keybinding = (props) => {
  const [keyname, setKeyname] = new useState(String.fromCharCode(props.settingsController.keybindings.get(props.action)));

  const changeHandler = (e) => {
    var val = e.target.value;
    var c = capsLock(val[val.length - 1])
    if (c) {
        if (props.settingsController && props.settingsController.validateKeybindings(props.action, c.charCodeAt(0)) == true) {
            setKeyname(c);
            props.settingsController.setKeybinding(props.action, c.charCodeAt(0))
        }
    }
  }
  return (
    <div>
      <MouseInteraction
        clickHandler={() => {}}
        style={{ ...container, ...buttonStyle }}
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
              onChange={e => changeHandler(e)}
              size={10}
              style={{ ...labelStyle }}
            />
          </div>
        </div>
      </MouseInteraction>
    </div>
  );
};
