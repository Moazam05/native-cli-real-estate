import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
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

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      try {
        await GoogleSignin.configure({
          webClientId:
            '718857751653-8tli83q6b913j2263ophp8cal2r7lmga.apps.googleusercontent.com',
          offlineAccess: true,
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.username}>
          {userDetails?.session?.user?.email || 'User'}
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A73E8',
  },
  username: {
    fontSize: 18,
    marginTop: 5,
    color: '#444',
  },
  illustration: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#E53935',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 50,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Home;
