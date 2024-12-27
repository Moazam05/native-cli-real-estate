import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {supabase} from '../../supabase/supabaseClient';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser, setUser} from '../../redux/auth/authSlice';
import icons from '../../constants/icons';
import Fonts from '../../constants/fonts';
import {settings} from '../../constants/data';

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true}) => (
  <TouchableOpacity onPress={onPress} style={styles.settingsItemContainer}>
    <View style={styles.settingsItemLeft}>
      <Image source={icon} style={styles.settingsIcon} />
      <Text style={[styles.settingsTitle, textStyle]}>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} style={styles.arrowIcon} />}
  </TouchableOpacity>
);

const Profile = () => {
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
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Image source={icons.bell} style={styles.bellIcon} />
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{uri: userDetails?.user?.user_metadata?.picture}}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>
            <Text style={styles.userName}>
              {userDetails?.user?.user_metadata?.name}
            </Text>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View style={[styles.settingsSection, styles.borderTop]}>
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View style={[styles.settingsSection, styles.borderTop]}>
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle={styles.logoutText}
            showArrow={false}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
  },
  bellIcon: {
    width: 20,
    height: 20,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 88,
  },
  editButton: {
    position: 'absolute',
    bottom: 54,
    right: 38,
  },
  editIcon: {
    width: 26,
    height: 26,
  },
  userName: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    marginTop: 8,
  },
  settingsSection: {
    marginTop: 20,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#0061FF1A',
    paddingTop: 10,
  },
  settingsItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsIcon: {
    width: 20,
    height: 20,
  },
  settingsTitle: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: '#1A1D1E',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  logoutText: {
    color: '#FF0000',
  },
});

export default Profile;
