import React from "react";
import { navButtonStyle } from "../Styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

const returnToMenuStyle = {
    ...navButtonStyle,
    position: "absolute",
    right: "0px",
    bottom: "0px",
}
export const ReturnToMenu = (props) => {
    return (<div style={returnToMenuStyle} onMouseDown={(e) => props.clickHandler()}>
        <FontAwesomeIcon icon={faUndo}/>
    </div>);
}