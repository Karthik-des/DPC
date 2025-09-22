import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Alert, Image
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRhYTY0YmIzYjkwMjRmZjU5MGFhYjlmNjViN2M4M2FjIiwiaCI6Im11cm11cjY0In0=';

const DisplayScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const { fromAddress, toAddress, addAddress, dropAddress, mainPassengers, addPassengers, dropPassengers, date } = route.params || {};
  const [updatedFrom, setUpdatedFrom] = useState(fromAddress || '');
  const [updatedTo, setUpdatedTo] = useState(toAddress || '');
  const [updatedAdd, setUpdatedAdd] = useState(addAddress || '');
  const [updatedDrop, setUpdatedDrop] = useState(dropAddress || '');
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [addCoords, setAddCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [segmentDistances, setSegmentDistances] = useState([]);
  const [totalDistance, setTotalDistance] = useState('');
  const [duration, setDuration] = useState('');

  const mainPassengerCount = parseInt(mainPassengers || '1');
  const addPassengerCount = parseInt(addPassengers || '0');
  const dropPassengerCount = parseInt(dropPassengers || '0');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getRatePerKm = (type) => {
    switch (type) {
      case 'Luxury': return 15;
      case 'AC': return 14;
      default: return 13;
    }
  };

  const drivers = [
    { name: 'Rajesh Kumar', carModel: 'Toyota Innova', type: 'Luxury', carImage: 'https://cdn-icons-png.flaticon.com/512/3073/3073186.png' },
    { name: 'Anita Sharma', carModel: 'Hyundai Verna', type: 'AC', carImage: 'https://cdn-icons-png.flaticon.com/512/3073/3073186.png' },
    { name: 'Mohit Verma', carModel: 'Maruti Dzire', type: 'Non-AC', carImage: 'https://cdn-icons-png.flaticon.com/512/3073/3073186.png' },
    { name: 'Suresh Patel', carModel: 'Honda City', type: 'Luxury', carImage: 'https://cdn-icons-png.flaticon.com/512/3073/3073186.png' },
    { name: 'Priya Mehta', carModel: 'Tata Indigo', type: 'AC', carImage: 'https://cdn-icons-png.flaticon.com/512/3073/3073186.png' },
  ];

  const fetchCoordinatesAndRoute = async () => {
    try {
      const fromRes = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
        params: { api_key: API_KEY, text: updatedFrom },
      });
      const toRes = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
        params: { api_key: API_KEY, text: updatedTo },
      });
      let addRes, dropRes;
      if (updatedAdd) {
        addRes = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
          params: { api_key: API_KEY, text: updatedAdd },
        });
      }
      if (updatedDrop) {
        dropRes = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
          params: { api_key: API_KEY, text: updatedDrop },
        });
      }

      const from = fromRes.data.features[0]?.geometry?.coordinates;
      const to = toRes.data.features[0]?.geometry?.coordinates;
      const add = addRes ? addRes.data.features[0]?.geometry?.coordinates : null;
      const drop = dropRes ? dropRes.data.features[0]?.geometry?.coordinates : null;

      if (from && to) {
        const fromLatLng = { latitude: from[1], longitude: from[0] };
        const toLatLng = { latitude: to[1], longitude: to[0] };
        setFromCoords(fromLatLng);
        setToCoords(toLatLng);

        let coordinates = [from, to];
        let fitCoords = [fromLatLng, toLatLng];

        if (updatedAdd && add) {
          const addLatLng = { latitude: add[1], longitude: add[0] };
          setAddCoords(addLatLng);
          coordinates = [from, add, to];
          fitCoords = [fromLatLng, addLatLng, toLatLng];
        } else if (updatedDrop && drop) {
          const dropLatLng = { latitude: drop[1], longitude: drop[0] };
          setDropCoords(dropLatLng);
          coordinates = [from, drop, to];
          fitCoords = [fromLatLng, dropLatLng, toLatLng];
        }

        const directionsRes = await axios.post(
          `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
          { coordinates },
          {
            headers: {
              'Authorization': API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );

        const coords = directionsRes.data.features[0].geometry.coordinates.map(([lon, lat]) => ({
          latitude: lat,
          longitude: lon,
        }));
        setRouteCoords(coords);

        const segments = directionsRes.data.features[0].properties.segments;
        const distances = segments.map(segment => segment.distance / 1000);
        setSegmentDistances(distances);
        const totalKm = distances.reduce((acc, dist) => acc + dist, 0);
        setTotalDistance(totalKm.toFixed(2));

        const totalTime = segments.reduce((acc, segment) => acc + segment.duration, 0) / 60;
        setDuration(`${totalTime.toFixed(1)} min`);

        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.fitToCoordinates(fitCoords, {
              edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
              animated: true,
            });
          }
        }, 500);
      } else {
        console.warn('Failed to retrieve coordinates for From or To');
        Alert.alert('Error', 'Unable to retrieve coordinates for From or To. Please check the addresses.');
      }
    } catch (err) {
      console.error('Error fetching map data:', err.message);
      Alert.alert('Error', 'Failed to fetch route data. Please check your inputs and try again.');
    }
  };

  useEffect(() => {
    if (updatedFrom && updatedTo) {
      fetchCoordinatesAndRoute();
    }
  }, [updatedFrom, updatedTo, updatedAdd, updatedDrop]);

  const handleCreateRideAlert = () => {
    Alert.alert('Ride Alert Created', 'Your ride alert has been successfully posted!');
  };

  const calculateCosts = (rate, mainDistance, addDistance, dropDistance) => {
    let mainCost, addCost, dropCost, remainingPassengers;

    if (updatedAdd && addPassengerCount > 0 && segmentDistances.length > 1) {
      mainDistance = parseFloat(totalDistance);
      addDistance = segmentDistances[1];
      mainCost = mainDistance ? (mainDistance * rate * mainPassengerCount).toFixed(0) : '—';
      addCost = addDistance ? (addDistance * rate * addPassengerCount).toFixed(0) : '0';
      remainingPassengers = mainPassengerCount;
      return { mainCost, addCost, dropCost: '0', remainingPassengers };
    } else if (updatedDrop && dropPassengerCount > 0 && segmentDistances.length > 1) {
      dropDistance = segmentDistances[0];
      mainDistance = segmentDistances[1];
      remainingPassengers = mainPassengerCount - dropPassengerCount;
      mainCost = mainDistance ? (mainDistance * rate * remainingPassengers).toFixed(0) : '—';
      dropCost = dropDistance ? (dropDistance * rate * dropPassengerCount).toFixed(0) : '0';
      return { mainCost, addCost: '0', dropCost, remainingPassengers };
    } else {
      mainCost = mainDistance ? (mainDistance * rate * mainPassengerCount).toFixed(0) : '—';
      remainingPassengers = mainPassengerCount;
      return { mainCost, addCost: '0', dropCost: '0', remainingPassengers };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.headerContainer}>
         <View style={styles.head}>
                      <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                      >
                        <Ionicons name="arrow-back" size={24} color="#09C912" />
                      </TouchableOpacity>
                    
              
                    </View>
        <Text style={styles.headerTitle}>Available Rides</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.headerSubtitle}>Select your preferred ride option</Text>
            </View>

            <View style={styles.locationSummaryCard}>
              <View style={styles.routeIndicator}>
                <View style={styles.routeDotPrimary} />
                <View style={styles.routeLine} />
                {updatedAdd || updatedDrop ? (
                  <>
                    <View style={styles.routeDotSecondary} />
                    <View style={styles.routeLine} />
                  </>
                ) : null}
                <View style={styles.routeDotPrimary} />
              </View>
              
              <View style={styles.locationSummaryContent}>
                <View style={styles.locationRow}>
                  <MaterialIcons name="location-on" size={18} color="#3498DB" />
                  <Text style={styles.locationText} numberOfLines={1}>{updatedFrom}</Text>
                </View>
                
                {updatedAdd && (
                  <View style={styles.locationRow}>
                    <MaterialIcons name="add-location" size={16} color="#27AE60" />
                    <Text style={styles.locationTextAdd} numberOfLines={1}>{updatedAdd}</Text>
                  </View>
                )}
                
                {updatedDrop && (
                  <View style={styles.locationRow}>
                    <MaterialIcons name="location-off" size={16} color="#E74C3C" />
                    <Text style={styles.locationTextDrop} numberOfLines={1}>{updatedDrop}</Text>
                  </View>
                )}
                
                <View style={styles.locationRow}>
                  <MaterialIcons name="flag" size={18} color="#E74C3C" />
                  <Text style={styles.locationText} numberOfLines={1}>{updatedTo}</Text>
                </View>
                
                <View style={styles.passengerSummary}>
                  <View style={styles.passengerRow}>
                    <View style={styles.passengerInfo}>
                      <Ionicons name="people" size={16} color="#555" />
                      <Text style={styles.passengerText}>
                        {mainPassengerCount} Main {mainPassengerCount === 1 ? 'passenger' : 'passengers'}
                      </Text>
                    </View>
                    
                    {updatedAdd && addPassengerCount > 0 && (
                      <View style={styles.passengerInfo}>
                        <Ionicons name="person-add" size={16} color="#27AE60" />
                        <Text style={styles.passengerTextAdd}>
                          {addPassengerCount} Add
                        </Text>
                      </View>
                    )}
                    
                    {updatedDrop && dropPassengerCount > 0 && (
                      <View style={styles.passengerInfo}>
                        <Ionicons name="person-remove" size={16} color="#E74C3C" />
                        <Text style={styles.passengerTextDrop}>
                          {dropPassengerCount} Drop
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>

            {(totalDistance && duration) && (
              <View style={styles.distanceDurationContainer}>
                <View style={styles.distanceDurationRow}>
               <Ionicons name="trail-sign-outline" size={20} color="#555" />
                  <Text style={styles.distanceDurationText}>
                    Distance: <Text style={styles.highlight}>{totalDistance} km</Text>
                  </Text>
                </View>
                <View style={styles.distanceDurationRow}>
                  <Ionicons name="time" size={20} color="#555" />
                  <Text style={styles.distanceDurationText}>
                    Duration: <Text style={styles.highlight}>{duration}</Text>
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.mapContainer}>
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                  latitude: 20.5937,
                  longitude: 78.9629,
                  latitudeDelta: 8,
                  longitudeDelta: 8,
                }}
              >
                {fromCoords && <Marker coordinate={fromCoords} title="From" pinColor="#3498DB" />}
                {toCoords && <Marker coordinate={toCoords} title="To" pinColor="#E74C3C" />}
                {addCoords && updatedAdd && <Marker coordinate={addCoords} title="Add" pinColor="#27AE60" />}
                {dropCoords && updatedDrop && <Marker coordinate={dropCoords} title="Drop" pinColor="#E67E22" />}
                {routeCoords.length > 0 && (
                  <Polyline coordinates={routeCoords} strokeColor="#3498DB" strokeWidth={4} />
                )}
              </MapView>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.rideSectionTitle}>Available Drivers</Text>
              <Text style={styles.rideSectionSubtitle}>{drivers.length} options found</Text>
            </View>
          </>
        }
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item, index }) => {
          const rate = getRatePerKm(item.type);
          const mainDistance = segmentDistances.length > 1 ? parseFloat(totalDistance) : parseFloat(totalDistance);
          const addDistance = updatedAdd && segmentDistances.length > 1 ? segmentDistances[1] : 0;
          const dropDistance = updatedDrop && segmentDistances.length > 1 ? segmentDistances[0] : 0;

          const { mainCost, addCost, dropCost, remainingPassengers } = calculateCosts(rate, mainDistance, addDistance, dropDistance);

          const totalCost = totalDistance 
            ? `₹${(parseFloat(mainCost || 0) + parseFloat(addCost || 0) + parseFloat(dropCost || 0)).toFixed(0)}`
            : '—';

          const departureHour = 8 + index;
          const timeSlot = `${departureHour}:30 - ${departureHour + 1}:30`;
          const typeColor = '#09C912';
          const rating = (4.2 + Math.random() * 0.5).toFixed(1);

          return (
            <TouchableOpacity
              style={[styles.rideCard, { borderLeftColor: typeColor }]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('BookRideScreen', {
                selectedDriver: { ...item, rating },
                totalCost: (parseFloat(mainCost || 0) + parseFloat(addCost || 0) + parseFloat(dropCost || 0)).toFixed(0),
                fromAddress: updatedFrom,
                toAddress: updatedTo,
                addAddress: updatedAdd,
                dropAddress: updatedDrop,
                mainPassengers,
                addPassengers,
                dropPassengers,
                totalDistance,
                duration,
                timeSlot,
                date,
              })}
            >
              <View style={styles.driverCard}>
                <View style={styles.driverLeft}>
                  <View style={styles.driverHeader}>
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
                      style={styles.driverAvatar} 
                    />
                    <View>
                      <Text style={styles.driverName}>{item.name}</Text>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color="#F1C40F" />
                        <Text style={styles.ratingText}>{rating}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.carInfo}>
                    <Image 
                      source={{ uri: item.carImage }} 
                      style={styles.carIcon} 
                    />
                    <Text style={styles.carText}>
                      {item.carModel} · <Text style={{ color: '#555', fontWeight: '600' }}>{item.type}</Text>
                    </Text>
                  </View>
                  
                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={16} color="#555" />
                    <Text style={styles.timeText}>{timeSlot}</Text>
                  </View>
                </View>
                
                <View style={styles.driverRight}>
                  <Text style={styles.costText}>{totalCost}</Text>
                  <Text style={styles.costLabel}>Total Fare</Text>
                  
                  <View style={styles.costBreakdown}>
                    <Text style={styles.costDetail}>
                      Main: ₹{mainCost}
                    </Text>
                    {updatedAdd && addPassengerCount > 0 && (
                      <Text style={[styles.costDetail, styles.costDetailAdd]}>
                        + Add: ₹{addCost}
                      </Text>
                    )}
                    {updatedDrop && dropPassengerCount > 0 && (
                      <Text style={[styles.costDetail, styles.costDetailDrop]}>
                        - Drop: ₹{dropCost}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.createRideAlertButton}
              onPress={handleCreateRideAlert}
            >
              <Ionicons name="notifications" size={20} color="#fff" />
              <Text style={styles.createRideAlertText}>
                Create Ride Alert
              </Text>
            </TouchableOpacity>
            
            <Text style={styles.footerNote}>
              Can't find a suitable ride? Create an alert and we'll notify drivers.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  // Header with back button
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  locationSummaryCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  routeIndicator: {
    alignItems: 'center',
    marginRight: 12,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  routeDotPrimary: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#09C912',
  },
  routeDotSecondary: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#27AE60',
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#BDC3C7',
    marginVertical: 2,
  },
  locationSummaryContent: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  locationText: {
    fontSize: 15,
    color: '#2C3E50',
    marginLeft: 10,
    fontWeight: '500',
  },
  locationTextAdd: {
    fontSize: 14,
    color: '#27AE60',
    marginLeft: 10,
    fontWeight: '500',
  },
  locationTextDrop: {
    fontSize: 14,
    color: '#E74C3C',
    marginLeft: 10,
    fontWeight: '500',
  },
  passengerSummary: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
    paddingTop: 10,
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 6,
  },
  passengerTextAdd: {
    fontSize: 13,
    color: '#27AE60',
    marginLeft: 6,
  },
  passengerTextDrop: {
    fontSize: 13,
    color: '#E74C3C',
    marginLeft: 6,
  },
  distanceDurationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  distanceDurationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceDurationText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  highlight: {
    color: '#2C3E50',
    fontWeight: '600',
  },
  mapContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  map: {
    width: '100%',
    height: 200,
  },
  sectionHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  rideSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  rideSectionSubtitle: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 4,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#09C912',
  },
  driverCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  driverLeft: {
    flex: 2,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 4,
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  carIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  carText: {
    fontSize: 14,
    color: '#555',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 6,
  },
  driverRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  costText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  costLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 6,
  },
  costBreakdown: {
    alignItems: 'flex-end',
  },
  costDetail: {
    fontSize: 11,
    color: '#555',
    marginTop: 2,
  },
  costDetailAdd: {
    color: '#27AE60',
  },
  costDetailDrop: {
    color: '#E74C3C',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  createRideAlertButton: {
    flexDirection: 'row',
    backgroundColor: '#09C912',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  createRideAlertText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footerNote: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 12,
    marginHorizontal: 20,
    lineHeight: 18,
  },
});

export default DisplayScreen;