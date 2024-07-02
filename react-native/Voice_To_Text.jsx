import React, { useState, useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import * as RNLocalize from 'react-native-localize';
import { TimeZoneChecker } from './TImeZoneCheker';


const App: React.FC = () => {
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [error, setError] = useState<string>('');
  let locale = Intl.DateTimeFormat().resolvedOptions().locale;
console.log(locale);

// const locales = RNLocalize.getLocales();

  //  console.log(locales);

// if (locales.length > 0) {
//     const { countryCode, languageTag, languageCode } = locales[0];
//     console.log(`Country Code: ${countryCode}`);
//     console.log(`Language Tag: ${languageTag}`);
//     console.log(`Language Code: ${languageCode}`);
// }

const timezone = RNLocalize.getTimeZone();
 
const findLanguage = TimeZoneChecker(timezone)

console.log(findLanguage);



  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    if (Platform.OS === 'android') {
      requestMicrophonePermission();
    }

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event: SpeechResultsEvent) => {
    if (event.value && event.value.length > 0) {
      setRecognizedText(event.value[0]);
    }
  };

  const onSpeechError = (event: SpeechErrorEvent) => {
    setError(event?.error?.message);
  };

  const startListening = async () => {
    setError('');
    Voice.isRecognizing()
    Voice.getSpeechRecognitionServices()
    try {
      await Voice.start(findLanguage);
    } catch (e) {
      setError('Failed to start voice recognition.');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      setError('Failed to stop voice recognition.');
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone to recognize speech',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setError('Microphone permission denied');
      }
    } catch (err) {
      setError('Failed to request microphone permission');
    }
  };

  const handleSpeck =()=>{
    if(recognizedText){
      Tts.speak(recognizedText);
    }
  }

  return (
    <View>
      <Button title="Start Listening" onPress={startListening} />
      <Button title="Stop Listening" onPress={stopListening} />
      <Button title="Speck" onPress={handleSpeck} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Text style={{
        fontSize : 20
      }}>Recognized Text: {recognizedText}</Text>
    </View>
  );
};

export default App;
