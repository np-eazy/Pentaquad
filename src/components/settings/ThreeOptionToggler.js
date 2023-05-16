import React, { useEffect, useState } from "react";
import { containerStyle, settingButtonStyle, verticalCenterStyle } from "../Styles";
import { ThreeOptionDisplay } from "./ThreeOptionDisplay";
import { FILLED_COLOR, MARKER_COLOR } from "../../graphics/theme/ColorScheme";
import { linInt } from "../../graphics/utils/Functions";
import { copy } from "../../graphics/utils/Colors";
import { REFRESH_MS } from "../../game/rules/Constants";

export const labelStyle = {
    color: FILLED_COLOR.getHex(),
}

export const ThreeOptionToggler = (props) => {
    const [borderColor, setBorderColor] = new useState(copy(FILLED_COLOR));
    const [hover, setHover] = new useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setBorderColor(borderColor.interpolateTo(hover ? FILLED_COLOR : MARKER_COLOR, 0.2, linInt))
        }, REFRESH_MS);
        return () => clearInterval(interval);
      }, [hover]);

    const blocked = props.blocked ? true : false;

    return (<div style={{...containerStyle, ...settingButtonStyle, borderColor: borderColor.getHex(), borderWidth: "1px", borderStyle: "solid",}} 
    onMouseEnter={(e) => setHover(true)}
    onMouseLeave={(e) => setHover(false)}
    onMouseDown={(e) => props.blocked ? null : props.clickHandler()}>
        <div style={{...verticalCenterStyle, left:"20px"}}>
            {props.name}:
        </div>
        <div style={{...verticalCenterStyle, right:"20px", textAlign:"right", minWidth:"150px", opacity: blocked ? 0.25 : 1}}>
            <div style={{...labelStyle, float: "left"}}>{props.labels[props.getSetting]}</div>
            <ThreeOptionDisplay style={{float: "right"}} level={props.getSetting + 1} maxLevel={3} />
        </div>
    </div>);
}
