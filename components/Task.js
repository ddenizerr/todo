import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const Task = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style ={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.circular}> </View>
        </View>
    )

}

const styles = StyleSheet.create({
    item:{
        backgroundColor:'#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        textShadowRadius: 15,

    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap:'wrap'
    },
    circular:{
        width:12,
        height:12,
        borderColor: '#82D58E',
        borderWidth:2,
        borderRadius:5,
  
    },
    itemText:{
        maxWidth: '80%',

    },
    square:{
      width:24,
      height:24,
      backgroundColor: '#82D58E',
      opacity: .4,
      borderRadius: 2,
      marginRight: 15
    },
  
  });
export default Task;