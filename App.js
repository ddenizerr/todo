import React, {useState, useEffect} from 'react';
import {
  Alert,
  LayoutAnimation,
  UIManager,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([]);

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@taskItems');

        console.log('Loaded from storage:', storedTasks);

        if (storedTasks) {
          setTaskItems(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.error('Loading error:', e);
      }
    };
  
    loadTasks();
    //second argument with empty array => run this code only once, right after the component mounts.
  }, []);

  const handleAddTask = () => {
    if(!task?.trim()) return;

    //when clicked to input field, keyboard will come up
    Keyboard.dismiss();
    
    const updatedTasks = [...taskItems, task];

    setTaskItems(updatedTasks);
    saveTasks(updatedTasks);
    setTask(null);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  }

  const completeTask = (index) => {

    let itemsCopy = [...taskItems];
    
    //remove one item in the array and store in this copy array
    itemsCopy.splice(index,1);

    setTaskItems(itemsCopy);
    saveTasks(itemsCopy);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);


  }
  
  const saveTasks = async (tasks) => { 

    try{ 
      await AsyncStorage.setItem('@taskItems', JSON.stringify(tasks));
      console.log('Saved to storage:', tasks); // ✅ Debug log
    }catch(e){
      console.error('Saving error:', e);
    }
  }

  const clearTasks = async () => {

    try{
      
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      //Remove from the storage! 🗑️
      await AsyncStorage.removeItem('@taskItems');
      
      // 💡 Clearng the state too!
      setTaskItems([]);
      
      console.log('Removed all tasks!');

    }catch(e){
      console.error("Clear all tasks error: " + e);
    }

    


  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        {/* Todays Tasks */}

        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>
            Today's Tasks
          </Text>

        { taskItems.length > 0 && (
           <TouchableOpacity onPress={() => clearTasks()} style={styles.clearAllWrapper}>
           <Text> Clear all </Text> 
        </TouchableOpacity>)

        }
         

          <View style={styles.items}>
            {/* this is where the tasks will go! */}

            {
              taskItems.map((item, index) => {
                return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task style={styles.clearAllText} text={item} />
                </TouchableOpacity>)
              })
            }

          </View>
        </View>

          {/* Create a new todo list */}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}>
            
            <TextInput style={styles.input} placeholder={'Create a new todo'} value={task} onChangeText={ text => setTask(text)}/>
            
            <TouchableOpacity onPress={ () => handleAddTask()}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          
          </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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

  },
  clearAllWrapper:{
    paddingVertical: 8,
    paddingHorizontal:16,
    borderWidth:1,
    borderColor:'#7AB583',
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginTop: 10,

  },

  clearAllText:{
    color:'#7AB583',
    fontWeight: '500',
    fontSize: 14,
  }


});
