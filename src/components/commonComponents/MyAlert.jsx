import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View, Animated } from "react-native";
import { BLACK } from "../../constant/color";
import { COMICS, COMICSBOLD } from "../../constant/fontPath";
import { ROBOTOSERIF, ROBOTOSERIFBOLD } from "../../constants/fontPath";

export const MyAlert = ({
  visible = false,
  textRight = "Yes",
  textLeft = "Cancel",
  title = "",
  borderRadius = 10,
  message = "",
  showRightButton = true,
  showLeftButton = true,
  backgroundColor = "#2196F3", // Default color set
  color = "white", // Default text color set
  fontFamily = ROBOTOSERIFBOLD, // Default font family set
  fontSize = 16, // Default font size set
  onRequestClose = () => {
    console.log("Modal Closed");
  },
  onPressRight = () => {
    console.log("Modal Open");
  },
  onPressLeft = () => {
    console.log("Modal Closed");
  }
}) => {
  const [showModal, setShowModal] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [visible]);

  return (
    <>
      {showModal && (
        <Modal
          transparent={true}
          animationType="none"
          visible={showModal}
          onRequestClose={onRequestClose}
          statusBarTranslucent={true}
        >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
              <Text allowFontScaling={false} style={styles.title}>{title}</Text>
              <Text allowFontScaling={false} style={styles.message}>{message}</Text>

              <View style={styles.btnView}>
                {showLeftButton && (
                  <Pressable
                    style={[styles.button, { backgroundColor, borderRadius }]}
                    onPress={onPressLeft}
                  >
                    <Text
                    allowFontScaling={false}
                      style={[
                        styles.buttonText,
                        { color, fontFamily, fontSize },
                      ]}
                    >
                      {textLeft}
                    </Text>
                  </Pressable>
                )}

                {showRightButton && (
                  <Pressable
                    style={[styles.button, { backgroundColor, borderRadius }]}
                    onPress={onPressRight}
                  >
                    <Text
                    allowFontScaling={false}
                      style={[
                        styles.buttonText,
                        { color, fontFamily, fontSize },
                      ]}
                    >
                      {textRight}
                    </Text>
                  </Pressable>
                )}
              </View>
            </Animated.View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: BLACK,
    fontFamily: ROBOTOSERIFBOLD,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: "black",
    fontFamily: ROBOTOSERIF,
    textAlign: "center",
  },
  btnView: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between", // Use space-between for alignment
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
  },
  button: {
    padding: 10,
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});