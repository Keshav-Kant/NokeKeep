import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  ToastAndroid,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import deleteIcon from '../Images/deleteIcon.png';
import editIcon from '../Images/editIcon.png';
import leftArrowPng from '../Images/leftArrowPng.png';
import saveIcon from '../Images/saveIcon.png';

const NewNoteScreen = ({navigation, route}) => {
  const [heading, setHeading] = useState(note ? note.heading : '');
  const [paragraph, setParagraph] = useState(note ? note.paragraph : '');

  const [userUid, setUserUid] = useState('');
  const {note} = route.params || {};

  // Get current date and time
  const currentDateTime = new Date();
  const showToastWithGravity = errorMessage => {
    ToastAndroid.showWithGravity(
      errorMessage,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  useEffect(() => {
    // Fetch the current user's UID
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUserUid(currentUser.uid);
    }
  }, []);

  const handleNavigateToHomePage = () => {
    handleSaveNote();
    navigation.navigate('mainScreen');
  };

  const handleSaveNote = async () => {
    try {
      // Check if heading or paragraph is empty
      if (!heading.trim() || !paragraph.trim()) {
        return;
      }

      // Get the current user's UID
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        showToastWithGravity('User not found');
        return;
      }
      const userUid = currentUser.uid;

      if (note) {
        // Update existing note
        await firestore()
          .collection('users')
          .doc(userUid)
          .collection('notes')
          .doc(note.id)
          .update({
            heading: heading,
            paragraph: paragraph,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        showToastWithGravity('Your note has been updated successfully');
        navigation.navigate('mainScreen');
      } else {
        // Save new note
        // Get the total number of notes to determine the next note number
        const userDoc = await firestore()
          .collection('users')
          .doc(userUid)
          .get();
        const userData = userDoc.data();
        const totalNotes = userData?.totalNotes || 0;

        // Save the note data to Firestore under the user's UID with the next note number as the document ID
        await firestore()
          .collection('users')
          .doc(userUid)
          .collection('notes')
          .doc(`note${totalNotes + 1}`)
          .set({
            heading: heading,
            paragraph: paragraph,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });

        // Increment totalNotes in the user's document
        await firestore()
          .collection('users')
          .doc(userUid)
          .update({
            totalNotes: totalNotes + 1,
          });
        showToastWithGravity('Your note has been saved successfully');
      }

      // Clear the input fields
      setHeading('');
      setParagraph('');
      navigation.navigate('mainScreen');
    } catch (error) {
      console.error('Error saving note: ', error);
      showToastWithGravity(
        'An error occurred while saving your note. Please try again later.',
      );
    }
  };

  // Populate the input fields with the note details
  useEffect(() => {
    if (note) {
      setHeading(note.heading);
      setParagraph(note.paragraph);
    }
  }, [note]);

  const handleDeleteNote = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        showToastWithGravity('User not found');
        return;
      }
      const userUid = currentUser.uid;

      if (note) {
        const batch = firestore().batch();

        // Delete the note document
        const noteRef = firestore()
          .collection('users')
          .doc(userUid)
          .collection('notes')
          .doc(note.id);
        batch.delete(noteRef);

        // Decrement totalNotes in the user's document
        const userRef = firestore().collection('users').doc(userUid);
        batch.update(userRef, {
          totalNotes: firebase.firestore.FieldValue.increment(-1),
        });

        // Commit the batched transaction
        await batch.commit();

        showToastWithGravity('Your note has been deleted successfully');
        navigation.navigate('mainScreen');
      } else {
        showToastWithGravity('No note found to delete');
      }
    } catch (error) {
      console.error('Error deleting note: ', error);
      showToastWithGravity(
        'An error occurred while deleting your note. Please try again later.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={handleNavigateToHomePage}>
          <Image source={leftArrowPng} style={{...styles.icon_}} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 20}}>
          <TouchableOpacity onPress={handleSaveNote}>
            <Image source={saveIcon} style={{...styles.icon_}} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNavigateToHomePage}>
            <Image source={editIcon} style={{...styles.icon_}} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeleteNote}>
            <Image source={deleteIcon} style={{...styles.icon_}} />
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={{...styles.input, fontWeight: 'bold'}}
        placeholder="Title"
        value={heading}
        onChangeText={text => setHeading(text)}
        placeholderTextColor={'#C7C7C7'}
      />
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>
          {currentDateTime.toLocaleDateString()}
        </Text>
        <Text style={styles.dateTimeText}>
          {currentDateTime.toLocaleTimeString()}
        </Text>
      </View>
      <View style={styles.paragraphContainer}>
        <TextInput
          style={[styles.input, styles.paragraphInput]}
          placeholder="Write something..."
          multiline
          value={paragraph}
          onChangeText={text => setParagraph(text)}
          placeholderTextColor={'#C7C7C7'}
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
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  icon_: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
  },
  headingInput: {
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderRadius: 5,
    padding: 12,
    color: '#000',
    fontSize: 22,
    fontFamily: 'Inter-Bold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  dateTimeText: {
    color: '#DADADA',
  },
  paragraphContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    top: 0,
  },
  paragraphInput: {
    height: '100%',
    fontSize: 14,
    position: 'relative',
    fontFamily: 'Inter-Regular',
  },
});

export default NewNoteScreen;
