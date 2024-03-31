import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore

const CommonTouchable = ({onPress, children}) => (
  <TouchableOpacity style={styles.commonTouchable} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      // Reset error state
      setError(null);

      // Create user in Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = userCredential.user.uid;

      // Save user data to Firestore
      await firestore().collection('users').doc(uid).set({
        username: username,
        email: email,
      });
      await userCredential.user.sendEmailVerification();

      // Optionally, you can provide feedback to the user that the verification email has been sent
      Alert.alert('Verification Email Sent', 'Please check your email inbox to verify your account.');
  
      Alert.alert('User Created');

      // Navigate back to the sign-in screen
      navigation.navigate('loginScreen');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        onChangeText={setUsername}
        value={username}
        onFocus={() => setError(null)}
        placeholderTextColor={'#DEDEDE'}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        onFocus={() => setError(null)}
        placeholderTextColor={'#DEDEDE'}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        onFocus={() => setError(null)}
        placeholderTextColor={'#DEDEDE'}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate('loginScreen')}>
          Sign In
        </Text>
      </Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#dedede', // Text color set to #dedede
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
  commonTouchable: {
    width: '100%',
    backgroundColor: '#3ca4ff', // Button background color set to a light blue shade
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Button text color set to white
    fontWeight: 'bold',
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
});

export default SignUpScreen;
