import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Searchbar from '../../components/Searchbar';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';
import icons from '../../constants/icons';
import Fonts from '../../constants/fonts';
import Colors from '../../constants/colors';
import FeaturedCard from '../../components/Cards/FeaturedCard';
import Card from '../../components/Cards/Card';

const Home = () => {
  const userDetails = useTypedSelector(selectedUser);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.userInfoContainer}>
            <Image
              source={{uri: userDetails?.user?.user_metadata?.picture}}
              style={styles.avatar}
            />
            <View style={styles.userTextContainer}>
              <Text style={styles.greetingText}>Good Morning</Text>
              <Text style={styles.userName}>
                {userDetails?.user?.user_metadata?.name}
              </Text>
            </View>
          </View>
          <Image source={icons.bell} style={styles.bellIcon} />
        </View>

        <Searchbar />

        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Featured
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <FeaturedCard />
          <Card />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userTextContainer: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.black100,
  },
  userName: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.black300,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
});

export default Home;
