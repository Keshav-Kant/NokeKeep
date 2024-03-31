import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import arrowUpWhite from '../Images/arrowUpWhite.png';
import checkWhite from '../Images/checkWhite.png';
import deleteWhiteIcon from '../Images/deleteWhiteIcon.png';

const NewNoteScreen = () => {
  const [heading, setHeading] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userRef = firestore().collection('users').doc(currentUser.uid);
        const unsubscribe = userRef.collection('categories').onSnapshot(snapshot => {
          const categoriesData = snapshot.docs.map(doc => doc.data().name);
          setCategories(categoriesData);
        });
        
        // Clean up the listener when component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to fetch categories. Please try again.');
      }
    };

    fetchCategories();
  }, [currentUser.uid]);

  useEffect(() => {
    const { note } = route.params || {};
    if (note) {
      setHeading(note.heading);
      setParagraph(note.paragraph);
      setSelectedCategory(note.category);
      setCurrentDateTime(new Date(note.timestamp)); // Convert timestamp to Date object
    }
  }, [route.params]);

  const handleDelete = async () => {
    try {
      const { note } = route.params || {};
      if (note && note.id) {
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('notes')
          .doc(note.id)
          .delete();
        Alert.alert('Success', 'Note has been deleted successfully.');
        navigation.navigate('mainScreen');
      } else {
        Alert.alert('Error', 'Unable to delete the note. Note ID not found.');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      Alert.alert('Error', 'Failed to delete the note. Please try again.');
    }
  };
  
  const handleNavigateToHomePage = async () => {
    navigation.navigate('mainScreen');
  };

  const handleSave = async () => {
    try {
      const { note, onUpdateNote } = route.params || {};
      const currentDate = new Date();
      const formattedDateTime = currentDate.toLocaleString();

      const userDocRef = firestore().collection('users').doc(currentUser.uid);

      if (note && note.id) {
        await userDocRef.collection('notes').doc(note.id).update({
          heading,
          paragraph,
          timestamp: formattedDateTime,
          category: selectedCategory,
        });
        const updatedNote = {
          ...note,
          heading,
          paragraph,
          timestamp: formattedDateTime,
          category: selectedCategory,
        };
        onUpdateNote(updatedNote);
      } else {
        await userDocRef.collection('notes').add({
          heading,
          paragraph,
          timestamp: formattedDateTime,
          category: selectedCategory,
        });
      }

      const categoryExists = categories.includes(selectedCategory);
      if (!categoryExists) {
        await userDocRef.collection('categories').add({
          name: selectedCategory,
        });
        setCategories([...categories, selectedCategory]);
      }

      Alert.alert('Success', 'Note has been saved successfully.');
      setHeading('');
      setParagraph('');
      navigation.navigate('mainScreen');
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save the note. Please try again.');
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  const handleAddCategory = () => {
    setNewCategory('');
    setShowTextInput(true);
    setModalVisible(true);
  };

  const handleSaveNewCategory = async () => {
    try {
      if (newCategory.trim() !== '') {
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('categories')
          .add({
            name: newCategory.trim(),
          });
        setCategories([...categories, newCategory.trim()]);
        setShowTextInput(false);
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      Alert.alert('Error', 'Failed to save the category. Please try again.');
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('categories')
        .doc(category)
        .delete();
      setCategories(categories.filter(cat => cat !== category));
    } catch (error) {
      console.error('Error deleting category:', error);
      Alert.alert('Error', 'Failed to delete the category. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={handleNavigateToHomePage}>
          <Image source={arrowUpWhite} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Image source={deleteWhiteIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Image source={checkWhite} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.categoryContainer} onPress={handleOpenModal}>
        <Text style={styles.categoryText}>{selectedCategory || 'No Category'}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Category</Text>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} onPress={() => handleCategorySelection(category)}>
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryOption}>{category}</Text>
                  <TouchableOpacity onPress={() => handleDeleteCategory(category)}>
                    <Text style={styles.deleteButton}>-</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
            {showTextInput ? (
              <View>
                <TextInput
                  style={styles.categoryInput}
                  placeholder="Enter new category"
                  value={newCategory}
                  onChangeText={setNewCategory}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity onPress={handleSaveNewCategory}>
                  <Text style={styles.categoryOption}>Save Category</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={handleAddCategory}>
                <Text style={styles.categoryOption}>+ Add Category</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
      <TextInput
        style={[styles.input, styles.headingInput]}
        placeholder="Title"
        value={heading}
        onChangeText={(text) => setHeading(text)}
        placeholderTextColor={'#fff4'}
      />
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>{currentDateTime.toLocaleDateString()}</Text>
        <Text style={styles.dateTimeText}>{currentDateTime.toLocaleTimeString()}</Text>
      </View>
      <View style={styles.paragraphContainer}>
        <TextInput
          style={[styles.input, styles.paragraphInput]}
          placeholder="Start typing..."
          multiline
          value={paragraph}
          onChangeText={(text) => setParagraph(text)}
          placeholderTextColor={'#fff4'}
          textAlignVertical="top"
          height="100%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#1e1e1e',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  categoryContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff2',
    backgroundColor: '#222',
  },
  categoryText: {
    color: '#DEDEDE',
    fontSize: 16,
    textAlign: 'left',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryOption: {
    marginTop: 10,
    fontSize: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    color: '#1e1e1e',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  input: {
    width: '100%',
    borderRadius: 5,
    padding: 12,
    color: 'white',
    fontSize: 24,
  },
  headingInput: {
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  dateTimeText: {
    color: '#fff8',
  },
  paragraphContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    top: 0,
  },
  paragraphInput: {
    height: '100%',
    fontSize: 18,
    position: 'relative',
  },
});

export default NewNoteScreen;
