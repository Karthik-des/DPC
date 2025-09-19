import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './RidePlanCss';

// Consistent header styles from YourRides
const additionalStyles = {
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 40,
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
    marginRight: 10,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  subHeader: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
};

const CompleatedRidePlan = ({ navigation, route }) => {
  const rideData = route?.params?.rideData || {};

  // Handle book similar ride - navigate to HomeScreen with prefilled data
  const handleBookSimilarRide = () => {
    navigation.navigate('HomeScreen', {
      prefillData: {
        from: rideData.from,
        to: rideData.to,
        date: rideData.date,
        time: rideData.time
      }
    });
  };

  const getStatusColor = () => {
    return '#10B981'; // Green for Completed
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={additionalStyles.headerRow}>
        <TouchableOpacity
          style={additionalStyles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <View style={additionalStyles.headerContent}>
          <Text style={additionalStyles.headerTitle}>Ride Details</Text>
          <Text style={additionalStyles.subHeader}>Completed Ride</Text>
        </View>
      </View>

      {/* Ride Details Card */}
      <View style={styles.rideDetailsCard}>
        <View style={styles.routeSection}>
          <View style={styles.titleAndStatus}>
            <Text style={styles.sectionTitle}>Trip Details</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                Completed
              </Text>
            </View>
          </View>
          
          <View style={styles.routeContainer}>
            <View style={styles.routeItem}>
              <View style={styles.fromDot} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>{rideData.from}</Text>
                <Text style={styles.timeText}>{rideData.date} • {rideData.time}</Text>
              </View>
            </View>
            
            <View style={styles.routeLine} />
            
            <View style={styles.routeItem}>
              <Ionicons name="location" size={20} color="#EF4444" />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>{rideData.to}</Text>
                <Text style={styles.estimateText}>{rideData.estimatedTime} • {rideData.distance}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tripStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>{rideData.distance}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>{rideData.estimatedTime}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Cost</Text>
              <Text style={styles.statValueCost}>{rideData.cost}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Additional Actions */}
      <View style={styles.additionalActions}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleBookSimilarRide}
        >
          <Text style={styles.primaryButtonText}>Book Similar Ride</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CompleatedRidePlan;