// views/Main.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './tabs/Home';
import Profile from './tabs/Profile';
import Explore from './tabs/Explore';
import icons from '../constants/icons';
import {Image, Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

const TabIcon = ({focused, icon, title}) => (
  <View style={{flex: 1, marginTop: 12, alignItems: 'center'}}>
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? '#0061FF' : '#666876',
      }}
      resizeMode="contain"
    />
    <Text
      style={{
        color: focused ? '#0061FF' : '#666876',
        fontSize: 12,
        fontFamily: focused ? 'Rubik-Medium' : 'Rubik-Regular',
        width: '100%',
        textAlign: 'center',
        marginTop: 4,
      }}>
      {title}
    </Text>
  </View>
);

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.search} title="Explore" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
