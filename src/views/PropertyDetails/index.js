import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {getPropertyById} from '../../api/properties';

const PropertyDetails = () => {
  const route = useRoute();
  const {id} = route.params;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('Property:', property);

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

  return (
    <View>
      <Text>PropertyDetails</Text>
    </View>
  );
};

export default PropertyDetails;
