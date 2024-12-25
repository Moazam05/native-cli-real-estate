import {View, Text, Button} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {supabase} from '../../supabase/supabaseClient'; // adjust path as needed

GoogleSignin.configure({
  webClientId:
    '813136864049-a28m612sa5g7g2p5sbb6gff8fjjjj9i2.apps.googleusercontent.com',
});

const Splash = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();

      const {data, error} = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        console.error('Supabase error:', error.message);
      } else {
        console.log('Success:', data.user);
      }
    } catch (error) {
      console.error('Google signin error:', error);
    }
  };

  return (
    <View>
      <Text>Splash</Text>
      <Button title="Sign in with Google" onPress={signIn} />
    </View>
  );
};

export default Splash;
