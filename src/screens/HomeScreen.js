/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import styles from '../contents/styles';

let chats = [];


export default function HomeScreen() {
  const [recognizedText, setRecognizedText] = useState('');
  const [chatList, setChatList] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To show a loader while API call is happening

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = stopListening;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = error => console.log('onSpeechError');

    // TTS event listeners
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => console.log('finish', event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = () => {
    console.log('Voice recording started');
  };

  const onSpeechResultsHandler = event => {
    const text = event.value[0];
    setRecognizedText(text);
    sendMessage(text);
  };

  const startListening = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log('Error stopping voice recognition:', error);
    }
  };

  const sendMessage = () => {
    if (recognizedText) {
      chats = [...chats, {msg: recognizedText, sentMsg: true}];
      setChatList([...chats].reverse());

      setTimeout(() => {
        getAnswerFromGPT(recognizedText);
      }, 1000);

      setRecognizedText('');
    }
  };
  const getAnswerFromGPT = (question) => {
    setIsLoading(true);

    // Log the question to see what's being sent
    console.log('Sending question to OpenAI:', question);

    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-BjZqKtO7Pu1C4cs7R5sWstz6j3SpFaG1DBaPLd4QDAT3BlbkFJzgrAjRjtP6bCIZsmwzULYIp65UVYdp40-mAXaekPoA', // Replace with your actual key
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',  // Ensure this model is correct or switch to 'gpt-3.5-turbo'
        prompt: `You are an AI assistant. Answer the following question concisely and helpfully:\n\nQuestion: "${question}"\n\nAnswer:`,
        max_tokens: 150,  // Adjust if necessary
        temperature: 0.5,
      }),
    })
    .then(response => response.json())
    .then(data => {
      // Log the response from OpenAI
      console.log('OpenAI API response:', data);

      if (data && data.choices && data.choices.length > 0) {
        const answer = data.choices[0].text.trim();
        chats = [...chats, {msg: answer, incomingMsg: true}];
        setChatList([...chats].reverse());
        Tts.speak(answer);
      } else {
        // Log error for debugging
        console.error('No valid response from AI:', data);
        throw new Error('No valid response from AI');
      }
    })
    .catch(error => {
      console.log('Error fetching from OpenAI:', error);
      const errorMessage = "Couldn't fetch response from AI. Please try again.";
      chats = [...chats, {msg: errorMessage, incomingMsg: true}];
      setChatList([...chats].reverse());
      Tts.speak(errorMessage);
    })
    .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{height: '90%', bottom: '2%'}}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        data={chatList}
        renderItem={({item, index}) => {
          if (item.incomingMsg) {
            return (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  {
                    backgroundColor: '#8ACDD7',
                    alignSelf: 'flex-start',
                  },
                ]}>
                <Text style={styles.messageText}>{item.msg}</Text>
              </View>
            );
          } else {
            return (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  {
                    backgroundColor: '#387ADF',
                    alignSelf: 'flex-end',
                  },
                ]}>
                <Text style={styles.messageText}>{item.msg}</Text>
              </View>
            );
          }
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={recognizedText}
          onChangeText={text => setRecognizedText(text)}
        />
        <TouchableOpacity
          onPress={() => (isListening ? stopListening() : startListening())}
          style={styles.voiceButton}>
          {isListening ? (
            <Text style={styles.voiceButtonText}>•••</Text>
          ) : (
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4980/4980251.png',
              }}
              style={{width: 45, height: 45}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={!recognizedText}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF5E0',
//   },
//   messagesContainer: {
//     padding: 10,
//   },
//   messageBubble: {
//     maxWidth: '70%',
//     marginVertical: 5,
//     borderRadius: 10,
//     padding: 10,
//   },
//   messageText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: 'white',
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     padding: 10,
//     borderRadius: 20,
//     backgroundColor: '#103f61',
//   },
//   voiceButton: {
//     marginLeft: 10,
//     fontSize: 24,
//   },
//   voiceButtonText: {
//     fontSize: 24,
//     height: 45,
//     color: 'black',
//   },
//   sendButton: {
//     marginLeft: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#FF6969',
//     borderRadius: 20,
//   },
//   sendButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   incomingMsgBox: {
//     backgroundColor: 'white',
//     maxWidth: '70%',
//     borderRadius: 10,
//     padding: 5,
//     alignSelf: 'flex-start',
//     marginVertical: 5,
//     marginHorizontal: 5,
//     borderWidth: 0.5,
//     borderColor: 'grey',
//   },
//   incomingMsgText: {color: 'black', fontSize: 16},

// });
