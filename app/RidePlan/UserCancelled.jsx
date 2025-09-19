import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserCancelled = ({ navigation, route }) => {
  const { rideData } = route.params;
  const supportPhoneNumber = '+18001234567'; // Example support number

  const handleBookAgain = () => {
    try {
      navigation.navigate('HomeScreen', { 
        prefillData: {
          from: rideData.from,
          to: rideData.to
        }
      });
      console.log('Navigating to Home with prefillData:', { from: rideData.from, to: rideData.to });
    } catch (error) {
      Alert.alert('Navigation Error', 'Unable to navigate to Home screen. Please try again.');
      console.error('Navigation error:', error);
    }
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
        <Text style={styles.userHeaderTitle}>Cancelled Ride</Text>
      </View>

      <View style={[styles.userCard, styles.userRideCard]}>
        <View style={styles.rideStatusHeader}>
          <View style={[styles.statusBadge, { backgroundColor: '#EF4444' }]}>
            <Text style={styles.statusText}>Cancelled</Text>
          </View>
          <Ionicons name="close-circle" size={24} color="#EF4444" />
        </View>

        <View style={styles.cancellationReason}>
          <Ionicons name="information-circle" size={20} color="#F59E0B" />
          <Text style={styles.cancellationReasonText}>
            {rideData.cancellationReason || 'Ride was cancelled'}
          </Text>
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

        <View style={styles.refundSection}>
          <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          <View style={styles.refundDetails}>
            <Text style={styles.refundTitle}>Refund Processed</Text>
            <Text style={styles.refundText}>
              Your refund of {rideData.cost} has been processed and will be credited to your account within 5-7 business days.
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleBookAgain}
            activeOpacity={0.7}
          >
            <Ionicons name="car" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Book New Ride</Text>
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
  cancellationReason: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  cancellationReasonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
    marginLeft: 6,
    flex: 1,
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
  refundSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  refundDetails: {
    flex: 1,
    marginLeft: 12,
  },
  refundTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  refundText: {
    fontSize: 12,
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

export default UserCancelled;