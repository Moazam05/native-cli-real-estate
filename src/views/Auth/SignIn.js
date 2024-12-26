import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import images from '../../constants/images';
import icons from '../../constants/icons';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import {supabase} from '../../supabase/supabaseClient';
import {storeUserSession} from '../../redux/authStore';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const SignIn = () => {
  const navigation = useNavigation();

  const imageOpacity = new Animated.Value(0);
  const welcomeTextOpacity = new Animated.Value(0);
  const headingTextOpacity = new Animated.Value(0);
  const loginTextOpacity = new Animated.Value(0);
  const buttonOpacity = new Animated.Value(0);
  const buttonTranslateY = new Animated.Value(50);
  useEffect(() => {
    const configureGoogleSignIn = async () => {
      try {
        await GoogleSignin.configure({
          webClientId:
            '718857751653-8tli83q6b913j2263ophp8cal2r7lmga.apps.googleusercontent.com',
          offlineAccess: true,
          // Add these scopes
          scopes: ['profile', 'email'],
        });
        console.log('Google Sign In configured successfully');
      } catch (error) {
        console.error('Google Sign In configuration error:', error);
      }
    };

    configureGoogleSignIn();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      // First sign in and get user info
      const userInfo = await GoogleSignin.signIn();
      // console.log('User Info:', userInfo);

      // Get tokens explicitly
      const tokens = await GoogleSignin.getTokens();
      // console.log('Tokens:', tokens);

      // Notice that idToken is inside userInfo.data.idToken
      if (userInfo.data && userInfo.data.idToken) {
        const {data, error} = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });

        if (error) throw error;
        // console.log('Supabase Success:', data);
        await storeUserSession(data);
        navigation.replace('Home');
      } else {
        throw new Error('Failed to get necessary tokens');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Operation in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available or outdated');
      } else {
        Alert.alert('Error', `${error.message}\nCode: ${error.code}`);
        console.error('Detailed error:', error);
      }
    }
  };

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Image fade in
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Welcome text fade in
      Animated.timing(welcomeTextOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Heading text fade in
      Animated.timing(headingTextOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Login text fade in
      Animated.timing(loginTextOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Button animation (fade in and slide up)
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.imageContainer, {opacity: imageOpacity}]}>
          <Image
            source={images.onboarding}
            style={styles.onboardingImage}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.contentContainer}>
          <Animated.Text
            style={[styles.welcomeText, {opacity: welcomeTextOpacity}]}>
            Welcome To Real Scout
          </Animated.Text>

          <Animated.Text
            style={[styles.headingText, {opacity: headingTextOpacity}]}>
            Let's Get You Closer To{'\n'}
            <Text style={styles.primaryText}>Your Ideal Home</Text>
          </Animated.Text>

          <Animated.Text
            style={[styles.loginText, {opacity: loginTextOpacity}]}>
            Login to Real Scout with Google
          </Animated.Text>

          <Animated.View
            style={{
              opacity: buttonOpacity,
              transform: [{translateY: buttonTranslateY}],
            }}>
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              style={styles.googleButton}
              activeOpacity={0.8}>
              <View style={styles.googleButtonContent}>
                <Image
                  source={icons.google}
                  style={styles.googleIcon}
                  resizeMode="contain"
                />
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
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
    flexGrow: 1,
  },
  imageContainer: {
    height: height * 0.6, // Adjust image container height
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingImage: {
    width: width * 0.8,
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: width * 0.08,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.05,
  },
  welcomeText: {
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: Fonts.REGULAR,
    color: Colors.greyMedium,
    letterSpacing: 0.5,
  },
  headingText: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: Colors.greyDark,
    textAlign: 'center',
    marginTop: height * 0.015,
    lineHeight: 32,
  },
  primaryText: {
    color: Colors.primary,
  },
  loginText: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.greyMedium,
    textAlign: 'center',
    marginTop: height * 0.04,
  },
  googleButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: '100%',
    paddingVertical: height * 0.018,
    marginTop: height * 0.025,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: height * 0.02,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 18,
    height: 18,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.greyDark,
    marginLeft: 10,
  },
});

export default SignIn;
