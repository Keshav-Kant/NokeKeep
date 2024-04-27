import { View, Text, TouchableOpacity, Image, Dimensions, TextInput,ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import LoginSignupComponents from '../components/LoginSignupComponents'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({ navigation }) => {
  
  const screenWidth = Dimensions.get('window').width;
  const handleGoToLogin = () => {
    navigation.navigate('loginScreen')
  }

  const handleGoToLogRegScreen = () => {
    navigation.navigate('logRegScreen')
  }

  const showToastWithGravity = (errorMessage) => {
    ToastAndroid.showWithGravity(
      errorMessage,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);


  const handleRegister = () => {
    // Reset any previous error messages
    setError(null);
  
    // Add validation logic here if necessary
    if(!username || !email || !password || !confirmPassword){
      showToastWithGravity('Please fill all the details');
      return
    }
    
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      showToastWithGravity("Passwords don't match");
      return;
    }
  
  
    // Create user account with email and password
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User created successfully
        const user = userCredential.user;
  
        // Send verification email
        user.sendEmailVerification()
          .then(() => {
            showToastWithGravity('Verification email sent');
            setUsername('');
            setEmail('');
    setPassword('');
    setConfirmPassword('');
          })
          .catch(error => {
            showToastWithGravity('Error sending verification email',);
          });
  
        // Save additional user data to Firestore
        firestore()
  .collection('users')
  .doc(user.uid) // Set the document ID to the user's UID
  .set({
    username: username,
    email: email,
    
  })
  .then(() => {
    showToastWithGravity('User registered successfully and data saved to Firestore!');
    // You can navigate to another screen or show a success message here
  })
  .catch(error => {
    showToastWithGravity('Error saving user data');
  });
      })
      .catch(error => {
        
        let errorMessage;
        switch (error.code) {
          case 'auth/email-already-in-use':
            showToastWithGravity('Email address is already in use.');
            break;
          case 'auth/invalid-email':
            showToastWithGravity('Invalid email address.');
            break;
          case 'auth/weak-password':
            showToastWithGravity('Password should be at least 6 characters.');
            break;
          default:
            showToastWithGravity('Registration failed. Please try again later.');
            break;
        }
        setError(errorMessage);
      });
  };

  
  return (
    <View style={{ height: '100%', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20,width:'100%' }}>
      <TouchableOpacity onPress={handleGoToLogRegScreen} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%',paddingHorizontal:25,alignItems:'center' }}>
        <Image source={require('../Images/leftArrowPng.png')} style={{ alignItems: 'center',height:25,width:25,resizeMode:'contain' }} />
        <Text style={{ textAlign: 'right', fontSize: 18, fontWeight: 'bold', color: '#000', alignItems: 'center' }}>Register</Text>
        <View></View>
      </TouchableOpacity>
      <View style={{ gap: 25, justifyContent: 'center', flex: 1, alignItems: 'flex-end' }}>
      
      {/* Username */}
      <View>
      
      <View  >
      <View
       
  activeOpacity={1}
  style={{
    width: screenWidth * 0.81,
    height: 59,
    position: 'absolute',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    overflow: 'hidden',
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10, // Adjust this value as needed for your desired pointy border effect
    borderTopColor: 'white',
    borderLeftColor: 'white',
    overflow:'hidden'
    
  }}>
</View>

        <View style={{
        width: screenWidth*0.80,
        height: 55,
        borderWidth:2,
        paddingHorizontal:10,
        alignItems: 'center',
        position: 'relative',
        zIndex:1,
        flexDirection:'row',
      }}>
        <View style={{borderRightWidth:2,height:'100%',justifyContent:'center',width:100}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'#000',overflow:'hidden',fontFamily:'Inter-Bold'}}>Username</Text>
        </View>
          <TextInput value={username} onChangeText={setUsername} placeholder='e.g. john Doe' placeholderTextColor={'#0007'} secureTextEntry={false} style={{fontSize:14,width:'65%',paddingLeft:10,fontFamily:'Inter-Regular',color:"#000"}} />
        </View>
        </View>

    </View>

 {/* Email */}
    <View>
      
      <View>
      <View
       
  activeOpacity={1}
  style={{
    width: screenWidth * 0.81,
    height: 59,
    position: 'absolute',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    overflow: 'hidden',
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10, // Adjust this value as needed for your desired pointy border effect
    borderTopColor: 'white',
    borderLeftColor: 'white',
    overflow:'hidden'
    
  }}>
</View>

        <View  style={{
        width: screenWidth*0.80,
        height: 55,
        borderWidth:2,
        paddingHorizontal:10,
        alignItems: 'center',
        position: 'relative',
        zIndex:1,
        flexDirection:'row',
      }}>
        <View style={{borderRightWidth:2,height:'100%',justifyContent:'center',width:100}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'#000',overflow:'hidden',fontFamily:'Inter-Bold'}}>Email</Text>
        </View>
          <TextInput value={email} onChangeText={setEmail} placeholder='e.g. john@gmail.com' placeholderTextColor={'#0007'} secureTextEntry={false}  style={{fontSize:14,width:'65%',paddingLeft:10,fontFamily:'Inter-Regular',color:"#000"}}/>
        </View>
        </View>

    </View>

 {/* Password */}

    <View>
      
      <View  >
      <View
       
  style={{
    width: screenWidth * 0.81,
    height: 59,
    position: 'absolute',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    overflow: 'hidden',
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10, // Adjust this value as needed for your desired pointy border effect
    borderTopColor: 'white',
    borderLeftColor: 'white',
    overflow:'hidden'
    
  }}>
</View>

        <View style={{
        width: screenWidth*0.80,
        height: 55,
        borderWidth:2,
        paddingHorizontal:10,
        alignItems: 'center',
        position: 'relative',
        zIndex:1,
        flexDirection:'row',
      }}>
        <View style={{borderRightWidth:2,height:'100%',justifyContent:'center',width:100}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'#000',overflow:'hidden',fontFamily:'Inter-Bold'}}>Password</Text>
        </View>
          <TextInput value={password} onChangeText={setPassword} placeholder='e.g. john123' placeholderTextColor={'#0007'} secureTextEntry={true} style={{fontSize:14,width:'65%',paddingLeft:10,fontFamily:'Inter-Regular',color:"#000"}}/>
        </View>
        </View>

    </View>

 {/* Confirm Password */}

        

 <View>
      
      <View  >
      <View
       
  style={{
    width: screenWidth * 0.81,
    height: 59,
    position: 'absolute',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    overflow: 'hidden',
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10, // Adjust this value as needed for your desired pointy border effect
    borderTopColor: 'white',
    borderLeftColor: 'white',
    overflow:'hidden'
    
  }}>
</View>

        <View style={{
        width: screenWidth*0.80,
        height: 55,
        borderWidth:2,
        paddingHorizontal:10,
        alignItems: 'center',
        position: 'relative',
        zIndex:1,
        flexDirection:'row',
      }}>
        <View style={{borderRightWidth:2,height:'100%',justifyContent:'center',width:100}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'#000',overflow:'hidden',fontFamily:'Inter-Bold'}}>Confirm</Text>
        </View>
          <TextInput value={confirmPassword}
        onChangeText={setConfirmPassword} placeholder='e.g. john123' placeholderTextColor={'#0007'} secureTextEntry={true} style={{fontSize:14,width:'65%',paddingLeft:10,fontFamily:'Inter-Regular',color:"#000"}}/>
        </View>
        </View>

    </View>

    
        
      </View>
      <TouchableOpacity onPress={handleRegister} activeOpacity={1} style={{
        borderTopColor: '#000',
        borderTopWidth: 1.5,
        paddingVertical: 15,
        width: '100%',
        overflow: 'hidden',
      }}>
        <Text style={{ textAlign: 'center', fontSize: 20, color: '#000' }}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUpScreen
