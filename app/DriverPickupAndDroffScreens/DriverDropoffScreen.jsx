import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, SafeAreaView, StatusBar, Platform, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './DriverDropoffStyles';

const { width, height } = Dimensions.get('window');

const DriverDropoffScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pickupLocation, pickupAddress } = route.params || {};
  
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Searching for location...');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to proceed.');
        return;
      }
      try {
        let locationData = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        updateAddress(locationData.coords.latitude, locationData.coords.longitude);
      } catch (error) {
        Alert.alert('Location Error', 'Unable to fetch current location.');
      }
    })();
  }, []);

  const updateAddress = async (lat, lng) => {
    try {
      let reverseGeocode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      if (reverseGeocode.length > 0) {
        setAddress(`${reverseGeocode[0].name}, ${reverseGeocode[0].city || reverseGeocode[0].district}, ${reverseGeocode[0].country}`);
      } else {
        setAddress('Address not available');
      }
    } catch (error) {
      setAddress('Error fetching address');
    }
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Search Error', 'Please enter a location to search for.');
      return;
    }

    setIsSearching(true);
    try {
      const geocodeResults = await Location.geocodeAsync(searchQuery);
      
      if (geocodeResults.length > 0) {
        const { latitude, longitude } = geocodeResults[0];
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        
        setLocation(newRegion);
        updateAddress(latitude, longitude);
        mapRef.current?.animateToRegion(newRegion, 1000);
        setSearchQuery('');
        setIsLocationSelected(true);
      } else {
        Alert.alert('Location Not Found', `No results found for "${searchQuery}". Please try a different search term.`);
      }
    } catch (error) {
      Alert.alert('Search Error', 'Unable to search for the location. Please check your internet connection and try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }
    try {
      let locationData = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocation(newRegion);
      updateAddress(locationData.coords.latitude, locationData.coords.longitude);
      mapRef.current?.animateToRegion(newRegion, 1000);
      setIsLocationSelected(true);
    } catch (error) {
      Alert.alert('Location Error', 'Unable to fetch current location.');
    }
  };

  const handleNext = () => {
    if (!isLocationSelected) {
      Alert.alert('Location Required', 'Please select a dropoff location before proceeding.');
      return;
    }
    // Navigate to RouteSelectionScreen with both pickup and dropoff data
    navigation.navigate('RouteSelectionScreen', {
      pickupLocation,
      pickupAddress,
      dropoffLocation: location,
      dropoffAddress: address
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen"
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Dropoff Location</Text>
        {isLocationSelected && (
          <TouchableOpacity
            onPress={handleNext}
            style={styles.forwardButton}
            accessibilityLabel="Continue to publish ride"
            accessibilityHint="Proceeds to publish the ride"
          >
            <Ionicons name="checkmark" size={24} color="#09C912" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for dropoff location"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
            returnKeyType="search"
            onSubmitEditing={searchLocation}
            editable={!isSearching}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={searchLocation}
            disabled={isSearching || !searchQuery.trim()}
          >
            <Ionicons 
              name={isSearching ? "hourglass" : "search"} 
              size={20} 
              color={isSearching || !searchQuery.trim() ? "#999" : "#09C912"} 
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleCurrentLocation}
          accessibilityLabel="Use current location"
          accessibilityHint="Centers the map on your current location"
        >
          <LinearGradient
            colors={['#09C912', '#07A90A']}
            style={styles.gradient}
          >
            <Ionicons name="locate" size={20} color="#FFF" />
            <Text style={styles.locationButtonText}>Current Location</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          region={location}
          onRegionChangeComplete={(region) => {
            updateAddress(region.latitude, region.longitude);
          }}
        >
          <Marker coordinate={location} title={address} />
        </MapView>
      )}
      
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>Dropoff Location: {address}</Text>
        {pickupAddress && (
          <Text style={styles.pickupAddressText}>From: {pickupAddress}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DriverDropoffScreen;
