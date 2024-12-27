import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Home from './tabs/Home';
import Profile from './tabs/Profile';
import Explore from './tabs/Explore';
import icons from '../constants/icons';
import Fonts from '../constants/fonts';

const Tab = createBottomTabNavigator();

const TabIcon = ({focused, icon, title}) => (
  <View style={styles.tabIconContainer}>
    <Image
      source={icon}
      style={[
        styles.tabIcon,
        focused ? styles.tabIconFocused : styles.tabIconUnfocused,
      ]}
      resizeMode="contain"
    />
    <Text
      style={[
        styles.tabTitle,
        focused ? styles.tabTitleFocused : styles.tabTitleUnfocused,
      ]}>
      {title}
    </Text>
  </View>
);

const renderTabIcon = (focused, icon, title) => (
  <TabIcon focused={focused} icon={icon} title={title} />
);

const TabBarButton = props => (
  <View style={styles.tabBarButtonContainer}>
    <TouchableOpacity {...props} activeOpacity={1} />
  </View>
);

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        android_ripple: {enabled: false},
        pressColor: 'transparent',
        pressOpacity: 1,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => renderTabIcon(focused, icons.home, 'Home'),
          tabBarButton: TabBarButton,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({focused}) =>
            renderTabIcon(focused, icons.search, 'Explore'),
          tabBarButton: TabBarButton,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
            renderTabIcon(focused, icons.person, 'Profile'),
          tabBarButton: TabBarButton,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  tabIconContainer: {
    flex: 1,
    marginTop: 12,
    alignItems: 'center',
  },
  tabIcon: {
    width: 22,
    height: 22,
  },
  tabTitle: {
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
    marginTop: 3,
    height: 18,
  },

  tabBar: {
    backgroundColor: 'white',
    borderTopColor: '#EBEEF2',
    borderTopWidth: 1,
    height: 65,
    paddingVertical: 8,
  },
  tabBarItem: {
    marginHorizontal: 8,
  },

  tabIconFocused: {
    tintColor: '#0061FF',
  },
  tabIconUnfocused: {
    tintColor: '#666876',
  },
  tabTitleFocused: {
    color: '#0061FF',
    fontFamily: Fonts.MEDIUM,
  },
  tabTitleUnfocused: {
    color: '#666876',
    fontFamily: Fonts.REGULAR,
  },
  tabBarButtonContainer: {
    flex: 1,
  },
});
