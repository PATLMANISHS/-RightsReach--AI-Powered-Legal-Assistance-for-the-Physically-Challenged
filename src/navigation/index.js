import * as React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from '../screens/Start';
import HomeScreen from '../screens/HomeScreen';
import Splash from '../screens/Splash';
import UserLogin from '../screens/UserLogin';
import UserSignup from '../screens/UserSignup';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          component={Splash}
          name="Splash"
          options={{headerShown: false}}
        />
         <Stack.Screen
          component={UserLogin}
          name="UserLogin"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={UserSignup}
          name="UserSignup"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Start}
          name="welcome"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={HomeScreen}
          name="Home"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
