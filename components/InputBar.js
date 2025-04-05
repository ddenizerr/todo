import React from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import styles from "../assets/styles/AppStyles";

const InputBar = ({ task, setTask, handleAddTask}) => (

    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.writeTaskWrapper}
    >
        <TextInput
        style={styles.input}
        placeholder={'Create a new todo'}
        value={task}
        onChangeText={text => setTask(text)}
        />

    <TouchableOpacity onPress={handleAddTask}>
      <View style={styles.addWrapper}>
        <Text style={styles.addText}>+</Text>
      </View>
    </TouchableOpacity>
  </KeyboardAvoidingView>

);

export default InputBar;