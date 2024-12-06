import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { MyStatusBar } from "../../components/commonComponents/MyStatusBar";
import { BLACK, WHITE } from "../../constants/color";
import { ROBOTOSERIFBOLD } from "../../constants/fontPath";
import { LOGO } from "../../constants/imagePath";

export default SplashScreen = ({navigation})=>{

    const logoScale = useRef(new Animated.Value(0)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const sloganOpacity = useRef(new Animated.Value(0)).current;
    const screenOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(logoScale, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(sloganOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                    // delay: 500
                }),
                Animated.delay(3000), // Hold the screen for 2 seconds before fading out
                Animated.timing(screenOpacity, {
                    toValue: 0, // Fade out the screen
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setTimeout(() => {

                    navigation.navigate("Main");
                });
            })
        ]);
    }, []);


    return(
        <>
            <MyStatusBar backgroundColor={WHITE} barStyle={"dark-content"} />

            {/* Conatiner */}
            <View style={styles.container}>

                {/* Child Conatiner */}
                <View style={styles.childConatiner}>

                    <Animated.View
                        style={[
                            styles.imgConatiner,
                            {
                                transform: [{ scale: logoScale }],
                                opacity: logoOpacity,
                            },
                        ]}
                    >
                        <Animated.Image style={styles.imgLogo} source={LOGO} />
                    </Animated.View>

                    <Animated.View style={[
                        styles.txtConatiner,
                        {
                            opacity: sloganOpacity
                        }]
                    }
                    >
                        <Text 
                        allowFontScaling={false}
                        style={
                            styles.sloganTxt
                        }
                        >
                            TODO List
                        </Text>
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.txtConatiner,
                            {
                                opacity: sloganOpacity
                            }]
                        }
                    >
                    </Animated.View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }, childConatiner: {
        flex: 1,
        backgroundColor: WHITE,
        justifyContent: "center",
        alignItems: 'center',
    }, imgLogo: {
        height: 300,
        width: 300,
        borderRadius: 30,
        elevation: 10
    }, imgConatiner: {
        backgroundColor: WHITE,
        elevation: 5,
        borderRadius: 100
    }, txtConatiner: {
        justifyContent: "center",
        alignItems: "center",
        height: "20%",
        width: 300
    }, sloganTxt: {
        color: BLACK,
        fontSize: 28,
        textAlign: "center",
        fontFamily: ROBOTOSERIFBOLD
    }
});