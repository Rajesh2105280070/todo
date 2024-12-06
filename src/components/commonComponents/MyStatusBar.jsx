import React from "react";
import { StatusBar } from "react-native";


export const MyStatusBar = ({
    backgroundColor= {},
    barStyle= "dark-content"
}) =>{
    return(
        <>
        {/* Status Bar */}
        <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
        </>
    )
}