import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Task from "./components/Task";

export default function App() {
    const [task, setTask] = useState();
    /* this creates a state for a component. works for react and react-native
    'task' is the name of the state to track the task. 
    'setTask' is the function used to set the state

    this is great because instead of creating a new variable for each new task that the user will input,
    it will be stored as an argument of the function and all the tasks will then be stored in an array (cf. below)
    */

    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        // Keyboard.dismiss(); // check this because it doesn't work
        // console.log(task); //this will just 'print' the task stored in the state
        setTaskItems([...taskItems, task]); //evth that was there alr and append new task to it
        setTask(null); //empties the text box for new inputs
    };

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1); //removes 1 item from the array and stores the result back in itemsCopy
        setTaskItems(itemsCopy); //set taskItems back to itemsCopy to remove the one just deleted
    };

    return (
        <View style={styles.container}>
            {/* Today's tasks*/}
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>Today's tasks</Text>
                <View style={styles.items}>
                    {/*This is where the tasks will go */}
                    {taskItems.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => completeTask()}
                            ></TouchableOpacity>
                        );
                    })}
                    {/*<Task text={"Task 1"} />
                    <Task text={"Task 2"} />*/}
                </View>
            </View>

            {/* Write a task */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput
                    style={styles.input}
                    placeholder={"Write a task"}
                    value={task} //to see the changes in real time
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED", //normally we put this in the assets folder
    },

    taskWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: "absolute",
        bottom: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: 250,
        backgroundColor: "white",
        borderRadius: 60,
        borderColor: "#C0C0C0",
        borderWidth: 1,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "white",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C0C0C0",
        borderWidth: 1,
    },
    addText: {},
});
