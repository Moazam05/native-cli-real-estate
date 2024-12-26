import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import images from '../../constants/images';
import {getUserSession} from '../../redux/authStore';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const session = await getUserSession();
    setTimeout(() => {
      navigation.replace(session ? 'Home' : 'SignIn');
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
