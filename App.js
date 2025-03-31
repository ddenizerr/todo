import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
        <Task text={'Task 1'}></Task>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82D58E',
  },
  taskWrapper:{
    paddingTop: 80,
    paddingHorizontal:20,
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  items:{
    marginTop: 30,
  },

});
