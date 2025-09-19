import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './YourRidesCss';

// Additional styles for the back button header
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

const YourRides = ({ navigation, route }) => {
  const [countdowns, setCountdowns] = useState({});
  const [rides, setRides] = useState([]);
  const [maxCancellations, setMaxCancellations] = useState(3);
  const [driverCancellationCount, setDriverCancellationCount] = useState(0);
  const [isAccountBlocked, setIsAccountBlocked] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    memberSince: '2023-01-15',
    totalRides: 0,
    rating: 4.8,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
  });
  const [activeFilter, setActiveFilter] = useState('All');

  const initialRides = [
    { id: '1', date: '2025-09-20', time: '2:30 PM', from: 'Connaught Place', to: 'Indira Gandhi International Airport', status: 'Booked', distance: '18.5 km', estimatedTime: '45 min', cost: '₹285', driverName: 'Rajesh Kumar', driverRating: 4.7, vehicleType: 'Sedan', driverPosted: true, userBooked: false },
    { id: '2', date: '2025-09-18', time: '10:15 AM', from: 'Phoenix Mall, Lower Parel', to: 'Gateway of India', status: 'Booked', distance: '12.3 km', estimatedTime: '35 min', cost: '₹220', driverName: 'Amit Singh', driverRating: 4.9, vehicleType: 'Hatchback', driverPosted: true, userBooked: false },
    { id: '3', date: '2025-09-16', time: '6:45 PM', from: 'Bangalore City Railway Station', to: 'Electronic City', status: 'Booked', distance: '28.7 km', estimatedTime: '55 min', cost: '₹420', driverName: 'Priya Sharma', driverRating: 4.6, vehicleType: 'SUV', driverPosted: true, userBooked: false },
    { id: '4', date: '2025-09-14', time: '3:20 PM', from: 'Cyber Hub, Gurgaon', to: 'Khan Market', status: 'Completed', distance: '15.2 km', estimatedTime: '40 min', cost: '₹280', driverName: 'Vikram Patel', driverRating: 4.8, vehicleType: 'Sedan', userRating: 5, driverPosted: true, userBooked: false },
    { id: '5', date: '2025-09-12', time: '8:30 AM', from: 'Anna Salai, Chennai', to: 'Chennai International Airport', status: 'Completed', distance: '22.1 km', estimatedTime: '50 min', cost: '₹380', driverName: 'Suresh Reddy', driverRating: 4.5, vehicleType: 'Sedan', userRating: 4, driverPosted: true, userBooked: false },
    { id: '6', date: '2025-09-10', time: '7:00 PM', from: 'Koramangala, Bangalore', to: 'Whitefield', status: 'Completed', distance: '16.8 km', estimatedTime: '42 min', cost: '₹320', driverName: 'Ravi Kumar', driverRating: 4.3, vehicleType: 'Hatchback', userRating: 4, driverPosted: true, userBooked: false },
    { id: '7', date: '2025-09-08', time: '4:15 PM', from: 'Banjara Hills, Hyderabad', to: 'Charminar', status: 'Completed', distance: '14.8 km', estimatedTime: '38 min', cost: '₹260', driverName: 'Mohammed Ali', driverRating: 4.9, vehicleType: 'Hatchback', userRating: 5, driverPosted: true, userBooked: false },
    { id: '8', date: '2025-09-05', time: '9:45 AM', from: 'MG Road, Pune', to: 'Shaniwar Wada', status: 'Completed', distance: '6.2 km', estimatedTime: '20 min', cost: '₹120', driverName: 'Deepak Joshi', driverRating: 4.7, vehicleType: 'Hatchback', userRating: 4, driverPosted: true, userBooked: false },
    { id: '9', date: '2025-09-19', time: '5:00 PM', from: 'Home', to: 'Shopping Mall', status: 'Booked', distance: '8.2 km', estimatedTime: '20 min', cost: '₹150', driverName: 'Ankit Verma', driverRating: 4.8, vehicleType: 'Hatchback', driverPosted: false, userBooked: true },
    { id: '10', date: '2025-09-17', time: '3:30 PM', from: 'Office', to: 'Gym', status: 'Completed', distance: '5.5 km', estimatedTime: '15 min', cost: '₹120', driverName: 'Neha Sharma', driverRating: 4.9, vehicleType: 'Sedan', userRating: 5, driverPosted: false, userBooked: true },
    { id: '11', date: '2025-09-15', time: '8:00 AM', from: 'Home', to: 'Airport', status: 'Completed', distance: '25.3 km', estimatedTime: '45 min', cost: '₹350', driverName: 'Rahul Mehta', driverRating: 4.6, vehicleType: 'SUV', userRating: 4, driverPosted: false, userBooked: true },
    { id: '12', date: '2025-09-13', time: '6:15 PM', from: 'Friend\'s Place', to: 'Home', status: 'Booked', distance: '12.7 km', estimatedTime: '30 min', cost: '₹200', driverName: 'Sanjay Patel', driverRating: 4.4, vehicleType: 'Hatchback', driverPosted: false, userBooked: true },
    { id: '13', date: '2025-09-21', time: '9:00 AM', from: 'Juhu Beach', to: 'Bandra Fort', status: 'Booked', distance: '7.5 km', estimatedTime: '25 min', cost: '₹180', driverName: 'Kiran Desai', driverRating: 4.5, vehicleType: 'Hatchback', driverPosted: true, userBooked: false },
    { id: '14', date: '2025-09-22', time: '1:30 PM', from: 'Hitech City', to: 'Golkonda Fort', status: 'Booked', distance: '11.2 km', estimatedTime: '30 min', cost: '₹210', driverName: 'Vijay Kumar', driverRating: 4.8, vehicleType: 'Sedan', driverPosted: true, userBooked: false },
    { id: '15', date: '2025-09-23', time: '7:45 PM', from: 'Marina Beach', to: 'T Nagar', status: 'Completed', distance: '9.8 km', estimatedTime: '28 min', cost: '₹190', driverName: 'Anjali Menon', driverRating: 4.7, vehicleType: 'Hatchback', userRating: 5, driverPosted: true, userBooked: false },
    { id: '16', date: '2025-09-24', time: '11:00 AM', from: 'Koregaon Park', to: 'Aga Khan Palace', status: 'Booked', distance: '6.8 km', estimatedTime: '22 min', cost: '₹140', driverName: 'Rohit Nair', driverRating: 4.6, vehicleType: 'Hatchback', driverPosted: true, userBooked: false },
    { id: '17', date: '2025-09-25', time: '4:00 PM', from: 'Indiranagar', to: 'MG Road', status: 'Completed', distance: '5.2 km', estimatedTime: '18 min', cost: '₹110', driverName: 'Sneha Gupta', driverRating: 4.9, vehicleType: 'Sedan', userRating: 4, driverPosted: true, userBooked: false },
    { id: '18', date: '2025-09-26', time: '8:15 AM', from: 'Home', to: 'Office', status: 'Booked', distance: '10.5 km', estimatedTime: '30 min', cost: '₹200', driverName: 'Arjun Singh', driverRating: 4.7, vehicleType: 'Sedan', driverPosted: false, userBooked: true },
    { id: '19', date: '2025-09-27', time: '6:30 PM', from: 'Mall of Asia', to: 'Home', status: 'Booked', distance: '15.6 km', estimatedTime: '40 min', cost: '₹270', driverName: 'Pooja Sharma', driverRating: 4.8, vehicleType: 'SUV', driverPosted: false, userBooked: true },
    { id: '20', date: '2025-09-28', time: '2:00 PM', from: 'Vasant Kunj', to: 'Lotus Temple', status: 'Completed', distance: '13.4 km', estimatedTime: '35 min', cost: '₹240', driverName: 'Manoj Kumar', driverRating: 4.5, vehicleType: 'Sedan', userRating: 5, driverPosted: true, userBooked: false },
    { id: '21', date: '2025-09-29', time: '10:00 AM', from: 'Whitefield', to: 'Cubbon Park', status: 'Booked', distance: '17.2 km', estimatedTime: '45 min', cost: '₹300', driverName: 'Lakshmi Nair', driverRating: 4.6, vehicleType: 'Hatchback', driverPosted: true, userBooked: false },
    { id: '22', date: '2025-09-30', time: '3:15 PM', from: 'Home', to: 'Hospital', status: 'Completed', distance: '8.9 km', estimatedTime: '25 min', cost: '₹170', driverName: 'Siddharth Patel', driverRating: 4.7, vehicleType: 'Sedan', userRating: 4, driverPosted: false, userBooked: true },
    { id: '23', date: '2025-10-01', time: '9:30 AM', from: 'Andheri West', to: 'Juhu Beach', status: 'Booked', distance: '4.5 km', estimatedTime: '15 min', cost: '₹100', driverName: 'Riya Kapoor', driverRating: 4.8, vehicleType: 'Hatchback', driverPosted: true, userBooked: false },
    { id: '24', date: '2025-10-02', time: '5:45 PM', from: 'Gachibowli', to: 'Hussain Sagar', status: 'Completed', distance: '12.1 km', estimatedTime: '32 min', cost: '₹220', driverName: 'Karthik Reddy', driverRating: 4.9, vehicleType: 'Sedan', userRating: 5, driverPosted: true, userBooked: false },
    { id: '25', date: '2025-10-03', time: '7:00 AM', from: 'Home', to: 'School', status: 'Booked', distance: '6.3 km', estimatedTime: '20 min', cost: '₹130', driverName: 'Meena Kumari', driverRating: 4.6, vehicleType: 'Hatchback', driverPosted: false, userBooked: true },
    // Adding some cancelled rides for testing
    { id: '26', date: '2025-09-11', time: '3:00 PM', from: 'Home', to: 'Mall', status: 'Cancelled', distance: '8.5 km', estimatedTime: '22 min', cost: '₹160', driverName: 'Test Driver 1', driverRating: 4.5, vehicleType: 'Hatchback', driverPosted: true, userBooked: false, cancellationReason: 'Driver unavailable', cancellationNumber: 1, cancelledAt: '2025-09-11T14:45:00.000Z' },
    { id: '27', date: '2025-09-09', time: '6:00 PM', from: 'Office', to: 'Home', status: 'Cancelled', distance: '12.3 km', estimatedTime: '30 min', cost: '₹220', driverName: 'Test Driver 2', driverRating: 4.3, vehicleType: 'Sedan', driverPosted: true, userBooked: false, cancellationReason: 'Traffic issues', cancellationNumber: 2, cancelledAt: '2025-09-09T17:30:00.000Z' },
    { id: '28', date: '2025-09-07', time: '9:00 AM', from: 'Airport', to: 'Hotel', status: 'Cancelled', distance: '15.7 km', estimatedTime: '35 min', cost: '₹280', driverName: 'Test Driver 3', driverRating: 4.7, vehicleType: 'SUV', driverPosted: true, userBooked: false, cancellationReason: 'Vehicle breakdown', cancellationNumber: 3, cancelledAt: '2025-09-07T08:30:00.000Z' },
    { id: '29', date: '2025-09-06', time: '4:30 PM', from: 'Shopping Center', to: 'Home', status: 'Cancelled', distance: '9.2 km', estimatedTime: '25 min', cost: '₹180', driverName: 'User Cancelled', driverRating: 0, vehicleType: 'Hatchback', driverPosted: false, userBooked: true, cancellationReason: 'User-initiated cancellation', cancelledAt: '2025-09-06T16:00:00.000Z' },
  ];

  useEffect(() => {
    setRides(initialRides);
    loadAccountStatus();
    calculateUserStats();
    const { filter } = route.params || {};
    if (filter) {
      setActiveFilter(filter);
    }
  }, [route.params]);

  const calculateUserStats = () => {
    const completedRides = initialRides.filter((ride) => ride.status === 'Completed');
    const totalSpent = completedRides.reduce((sum, ride) => sum + parseInt(ride.cost.replace('₹', '')), 0);
    setUserProfile((prev) => ({
      ...prev,
      totalRides: completedRides.length,
      totalSpent: totalSpent,
    }));
  };

  const loadAccountStatus = async () => {
    try {
      const cancellationCount = await AsyncStorage.getItem('driverCancellationCount');
      const savedMaxCancellations = await AsyncStorage.getItem('maxCancellations');
      const accountBlocked = await AsyncStorage.getItem('accountBlocked');
      const isRestored = await AsyncStorage.getItem('isRestored') === 'true';

      const count = cancellationCount && !isNaN(parseInt(cancellationCount)) ? parseInt(cancellationCount) : 3; // Set to 3 for demo
      const max = savedMaxCancellations && !isNaN(parseInt(savedMaxCancellations)) ? parseInt(savedMaxCancellations) : 3;
      const blocked = accountBlocked === 'true' && !isRestored;

      setDriverCancellationCount(count);
      setMaxCancellations(max);
      setIsAccountBlocked(blocked || count >= max); // Account is blocked if count reaches max
    } catch (error) {
      console.error('Error loading account status:', error);
      setDriverCancellationCount(3); // Set to 3 for demo
      setMaxCancellations(3);
      setIsAccountBlocked(true); // Set to true for demo
    }
  };

  const updateRideData = (updatedRide) => {
    setRides((prevRides) =>
      prevRides.map((ride) => (ride.id === updatedRide.id ? updatedRide : ride))
    );
    loadAccountStatus();
  };

  const resetCancellationCount = async () => {
    try {
      await AsyncStorage.setItem('maxCancellations', '3');
      await AsyncStorage.setItem('accountBlocked', 'false');
      await AsyncStorage.setItem('driverCancellationCount', '0');
      await AsyncStorage.setItem('isRestored', 'true');

      setMaxCancellations(3);
      setDriverCancellationCount(0);
      setIsAccountBlocked(false);
    } catch (error) {
      console.error('Error resetting cancellation count:', error);
      Alert.alert('Error', 'Failed to reset cancellation count.');
    }
  };

  const checkAccountBlocked = (ride) => {
    if (!ride.driverPosted) return false;
    return isAccountBlocked && driverCancellationCount >= maxCancellations;
  };

  const showAccountBlockedAlert = (ride) => {
    if (!ride.driverPosted) return;
    const cancelledRidesCount = rides.filter((ride) => ride.status === 'Cancelled' && ride.driverPosted).length;

    Alert.alert(
      '🚫 Driver Account Temporarily Blocked',
      `You have reached the maximum limit of ${maxCancellations} ride cancellations (${cancelledRidesCount} cancelled driver rides).\n\nYour driver account has been temporarily blocked to ensure service quality for all users.\n\n📞 Contact customer support to restore your driver account with 3 fresh cancellation chances.`,
      [
        {
          text: 'View Cancellation History',
          onPress: () => navigation.navigate('CancellationHistory', { 
            driverCancellationCount, 
            maxCancellations, 
            isAccountBlocked,
            rides: rides.filter(ride => ride.status === 'Cancelled' && ride.driverPosted)
          }),
        },
        {
          text: 'Chat Customer Support',
          onPress: () => navigation.navigate('SupportChatScreen', { rideData: {} }),
        },
        {
          text: 'Call Customer Support',
          onPress: () => {
            Linking.openURL('tel:+919876543210').catch((err) => {
              console.error('Error opening phone dialer:', err);
              Alert.alert('Error', 'Unable to initiate call. Please try again.');
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleCustomerSupport = async () => {
    Alert.alert(
      'Customer Support Chat',
      'Customer support representative is reviewing your driver account...\n\nYour driver account will be restored with 3 fresh cancellation chances.',
      [
        {
          text: 'Restore My Account',
          onPress: async () => {
            await resetCancellationCount();
            Alert.alert(
              'Driver Account Restored Successfully',
              'Your driver account has been restored with 3 fresh cancellation chances.\n\nPlease be more careful with future driver bookings to avoid account restrictions.',
              [{ text: 'OK', onPress: () => loadAccountStatus() }]
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const calculateCountdown = (rideDate, rideTime, rideId) => {
    const now = new Date('2025-09-19T11:44:00+05:30'); // Current time: 11:44 AM IST, Sep 19, 2025
    const rideDateTime = new Date(`${rideDate} ${rideTime}`);

    if (rideDateTime <= now) {
      return null;
    }

    const timeDiff = rideDateTime.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} to go`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m to go`;
    } else if (minutes > 0) {
      return `${minutes} min to go`;
    } else {
      return 'Starting soon';
    }
  };

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns = {};
      rides.forEach((ride) => {
        if (ride.status === 'Booked') {
          const countdown = calculateCountdown(ride.date, ride.time, ride.id);
          if (countdown) {
            newCountdowns[ride.id] = countdown;
          }
        }
      });
      setCountdowns(newCountdowns);
    };
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);
    return () => clearInterval(interval);
  }, [rides]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#09C912';
      case 'Cancelled':
        return '#EF4444';
      case 'Booked':
        return '#3B82F6';
      case 'Posted':
        return '#d88900ff';
      case 'Archived':
        return '#6B7280';
      default:
        return '#3B82F6';
    }
  };

  const getRideStatus = (ride) => {
    if (ride.status === 'Booked') {
      const now = new Date('2025-09-19T11:44:00+05:30');
      const rideDateTime = new Date(`${ride.date} ${ride.time}`);
      if (rideDateTime <= now) {
        return 'Completed';
      }
      return ride.driverPosted ? 'Posted' : 'Booked';
    }
    return ride.status;
  };

  const renderRideItem = ({ item }) => {
    const currentStatus = getRideStatus(item);
    const countdown = countdowns[item.id];
    const accountBlocked = checkAccountBlocked(item);
    const isDriverCancelledRide = item.status === 'Cancelled' && item.driverPosted;
    const isAccountBlockedForThisRide = isDriverCancelledRide && isAccountBlocked && driverCancellationCount >= maxCancellations;

    const navigationTarget = accountBlocked && currentStatus === 'Cancelled' ? 'BlockedImageScreen' : item.userBooked
      ? currentStatus === 'Booked'
        ? 'UserBooked'
        : currentStatus === 'Completed'
        ? 'UserCompleated'
        : currentStatus === 'Cancelled'
        ? 'UserCancelled'
        : 'RidePlan'
      : 'RidePlan';

    const handleCancelRide = async () => {
      if (accountBlocked) {
        showAccountBlockedAlert(item);
        return;
      }

      const newCount = driverCancellationCount + 1;
      const updatedRide = {
        ...item,
        status: 'Cancelled',
        cancellationReason: 'User-initiated cancellation',
        cancellationNumber: newCount,
        cancelledAt: new Date().toISOString(),
      };

      try {
        await AsyncStorage.setItem('driverCancellationCount', newCount.toString());
        if (newCount >= maxCancellations) {
          await AsyncStorage.setItem('accountBlocked', 'true');
          setIsAccountBlocked(true);
        }
        setDriverCancellationCount(newCount);

        updateRideData(updatedRide);
        Alert.alert(
          'Ride Cancelled',
          `Ride cancelled. ${newCount >= maxCancellations ? 'You have reached the maximum cancellation limit. Your account will be blocked until restored by support.' : `You have ${maxCancellations - newCount} cancellations left.`}`,
          [{ text: 'OK', onPress: () => navigation.navigate('YourRides') }]
        );
      } catch (error) {
        console.error('Error cancelling ride:', error);
        Alert.alert('Error', 'Failed to cancel ride.');
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.rideCard,
          item.status === 'Cancelled' && accountBlocked && styles.blockedRideCard,
          item.driverPosted && styles.driverRideCard,
          item.userBooked && styles.userRideCard,
        ]}
        activeOpacity={0.7}
        onPress={() => {
          if (accountBlocked && item.status === 'Cancelled') {
            showAccountBlockedAlert(item);
            return;
          }
          navigation.navigate(navigationTarget, {
            rideData: item,
            updateRideData: updateRideData,
            onCancelRide: handleCancelRide,
            onResetCancellations: resetCancellationCount,
          });
        }}
      >
        <View style={styles.rideTypeContainer}>
          <View
            style={[
              styles.rideTypeBadge,
              item.driverPosted ? styles.driverRideBadge : styles.userRideBadge,
            ]}
          >
            <Ionicons
              name={item.driverPosted ? 'car-sport' : 'person'}
              size={12}
              color="#FFFFFF"
            />
            <Text style={styles.rideTypeText}>
              {item.driverPosted ? 'Driver Posted' : 'User Booked'}
            </Text>
          </View>
        </View>

        <View style={styles.rideHeader}>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(currentStatus) }]}>
            <Text style={styles.statusText}>{currentStatus}</Text>
          </View>
        </View>

        {countdown && (
          <View style={styles.countdownContainer}>
            <Ionicons name="timer-outline" size={16} color="#F59E0B" />
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        )}

        {/* Enhanced Cancellation Container - Always show for cancelled rides */}
        {item.status === 'Cancelled' && (
          <View
            style={[
              styles.cancellationNotice,
              // Show blocked style if this is a driver posted ride and account is blocked
              isAccountBlockedForThisRide && styles.blockedCancellationNotice,
            ]}
          >
            <Ionicons
              name={
                isAccountBlockedForThisRide
                  ? 'lock-closed-outline' 
                  : 'information-circle-outline'
              }
              size={16}
              color={
                isAccountBlockedForThisRide
                  ? '#FFFFFF' 
                  : '#EF4444'
              }
            />
            <Text
              style={[
                styles.cancellationText,
                isAccountBlockedForThisRide && { color: '#FFFFFF' },
              ]}
            >
              {isAccountBlockedForThisRide
                ? 'Driver Account Blocked • Tap for Customer Support'
                : `Cancelled • ${item.cancellationReason || 'Reason not specified'}`}
            </Text>
            {isAccountBlockedForThisRide && (
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            )}
          </View>
        )}

        {/* Driver Cancellation Number Display - Always show for cancelled driver rides */}
        {item.status === 'Cancelled' && item.driverPosted && (
          <View style={styles.cancellationNumberContainer}>
            <View style={[
              styles.cancellationNumberBadge,
              // Red background if account is blocked, orange if close to limit
              isAccountBlockedForThisRide
                ? { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }
                : (item.cancellationNumber >= maxCancellations - 1)
                ? { backgroundColor: '#FFFBEB', borderColor: '#FED7AA' }
                : { backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' }
            ]}>
              <Ionicons 
                name={
                  isAccountBlockedForThisRide
                    ? 'lock-closed-outline'
                    : 'warning-outline'
                } 
                size={14} 
                color={
                  isAccountBlockedForThisRide
                    ? '#EF4444'
                    : (item.cancellationNumber >= maxCancellations - 1) 
                    ? '#F59E0B'
                    : '#6B7280'
                }
              />
              <Text style={[
                styles.cancellationNumberText,
                { 
                  color: isAccountBlockedForThisRide
                    ? '#DC2626'
                    : (item.cancellationNumber >= maxCancellations - 1) 
                    ? '#92400E'
                    : '#374151'
                }
              ]}>
                Driver Cancellation #{item.cancellationNumber || 'N/A'} of {maxCancellations}
                {isAccountBlockedForThisRide && ' • Account Blocked'}
              </Text>
            </View>
            {item.cancelledAt && (
              <Text style={styles.cancellationTimeText}>
                Cancelled on {new Date(item.cancelledAt).toLocaleDateString()} at {new Date(item.cancelledAt).toLocaleTimeString()}
              </Text>
            )}
            {/* Show blocked account message for cancelled driver rides when account is blocked */}
            {isAccountBlockedForThisRide && (
              <TouchableOpacity
                style={styles.blockedAccountButton}
                onPress={() => showAccountBlockedAlert(item)}
              >
                <Ionicons name="headset-outline" size={14} color="#FFFFFF" />
                <Text style={styles.blockedAccountButtonText}>Contact Support to Restore Account</Text>
                <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.routeContainer}>
          <View style={styles.routeItem}>
            <View style={styles.fromDot} />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.from}
            </Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeItem}>
            <Ionicons name="location" size={16} color="#EF4444" />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.to}
            </Text>
          </View>
        </View>

        <View style={styles.rideInfoContainer}>
          <View style={styles.rideInfoItem}>
            <Ionicons name="car-outline" size={14} color="#64748B" />
            <Text style={styles.rideInfoText}>{item.distance}</Text>
          </View>
          <View style={styles.rideInfoItem}>
            <Ionicons name="time-outline" size={14} color="#64748B" />
            <Text style={styles.rideInfoText}>{item.estimatedTime}</Text>
          </View>
          <View style={styles.rideInfoItem}>
            <Ionicons name="wallet-outline" size={14} color="#64748B" />
            <Text style={[styles.rideInfoText, styles.costText]}>{item.cost}</Text>
          </View>
        </View>

        {currentStatus === 'Completed' && item.driverName && (
          <View style={styles.driverInfoContainer}>
            <View style={styles.driverInfo}>
              <Ionicons name="person-outline" size={14} color="#64748B" />
              <Text style={styles.driverInfoText}>{item.driverName}</Text>
            </View>
            <View style={styles.driverRating}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.driverRatingText}>{item.driverRating}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const completedRides = rides.filter((ride) => getRideStatus(ride) === 'Completed');
  const postedRides = rides.filter((ride) => ride.driverPosted === true);
  const userBookedRides = rides.filter((ride) => ride.userBooked === true);
  const cancelledRides = rides.filter((ride) => ride.status === 'Cancelled');

  const getFilteredRides = () => {
    switch (activeFilter) {
      case 'Posted':
        return postedRides;
      case 'Booked':
        return userBookedRides;
      case 'Completed':
        return completedRides;
      case 'Cancelled':
        return cancelledRides;
      default:
        return rides;
    }
  };

  const FilterButton = ({ title, count }) => (
    <TouchableOpacity
      style={[styles.filterButton, activeFilter === title && styles.activeFilter]}
      onPress={() => setActiveFilter(title)}
    >
      <Text
        style={[styles.filterText, activeFilter === title && styles.activeFilterText]}
      >
        {title} {count > 0 && `(${count})`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={additionalStyles.headerRow}>
        <TouchableOpacity
          style={additionalStyles.backButton}
          onPress={() => navigation.navigate('HomeScreen')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <View style={additionalStyles.headerContent}>
          <Text style={additionalStyles.headerTitle}>Your Rides</Text>
          <Text style={additionalStyles.subHeader}>
            {rides.length} rides • {userBookedRides.length} booked • {postedRides.length} posted
          </Text>
        </View>
        <TouchableOpacity
          style={additionalStyles.backButton}
          onPress={() => navigation.navigate('CancellationHistory', { 
            driverCancellationCount, 
            maxCancellations, 
            isAccountBlocked,
            rides: rides.filter(ride => ride.status === 'Cancelled' && ride.driverPosted)
          })}
          activeOpacity={0.7}
        >
          <Ionicons name="time-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <FilterButton title="All" count={rides.length} />
        <FilterButton title="Posted" count={postedRides.length} />
        <FilterButton title="Booked" count={userBookedRides.length} />
        <FilterButton title="Completed" count={completedRides.length} />
        <FilterButton title="Cancelled" count={cancelledRides.length} />
      </View>

      <FlatList
        data={getFilteredRides()}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id}
        style={styles.rideList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="car-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>
              No {activeFilter.toLowerCase()} rides found
            </Text>
            <Text style={styles.emptySubText}>
              Book your first ride to get started
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default YourRides;