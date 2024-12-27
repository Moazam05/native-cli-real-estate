// views/Main.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import Home from './tabs/Home';
import Profile from './tabs/Profile';
import Explore from './tabs/Explore';
import icons from '../constants/icons';
import Fonts from '../constants/fonts';

const Tab = createBottomTabNavigator();

const TabIcon = ({focused, icon, title}) => (
  <View
    style={{
      flex: 1,
      marginTop: 12,
      alignItems: 'center',
    }}>
    <Image
      source={icon}
      style={{
        width: 22,
        height: 22,
        tintColor: focused ? '#0061FF' : '#666876',
      }}
      resizeMode="contain"
    />
    <Text
      style={{
        color: focused ? '#0061FF' : '#666876',
        fontSize: 12,
        fontFamily: focused ? Fonts.MEDIUM : Fonts.REGULAR,
        width: '100%',
        textAlign: 'center',
        marginTop: 3,
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
          borderTopColor: '#EBEEF2',
          borderTopWidth: 1,
          height: 65,
          paddingVertical: 8,
        },
        tabBarItemStyle: {
          marginHorizontal: 8,
        },
        // Add these options to remove the press effect
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        // For Android, disable the ripple effect
        android_ripple: {enabled: false},
        pressColor: 'transparent',
        pressOpacity: 1,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
          tabBarButton: props => (
            <View style={{flex: 1}}>
              <TouchableOpacity {...props} activeOpacity={1} />
            </View>
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
          tabBarButton: props => (
            <View style={{flex: 1}}>
              <TouchableOpacity {...props} activeOpacity={1} />
            </View>
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
          tabBarButton: props => (
            <View style={{flex: 1}}>
              <TouchableOpacity {...props} activeOpacity={1} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
