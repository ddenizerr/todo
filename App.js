import React, {useState, useEffect, useRef} from 'react';
import {
  Alert,
  Animated,
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
import LottieView from 'lottie-react-native';

export default function App() {

  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([]);

  const [showEmptyText, setShowEmptyText] = useState(false);


  const fadeAnim = useRef( new Animated.Value(0)).current;

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  useEffect(() => {
    if (taskItems.length === 0) {
      // Reset in case it's not the first time
      setShowEmptyText(false);
      fadeAnim.setValue(0); 

      const timer = setTimeout(() => {
       
      setShowEmptyText(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,         // duration of fade-in
        delay: 500,            // delay before it starts
        useNativeDriver: true,
      }).start();

      }, 300); //timeout to wait for rerender

      return () => clearTimeout(timer);
    } else{
      fadeAnim.setValue(0);
      setShowEmptyText(false);
    }
  }, [taskItems.length]);
  

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

        

        {/* Main Body Wrapper */}
        <View style={styles.taskWrapper}>
          
          {/* Todays Tasks Header */}
          <Text style={styles.sectionTitle}>
            Today's Tasks
          </Text>

          {/* Todays Tasks Header ENDS */}

         

    
         

          {/* Displaying Tasks */}
          <View style={styles.items}>
            {taskItems.length > 0 ? (
              taskItems.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                
                <LottieView
                  source={require('./assets/animations/empty_list_cat.json')}
                  autoPlay
                  loop
                  speed={0.5}
                  style={styles.catAnimation}
                />
                <View>

                  {showEmptyText && (
                    <Animated.Text style={[styles.emptyText, {opacity: fadeAnim}]}> 
                     Nothing here yet... 🐾
                    </Animated.Text>
                    
                  )}
                  
                  {showEmptyText && (
                    <Animated.Text style={[styles.subtleHint, {opacity:fadeAnim}]}>
                    Tap the + below to create your first task 📝
                   </Animated.Text>
                  )}

                </View>
              </View>
            )}
          </View>
        </View>

        {/* Displaying Tasks End */}

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

          {/* Create a new todo list END */}    

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
    fontWeight: 'bold',
    color: '#fff'

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
  },
  emptyContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1, // let it expand
    marginTop: 40,// push it up a bit above input
  },

  catAnimation:{
    width:250,
    height:250,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#ffffff',
    opacity: 0.8,
  },
  
  subtleHint: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4
  }
  
  

});
