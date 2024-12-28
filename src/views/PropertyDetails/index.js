import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';

import {getPropertyById} from '../../api/properties';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import icons from '../../constants/icons';
import images from '../../constants/images';
import {facilities} from '../../constants/data';
import Comment from '../../components/Comment';

const PropertyDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {id} = route.params;
  const windowHeight = Dimensions.get('window').height;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading || !property) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={[styles.imageContainer, {height: windowHeight / 2}]}>
          <Image
            source={{uri: property.image}}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <Image source={images.whiteGradient} style={styles.gradientOverlay} />

          <View
            style={[
              styles.header,
              {
                top: Platform.OS === 'ios' ? 70 : 20,
              },
            ]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image source={icons.backArrow} style={styles.backIcon} />
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <Image source={icons.heart} style={styles.actionIcon} />
              <Image source={icons.send} style={styles.actionIcon} />
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.propertyName}>{property.name}</Text>

          <View style={styles.tagContainer}>
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>{property.type}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Image source={icons.star} style={styles.starIcon} />
              <Text style={styles.ratingText}>
                {property.rating} ({property.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View style={styles.amenitiesRow}>
            <View style={styles.amenityItem}>
              <View style={styles.amenityIcon}>
                <Image source={icons.bed} style={styles.amenityImage} />
              </View>
              <Text style={styles.amenityText}>{property.bedrooms} Beds</Text>
            </View>

            <View style={styles.amenityItem}>
              <View style={styles.amenityIcon}>
                <Image source={icons.bath} style={styles.amenityImage} />
              </View>
              <Text style={styles.amenityText}>{property.bathrooms} Baths</Text>
            </View>

            <View style={styles.amenityItem}>
              <View style={styles.amenityIcon}>
                <Image source={icons.area} style={styles.amenityImage} />
              </View>
              <Text style={styles.amenityText}>{property.area} sqft</Text>
            </View>
          </View>

          {/* Agent Section */}
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionTitle}>Agent</Text>
            <View style={styles.agentContainer}>
              <View style={styles.agentInfo}>
                <Image
                  source={{uri: property.agent.avatar}}
                  style={styles.agentAvatar}
                />
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>{property.agent.name}</Text>
                  <Text style={styles.agentEmail}>{property.agent.email}</Text>
                </View>
              </View>
              <View style={styles.agentActions}>
                <Image source={icons.chat} style={styles.actionIcon} />
                <Image source={icons.phone} style={styles.actionIcon} />
              </View>
            </View>
          </View>

          {/* Overview Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.descriptionText}>{property.description}</Text>
          </View>

          {/* Facilities Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            {property.facilities.length > 0 && (
              <View style={styles.facilitiesContainer}>
                {property.facilities.map((item, index) => {
                  const facility = facilities.find(f => f.title === item);
                  return (
                    <View key={index} style={styles.facilityItem}>
                      <View style={styles.facilityIconContainer}>
                        <Image
                          source={facility ? facility.icon : icons.info}
                          style={styles.facilityIcon}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.facilityText}>
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {/* Gallery Section */}
          {property.gallery.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Gallery</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={property.gallery}
                keyExtractor={item => item.$id}
                contentContainerStyle={styles.galleryList}
                renderItem={({item}) => (
                  <Image
                    source={{uri: item.image}}
                    style={styles.galleryImage}
                  />
                )}
              />
            </View>
          )}

          {/* Location Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationContainer}>
              <Image source={icons.location} style={styles.locationIcon} />
              <Text style={styles.locationText}>{property.address}</Text>
            </View>
            <Image source={images.map} style={styles.mapImage} />
          </View>

          {/* Reviews Section */}
          {property.reviews.length > 0 && (
            <View style={styles.section}>
              <View style={styles.reviewsHeader}>
                <View style={styles.ratingContainer}>
                  <Image source={icons.star} style={styles.starIcon} />
                  <Text style={styles.sectionTitle}>
                    {property.rating} ({property.reviews.length} reviews)
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.reviewContainer}>
                <Comment item={property.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      {/* <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>${property.price}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 40,
  },
  header: {
    position: 'absolute',
    left: 28,
    right: 28,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary200,
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 28,
    height: 28,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 28,
    gap: 8,
  },
  propertyName: {
    fontSize: 24,
    fontFamily: Fonts.rubikExtrabold,
    color: Colors.black300,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeTag: {
    backgroundColor: Colors.primary100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 12,
    fontFamily: Fonts.rubikBold,
    color: Colors.primary300,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: Fonts.rubikMedium,
    color: Colors.black200,
    marginTop: 4,
  },
  amenitiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 28,
  },
  amenityIcon: {
    backgroundColor: Colors.primary100,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityImage: {
    width: 16,
    height: 16,
  },
  amenityText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: Fonts.rubikMedium,
    color: Colors.black300,
  },
  sectionDivider: {
    borderTopWidth: 1,
    borderColor: Colors.primary200,
    paddingTop: 28,
    marginTop: 20,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.rubikBold,
    color: Colors.black300,
  },
  agentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  agentDetails: {
    marginLeft: 12,
  },
  agentName: {
    fontSize: 18,
    fontFamily: Fonts.rubikBold,
    color: Colors.black300,
  },
  agentEmail: {
    fontSize: 14,
    fontFamily: Fonts.rubikMedium,
    color: Colors.black200,
  },
  agentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: Fonts.rubik,
    color: Colors.black200,
    marginTop: 8,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 8,
  },
  facilityItem: {
    flex: 1,
    minWidth: 64,
    maxWidth: 80,
    alignItems: 'center',
  },
  facilityIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: Colors.primary100,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilityIcon: {
    width: 24,
    height: 24,
  },
  facilityText: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.rubik,
    color: Colors.black300,
  },
  galleryList: {
    gap: 16,
    marginTop: 12,
  },
  galleryImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  locationIcon: {
    width: 28,
    height: 28,
  },
  locationText: {
    fontSize: 14,
    fontFamily: Fonts.rubikMedium,
    color: Colors.black200,
  },
  mapImage: {
    width: '100%',
    height: 208,
    borderRadius: 12,
    marginTop: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reviewContainer: {
    marginTop: 16,
  },
  viewAllText: {
    fontSize: 16,
    fontFamily: Fonts.rubikBold,
    color: Colors.primary300,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.primary200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 28,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: Fonts.rubikMedium,
    color: Colors.black200,
  },
  priceValue: {
    fontSize: 24,
    fontFamily: Fonts.rubikBold,
    color: Colors.primary300,
    textAlign: 'left',
    flex: 1,
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary300,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookButtonText: {
    fontSize: 18,
    fontFamily: Fonts.rubikBold,
    color: 'white',
    textAlign: 'center',
  },
});

export default PropertyDetails;
