import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const NavBurgerComponent = (props) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
      <View style={{}}>
        <View style={{flexDirection:'row',gap:5}}>
        <Image source={require('../Images/loginIcon.png')} style={{width:45,height:45,resizeMode:'contain'}}/>
        <View style={{justifyContent:'center',alignItems:'flex-start'}}>
          <Text style={{color:'black',fontSize:14,fontWeight:'normal'}}>Hello</Text>
          <Text style={{color:'black',fontSize:18,fontWeight:'bold'}}>{props.userNameText}!</Text>
        </View>
        </View>
      </View>

      <View>
      <TouchableOpacity >
      <TouchableOpacity
  activeOpacity={1}
  style={{
    width:45,
    height: 45,
    position: 'absolute',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    overflow: 'hidden',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomLeftRadius: 2,
    borderTopRightRadius: 2, // Adjust this value as needed for your desired pointy border effect
    borderTopColor: 'white',
    borderLeftColor: 'white',
    overflow:'hidden',
    backgroundColor:'#F9B803'
  }}>
</TouchableOpacity>

        <TouchableOpacity  activeOpacity={1} style={{
        width:45,
        height: 45,
        borderWidth:1,
        paddingHorizontal:10,
        alignItems: 'center',
        position: 'relative',
        zIndex:1,
        flexDirection:'row',
      }}>
            <Image source={require('../Images/add.png')} style={{left:2}}/>
         
        </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NavBurgerComponent