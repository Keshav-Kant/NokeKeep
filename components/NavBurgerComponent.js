import { View, Text } from 'react-native'
import React from 'react'

const NavBurgerComponent = () => {
  return (
    <View style={{height:40}}>
      <View style={{height:'100%',gap:5,}}>
            <View style={{width:15,borderColor:'#DEDEDE',borderWidth:1.5,borderRadius:20,}}></View>
            <View style={{width:30,borderColor:'#DEDEDE',borderWidth:1.5,borderRadius:20,}}></View>
            <View style={{width:25,borderColor:'#DEDEDE',borderWidth:1.5,borderRadius:20,}}></View>
      </View>
    </View>
  )
}

export default NavBurgerComponent