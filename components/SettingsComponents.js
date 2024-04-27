import { View, Text, TouchableOpacity,Dimensions, Image } from 'react-native'
import React from 'react'

const SettingsComponents = (props) => {
    const screenWidth = Dimensions.get('window').width;

  return (
    <View>
     <View    
  activeOpacity={1} /*onPress={handleGoToLogin}*/>
      <View
  
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

        <View style={{
        width: screenWidth*0.80,
        height: 65,
        borderWidth:2,
        justifyContent: 'flex-start',
        paddingHorizontal:25,
        alignItems: 'center',
        position: 'relative',
        zIndex:1,
        flexDirection:'row',
        gap:20,
        backgroundColor: props.bgColor || 'white',
      }}>
                  <Image source={props.ImagePath} />
          <Text style={{fontSize:24,fontWeight:900,color:'#000'}}>{props.text}</Text>

        </View>
        </View>
    </View>
  )
}

export default SettingsComponents