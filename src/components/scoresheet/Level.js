import React from "react";
import { menuButtonStyle, scoresheetStyle } from "../Styles";

export const Level = (props) => {
    return (
        <div style={{...scoresheetStyle, textAlign: "left"}}>
            <div> 
                {"Level: " + props.scorekeeper.level.toString()}
            </div>
        </div>
    );
}