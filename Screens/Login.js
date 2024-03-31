import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'; // Import Firebase Auth


const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage,setErrorMessage] = useState('Enter your credentials');
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErrorMessage('Please fill in both email and password');
        return;
      }
      await auth().signInWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
      // Replace the current screen with the mainScreen
      navigation.replace('mainScreen');
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
        setErrorMessage('Invalid email');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('Invalid password');
      } else {
        setErrorMessage('Invalid Email or Password');
      }
    }
  };
  
  

  const handleSignUp = () => {
    navigation.navigate('signUpScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcome to Notely. Please sign in.</Text>
      <Text style={{color:'red'}}>{errorMessage}</Text>
      {!isLoggedIn && (
        <>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholderTextColor={"#DEDEDE"}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholderTextColor={"#DEDEDE"}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.signInLink} onPress={handleSignUp}>
              Sign Up
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1e1e1e', // Background color set to #1e1e1e
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DEDEDE',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#DEDEDE', // Font color set to #DEDEDE
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#555', // Darker border color for contrast
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#dedede', // Text color set to #dedede
    backgroundColor: '#333', // Input background color set to #333 for contrast
  },
  successMessage: {
    fontSize: 16,
    color: '#3bb143', // Success message color set to green
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%', // Set the width to 80% of the parent container
  },
  loginButton: {
    backgroundColor: '#DEDEDE', // Button background color set to a light blue shade
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color:'#1e1e1e',
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#3ca4ff', // Sign-up text color set to a light blue shade
    marginTop: 10,
    textDecorationLine: 'underline', // Underline the sign-up text
  },
  footerText: {
    marginTop: 20,
    color: '#dedede', // Text color set to #dedede
  },
  signInLink: {
    color: '#3ca4ff', // Link color set to a light blue shade
    fontWeight: 'bold', // Make the link text bold
  },
  error: {
    color: '#ff3d3d', // Error message color set to a red shade
    marginBottom: 10,
    textAlign: 'center', // Center the error message text
  },
});

export default Login;
