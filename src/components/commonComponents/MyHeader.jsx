import React, { useState, useRef, useEffect } from "react";
import {
    Animated,
    Image,
    Pressable,
    StyleSheet,
    TextInput,
    View,
    Text,
} from "react-native";
import { BLACK, GREY, WHITE, BRANDCOLOR } from "../../constant/color";
import { BACK, SEARCH, PROFILE, COINS, LOGO } from "../../constant/imagePath";
import { COMICSBOLD } from "../../constant/fontPath";
import { BASE_URL } from "../../constant/url";
import { GETNETWORK } from "../../utils/Network";

export const MyHeader = ({
    backgroundColor = WHITE,
    height = 80,
    midText = "",
    leftHeaderBtn = true,
    leftHeaderBtnPress = () => {
        // console.log("Left Header button is pressed");
    },
    rightHeaderBtn = false,
    rightHeaderBtnPress = () => {
        // console.log("Right Header Button is Pressed");
    },
    profileImgSource = PROFILE,
    searchBtnPress = () => {
        // console.log("Search button pressed");
    },
    showSearchIcon = true,
    showLogo = true,
}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchBarWidth = useRef(new Animated.Value(0)).current;

    const handleSearchPress = () => {
        setIsSearchActive(true);
        Animated.timing(searchBarWidth, {
            toValue: 150, // Reduced width to make it smaller
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleBackPress = () => {
        Animated.timing(searchBarWidth, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            setIsSearchActive(false);
        });
    };

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (coins) {
                const url = `${BASE_URL}users/profile`
                GETNETWORK(url, true).then((result) => {
                    if (result?.statusCode == 200 && result?.data?.profile?.balance_coin) {
                        setCoins(result?.data?.profile?.balance_coin);
                    } else {
                        console.log('Error In the Profile', result?.message);
                    }
                }).catch((error) => {
                    console.error('Error in fetchProfileData:', error);
                })
            } else {
                console.log('User information is missing')
            }
        };

        fetchProfileData();
    }, []);

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: backgroundColor,
                height: height,
            }}
        >
            {/* Left Button Arrow or Logo */}
            <Pressable
                onPress={isSearchActive ? handleBackPress : leftHeaderBtnPress}
                style={styles.childContainer}
            >
                <Image
                    style={isSearchActive || !showLogo ? styles.backArrowImg : styles.logoImg}
                    source={isSearchActive || !showLogo ? BACK : LOGO} // Show back arrow or logo
                />
            </Pressable>

            {/* Middle Text or Search Bar */}
            <View style={styles.middleSection}>
                {isSearchActive ? (
                    <Animated.View style={[styles.searchBar, { width: searchBarWidth }]}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            placeholderTextColor={GREY}
                            autoFocus
                        />
                    </Animated.View>
                ) : (
                    <View style={styles.midTxtContainer}>
                        <Text allowFontScaling={false} style={styles.midTxt}>{midText}</Text>
                    </View>
                )}
            </View>

            {/* Right Search Icon */}
            {showSearchIcon && !isSearchActive && (
                <Pressable onPress={handleSearchPress} style={styles.searchIconContainer}>
                    <Image style={styles.searchIcon} source={SEARCH} />
                </Pressable>
            )}

            {/* Right Profile Section */}
            {rightHeaderBtn && (
                <Pressable
                    onPress={rightHeaderBtnPress}
                    style={styles.rightSection}
                >
                    {/* Coin Section Wrapper */}
                    <View style={styles.coinSection}>
                        <Image style={styles.coinIcon} source={COINS} />
                        <Text allowFontScaling={false} style={styles.balanceText}>{coins}</Text>
                    </View>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 3,
        alignItems: "center",
    },
    childContainer: {
        flex: 1 / 6,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    backArrowImg: {
        height: 30,
        width: 30,
        resizeMode: "contain",
    },
    searchIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10, // Reduced margin for better alignment
    },
    searchIcon: {
        height: 25,
        width: 25,
    },
    middleSection: {
        flex: 3 / 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        marginLeft: 10, // Adjusted margin to align with other elements
    },
    searchBar: {
        height: 40,
        backgroundColor: WHITE,
        borderRadius: 20,
        paddingLeft: 15,
        justifyContent: "center",
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: BLACK,
        fontFamily: COMICSBOLD,
    },
    rightSection: {
        flex: 2 / 6,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 10,
        marginLeft: 5, // Reduced margin to fit the right section better
    },
    profileImg: {
        height: 40,
        width: 40,
        borderRadius: 20,
        resizeMode: "cover",
        marginRight: 10,
    },
    coinSection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: BRANDCOLOR,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 120,
    },
    coinIcon: {
        height: 25,
        width: 25,
        resizeMode: "contain",
        marginRight: 5, // Reduced margin for better spacing
    },
    balanceText: {
        fontSize: 16,
        color: WHITE,
        fontFamily: COMICSBOLD,
    },
    logoImg: {
        height: 60, // Reduced size for better alignment
        width: 60, // Reduced size for better alignment
        resizeMode: "contain",
    },
    midTxt: {
        color: BLACK,
        fontSize: 20,
        fontFamily: COMICSBOLD,
        textAlign: "center",
    },
    midTxtContainer: {
        minHeight: 30,
        justifyContent: "center",
        marginRight: 3,
        textAlign: "center"
    },
});