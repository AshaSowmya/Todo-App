import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoList from './src/Todo';
import ApiIntegrate from './src/ApiIntegrate';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Todo">
        <Tab.Screen name="Todo" component={TodoList} />
        <Tab.Screen name="Api" component={ApiIntegrate} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

