import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import loginIcon from '../Images/loginIcon.png';
import leftArrowPng from '../Images/leftArrowPng.png'

const LoginRegScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const handleGoToLogin = () => {
    navigation.navigate('loginScreen')
  }
  const handleGoToSignup = () => {
    navigation.navigate('signUpScreen')
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Image source={loginIcon} />
      <View style={{gap:20,}}>
      <TouchableOpacity onPress={handleGoToLogin}>
      <View
      onPress={handleGoToLogin}
  activeOpacity={1}
  style={{
    width: screenWidth * 0.81,
    height: 69,
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
  }}>
</View>

        <View onPress={handleGoToLogin} activeOpacity={1} style={{
        width: screenWidth*0.80,
        height: 65,
        borderWidth:2,
        justifyContent: 'space-between',
        paddingHorizontal:25,
        alignItems: 'center',
        position: 'relative',
        zIndex:1,
        flexDirection:'row',
      }}>
          <Text style={{fontSize:20,fontWeight:900,color:'#000'}}>Login</Text>
          <Image source={leftArrowPng}style={{ transform: [{ rotate: '180deg' }] }} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoToSignup}>
      <View
  activeOpacity={1}
  onPress={handleGoToSignup}
  style={{
    width: screenWidth * 0.81,
    height: 69,
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
  }}>
</View>

        <View activeOpacity={1}
        onPress={handleGoToSignup}
         style={{
        width: screenWidth*0.80,
        height: 65,
        borderWidth:2,
        justifyContent: 'space-between',
        paddingHorizontal:25,
        alignItems: 'center',
        position: 'relative',
        zIndex:1,
        flexDirection:'row',
        backgroundColor:'#C8A0FB'
      }}>
          <Text style={{fontSize:20,fontWeight:900,color:'#000'}}>Register</Text>
          <Image source={leftArrowPng} style={{ transform: [{ rotate: '180deg' }] }} />
        </View>
        </TouchableOpacity>
        </View>
    </View>
  );
};

export default LoginRegScreen;
