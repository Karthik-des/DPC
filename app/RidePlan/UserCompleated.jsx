import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserCompleted = ({ navigation, route }) => {
  const { rideData } = route.params;
  const [userRating, setUserRating] = useState(rideData.userRating || 0);

  const handleRateRide = (rating) => {
    setUserRating(rating);
    route.params.updateRideData({ ...rideData, userRating: rating });
  };

  const handleContactSupport = () => {
    console.log('Contact support');
  };

  const handleBookAgain = () => {
    navigation.navigate('Home', { 
      prefillData: {
        from: rideData.from,
        to: rideData.to
      }
    });
  };

  return (
    <ScrollView style={styles.userContainer}>
      <View style={styles.userHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.userHeaderTitle}>Completed Ride</Text>
      </View>

      <View style={[styles.userCard, styles.userRideCard]}>
        <View style={styles.rideStatusHeader}>
          <View style={[styles.statusBadge, { backgroundColor: '#10B981' }]}>
            <Text style={styles.statusText}>Completed</Text>
          </View>
          <Text style={styles.completedText}>Thank you for riding with us!</Text>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routeItem}>
            <View style={styles.fromDot} />
            <Text style={styles.locationText}>{rideData.from}</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeItem}>
            <Ionicons name="location" size={16} color="#EF4444" />
            <Text style={styles.locationText}>{rideData.to}</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Ride Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Ionicons name="time" size={20} color="#3B82F6" />
              <Text style={styles.summaryValue}>{rideData.estimatedTime}</Text>
              <Text style={styles.summaryLabel}>Duration</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="speedometer" size={20} color="#10B981" />
              <Text style={styles.summaryValue}>{rideData.distance}</Text>
              <Text style={styles.summaryLabel}>Distance</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="wallet" size={20} color="#F59E0B" />
              <Text style={styles.summaryValue}>{rideData.cost}</Text>
              <Text style={styles.summaryLabel}>Cost</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Rate Your Experience</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRateRide(star)}
                style={styles.starButton}
              >
                <Ionicons
                  name={star <= userRating ? "star" : "star-outline"}
                  size={32}
                  color={star <= userRating ? "#F59E0B" : "#CBD5E1"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Driver Information</Text>
          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <Ionicons name="person" size={24} color="#64748B" />
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{rideData.driverName}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.ratingText}>{rideData.driverRating}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleBookAgain}
          >
            <Ionicons name="repeat" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Book Again</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleContactSupport}
          >
            <Ionicons name="help-circle" size={20} color="#64748B" />
            <Text style={[styles.actionButtonText, { color: '#64748B' }]}>Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  userHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  userHeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  userRideCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6', // Blue for user
  },
  rideStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  completedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  routeContainer: {
    marginBottom: 12,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fromDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#09C912',
    marginRight: 12,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E2E8F0',
    marginLeft: 4,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
    flex: 1,
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    marginRight: 8,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 2,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  secondaryButton: {
    backgroundColor: '#F1F5F9',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

export default UserCompleted;