import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {categories} from '../../constants/data';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const Filters = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryPress = category => {
    if (selectedCategory === category) {
      setSelectedCategory('All');
      return;
    }
    setSelectedCategory(category);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === item.category
              ? styles.selectedButton
              : styles.unselectedButton,
          ]}>
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.category
                ? styles.selectedText
                : styles.unselectedText,
            ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 12,
    marginBottom: 8,
  },
  categoryButton: {
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
  },
  selectedButton: {
    backgroundColor: Colors.primary,
  },
  unselectedButton: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primaryMedium,
  },
  categoryText: {
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
    fontFamily: Fonts.BOLD,
    marginTop: 2,
  },
  unselectedText: {
    color: Colors.greyDark,
    fontFamily: Fonts.REGULAR,
  },
});

export default Filters;
