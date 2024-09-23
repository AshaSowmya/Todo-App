import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './src/Todo';
import ApiIntegrate from './src/ApiIntegrate';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Todo">
        <Stack.Screen name="Todo" component={TodoList} />
        <Stack.Screen name="Api" component={ApiIntegrate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

