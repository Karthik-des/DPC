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

const CancelledRidePlan = ({ navigation, route }) => {
  const { rideData } = route.params;

  const handleBookSimilarRide = () => {
    // Navigate to HomeScreen with ride data to prefill the booking form
    navigation.navigate('HomeScreen', {
      prefillData: {
        from: rideData.from,
        to: rideData.to,
        date: rideData.date,
        time: rideData.time
      }
    });
  };

  return (
    <View style={styles.container}>
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
          <Text style={additionalStyles.headerTitle}>Ride Plan</Text>
          <Text style={additionalStyles.subHeader}>Cancelled Ride</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cancelled Message */}
        <View style={styles.cancelledContainer}>
          <View style={styles.cancelledIcon}>
            <Ionicons name="close-circle" size={64} color="#EF4444" />
          </View>
          <Text style={styles.cancelledTitle}>Ride Cancelled</Text>
          <Text style={styles.cancelledMessage}>
            Your ride has been successfully cancelled.
          </Text>
          {rideData.cancellationReason && (
            <Text style={styles.cancelledSubMessage}>
              Reason: {rideData.cancellationReason}
            </Text>
          )}
        </View>

        {/* Ride Details Card */}
        <View style={styles.rideDetailsCard}>
          <View style={styles.titleAndStatus}>
            <Text style={styles.sectionTitle}>Ride Details</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#EF4444' }]}>
              <Text style={styles.statusText}>Cancelled</Text>
            </View>
          </View>

          {/* Route */}
          <View style={styles.routeContainer}>
            <View style={styles.routeItem}>
              <View style={styles.fromDot} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>{rideData.from}</Text>
                <Text style={styles.timeText}>Was scheduled for {rideData.time}</Text>
              </View>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routeItem}>
              <Ionicons name="location" size={16} color="#EF4444" />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>{rideData.to}</Text>
                <Text style={styles.estimateText}>Cancelled on {new Date(rideData.cancelledAt || Date.now()).toLocaleDateString()}</Text>
              </View>
            </View>
          </View>

          {/* Trip Stats */}
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
              <Text style={styles.statLabel}>Refund</Text>
              <Text style={styles.statValueCost}>{rideData.cost}</Text>
            </View>
          </View>
        </View>

        {/* Cancellation Info */}
        <View style={styles.cancellationInfoCard}>
          <Text style={styles.sectionTitle}>Cancellation Information</Text>

          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#64748B" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Cancelled At</Text>
              <Text style={styles.infoSubtitle}>
                {new Date(rideData.cancelledAt || Date.now()).toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="information-circle-outline" size={20} color="#64748B" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Cancellation Reason</Text>
              <Text style={styles.infoSubtitle}>
                {rideData.cancellationReason || 'No reason provided'}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="card-outline" size={20} color="#64748B" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Refund Status</Text>
              <Text style={styles.infoSubtitle}>
                Full refund of {rideData.cost} processed
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.additionalActions}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleBookSimilarRide}
          >
            <Text style={styles.primaryButtonText}>Book Similar Ride</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CancelledRidePlan;