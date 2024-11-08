/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
//import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import navigation from '../navigation';
import LanguageModal from '../components/LanguageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../contents/utils';

export default function Start() {
  const navigation = useNavigation();
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);

  const saveSelectedLang = async index => {
    await AsyncStorage.setItem('LANG', index + '');
  };
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
      <View style={{marginVertical: 16}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: 'grey',
          }}>
          {selectedLang === 0
            ? translation[0].English
            : selectedLang === 1
            ? translation[0].Marathi
            : selectedLang === 2
            ? translation[0].Hindi
            : null}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            letterSpacing: 1,
            color: 'gray',
            fontWeight: 'bold',
          }}>
          {selectedLang === 0
            ? translation[1].English
            : selectedLang === 1
            ? translation[1].Marathi
            : selectedLang === 2
            ? translation[1].Hindi
            : null}
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image
          source={require('../../assets/images/welcome.png')}
          style={{height: 380, width: 380}}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          backgroundColor: '#34D399',
          marginHorizontal: 5,
          padding: 16,
          borderRadius: 20,
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}>
          Get Started
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '50%',
          height: 50,
          borderWidth: 0.2,
          borderRadius: 10,
          position: 'absolute',
          alignSelf: 'center',
          bottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: 'skyblue',
        }}
        onPress={() => {
          setLangModalVisible(!langModalVisible);
        }}>
        <Text>Select Language</Text>
      </TouchableOpacity>
      <LanguageModal
        langModalVisible={langModalVisible}
        setLangModalVisible={setLangModalVisible}
        onSelectLang={x => {
          setSelectedLang(x);
          saveSelectedLang(x);
        }}
      />
    </SafeAreaView>
  );
}
