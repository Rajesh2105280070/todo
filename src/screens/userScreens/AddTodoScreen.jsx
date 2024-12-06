import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { TextInputComponent } from "../../components/commonComponents/TextInputComponent";
import { BLACK, GREEN, RED, WHITE } from "../../constants/color";
import { CustomButton } from "../../components/commonComponents/Button";
import { ROBOTOBOLD } from "../../constants/fontPath";
import { LOGO, TODOIMG } from "../../constants/imagePath";
import { addTodo } from "../../redux/todoSlice";
import { MyLoader } from "../../components/commonComponents/MyLoader";
import { ToastMessage } from "../../components/commonComponents/ToastMessage";

export default AddTodoScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: "", type: "" });

    const handleAddTodo = async () => {
        if (title.trim()) {
            setLoading(true);
    
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        completed: false, // Default to incomplete
                        userId: 1, // Optional: Hardcode or make it dynamic as needed
                    }),
                });
    
                if (response.ok) {
                    const newTodo = await response.json();
                    // Dispatch the action to add the todo locally
                    dispatch(addTodo(newTodo));
                    setToast({ visible: true, message: "Todo Added Successfully!", type: "success" });
    
                    // Delay navigation to show the loader
                    setTimeout(() => {
                        setLoading(false);
                        navigation.goBack();
                    }, 1000);
                } else {
                    setToast({ visible: true, message: "Failed to add TODO", type: "error" });
                }
            } catch (error) {
                console.error(error.message);
                setLoading(false); // Stop the loader on error
                setToast({ visible: true, message: "Error adding todo. Please try again.", type: "error" });
            }
        } else {
            setToast({ visible: true, message: "Todo title cannot be empty.", type: "error" });
        }
    };

    return (
        <>
        <View style={styles.container}>

            <View style={{ height: 30 }} />

            <Image
                source={LOGO}
                style={styles.logoImg}
            />

            <View style={{ height: 30 }} />

            <TextInputComponent
                placeholder="Enter Todo Title"
                setInputdata={setTitle} // Updates the state
                inputdata={title}       // Binds the state to the input field
                borderColor={BLACK}
                width="80%"
                image={TODOIMG}
            />
            <View style={styles.btnContainer}>
                <CustomButton
                    text="Add"
                    onPress={handleAddTodo}
                    backgroundColor={BLACK}
                    color={WHITE}
                    fontFamily={ROBOTOBOLD}
                    width="80%"
                />
            </View>
        </View>
        <MyLoader visible={loading} />
        <ToastMessage
                visible={toast.visible}
                setVisible={setToast}
                message={toast.message}
                type={toast.type}
                bacgroundColor={toast.type === "success" ? GREEN : RED}
                textColor={WHITE}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',    // Center content horizontally
        padding: 16,
        backgroundColor: '#fff',
    },
    btnContainer: {
        marginTop: 20,           // Add space between TextInput and Button
        alignItems: 'center',    // Center the button
        width: '100%',           // Ensure button stays aligned
    },
    logoImg: {
        height: 200,
        width: 200
    }
});