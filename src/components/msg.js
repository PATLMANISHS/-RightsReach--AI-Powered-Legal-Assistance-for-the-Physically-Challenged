import React, { Fragment } from 'react';
import {View, Text} from 'react-native';
import styles from '../contents/styles';

const Msg = ({incomingMsg, messageText, msg}) => {
  return (
    <Fragment>
      {incomingMsg && (
        <View style={styles.incomingMsgBox}>
          <Text style={styles.incomingMsgText}>{msg}</Text>
        </View>
      )}
      {messageText && (
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{msg}</Text>
        </View>
      )}
    </Fragment>
  );
};

export default Msg;
