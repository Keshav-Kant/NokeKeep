import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import SettingsComponents from '../components/SettingsComponents';
import { useNavigation, CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SettingsScreen = () => {

  const navigation = useNavigation();
  const handleGoToLogRegScreen = () => {
    navigation.navigate('mainScreen')
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'loginScreen' }],
        })
      );
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };
  return (
    <View style={{gap: 20, flex: 1, alignItems: 'center', paddingVertical: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <TouchableOpacity onPress={handleGoToLogRegScreen}>
          <Image
            source={require('../Images/leftArrowPng.png')}
            style={{
              alignItems: 'center',
              height: 25,
              width: 25,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'right',
            fontSize: 18,
            fontWeight: 700,
            color: '#000',
            alignItems: 'center',
          }}>
          Settings
        </Text>
        <View></View>
      </View>

      <SettingsComponents
        text="Profile"
        ImagePath={require('../Images/profileIcon.png')}
      />
      <SettingsComponents
        text="Change Font"
        ImagePath={require('../Images/changeFontIcon.png')}
      />
      <SettingsComponents
        text="Themes"
        ImagePath={require('../Images/themeIcon.png')}
      />
      <SettingsComponents
        text="Subscription"
        ImagePath={require('../Images/subscriptionIcon.png')}
      />
      <TouchableOpacity onPress={handleLogout}>
        <SettingsComponents
          text="Log out"
          ImagePath={require('../Images/logOutIcon.png')}
          bgColor="#C8A0FB"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
