import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, Modal, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MyStatusBar } from "../../components/commonComponents/MyStatusBar";
import { BLACK, WHITE, GREY, LIGHT_GREY, GREEN, RED } from "../../constants/color";
import { TodoItem } from "../../components/dateComponents/todoItem";
import { CustomButton } from "../../components/commonComponents/Button";
import { ROBOTOBOLD, ROBOTOREGULAR } from "../../constants/fontPath";
import { deleteTodo, setTodos, toggleTodo } from "../../redux/todoSlice";
import { MyLoader } from "../../components/commonComponents/MyLoader";
import { LOGO } from "../../constants/imagePath";
import { ToastMessage } from "../../components/commonComponents/ToastMessage";

export default MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { items, filter, sort } = useSelector((state) => state.todos);
    const [selectedUserId, setSelectedUserId] = useState(1); // Default to userId 1
    const [modalVisible, setModalVisible] = useState(false); // For showing/hiding the modal
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: "", type: "" });

    useEffect(() => {
        setLoading(true); // Show loader
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => {
                dispatch(setTodos(data)); // Set fetched data
                setLoading(false); // Hide loader on success
                setToast({visible: true, message: "Todos fetched successfully!", type: "success"})
            })
            .catch(() => {
                setLoading(false); // Hide loader on error
                setToast({visible: true, message: "Failed to fetch Todos!", type: "error"})
            });
    }, [dispatch]);

    const filteredTodos = items
        .filter((todo) => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'done') return todo.completed;
            return true;
        })
        .filter((todo) => todo.userId === selectedUserId); // Filter by userId

    const sortedTodos = filteredTodos.sort((a, b) => {
        if (sort === 'recent') return new Date(b.created_at) - new Date(a.created_at);
        return a.id - b.id;
    });

    const onPressNavigateAdd = () => {
        navigation.navigate("AddTodoScreen");
    };

    const toggleModal = () => {
        setLoading(true); // Show the loader

        setTimeout(() => {
            setModalVisible(!modalVisible); // Toggle the modal visibility
            setLoading(false); // Hide the loader after the modal toggle
        }, 1000); // Adjust the delay as needed (500ms is a good default)
    };

    return (
        <>
            <MyStatusBar backgroundColor={WHITE} barStyle={"dark-content"} />

            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <Image
                        source={LOGO}
                        style={styles.logoContainer}
                    />
                </View>
                {/* Button to open the modal */}
                <TouchableOpacity onPress={toggleModal} style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>Select User ID: {selectedUserId}</Text>
                </TouchableOpacity>

                {/* Modal to show the User ID selection */}
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={modalVisible}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>Select User ID</Text>
                            {[...Array(10).keys()].map(i => (
                                <TouchableOpacity
                                    key={i + 1}
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setSelectedUserId(i + 1);
                                        toggleModal(); // Close modal after selecting
                                    }}
                                >
                                    <Text style={styles.modalItemText}>User {i + 1}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>

                <View style={styles.btnContainer}>
                    <CustomButton
                        text="Add Todo"
                        backgroundColor={BLACK}
                        color={WHITE}
                        width="60%"
                        fontFamily={ROBOTOBOLD}
                        onPress={onPressNavigateAdd}
                        style={styles.addButton}
                    />
                </View>

                <View style={{ height: 20 }} />

                {sortedTodos.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No Todos Available</Text>
                    </View>
                ) : (
                    <FlatList
                        data={sortedTodos}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <TodoItem
                                todo={item}
                                onToggle={() => dispatch(toggleTodo(item.id))}
                                onDelete={() => dispatch(deleteTodo(item.id))}
                                style={styles.todoItem}
                            />
                        )}
                    />
                )}
            </View>
            {/* Loader Component */}
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
        backgroundColor: WHITE,
        padding: 16,
    },
    addButton: {
        alignSelf: "center",
        marginVertical: 16,
        borderRadius: 8,
        shadowColor: BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    list: {
        paddingBottom: 16,
    },
    todoItem: {
        marginBottom: 12,
        backgroundColor: LIGHT_GREY,
        borderRadius: 8,
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontFamily: ROBOTOREGULAR,
        fontSize: 18,
        color: GREY,
    },
    selectButton: {
        backgroundColor: LIGHT_GREY,
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: "center",
    },
    selectButtonText: {
        fontFamily: ROBOTOREGULAR,
        fontSize: 16,
        color: GREY,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background for modal
    },
    modalContent: {
        backgroundColor: WHITE,
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    modalHeader: {
        fontSize: 18,
        fontFamily: ROBOTOREGULAR,
        marginBottom: 10,
        textAlign: "center",
    },
    modalItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: LIGHT_GREY,
        borderRadius: 8,
    },
    modalItemText: {
        fontFamily: ROBOTOREGULAR,
        fontSize: 16,
        color: GREY,
    },
    btnContainer: {
        alignItems: 'center'
    },
    logoContainer: {
        height: 70,
        width: 70,
        elevation: 5,
        borderRadius: 10
    },
    containerImg: {
        alignItems: "center"
    }
});