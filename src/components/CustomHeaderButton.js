import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";

import { useTheme } from '@react-navigation/native';

const CustomHeaderButton = (props) => {
    const Colors = useTheme().colors;
    return <HeaderButton {...props} iconSize={30} color={Colors.fontColor} />
};

export default CustomHeaderButton;