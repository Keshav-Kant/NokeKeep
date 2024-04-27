import {View, Text, Image, BackHandler, TouchableOpacity,ToastAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import WelcomeDetailsComponent from '../components/WelcomeDetailsComponent';

import firstImage from '../Images/firstImage.png';
import secondImage from '../Images/secondImage.png';
import thirdImage from '../Images/thirdImage.png';

const WelcomeScreen = ({navigation}) => {
  const [pageNumber, setPageNumber] = useState('id-1');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove(); // Cleanup the event listener
  }, [pageNumber]);



  useEffect(() => {
    let backPressed = 0;

    const backAction = () => {
      if (backPressed === 0) {
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        backPressed += 1;

        setTimeout(() => {
          backPressed = 0;
        }, 2000); // Reset backPressed after 2 seconds

        return true;
      } else {
        BackHandler.exitApp();
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);


  
  const handleBackPress = () => {
    
    if (pageNumber === 'id-3') {
      setPageNumber('id-2');
      return true; // Prevent default behavior (closing the app)
    } else if (pageNumber === 'id-2') {
      setPageNumber('id-1');
      
      return true; // Prevent default behavior (closing the app)
    }
    
    
    return false; // Default behavior (close the app) for other cases
  };

  let content;
  const handleNextButton = () => {
    if (pageNumber === 'id-1') {
      setPageNumber('id-2');
    } else if (pageNumber === 'id-2') {
      setPageNumber('id-3');
    } else {
      navigation.navigate('logRegScreen');
    }
  };
  const handleSkipButton = () => {
    
      navigation.navigate('logRegScreen');
    
  };
  if (pageNumber === 'id-1') {
    content = (
      <View style={{flex: 1, justifyContent: 'space-evenly', marginBottom: 10,backgroundColor:'white'}}>
        <TouchableOpacity activeOpacity={1} onPress={handleSkipButton} ><Text style={{color:'#404040',fontSize:16,textAlign:'right',right:30,top:20}}>Skip</Text></TouchableOpacity>
        <WelcomeDetailsComponent
          source={firstImage}
          Text="Wrote down anything you want to achive today or in future."
          nextButton="id-2"
          navigation={navigation}
        />
        <TouchableOpacity activeOpacity={1} onPress={handleNextButton} style={{
          borderTopColor: '#000',
          borderTopWidth: 1.5,
          paddingVertical: 15,
        }}>
          <Text style={{textAlign:'center',fontSize:20,color:'#000000'}}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (pageNumber === 'id-2') {
    // You can add content for page id-2 here
    content = (
      <View style={{flex: 1, justifyContent: 'space-evenly', marginBottom: 10,backgroundColor:'white'}}>
        <TouchableOpacity activeOpacity={1} onPress={handleSkipButton}><Text style={{color:'#404040',fontSize:16,textAlign:'right',right:30,top:20}}>Skip</Text></TouchableOpacity>
        <WelcomeDetailsComponent
          source={secondImage}
          Text="Different goals, different ways to write it down."
          nextButton="id-2"
          navigation={navigation}
        />
        <TouchableOpacity activeOpacity={1} onPress={handleNextButton} style={{
          borderTopColor: '#000',
          borderTopWidth: 1.5,
          paddingVertical: 15,
        }}>
          <Text style={{textAlign:'center',fontSize:20,color:'#000000'}}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    // Default case or additional cases can be handled here
    content = (
      <View style={{flex: 1, justifyContent: 'space-evenly', marginBottom: 10,backgroundColor:'white'}}>
        <TouchableOpacity activeOpacity={1} onPress={handleSkipButton} ><Text style={{color:'#404040',fontSize:16,textAlign:'right',right:30,top:20}}>Skip</Text></TouchableOpacity>
        <WelcomeDetailsComponent
          source={thirdImage}
          Text="Adapt as per your needs."
          nextButton="id-2"
          navigation={navigation}
        />
        <TouchableOpacity activeOpacity={1} onPress={handleNextButton} style={{
          borderTopColor: '#000',
          borderTopWidth: 1.5,
          paddingVertical: 15,
        }}>
          <Text style={{textAlign:'center',fontSize:20,color:'#000000'}}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{content}</>;
};

export default WelcomeScreen;
