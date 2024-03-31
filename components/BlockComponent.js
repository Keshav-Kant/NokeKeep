import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const BlockComponent = ({
  headingText,
  paragraphText,
  onPress,
  style,
  dateTime,
  category,
}) => {
  const [contentHeight, setContentHeight] = useState(0);

  const handleLayout = event => {
    const {height} = event.nativeEvent.layout;
    setContentHeight(height);
  };

  return (
    <TouchableOpacity
      style={[styles.block, style, {minHeight: contentHeight}]}
      onPress={onPress}
      onLayout={handleLayout}>
        <View>
      <Text style={{color: '#DEDEDE', fontSize: 10}}>{category}</Text>
      <Text style={styles.heading}>{headingText}</Text>
      <Text style={styles.paragraph}>{paragraphText}</Text>
      </View>
      <View>
      <Text style={{color: '#DEDEDE', fontSize: 10}}>{dateTime}</Text>
      </View>
    </TouchableOpacity>
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
    justifyContent: 'space-between'
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
