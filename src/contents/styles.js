import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    messagesContainer: {
      padding: 10,
    },
    messageBubble: {
      backgroundColor: 'green',
      maxWidth: '90%',
      borderRadius: 10,
      padding: 10,
      alignSelf: 'flex-end',
      marginVertical: 5,
      marginHorizontal: 5,
    },
    messageText: {
      color: 'black',
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#ccc',
      backgroundColor: 'white',
    },
    input: {
      flex: 1,
      fontSize: 16,
      padding: 10,
      borderRadius: 20,
      backgroundColor: '#EBD9B4',
      color:'black',
    },
    voiceButton: {
      marginLeft: 10,
      fontSize: 24,
    },
    voiceButtonText: {
      fontSize: 24,
      height: 45,
      color: 'black',
    },
    sendButton: {
      marginLeft: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#FF6969',
      borderRadius: 20,
    },
    sendButtonText: {
      color: 'white',
      fontSize: 16,
    },
    incomingMsgBox: {
      backgroundColor: 'white',
      maxWidth: '70%',
      borderRadius: 10,
      padding: 5,
      alignSelf: 'flex-start',
      marginVertical: 5,
      marginHorizontal: 5,
      borderWidth: 0.5,
      borderColor: 'grey',
    },
    incomingMsgText: {color: 'black', fontSize: 16},
  });

  export default styles;
