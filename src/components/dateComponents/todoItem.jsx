import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ROBOTO, ROBOTOBOLD, ROBOTOSERIF, ROBOTOSERIFBOLD } from '../../constants/fontPath';
import { CustomButton } from '../commonComponents/Button';
import { BLACK, GREEN, RED, WHITE } from '../../constants/color';

export const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.userId}>User ID: {todo.userId}</Text>
                    <Text style={[styles.title, todo.completed && styles.completed]}>{todo.title}</Text>
                    {todo.dueDate && <Text style={styles.dueDate}>Due: {todo.dueDate}</Text>}
                </View>
                <View style={{height: 20}} />
                <View style={styles.btnContainer}>
                    <CustomButton
                        text={todo.completed ? 'Undo' : 'Done'}
                        onPress={onToggle}
                        backgroundColor={todo.completed ? GREEN : RED}
                        fontFamily={ROBOTOSERIFBOLD}
                        color={WHITE}
                        width="40%"
                    />
                    <CustomButton
                        text="Delete"
                        onPress={onDelete}
                        backgroundColor={RED}
                        fontFamily={ROBOTOSERIFBOLD}
                        color={WHITE}
                        width="40%"
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: BLACK,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontFamily: ROBOTOSERIF,
    },
    completed: {
        textDecorationLine: 'line-through',
    },
    userId: {
        fontSize: 14,
        color: '#555',
        fontFamily: ROBOTOBOLD,
    },
    dueDate: {
        fontSize: 14,
        color: '#777',
        fontFamily: ROBOTO,
    }, btnContainer: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20
    }
});
