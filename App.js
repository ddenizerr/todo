import styles from './assets/styles/AppStyles';
import { saveTasks, loadTasks, clearStoredTasks } from './utils/storage';
import React, { useState, useEffect, useRef } from 'react';

import {
  Animated,
  LayoutAnimation,
  UIManager,
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import InputBar from './components/InputBar';
import ClearAllButton from './components/CleanAllButton';
import EmptyState from './components/EmptyState';
import Task from './components/Task';
import { LogBox } from 'react-native';

if (__DEV__ === false) {
  // This hides all yellow box warnings and red screens in production
  LogBox.ignoreAllLogs(true);

  // Optionally override console methods:
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

console.log('DEV MODE?', __DEV__);

export default function App() {

  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([]);

  const [showEmptyText, setShowEmptyText] = useState(false);


  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    } else {
      fadeAnim.setValue(0);
      setShowEmptyText(false);
    }
  }, [taskItems.length]);


  useEffect(() => {
    const fetchTasks = async () => {

      const tasks = await loadTasks();
      setTaskItems(Array.isArray(tasks) ? tasks : []);
    };

    fetchTasks();

    //second argument with empty array means => run this code only once, right after the component mounts.
  }, []);

  const handleAddTask = () => {
    if (!task?.trim()) return;

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
    itemsCopy.splice(index, 1);

    setTaskItems(itemsCopy);
    saveTasks(itemsCopy);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);


  }

  const clearTasks = async () => {

    try {

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      //clear from STORAGE ONLY
      await clearStoredTasks();

      //clear from the STATE
      setTaskItems([]);

      console.log('Removed all tasks from screen!');

    } catch (e) {
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

          {taskItems.length > 0 && (
            <ClearAllButton clearTasks={clearTasks} />
          )}


          <View style={styles.items}>
            {taskItems.length === 0 ? (
              <EmptyState fadeAnim={fadeAnim} showEmptyText={showEmptyText} />
            ) : (
              taskItems.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              ))
            )
            }

          </View>
        </View>

        <InputBar task={task} setTask={setTask} handleAddTask={handleAddTask} />

      </View>
    </TouchableWithoutFeedback>
  );

}