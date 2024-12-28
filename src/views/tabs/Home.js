import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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
import {getLatestProperties, getProperties} from '../../api/properties';
import NoResults from '../../components/NoResults';
import {useNavigation} from '@react-navigation/native';

const ListHeader = ({
  userDetails,
  featuredLoading,
  featuredProperties,
  selectedCategory,
  setSelectedCategory,
  onSearch,
  handleCardPress,
}) => (
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

    <Searchbar onSearch={onSearch} />

    <View style={styles.featuredSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See all</Text>
        </TouchableOpacity>
      </View>

      {featuredLoading ? (
        <View style={styles.featuredLoadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : !featuredProperties || featuredProperties.length === 0 ? (
        <NoResults />
      ) : (
        <FlatList
          data={featuredProperties}
          renderItem={({item}) => (
            <FeaturedCard
              item={item}
              onPress={() => handleCardPress(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        />
      )}
    </View>

    <View style={styles.recommendationSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Our Recommendation</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See all</Text>
        </TouchableOpacity>
      </View>
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </View>
  </View>
);

const Home = () => {
  const navigation = useNavigation();
  const userDetails = useTypedSelector(selectedUser);

  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [recommendedLoading, setRecommendedLoading] = useState(true);

  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCardPress = id => {
    navigation.navigate('PropertyDetails', {id});
  };

  const handleSearch = searchText => {
    setQuery(searchText);
  };

  const fetchRecommendedProperties = async () => {
    try {
      setRecommendedLoading(true);
      const data = await getProperties({
        filter: selectedCategory,
        query,
        limit: 6,
      });
      setRecommendedProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setRecommendedLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, query]);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setFeaturedLoading(true);
        const data = await getLatestProperties();
        setFeaturedProperties(data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setFeaturedLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recommendedProperties}
        numColumns={2}
        renderItem={({item}) => <Card item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <ListHeader
            userDetails={userDetails}
            featuredLoading={featuredLoading}
            featuredProperties={featuredProperties}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSearch={handleSearch}
            handleCardPress={handleCardPress}
          />
        }
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          recommendedLoading ? (
            <View style={styles.recommendedLoadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <NoResults />
          )
        }
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
    paddingBottom: 30,
  },
  columnWrapper: {
    gap: 15,
    paddingHorizontal: 10,
  },
  featuredLoadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedLoadingContainer: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
