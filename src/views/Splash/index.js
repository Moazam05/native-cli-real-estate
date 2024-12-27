import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Custom Imports
import images from '../../constants/images';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const userData = await AsyncStorage.getItem('user');
    const parsedUser = userData ? JSON.parse(userData) : null;
    setTimeout(() => {
      navigation.replace(parsedUser ? 'Main' : 'SignIn');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Image source={images.splash} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default Splash;
