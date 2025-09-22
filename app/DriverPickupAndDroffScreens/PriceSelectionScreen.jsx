import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const PriceSelectionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    date,
    time,
    pickupAddress,
    dropoffAddress,
    selectedRoute,
    selectedStopovers,
  } = route.params || {};
  
  // Extract distance from selectedRoute and calculate base price (2 INR per km)
  const [price, setPrice] = useState(0);
  const minPrice = 10; // Minimum price in INR
  const maxPrice = 52000; // Maximum price in INR

  useEffect(() => {
    if (selectedRoute && selectedRoute.distance) {
      const distanceStr = selectedRoute.distance.replace(' km', '');
      const distanceKm = parseFloat(distanceStr) || 0;
      const basePrice = Math.max(minPrice, Math.round(distanceKm * 2)); // 2 INR per km
      setPrice(basePrice);
    }
  }, [selectedRoute]);

  const incrementPrice = () => {
    if (price < maxPrice) setPrice(Math.min(price + 5, maxPrice));
  };

  const decrementPrice = () => {
    if (price > minPrice) setPrice(Math.max(price - 5, minPrice));
  };

  const handleConfirm = () => {
    navigation.navigate('ReturnRideScreen', {
      date,
      time,
      pickupAddress,
      dropoffAddress,
      selectedRoute,
      selectedStopovers,
      price,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Price</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
      
        {/* <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ride Summary</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{date || 'Not selected'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{time || 'Not selected'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Pickup:</Text>
            <Text style={styles.value}>{pickupAddress || 'Not selected'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Dropoff:</Text>
            <Text style={styles.value}>{dropoffAddress || 'Not selected'}</Text>
          </View>
          {selectedRoute && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Route:</Text>
              <Text style={styles.value}>{selectedRoute.name} ({selectedRoute.distance})</Text>
            </View>
          )}
        </View> */}

        {/* Price Selector */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Set Price</Text>
          <View style={styles.priceContainer}>
            <TouchableOpacity
              style={styles.priceButton}
              onPress={decrementPrice}
              disabled={price <= minPrice}
            >
              <Text style={styles.priceButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.priceText}>₹{price}</Text>
            <TouchableOpacity
              style={styles.priceButton}
              onPress={incrementPrice}
              disabled={price >= maxPrice}
            >
              <Text style={styles.priceButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.priceNote}>Base: ₹{selectedRoute?.distance ? Math.round(parseFloat(selectedRoute.distance.replace(' km', '')) * 2) : 0}/km, Range: ₹{minPrice} - ₹{maxPrice} (increments of ₹5)</Text>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <LinearGradient colors={['#09C912', '#07A90A']} style={styles.confirmButtonGradient}>
            <Text style={styles.confirmText}>Confirm Price</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F0FA' },
  header: {
    marginTop: 70,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: { width: 40 },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  value: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  priceButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  priceButtonText: {
    fontSize: 24,
    color: '#09C912',
    fontWeight: '700',
  },
  priceText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E1E1E',
    marginHorizontal: 20,
  },
  priceNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  confirmButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  confirmButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
}); 

export default PriceSelectionScreen;