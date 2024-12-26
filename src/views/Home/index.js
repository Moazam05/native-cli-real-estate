import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {supabase} from '../../supabase/supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {selectedUser, setUser} from '../../redux/auth/authSlice';
import useTypedSelector from '../../hooks/useTypedSelector';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userDetails = useTypedSelector(selectedUser);

  console.log('userDetails', userDetails?.session);

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

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await supabase.auth.signOut();
      await AsyncStorage.removeItem('user');
      dispatch(setUser(null));

      navigation.replace('SignIn');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
