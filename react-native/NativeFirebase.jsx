//create src/utils/pusNotification.jsx
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
export const requestUserPermission = async () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getToken();
  }
};

export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();
  if (token) {
    console.log('FCM token:', token);
  } else {
    console.log('FCM token is null');
  }
};

///main App.jsx
import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from './src/PushNotification';

const App = () => {
  // Note that an async function or a function that returns a Promise
  // is required for both subscribers.

  useEffect(() => {
    requestUserPermission();
    async function onMessageReceived(message) {
      console.log(message); // Hello world!
      Alert.alert(`Hello ${message}`); // Hello world
    }
    // function onMessageReceived(message) {
    //   notifee.displayNotification(JSON.parse(message.data.notifee));
    // }
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

