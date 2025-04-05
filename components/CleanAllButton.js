import React from "react";
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from "../assets/styles/AppStyles";

const ClearAllButton = ({ clearTasks }) => (
    
    <TouchableOpacity onPress={clearTasks} style={styles.clearAllWrapper}>
      <Text style={styles.clearAllText}><Icon name="trash-2" size={18} color="#fff" /></Text>
    </TouchableOpacity>
    
  );

  export default ClearAllButton;