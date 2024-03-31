import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainScreen from './Screens/MainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddNewNote from './components/AddNewNote';
import NewNoteScreen from './Screens/NewNoteScreen';
import Login from './Screens/Login';
import SignUpScreen from './Screens/SignUpScreen';


const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loginScreen">
      <Stack.Screen name="loginScreen" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="signUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="mainScreen" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddNewNote" component={AddNewNote} options={{ headerShown: false }}/>
        <Stack.Screen name="NewNote" component={NewNoteScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
