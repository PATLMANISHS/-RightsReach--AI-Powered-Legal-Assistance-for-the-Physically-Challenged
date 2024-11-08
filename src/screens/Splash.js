

import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
        navigation.navigate('UserLogin');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RightsReach</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'red',
  },
});
