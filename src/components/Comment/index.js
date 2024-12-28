import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import icons from '../../constants/icons';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const Comment = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <Text style={styles.reviewText}>{item.review}</Text>

      <View style={styles.footerContainer}>
        <View style={styles.likeContainer}>
          <Image
            source={icons.heart}
            style={[styles.heartIcon, {tintColor: '#0061FF'}]}
          />
          <Text style={styles.likeCount}>120</Text>
        </View>
        <Text style={styles.dateText}>
          {new Date(item.createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  name: {
    fontSize: 16,
    color: Colors.greyDark,
    fontFamily: Fonts.BOLD,
    marginLeft: 12,
  },
  reviewText: {
    color: Colors.greyMedium,
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    marginTop: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  likeCount: {
    color: Colors.greyDark,
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    marginLeft: 8,
  },
  dateText: {
    color: Colors.greyLight,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
  },
});

export default Comment;
