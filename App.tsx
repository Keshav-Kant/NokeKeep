import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainScreen from './Screens/MainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NewNoteScreen from './Screens/NewNoteScreen';
import Login from './Screens/Login';
import SignUpScreen from './Screens/SignUpScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import LoginRegScreen from './Screens/LoginRegScreen';
import auth from '@react-native-firebase/auth';
import SettingsScreen from './Screens/SettingsScreen';

const Stack = createStackNavigator();
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "mainScreen" : "welcome"}>
        <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="logRegScreen" component={LoginRegScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="loginScreen" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="signUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="mainScreen" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="NewNote" component={NewNoteScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="settingScreen" component={SettingsScreen} options={{ headerShown: false }}/>
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
