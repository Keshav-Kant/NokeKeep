import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const BlockComponent = (props) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{justifyContent: 'center', alignItems: 'center',marginBottom:15}}>
      <View>
        <View
          
          style={{
            width: screenWidth * 0.9,
            height: 160,
            position: 'absolute',
            zIndex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            overflow: 'hidden',
            borderBottomWidth: 6,
            borderRightWidth: 6,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10, // Adjust this value as needed for your desired pointy border effect
            borderTopColor: 'white',
            borderLeftColor: 'white',
            overflow: 'hidden',
          }}></View>

        <View
          
          style={{
            width: screenWidth * 0.9,
            height: 161,
            borderWidth: 1,
            paddingHorizontal: 10,
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
            flexDirection: 'row',
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              overflow: 'hidden',
              height: 130,
              paddingHorizontal: 10,
            }}>
              <View>
            <Text
              style={{
                fontFamily: 'Inter-ExtraBold',
                fontSize: 16,
                color: '#000',
              }}>
              {props.headingText}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 8,
                color: '#827D89',
              }}>
              {props.editText}
            </Text>
            </View>
            <Text
            numberOfLines={3}
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 12,
                color: '#000',
                lineHeight: 20,
              }}>
             {props.noteText}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#fff1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#DEDEDE',
  },
  paragraph: {
    fontSize: 18,
    color: '#DEDEDE',
  },
});

export default BlockComponent;
