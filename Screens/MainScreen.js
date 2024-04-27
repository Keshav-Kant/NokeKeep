import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  BackHandler,
  ToastAndroid,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import BlockComponent from '../components/BlockComponent';

const MainScreen = () => {
  const [username, setUsername] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalNotes, setTotalNotes] = useState(0); // Initialize totalNotes state
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();
          if (userDoc.exists) {
            const fullName = userDoc.data().username;
            const firstName = fullName.split(' ')[0];
            setUsername(firstName);
  
            const totalNotes = userDoc.data().totalNotes || 0;
            setTotalNotes(totalNotes);
  
            const notesRef = firestore()
              .collection('users')
              .doc(currentUser.uid)
              .collection('notes');
  
            const unsubscribe = notesRef.onSnapshot(querySnapshot => {
              const notesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNotes(notesData);
              setLoading(false);
            }, error => {
              console.error('Error fetching notes:', error);
            });
  
            // Fetch initial data once
            notesRef.get().then(querySnapshot => {
              const notesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNotes(notesData);
              setLoading(false);
            }).catch(error => {
              console.error('Error fetching initial notes data:', error);
            });
  
            return () => unsubscribe();
          } else {
            console.log('User document does not exist');
          }
        } else {
          navigation.navigate('loginScreen');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  

  useEffect(() => {
    let backPressed = 0;

    const backAction = () => {
      if (backPressed === 0) {
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        backPressed += 1;

        setTimeout(() => {
          backPressed = 0;
        }, 2000);

        return true;
      } else {
        BackHandler.exitApp();
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  

  const navigateToNewNote_ = note => {
    navigation.navigate('NewNote', { note });
  };

  const navigateToNewNote = () => {
    navigation.navigate('NewNote');
  };

  const handleGoToUserProfile = () => {
    navigation.navigate('settingScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={handleGoToUserProfile}>
          <Image
            source={require('../Images/loginIcon.png')}
            style={styles.userIcon}
          />
          </TouchableOpacity>
          <View>
            <Text style={styles.usernameText}>Hello</Text>
            <Text style={styles.username}>{username}!</Text>
          </View>
        </View>
        <TouchableOpacity  activeOpacity={1} onPress={navigateToNewNote} >
      <View
 
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
</View>

        <View   style={{
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
         
        </View>
        </TouchableOpacity>


       
      </View>

      

      {/* Render each note as a BlockComponent */}
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#000" />
      ) : (
        <ScrollView>
          {totalNotes === 0 ? (
            <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{color:"#000",fontFamily:'Inter-Light',textAlign:'center'}}>Add your first note here</Text>
            </View>
          ) : (
            notes.map(note => (
              <TouchableOpacity
                key={note.id}
                onPress={() => navigateToNewNote_(note)}>
                <BlockComponent
                  headingText={note.heading}
                  noteText={note.paragraph}
                  editText={`Edited on ${
                    note.timestamp
                      ? note.timestamp.toDate().toLocaleString()
                      : 'Unknown'
                    }`}
                />
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginRight: 10,
  },
  usernameText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal',
  },
  username: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9B803',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: 'white',
  },
  addIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    color: 'red',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default MainScreen;
