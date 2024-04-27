import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginSignupComponents = (props) => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const handleGoToLogin = () => {
    navigation.navigate('loginScreen')
  }
  return (
    <View>
      
      <TouchableOpacity onPress={handleGoToLogin}>
      <TouchableOpacity
      onPress={handleGoToLogin}
  activeOpacity={1}
  style={{
    width: screenWidth * 0.81,
    height: 60,
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
</TouchableOpacity>

        <View onPress={handleGoToLogin} activeOpacity={1} style={{
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
            <Text style={{fontSize:20,fontWeight:'bold',color:'#000',overflow:'hidden',fontFamily:'Inter-Bold'}}>{props.textName}</Text>
        </View>
          <TextInput placeholder={props.placeholder} placeholderTextColor={'#000'} secureTextEntry={props.sec} maxLength={props.maxLength} style={{fontSize:16,width:'65%',paddingLeft:10,fontFamily:'Inter-Regular'}}/>
        </View>
        </TouchableOpacity>

    </View>
  );
};

export default LoginSignupComponents;
