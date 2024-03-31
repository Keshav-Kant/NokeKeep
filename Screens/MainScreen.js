import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Dimensions, BackHandler, ToastAndroid } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import BlockComponent from '../components/BlockComponent';
import NavBurgerComponent from '../components/NavBurgerComponent';
import AddNewNote from '../components/AddNewNote';
import Categories from '../components/Categories';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const MainScreen = () => {
  const [notesData, setNotesData] = useState([]);
  const [filteredNotesData, setFilteredNotesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // Default selected category
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const backAction = () => {
      if (backHandler.current && backHandler.current + 2000 > Date.now()) {
        BackHandler.exitApp();
        return true;
      }
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      backHandler.current = Date.now();
      return true;
    };

    const backHandler = { current: null };

    const loadNotes = async () => {
      try {
        const user = firebase.auth().currentUser;
        const notesRef = firestore().collection('users').doc(user.uid).collection('notes');
        const snapshot = await notesRef.get();
        const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotesData(notes);
      } catch (error) {
        console.error('Error loading notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();

    const backHandlerListener = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandlerListener.remove();
  }, []);

  useEffect(() => {
    if (route.params && route.params.notes) {
      setNotesData(route.params.notes);
    }
  }, [route.params]);

  useEffect(() => {
    if (selectedCategory === 'ALL') {
      setFilteredNotesData(notesData);
    } else {
      const filteredNotes = notesData.filter(note => note.category === selectedCategory);
      setFilteredNotesData(filteredNotes);
    }
  }, [selectedCategory, notesData]);

  // Function to handle block press
  const handleBlockPress = (noteId) => {
    const note = notesData.find(note => note.id === noteId);
    if (note) {
      navigation.navigate('NewNote', { note, onUpdateNote: updateNote });
    }
  };
  
  const updateNote = (updatedNote) => {
    const updatedNotesData = notesData.map(note => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotesData(updatedNotesData);
  };

  const onDeleteNote = (deletedNoteId) => {
    setNotesData(notesData.filter(note => note.id !== deletedNoteId));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 30) / 2 - 10;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NavBurgerComponent />
      </View>
      <Categories onSelectCategory={setSelectedCategory} />
      {filteredNotesData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={{ color: '#DEDEDE' }}>No notes available for the selected category. Please add a new note.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotesData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          renderItem={({ item }) => (
            <BlockComponent
              headingText={item.heading}
              paragraphText={item.paragraph}
              dateTime={item.timestamp}
              category={item.category}
              onPress={() => handleBlockPress(item.id)}
              style={{ width: itemWidth }}
            />
          )}
        />
      )}
      <View style={styles.addNoteButton}>
        <AddNewNote onDeleteNote={onDeleteNote} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#1e1e1e',
  },
  header: {
    flexDirection: 'row',
  },
  addNoteButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
