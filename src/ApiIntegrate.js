import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  
  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      // Fetch tasks from the API
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Show loading indicator for fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

    // Show no internet connection message if not connected
    if (!isConnected) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>No internet connection. Please check your connection and try again.</Text>
        </View>
      );
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks List</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

//styling for this page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tasks;
