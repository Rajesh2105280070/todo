import React from "react";
import { StyleSheet } from "react-native";
import { MyStatusBar } from "../../components/commonComponents/MyStatusBar";
import { WHITE } from "../../constants/color";

export default SplashScreen = ()=>{
    return(
        <>
            <MyStatusBar backgroundColor={WHITE} barStyle={"dark-content"} />
        </>
    )
}

const styles = StyleSheet.create({

});