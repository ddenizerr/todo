import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../assets/styles/TaskStyles";

const Task = ({text}) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style={styles.itemText}>{text || ''}</Text>
            </View>
            <View style={styles.circular}> </View>
        </View>
    )

}

export default Task;