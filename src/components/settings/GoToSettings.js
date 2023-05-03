import React from "react";
import { navButtonStyle } from "../MenuUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const goToSettingsStyle = {
    ...navButtonStyle,
    position: "absolute",
    right: "0px",
    bottom: "0px",
}
export const GoToSettings = (props) => {
    return (<div style={goToSettingsStyle} onMouseDown={(e) => props.clickHandler()}>
        <FontAwesomeIcon icon={faGear}/>
    </div>);
}