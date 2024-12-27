import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Searchbar from '../../components/Searchbar';
import Filters from '../../components/Filters';
import FeaturedCard from '../../components/Cards/FeaturedCard';
import Card from '../../components/Cards/Card';
import icons from '../../constants/icons';
import Fonts from '../../constants/fonts';
import Colors from '../../constants/colors';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';

const ListHeader = ({dummyData, userDetails}) => (
  <View style={styles.headerContainer}>
    <View style={styles.userSection}>
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

    <View style={styles.featuredSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummyData}
        renderItem={({item}) => <FeaturedCard item={item} />}
        keyExtractor={item => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredList}
      />
    </View>

    <View style={styles.recommendationSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Our Recommendation</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See all</Text>
        </TouchableOpacity>
      </View>
      <Filters />
    </View>
  </View>
);

const Home = () => {
  const userDetails = useTypedSelector(selectedUser);

  const dummyData = [1, 2, 3];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyData}
        numColumns={2}
        renderItem={({item}) => <Card item={item} />}
        keyExtractor={item => item.toString()}
        ListHeaderComponent={
          <ListHeader dummyData={dummyData} userDetails={userDetails} />
        }
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingHorizontal: 20,
  },
  userSection: {
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
  recommendationSection: {
    marginTop: 20,
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
  featuredList: {
    gap: 20,
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 128,
  },
  columnWrapper: {
    gap: 20,
    paddingHorizontal: 20,
  },
});

export default Home;
