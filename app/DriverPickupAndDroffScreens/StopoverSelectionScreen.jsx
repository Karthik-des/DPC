import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './StopoverSelectionStyles';

const { width, height } = Dimensions.get('window');

const StopoverSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pickupLocation, pickupAddress, dropoffLocation, dropoffAddress, selectedRoute } = route.params || {};

  const [stopovers, setStopovers] = useState([]);
  const [selectedStopovers, setSelectedStopovers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);

  // Get stopovers based on the selected route coordinates
  const getRouteStopovers = (routeCoords) => {
    if (!routeCoords || routeCoords.length < 2) return [];

    const startLat = routeCoords[0].latitude;
    const startLng = routeCoords[0].longitude;
    const endLat = routeCoords[routeCoords.length - 1].latitude;
    const endLng = routeCoords[routeCoords.length - 1].longitude;
    const routeStopovers = [];

    // Approximate stopovers based on start and end coordinates
    if (startLat >= 12.7 && startLat <= 12.8 && endLat >= 12.2 && endLat <= 12.4 &&
        startLng >= 78.3 && startLng <= 78.4 && endLng >= 76.6 && endLng <= 76.7) {
      // Kuppam to Mysore
      routeStopovers.push(
        { id: 1, name: 'Hosur', state: 'Tamil Nadu', coordinates: { latitude: 12.7400, longitude: 77.8300 }, distance: '45 km', popularity: 'High', passengerCount: '15-20' },
        { id: 2, name: 'Krishnagiri', state: 'Tamil Nadu', coordinates: { latitude: 12.5200, longitude: 78.1200 }, distance: '85 km', popularity: 'Medium', passengerCount: '8-12' },
        { id: 3, name: 'Mysore', state: 'Karnataka', coordinates: { latitude: 12.2958, longitude: 76.6394 }, distance: '150 km', popularity: 'Very High', passengerCount: '25-35' }
      );
    } else if (startLat >= 8.0 && startLat <= 8.2 && endLat >= 32.5 && endLat <= 33.0 &&
               startLng >= 77.5 && startLng <= 77.6 && endLng >= 74.8 && endLng <= 75.0) {
      // Kanyakumari to Jammu & Kashmir
      routeStopovers.push(
        { id: 4, name: 'Madurai', state: 'Tamil Nadu', coordinates: { latitude: 9.9252, longitude: 78.1198 }, distance: '250 km', popularity: 'High', passengerCount: '18-25' },
        { id: 5, name: 'Hyderabad', state: 'Telangana', coordinates: { latitude: 17.3850, longitude: 78.4867 }, distance: '1500 km', popularity: 'Very High', passengerCount: '30-40' },
        { id: 6, name: 'Delhi', state: 'Delhi', coordinates: { latitude: 28.7041, longitude: 77.1025 }, distance: '2800 km', popularity: 'Very High', passengerCount: '40-50' }
      );
    } else if (startLat >= 13.0 && startLat <= 13.1 && endLat >= 12.9 && endLat <= 13.0 &&
               startLng >= 80.2 && startLng <= 80.3 && endLng >= 77.5 && endLng <= 77.6) {
      // Chennai to Bangalore
      routeStopovers.push(
        { id: 7, name: 'Vellore', state: 'Tamil Nadu', coordinates: { latitude: 12.9165, longitude: 79.1325 }, distance: '140 km', popularity: 'Medium', passengerCount: '10-15' },
        { id: 8, name: 'Krishnagiri', state: 'Tamil Nadu', coordinates: { latitude: 12.5200, longitude: 78.1200 }, distance: '250 km', popularity: 'High', passengerCount: '15-20' },
        { id: 9, name: 'Bangalore', state: 'Karnataka', coordinates: { latitude: 12.9716, longitude: 77.5946 }, distance: '350 km', popularity: 'Very High', passengerCount: '35-45' }
      );
    } else if (startLat >= 18.9 && startLat <= 19.1 && endLat >= 28.5 && endLat <= 28.7 &&
               startLng >= 72.8 && startLng <= 72.9 && endLng >= 77.1 && endLng <= 77.2) {
      // Mumbai to Delhi
      routeStopovers.push(
        { id: 10, name: 'Pune', state: 'Maharashtra', coordinates: { latitude: 18.5204, longitude: 73.8567 }, distance: '150 km', popularity: 'High', passengerCount: '20-30' },
        { id: 11, name: 'Jaipur', state: 'Rajasthan', coordinates: { latitude: 26.9124, longitude: 75.7873 }, distance: '1000 km', popularity: 'Very High', passengerCount: '30-40' },
        { id: 12, name: 'Delhi', state: 'Delhi', coordinates: { latitude: 28.7041, longitude: 77.1025 }, distance: '1400 km', popularity: 'Very High', passengerCount: '40-50' }
      );
    } else {
      // Fallback for other routes
      routeStopovers.push(
        { id: 13, name: 'Nagpur', state: 'Maharashtra', coordinates: { latitude: 21.1458, longitude: 79.0882 }, distance: '500 km', popularity: 'Medium', passengerCount: '15-20' },
        { id: 14, name: 'Bhopal', state: 'Madhya Pradesh', coordinates: { latitude: 23.2599, longitude: 77.4126 }, distance: '800 km', popularity: 'High', passengerCount: '20-30' },
        { id: 15, name: 'Lucknow', state: 'Uttar Pradesh', coordinates: { latitude: 26.8467, longitude: 80.9462 }, distance: '1200 km', popularity: 'Very High', passengerCount: '30-40' }
      );
    }

    return routeStopovers.map((stop, index) => ({
      ...stop,
      color: ['#09C912', '#FF6B35', '#4A90E2', '#9B59B6', '#E67E22', '#1ABC9C'][index % 6]
    }));
  };

  useEffect(() => {
    if (selectedRoute && selectedRoute.coordinates) {
      setTimeout(() => {
        const dynamicStopovers = getRouteStopovers(selectedRoute.coordinates);
        setStopovers(dynamicStopovers);
        setIsLoading(false);
      }, 1000);
    }
  }, [selectedRoute]);

  const handleStopoverToggle = (stopover) => {
    setSelectedStopovers(prev => {
      const isSelected = prev.some(item => item.id === stopover.id);
      if (isSelected) {
        return prev.filter(item => item.id !== stopover.id);
      } else {
        return [...prev, stopover];
      }
    });
  };

  const handleContinue = () => {
    navigation.navigate('CalendarScreen', {
      pickupLocation,
      pickupAddress,
      dropoffLocation,
      dropoffAddress,
      selectedRoute,
      selectedStopovers
    });
  };

  const handleSkip = () => {
    navigation.navigate('CalendarScreen', {
      pickupLocation,
      pickupAddress,
      dropoffLocation,
      dropoffAddress,
      selectedRoute,
      selectedStopovers: []
    });
  };

  const getPopularityColor = (popularity) => {
    switch (popularity.toLowerCase()) {
      case 'very high': return '#E74C3C';
      case 'high': return '#09C912';
      case 'medium': return '#FF6B35';
      case 'low': return '#95A5A6';
      default: return '#666';
    }
  };

  const getPopularityIcon = (popularity) => {
    switch (popularity.toLowerCase()) {
      case 'very high': return 'trending-up';
      case 'high': return 'arrow-up';
      case 'medium': return 'remove';
      case 'low': return 'arrow-down';
      default: return 'help-circle';
    }
  };

  const renderStopoverItem = ({ item }) => {
    const isSelected = selectedStopovers.some(selected => selected.id === item.id);
    return (
      <TouchableOpacity
        style={[
          styles.stopoverCard,
          isSelected && styles.selectedStopoverCard
        ]}
        onPress={() => handleStopoverToggle(item)}
      >
        <View style={styles.stopoverHeader}>
          <View style={styles.stopoverInfo}>
            <Text style={styles.stopoverName}>{item.name}</Text>
            <Text style={styles.stopoverState}>{item.state}</Text>
            <Text style={styles.stopoverDistance}>{item.distance}</Text>
          </View>
          <View style={styles.stopoverActions}>
            <View style={[styles.popularityBadge, { backgroundColor: getPopularityColor(item.popularity) }]}>
              <Ionicons name={getPopularityIcon(item.popularity)} size={12} color="#FFF" />
              <Text style={styles.popularityText}>{item.popularity}</Text>
            </View>
            {isSelected && (
              <Ionicons name="checkmark-circle" size={24} color="#09C912" />
            )}
          </View>
        </View>
        <View style={styles.stopoverDetails}>
          <View style={styles.passengerInfo}>
            <Ionicons name="people" size={16} color="#666" />
            <Text style={styles.passengerText}>{item.passengerCount}</Text>
          </View>
          <View style={styles.routeIndicator}>
            <View style={[styles.routeDot, { backgroundColor: item.color }]} />
            <Text style={styles.routeText}>On Route</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading || !selectedRoute) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#09C912" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Stopovers</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Ionicons name="location" size={60} color="#09C912" />
          <Text style={styles.loadingText}>Finding popular locations...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Stopovers</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.routeInfo}>
        <View style={styles.locationRow}>
          <View style={styles.locationDot} />
          <Text style={styles.locationText}>{pickupAddress}</Text>
        </View>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: '#E74C3C' }]} />
          <Text style={styles.locationText}>{dropoffAddress}</Text>
        </View>
        {selectedRoute && (
          <View style={styles.routeInfoRow}>
            <Ionicons name="map" size={16} color="#09C912" />
            <Text style={styles.routeInfoText}>
              {selectedRoute.name} • {selectedRoute.distance} • {selectedRoute.duration}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: pickupLocation?.latitude || 12.9716,
            longitude: pickupLocation?.longitude || 77.5946,
            latitudeDelta: 2.0,
            longitudeDelta: 2.0,
          }}
        >
          {pickupLocation && (
            <Marker coordinate={pickupLocation} title="Pickup Location" pinColor="green" />
          )}
          {dropoffLocation && (
            <Marker coordinate={dropoffLocation} title="Dropoff Location" pinColor="red" />
          )}
          {stopovers.map((stopover) => {
            const isSelected = selectedStopovers.some(selected => selected.id === stopover.id);
            return (
              <Marker
                key={stopover.id}
                coordinate={stopover.coordinates}
                title={stopover.name}
                pinColor={isSelected ? "blue" : "orange"}
              />
            );
          })}
          {selectedRoute && (
            <Polyline
              coordinates={selectedRoute.coordinates}
              strokeColor={selectedRoute.color}
              strokeWidth={4}
            />
          )}
        </MapView>
      </View>

      <View style={styles.stopoversContainer}>
        <View style={styles.stopoversHeader}>
          <Text style={styles.stopoversTitle}>Popular Stopovers</Text>
          <Text style={styles.stopoversSubtitle}>
            Select cities to pick up more passengers
          </Text>
        </View>
        <FlatList
          data={stopovers}
          renderItem={renderStopoverItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.stopoversList}
        />
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip Stopovers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <LinearGradient colors={['#09C912', '#07A90A']} style={styles.continueGradient}>
            <Ionicons name="checkmark" size={20} color="#FFF" />
            <Text style={styles.continueButtonText}>
              Continue ({selectedStopovers.length} selected)
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StopoverSelectionScreen;