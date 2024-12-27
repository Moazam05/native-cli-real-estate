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

        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </View>
        </View>

        {/* Repeat for second section */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            <Card />
            <Card />
          </View>
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
    color: Colors.greyLight,
  },
  userName: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.greyDark,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  featuredSection: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    color: Colors.greyDark,
  },
  seeAllButton: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    color: Colors.primary,
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
});

export default Home;
