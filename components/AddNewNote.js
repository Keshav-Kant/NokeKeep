import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import addIcon from '../Images/addBlack.png';
import { useNavigation } from '@react-navigation/native';

const AddNewNote = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        borderRadius: 100,
        backgroundColor: '#DEDEDE',
        borderWidth: 1,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('NewNote')}>
      <Image source={addIcon} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
  );
};

export default AddNewNote;
