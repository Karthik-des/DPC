import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserCompleted = ({ navigation, route }) => {
  const { rideData, updateRideData } = route.params;
  const [userRating, setUserRating] = useState(rideData.userRating || 0);
  const supportPhoneNumber = '+18001234567'; // Example support number

  const handleRateRide = (rating) => {
    setUserRating(rating);
    updateRideData({ ...rideData, userRating: rating });
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact support?',
      [
        {
          text: 'Call Support',
          onPress: async () => {
            console.log(`Initiating call to ${supportPhoneNumber}`);
            try {
              const supported = await Linking.canOpenURL(`tel:${supportPhoneNumber}`);
              if (supported) {
                await Linking.openURL(`tel:${supportPhoneNumber}`);
                Alert.alert('Calling', 'Connecting to support...');
              } else {
                Alert.alert('Error', 'Phone calls are not supported on this device.');
              }
            } catch (error) {
              Alert.alert('Error', 'Unable to initiate call.');
              console.error('Call error:', error);
            }
          },
        },
        {
          text: 'Chat Support',
          onPress: () => {
            try {
              navigation.navigate('SupportChatScreen', { rideData });
              console.log('Navigating to SupportChatScreen with rideData:', rideData);
            } catch (error) {
              Alert.alert('Navigation Error', 'Unable to open support chat. Please try again.');
              console.error('Navigation error:', error);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleBookAgain = () => {
    try {
      navigation.navigate('DisplayScreen', { 
        prefillData: {
          from: rideData.from,
          to: rideData.to
        }
      });
      console.log('Navigating to HomeScreen with prefillData:', { from: rideData.from, to: rideData.to });
    } catch (error) {
      Alert.alert('Navigation Error', 'Unable to navigate to Home screen. Please try again.');
      console.error('Navigation error:', error);
    }
  };

  return (
    <ScrollView style={styles.userContainer}>
      <View style={styles.userHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.userHeaderTitle}>Completed Ride</Text>
      </View>

      <View style={[styles.userCard, styles.userRideCard]}>
        <View style={styles.rideStatusHeader}>
          <View style={[styles.statusBadge, { backgroundColor: '#10B981' }]}>
            <Text style={styles.statusText}>Completed</Text>
          </View>
          <Ionicons name="checkmark-circle" size={24} color="#10B981" />
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
          <Text style={styles.sectionTitle}>Ride Details</Text>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={18} color="#64748B" />
            <Text style={styles.detailText}>{rideData.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={18} color="#64748B" />
            <Text style={styles.detailText}>{rideData.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="car-outline" size={18} color="#64748B" />
            <Text style={styles.detailText}>{rideData.vehicleType}</Text>
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

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Rate Your Ride</Text>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRateRide(star)} activeOpacity={0.7}>
                <Ionicons
                  name={star <= userRating ? 'star' : 'star-outline'}
                  size={28}
                  color="#F59E0B"
                  style={{ marginRight: 8 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Total Amount</Text>
            <Text style={styles.paymentAmount}>{rideData.cost}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <Text style={styles.paymentMethod}>Credit Card •••• 1234</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleBookAgain}
            activeOpacity={0.7}
          >
            <Ionicons name="car" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Book Again</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleContactSupport}
            activeOpacity={0.7}
          >
            <Ionicons name="headset" size={20} color="#64748B" />
            <Text style={[styles.actionButtonText, { color: '#64748B' }]}>Contact Support</Text>
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 2,
    fontWeight: '600',
  },
  ratingStars: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#09C912',
  },
  paymentMethod: {
    fontSize: 14,
    color: '#64748B',
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