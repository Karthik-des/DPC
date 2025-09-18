import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './RouteSelectionStyles';

const { width, height } = Dimensions.get('window');

const RouteSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pickupLocation, pickupAddress, dropoffLocation, dropoffAddress } = route.params || {};
  
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);

  // Route colors for different options
  const routeColors = ['#09C912', '#FF6B35', '#4A90E2', '#9B59B6', '#E67E22'];
  
  // Generate realistic route data based on pickup and dropoff locations
  const generateRoutes = (pickup, dropoff) => {
    if (!pickup || !dropoff) return [];
    
    const distance = calculateDistance(pickup.latitude, pickup.longitude, dropoff.latitude, dropoff.longitude);
    const baseDuration = Math.round(distance / 60); // Base duration in hours
    
    return [
      {
        id: 1,
        name: 'Fastest Route',
        distance: `${Math.round(distance)} km`,
        duration: `${Math.floor(baseDuration)}h ${Math.round((baseDuration % 1) * 60)}m`,
        traffic: 'Low',
        color: routeColors[0],
        coordinates: generateRouteCoordinates(pickup, dropoff, 'fastest')
      },
      {
        id: 2,
        name: 'Scenic Route',
        distance: `${Math.round(distance * 1.15)} km`,
        duration: `${Math.floor(baseDuration * 1.3)}h ${Math.round(((baseDuration * 1.3) % 1) * 60)}m`,
        traffic: 'Medium',
        color: routeColors[1],
        coordinates: generateRouteCoordinates(pickup, dropoff, 'scenic')
      },
      {
        id: 3,
        name: 'Avoid Highways',
        distance: `${Math.round(distance * 1.08)} km`,
        duration: `${Math.floor(baseDuration * 1.2)}h ${Math.round(((baseDuration * 1.2) % 1) * 60)}m`,
        traffic: 'Low',
        color: routeColors[2],
        coordinates: generateRouteCoordinates(pickup, dropoff, 'avoid_highways')
      },
      {
        id: 4,
        name: 'Shortest Distance',
        distance: `${Math.round(distance * 0.95)} km`,
        duration: `${Math.floor(baseDuration * 1.1)}h ${Math.round(((baseDuration * 1.1) % 1) * 60)}m`,
        traffic: 'High',
        color: routeColors[3],
        coordinates: generateRouteCoordinates(pickup, dropoff, 'shortest')
      }
    ];
  };

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Generate route coordinates with different patterns
  const generateRouteCoordinates = (pickup, dropoff, type) => {
    const coordinates = [pickup];
    
    // Add intermediate points based on route type
    const midLat = (pickup.latitude + dropoff.latitude) / 2;
    const midLon = (pickup.longitude + dropoff.longitude) / 2;
    
    switch (type) {
      case 'fastest':
        // Direct route with slight curve
        coordinates.push({
          latitude: midLat + (Math.random() - 0.5) * 0.1,
          longitude: midLon + (Math.random() - 0.5) * 0.1
        });
        break;
      case 'scenic':
        // More curved route
        coordinates.push({
          latitude: midLat + (Math.random() - 0.5) * 0.2,
          longitude: midLon + (Math.random() - 0.5) * 0.2
        });
        coordinates.push({
          latitude: midLat + (Math.random() - 0.5) * 0.15,
          longitude: midLon + (Math.random() - 0.5) * 0.15
        });
        break;
      case 'avoid_highways':
        // Route that avoids main roads
        coordinates.push({
          latitude: midLat + (Math.random() - 0.5) * 0.3,
          longitude: midLon + (Math.random() - 0.5) * 0.3
        });
        break;
      case 'shortest':
        // Almost direct route
        coordinates.push({
          latitude: midLat + (Math.random() - 0.5) * 0.05,
          longitude: midLon + (Math.random() - 0.5) * 0.05
        });
        break;
    }
    
    coordinates.push(dropoff);
    return coordinates;
  };

  useEffect(() => {
    // Generate routes based on pickup and dropoff locations
    setTimeout(() => {
      const generatedRoutes = generateRoutes(pickupLocation, dropoffLocation);
      setRoutes(generatedRoutes);
      setSelectedRoute(generatedRoutes[0]); // Select first route by default
      setIsLoading(false);
    }, 1500);
  }, [pickupLocation, dropoffLocation]);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    // Animate map to show selected route
    if (mapRef.current && route.coordinates.length > 0) {
      mapRef.current.fitToCoordinates(route.coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const handleConfirmRoute = () => {
    if (!selectedRoute) {
      Alert.alert('No Route Selected', 'Please select a route before proceeding.');
      return;
    }
    
    // Navigate to StopoverSelectionScreen with selected route
    navigation.navigate('StopoverSelectionScreen', {
      pickupLocation,
      pickupAddress,
      dropoffLocation,
      dropoffAddress,
      selectedRoute
    });
  };

  const getTrafficColor = (traffic) => {
    switch (traffic.toLowerCase()) {
      case 'low': return '#09C912';
      case 'medium': return '#FF6B35';
      case 'high': return '#E74C3C';
      default: return '#666';
    }
  };

  const getTrafficIcon = (traffic) => {
    switch (traffic.toLowerCase()) {
      case 'low': return 'checkmark-circle';
      case 'medium': return 'warning';
      case 'high': return 'alert-circle';
      default: return 'help-circle';
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#09C912" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Route</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Ionicons name="map" size={60} color="#09C912" />
          <Text style={styles.loadingText}>Finding best routes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Route</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Route Info */}
      <View style={styles.routeInfo}>
        <View style={styles.locationRow}>
          <View style={styles.locationDot} />
          <Text style={styles.locationText}>{pickupAddress}</Text>
        </View>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: '#E74C3C' }]} />
          <Text style={styles.locationText}>{dropoffAddress}</Text>
        </View>
      </View>

      {/* Map */}
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
          {/* Pickup Marker */}
          {pickupLocation && (
            <Marker
              coordinate={pickupLocation}
              title="Pickup Location"
              pinColor="green"
            />
          )}
          
          {/* Dropoff Marker */}
          {dropoffLocation && (
            <Marker
              coordinate={dropoffLocation}
              title="Dropoff Location"
              pinColor="red"
            />
          )}
          
          {/* Route Polylines */}
          {routes.map((route) => (
            <Polyline
              key={route.id}
              coordinates={route.coordinates}
              strokeColor={route.color}
              strokeWidth={selectedRoute?.id === route.id ? 6 : 3}
              strokeOpacity={selectedRoute?.id === route.id ? 1.0 : 0.6}
            />
          ))}
        </MapView>
      </View>

      {/* Route Options */}
      <View style={styles.routesContainer}>
        <Text style={styles.routesTitle}>Available Routes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.routesScroll}>
          {routes.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={[
                styles.routeCard,
                selectedRoute?.id === route.id && styles.selectedRouteCard
              ]}
              onPress={() => handleRouteSelect(route)}
            >
              <View style={styles.routeHeader}>
                <View style={[styles.routeColor, { backgroundColor: route.color }]} />
                <Text style={styles.routeName}>{route.name}</Text>
              </View>
              
              <View style={styles.routeDetails}>
                <View style={styles.routeDetail}>
                  <Ionicons name="time" size={16} color="#666" />
                  <Text style={styles.routeDetailText}>{route.duration}</Text>
                </View>
                <View style={styles.routeDetail}>
                  <Ionicons name="location" size={16} color="#666" />
                  <Text style={styles.routeDetailText}>{route.distance}</Text>
                </View>
                <View style={styles.routeDetail}>
                  <Ionicons 
                    name={getTrafficIcon(route.traffic)} 
                    size={16} 
                    color={getTrafficColor(route.traffic)} 
                  />
                  <Text style={[styles.routeDetailText, { color: getTrafficColor(route.traffic) }]}>
                    {route.traffic} Traffic
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Confirm Button */}
      <View style={styles.confirmContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmRoute}
        >
          <LinearGradient
            colors={['#09C912', '#07A90A']}
            style={styles.confirmGradient}
          >
            <Ionicons name="checkmark" size={20} color="#FFF" />
            <Text style={styles.confirmButtonText}>Confirm Route</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RouteSelectionScreen;
