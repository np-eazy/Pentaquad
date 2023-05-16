import React from "react";
import { Setting } from "../../game/control/ControlPanel";
import { containerStyle, settingButtonStyle, verticalCenterStyle } from "../Styles";
import { ThreeOptionDisplay } from "./ThreeOptionDisplay";
import { MAX_LEVELS } from "../../game/rules/Levels";
import { FILLED_COLOR } from "../../graphics/theme/ColorScheme";

export const labelStyle = {
    color: FILLED_COLOR.getHex(),
}

export const ThreeOptionToggler = (props) => {
    const level = props.initialSetting;
    return (<div style={{...containerStyle, ...settingButtonStyle}} onMouseDown={(e) => props.clickHandler()}>
        <div style={{...verticalCenterStyle, left:"20px"}}>
            {props.name}:
        </div>
        <div style={{...verticalCenterStyle, right:"20px", textAlign:"right", minWidth:"150px"}}>
            <div style={{...labelStyle, float: "left"}}>{props.labels[props.getSetting()]}</div>
            <ThreeOptionDisplay style={{float: "right"}} level={props.getSetting() + 1} maxLevel={3} />
        </div>
    </div>);
}