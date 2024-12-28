import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import images from '../../constants/images';
import Fonts from '../../constants/fonts';

const NoResults = () => {
  return (
    <View style={styles.container}>
      <Image
        source={images.noResult}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Result</Text>
      <Text style={styles.subtitle}>We could not find any result</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '92%',
    height: 250,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: '#333333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
});

export default NoResults;
