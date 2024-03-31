import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('categories')
      .onSnapshot(snapshot => {
        const allCategories = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategories(allCategories);
      });

    return () => unsubscribe();
  }, []);

  const handleCategoryPress = category => {
    onSelectCategory(category);
    setSelectedCategory(category);
  };

  return (
    <View
      style={{
        height: 'auto',
        width: 'auto',
        marginBottom: 15,
      }}>
      <ScrollView horizontal={true}>
        <TouchableOpacity onPress={() => handleCategoryPress('ALL')}>
          <Text
            style={{
              color: selectedCategory === 'ALL' ? '#000' : '#DEDEDE',
              backgroundColor: selectedCategory === 'ALL' ? '#FFF' : 'transparent',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              borderRadius: 20,
              marginRight: 10,
            }}>
            ALL
          </Text>
        </TouchableOpacity>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(category.name)}>
            <Text
              style={{
                color: selectedCategory === category.name ? '#000' : '#DEDEDE',
                backgroundColor: selectedCategory === category.name ? '#FFF' : 'transparent',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: '#DEDEDE',
                borderRadius: 20,
                marginRight: 10,
              }}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
