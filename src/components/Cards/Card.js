import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import icons from '../../constants/icons';
import Fonts from '../../constants/fonts';
import Colors from '../../constants/colors';
import images from '../../constants/images';

const Card = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.ratingContainer}>
        <Image source={icons.star} style={styles.starIcon} />
        <Text style={styles.ratingText}>
          {/* {item.rating} */}
          4.5
        </Text>
      </View>

      <Image
        //   source={{uri: item.image}}
        source={images.newYork}
        style={styles.mainImage}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>
          {/* {item.name} */}
          The Coffee House
        </Text>
        <Text style={styles.addressText}>
          {/* {item.address} */}
          41-51 Grey St, St Kilda, Melbourne
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            ${/* {item.price} */}
            5,000
          </Text>
          <Image
            source={icons.heart}
            style={styles.heartIcon}
            tintColor={Colors.greyDark}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    padding: 4,
    paddingHorizontal: 8,
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    zIndex: 50,
  },
  starIcon: {
    width: 10,
    height: 10,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: Fonts.BOLD,
    color: Colors.primary,
    marginLeft: 2,
  },
  mainImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 8,
  },
  nameText: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    color: Colors.greyDark,
  },
  addressText: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.greyLight,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceText: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    color: Colors.primary,
  },
  heartIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default Card;
