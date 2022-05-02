import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";

import Colors from "../constnats/Colors";

const CustomHeaderButton = (props) => {
    return <HeaderButton {...props} iconSize={30} color={Colors.fontColor} />
};

export default CustomHeaderButton;