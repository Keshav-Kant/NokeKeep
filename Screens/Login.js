import { View, Text, TouchableOpacity, Image, Dimensions, TextInput, ToastAndroid, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Login = () => {
    const screenWidth = Dimensions.get('window').width;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const handleGoToLogRegScreen = () => {
        navigation.navigate('logRegScreen');
    };
    
      const showToastWithGravity = (errorMessage) => {
        ToastAndroid.showWithGravity(
          errorMessage,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      };
    
      

    const handleLogin = () => {
        if(!email){
            showToastWithGravity('Enter you email correctly')
            return
        }
        if(!password){
            showToastWithGravity('Enter you password')
            return
        }
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    showToastWithGravity('User logged in successfully')
                    navigation.replace('mainScreen');
                } else {
                    showToastWithGravity('Please verify your email before logging in.')
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                let toastMessage = '';
            
                switch (errorCode) {
                    case 'auth/invalid-email':
                        showToastWithGravity('Invalid email address');
                        toastMessage = 'Invalid email address';
                        break;
                    case 'auth/user-disabled':
                        showToastWithGravity('Your account has been disabled');
                        break;
                    case 'auth/user-not-found':
                        showToastWithGravity('User not found');
                        break;
                    case 'auth/wrong-password':
                        showToastWithGravity('Incorrect password');
                        break;
                    case 'auth/invalid-credential':
                        showToastWithGravity('Invalid email or password');
                        break;
                    // Add more cases for other error codes as needed
                    default:
                        showToastWithGravity('Something went wrong');
                        
                        break;
                }
            
                setErrorMessage(errorMessage);

            });
            
    };

    return (
        <View style={{ height: '100%', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, width: '100%' }}>
            <View onPress={handleGoToLogRegScreen} style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%',alignItems:'center' }}>
                <TouchableOpacity onPress={handleGoToLogRegScreen}>
                    <Image source={require('../Images/leftArrowPng.png')} style={{ alignItems: 'center',height:25,width:25,resizeMode:'contain' }} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'right', fontSize: 18, fontWeight: 700, color: '#000', alignItems: 'center' }}>Login</Text>
                <View></View>
            </View>

            <View>
      
      
    </View>
            <View style={{ gap: 25, justifyContent: 'center', flex: 1 }}>
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
                                borderTopRightRadius: 10,
                                borderTopColor: 'white',
                                borderLeftColor: 'white',
                                overflow: 'hidden'
                            }}>
                        </View>
                        <View activeOpacity={1} style={{
                            width: screenWidth * 0.80,
                            height: 55,
                            borderWidth: 2,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 1,
                            flexDirection: 'row',
                        }}>
                            <View style={{ borderRightWidth: 2, height: '100%', justifyContent: 'center', width: 100 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', overflow: 'hidden', fontFamily: 'Inter-Bold' }}>Email</Text>
                            </View>
                            <TextInput onChangeText={setEmail} placeholder={'e.g. john@gmail.com'} placeholderTextColor={'#0007'} secureTextEntry={false} style={{ fontSize: 14, width: '65%', paddingLeft: 10, fontFamily: 'Inter-Regular',color:'#000' }} />
                        </View>
                    </View>
                </View>

                {/*Password*/}
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
                                borderTopRightRadius: 10,
                                borderTopColor: 'white',
                                borderLeftColor: 'white',
                                overflow: 'hidden'
                            }}>
                        </View>
                        <View activeOpacity={1} style={{
                            width: screenWidth * 0.80,
                            height: 55,
                            borderWidth: 2,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 1,
                            flexDirection: 'row',
                        }}>
                            <View style={{ borderRightWidth: 2, height: '100%', justifyContent: 'center', width: 100 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', overflow: 'hidden', fontFamily: 'Inter-Bold' }}>Password</Text>
                            </View>
                            <TextInput onChangeText={setPassword} placeholder={'e.g. john@123'} placeholderTextColor={'#0007'} secureTextEntry={true} style={{ fontSize: 14, width: '65%', paddingLeft: 10, fontFamily: 'Inter-Regular',color:'#000' }} />
                        </View>
                    </View>
                </View>
                
            </View>
            <TouchableOpacity activeOpacity={1} onPress={handleLogin} style={{
                borderTopColor: '#000',
                borderTopWidth: 1.5,
                paddingVertical: 15,
                width: '100%',
                overflow: 'hidden',
            }}>
                <Text style={{ textAlign: 'center', fontSize: 20, color: '#000000' }}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;
