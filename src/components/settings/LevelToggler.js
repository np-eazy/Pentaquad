import React from "react";
import { Setting } from "../../game/control/ControlPanel";

export const LevelToggler = (props) => {
    const level = props.initialSetting;

    return (<div onMouseDown={(e) => props.clickHandler()}>
        <div>{props.getSetting()}</div>
        <div>{props.name}</div>
    </div>);
}