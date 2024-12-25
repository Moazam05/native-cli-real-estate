import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../views/Splash';
import SignIn from '../views/Auth/SignIn';
import Home from '../views/Home';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppNavigator;