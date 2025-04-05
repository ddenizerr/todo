import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTasks = async (tasks) => {

    try {

      await AsyncStorage.setItem('@taskItems', JSON.stringify(tasks));
      console.log('Saved to storage:', tasks); 

    } catch (e) {

      console.error('Saving error:', e);
    }

  }

  export const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem('@taskItems');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Loading error:', e);
      return [];
    }
  };

  export const clearStoredTasks = async () => {
    try {
      await AsyncStorage.removeItem('@taskItems');
      console.log('Removed all tasks from storage!');
    } catch (e) {
      console.error("Clear storage error: " + e);
      throw e;
    }
  };