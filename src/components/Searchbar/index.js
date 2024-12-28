import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import icons from '../../constants/icons';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const Searchbar = ({onSearch}) => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedCallback(text => {
    // console.log('Debounced search:', text);
    onSearch(text);
  }, 500);

  const handleSearch = text => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Image source={icons.search} style={styles.searchIcon} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          placeholderTextColor={Colors.black300}
          style={styles.input}
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.accent100,
    borderWidth: 1,
    borderColor: Colors.primary100,
    marginTop: 20,
    paddingVertical: 8,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: Colors.black300,
    marginLeft: 8,
    padding: 0, // Remove default padding
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
});

export default Searchbar;
