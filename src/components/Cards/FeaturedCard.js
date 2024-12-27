import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import icons from '../../constants/icons';
import images from '../../constants/images';
import Fonts from '../../constants/fonts';
import Colors from '../../constants/colors';

const FeaturedCard = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        //   source={{uri: item.image}}
        source={images.japan}
        style={styles.mainImage}
      />

      <Image
        source={images.cardGradient}
        style={[styles.mainImage, styles.gradientOverlay]}
      />

      <View style={styles.ratingContainer}>
        <Image source={icons.star} style={styles.starIcon} />
        <Text style={styles.ratingText}>
          {/* {item.rating} */}
          4.5
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {/* {item.name} */}
          The Coffee House
        </Text>
        <Text style={styles.addressText} numberOfLines={1}>
          {/* {item.address} */}
          41-51 Grey St, St Kilda, Melbourne
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            ${/* {item.price} */}
            5,000
          </Text>
          <Image source={icons.heart} style={styles.heartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 320,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: Fonts.BOLD,
    color: Colors.primary,
    marginLeft: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  nameText: {
    fontSize: 20,
    fontFamily: Fonts.EXTRA_BOLD,
    color: '#FFFFFF',
  },
  addressText: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: '#FFFFFF',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  priceText: {
    fontSize: 20,
    fontFamily: Fonts.EXTRA_BOLD,
    color: '#FFFFFF',
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
});

export default FeaturedCard;
