import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import icons from '../../constants/icons';
import Search from '../../components/Searchbar';
import Card from '../../components/Cards/Card';
import Filters from '../../components/Filters';
import NoResults from '../../components/NoResults';
import {getProperties} from '../../api/properties';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const ListHeader = ({navigation, setQuery, filter, setFilter, properties}) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerTop}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image source={icons.backArrow} style={styles.backArrowIcon} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Search for Your Ideal Home</Text>
      <Image source={icons.bell} style={styles.bellIcon} />
    </View>

    <Search onSearch={setQuery} />

    <View style={styles.filtersContainer}>
      <Filters selectedCategory={filter} setSelectedCategory={setFilter} />

      <Text style={styles.resultsCount}>
        Found {properties?.length} Properties
      </Text>
    </View>
  </View>
);

const Explore = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await getProperties({
        filter,
        query,
        limit: 20,
      });
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, query]);

  const handleCardPress = id => {
    // navigation.navigate('PropertyDetails', {id});
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={properties}
        numColumns={2}
        renderItem={({item}) => (
          <Card item={item} onPress={() => handleCardPress(item.id)} />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <ListHeader
            navigation={navigation}
            setQuery={setQuery}
            filter={filter}
            setFilter={setFilter}
            properties={properties}
          />
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: Colors.primary200,
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.black300,
    marginRight: 8,
    textAlign: 'center',
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  filtersContainer: {
    marginTop: 20,
  },
  resultsCount: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    color: Colors.black300,
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 30,
  },
  columnWrapper: {
    gap: 15,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Explore;
