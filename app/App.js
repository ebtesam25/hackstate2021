import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login';
import Register from './src/screens/register';
import Home from './src/screens/home';
import Checkin from './src/screens/checkin';
import Splash from './src/screens/splash';



const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Splash" 
        component={Splash} 
        options={{ headerShown: false}} 
      />
        <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Register" 
        component={Register} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Checkin" 
        component={Checkin} 
        options={{ headerShown: false}} 
      />
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('app', () => App);
