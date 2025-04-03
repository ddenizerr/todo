import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
  Touchable,
  TouchableOpacity
} from 'react-native';

import Task from './components/Task';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text> To Do List </Text>
      <StatusBar style="auto" /> */}

      {/* Todays Tasks */}

      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>
          Today's Tasks
        </Text>

        <View style={styles.items}>
          {/* this is where the tasks will go! */}
          <Task text={'Task 1'}></Task>
          <Task text={'Task 2'}></Task>

        </View>

      
        

      </View>
        {/* Create a new todo list */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>
          
          <TextInput style={styles.input} placeholder={'Create a new todo'}/>
          
          <TouchableOpacity>
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
    backgroundColor: '#82D58E',

  },

  taskWrapper: {

    paddingTop: 80,
    paddingHorizontal: 20,

  },

  sectionTitle: {

    fontSize: 24,
    fontWeight: 'bold'

  },

  items: {

    marginTop: 30,

  },

  writeTaskWrapper:{

    position: 'absolute',
    bottom: 60,
    padding: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,

  },

  input:{

    width: 270,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,

  },

  addWrapper:{

    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    padding: 15,

  },

  addText:{

    color: '#7AB583',

  }


});
