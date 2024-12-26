import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserSession = async session => {
  try {
    await AsyncStorage.setItem('userSession', JSON.stringify(session));
  } catch (error) {
    console.error('Error storing session:', error);
  }
};

export const getUserSession = async () => {
  try {
    const session = await AsyncStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};
