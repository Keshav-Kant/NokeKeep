import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const WelcomeDetailsComponent = props => {
  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={{flex: 1, justifyContent: 'space-evenly'}}>
      <View style={{height: 0.6 * screenHeight, overflow: 'hidden'}}>
        <Image
          source={props.source}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            borderRadius: 50,
          }}
        />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'normal',
            color: 'rgb(0,0,0)',
            textAlign: 'center',
            fontFamily:'Inter-Regular',
          }}>
          {props.Text}
        </Text>
      </View>
    </View>
  );
};

export default WelcomeDetailsComponent;

