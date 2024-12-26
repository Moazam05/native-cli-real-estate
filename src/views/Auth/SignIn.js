import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import images from '../../constants/images';
import icons from '../../constants/icons';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const YourComponent = () => {
  const handleLogin = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={images.onboarding}
          style={styles.onboardingImage}
          resizeMode="contain"
        />

        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome To Real Scout</Text>

          <Text style={styles.headingText}>
            Let's Get You Closer To {'\n'}
            <Text style={styles.primaryText}>Your Ideal Home</Text>
          </Text>

          <Text style={styles.loginText}>Login to Real Scout with Google</Text>

          <TouchableOpacity onPress={handleLogin} style={styles.googleButton}>
            <View style={styles.googleButtonContent}>
              <Image
                source={icons.google}
                style={styles.googleIcon}
                resizeMode="contain"
              />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollContainer: {
    height: '100%',
  },
  onboardingImage: {
    width: '100%',
    height: '66.67%',
  },
  contentContainer: {
    paddingHorizontal: 40,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: Fonts.REGULAR,
    color: Colors.greyMedium,
  },
  headingText: {
    fontSize: 30,
    fontFamily: Fonts.BOLD,
    color: Colors.greyDark,
    textAlign: 'center',
    marginTop: 8,
  },
  primaryText: {
    color: Colors.primary,
  },
  loginText: {
    fontSize: 18,
    fontFamily: Fonts.REGULAR,
    color: Colors.greyMedium,
    textAlign: 'center',
    marginTop: 48,
  },
  googleButton: {
    backgroundColor: 'white',
    borderRadius: 9999,
    width: '100%',
    paddingVertical: 16,
    marginTop: 20,
    shadowColor: '#71717a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    fontSize: 18,
    fontFamily: Fonts.MEDIUM,
    color: Colors.greyDark,
    marginLeft: 8,
  },
});

export default YourComponent;
