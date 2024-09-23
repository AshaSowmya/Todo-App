import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList,ScrollView, TouchableOpacity,KeyboardAvoidingView } from 'react-native';

export default function Todo({navigation}) {
  const [task, setTask] = useState('');
  const [allTasks, setAllTasks] = useState([]);

  //function for Adding tasks in todo list
  const addTask = () => {
    if (task.length === 0) return; 
    setAllTasks([...allTasks, { id: Date.now().toString(), name: task, completed: false }]);
    setTask(''); 
  };

  //function for mark the completed task, I used UI elements for marking the completed tasks
  const toggleCompleteTask = (taskId) => {
    setAllTasks(
      allTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //function for deleting the task
  const deleteTask = (taskId) => {
    setAllTasks(allTasks.filter(task => task.id !== taskId));
  };

  //function for rendering adding,deleting,completed(modified tasks) task in todo list
  const renderTask = ({ item }) => (
    
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleCompleteTask(item.id)} style={styles.taskTextContainer}>
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>
          {item.name}
        </Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={() => deleteTask(item.id)} color="#ff5c5c" />
    </View>
  );

  //actual rendering the list
  return (
    <KeyboardAvoidingView style={styles.parentContainer} behavior="padding">
 <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.headerPart}>To-Do List</Text>
      <View style={styles.buttonContainer}>
      <Button
        title="To view Api Integration Page"
        onPress={() => navigation.navigate('Api')}
      />
    </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter a task"
          value={task}
          onChangeText={(text) => setTask(text)}
          multiline={true} 
          numberOfLines={4}
        />
        <Button title="Add Task" onPress={addTask} style={{alignItems:'center'}} />
      
      </View>
      <FlatList
        data={allTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
      </ScrollView>
      </KeyboardAvoidingView>
    
  );
}

// styling for Todo app
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerPart: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginVertical: 10,  
    alignItems: 'center',  
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputBox: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    textAlignVertical: 'top',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items at the top for multiline text
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  taskTextContainer: {
    flex: 1, // Ensure text container takes up available space
  },
  
  taskText: {
    fontSize: 18,
    flexWrap: 'wrap',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'green',
  },
});
