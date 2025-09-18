import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './YourRidesCss';

const YourRides = ({ navigation }) => {
  const [countdowns, setCountdowns] = useState({});
  const [rides, setRides] = useState([]);
  const [maxCancellations, setMaxCancellations] = useState(3);
  const [userCancellationCount, setUserCancellationCount] = useState(0);
  const [isAccountBlocked, setIsAccountBlocked] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    memberSince: '2023-01-15',
    totalRides: 0,
    rating: 4.8,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80'
  });

  // Initial ride data with driver posted and user booked flags
  const initialRides = [
    { 
      id: '1', 
      date: '2025-09-20',
      time: '2:30 PM',
      from: 'Connaught Place', 
      to: 'Indira Gandhi International Airport', 
      status: 'Booked',
      distance: '18.5 km',
      estimatedTime: '45 min',
      cost: '₹285',
      driverName: 'Rajesh Kumar',
      driverRating: 4.7,
      vehicleType: 'Sedan',
      driverPosted: true,
      userBooked: false
    },
    { 
      id: '2', 
      date: '2025-09-18',
      time: '10:15 AM',
      from: 'Phoenix Mall, Lower Parel', 
      to: 'Gateway of India', 
      status: 'Booked',
      distance: '12.3 km',
      estimatedTime: '35 min',
      cost: '₹220',
      driverName: 'Amit Singh',
      driverRating: 4.9,
      vehicleType: 'Hatchback',
      driverPosted: true,
      userBooked: false
    },
    { 
      id: '3', 
      date: '2025-09-16',
      time: '6:45 PM',
      from: 'Bangalore City Railway Station', 
      to: 'Electronic City', 
      status: 'Booked',
      distance: '28.7 km',
      estimatedTime: '55 min',
      cost: '₹420',
      driverName: 'Priya Sharma',
      driverRating: 4.6,
      vehicleType: 'SUV',
      driverPosted: true,
      userBooked: false
    },
    { 
      id: '4', 
      date: '2025-09-14',
      time: '3:20 PM',
      from: 'Cyber Hub, Gurgaon', 
      to: 'Khan Market', 
      status: 'Completed',
      distance: '15.2 km',
      estimatedTime: '40 min',
      cost: '₹280',
      driverName: 'Vikram Patel',
      driverRating: 4.8,
      vehicleType: 'Sedan',
      userRating: 5,
      driverPosted: true,
      userBooked: false
    },
    { 
      id: '5', 
      date: '2025-09-12',
      time: '8:30 AM',
      from: 'Anna Salai, Chennai', 
      to: 'Chennai International Airport', 
      status: 'Completed',
      distance: '22.1 km',
      estimatedTime: '50 min',
      cost: '₹380',
      driverName: 'Suresh Reddy',
      driverRating: 4.5,
      vehicleType: 'Sedan',
      userRating: 4,
      driverPosted: true,
      userBooked: false
    },
    { 
      id: '6', 
      date: '2025-09-10',
      time: '7:00 PM',
      from: 'Koramangala, Bangalore', 
      to: 'Whitefield', 
      status: 'Cancelled',
      distance: '16.8 km',
      estimatedTime: '42 min',
      cost: '₹320',
      driverName: 'Ravi Kumar',
      driverRating: 4.3,
      vehicleType: 'Hatchback',
      cancellationReason: 'Traffic jam',
      driverPosted: true,
      userBooked: false,
      cancellationNumber: 1
    },
    { 
      id: '7', 
      date: '2025-09-08',
      time: '4:15 PM',
      from: 'Banjara Hills, Hyderabad', 
      to: 'Charminar', 
      status: 'Completed',
      distance: '14.8 km',
      estimatedTime: '38 min',
      cost: '₹260',
      driverName: 'Mohammed Ali',
      driverRating: 4.9,
      vehicleType: 'Hatchback',
      userRating: 5,
      driverPosted: true,
      userBooked: false
    },
    { 
      id: '8', 
      date: '2025-09-05',
      time: '9:45 AM',
      from: 'MG Road, Pune', 
      to: 'Shaniwar Wada', 
      status: 'Completed',
      distance: '6.2 km',
      estimatedTime: '20 min',
      cost: '₹120',
      driverName: 'Deepak Joshi',
      driverRating: 4.7,
      vehicleType: 'Hatchback',
      userRating: 4,
      driverPosted: true,
      userBooked: false
    },
    { 
      id: '9', 
      date: '2025-09-19',
      time: '5:00 PM',
      from: 'Home', 
      to: 'Shopping Mall', 
      status: 'Booked',
      distance: '8.2 km',
      estimatedTime: '20 min',
      cost: '₹150',
      driverName: 'Ankit Verma',
      driverRating: 4.8,
      vehicleType: 'Hatchback',
      driverPosted: false,
      userBooked: true
    },
    { 
      id: '10', 
      date: '2025-09-17',
      time: '3:30 PM',
      from: 'Office', 
      to: 'Gym', 
      status: 'Completed',
      distance: '5.5 km',
      estimatedTime: '15 min',
      cost: '₹120',
      driverName: 'Neha Sharma',
      driverRating: 4.9,
      vehicleType: 'Sedan',
      userRating: 5,
      driverPosted: false,
      userBooked: true
    },
    { 
      id: '11', 
      date: '2025-09-15',
      time: '8:00 AM',
      from: 'Home', 
      to: 'Airport', 
      status: 'Completed',
      distance: '25.3 km',
      estimatedTime: '45 min',
      cost: '₹350',
      driverName: 'Rahul Mehta',
      driverRating: 4.6,
      vehicleType: 'SUV',
      userRating: 4,
      driverPosted: false,
      userBooked: true
    },
    { 
      id: '12', 
      date: '2025-09-13',
      time: '6:15 PM',
      from: 'Friend\'s Place', 
      to: 'Home', 
      status: 'Cancelled',
      distance: '12.7 km',
      estimatedTime: '30 min',
      cost: '₹200',
      driverName: 'Sanjay Patel',
      driverRating: 4.4,
      vehicleType: 'Hatchback',
      cancellationReason: 'Change of plans',
      driverPosted: false,
      userBooked: true,
      cancellationNumber: 2
    },
  ];

  // Load account status from AsyncStorage
  useEffect(() => {
    setRides(initialRides);
    loadAccountStatus();
    calculateUserStats();
  }, []);

  // Calculate user statistics
  const calculateUserStats = () => {
    const completedRides = initialRides.filter(ride => ride.status === 'Completed');
    const totalSpent = completedRides.reduce((sum, ride) => {
      return sum + parseInt(ride.cost.replace('₹', ''));
    }, 0);
    
    setUserProfile(prev => ({
      ...prev,
      totalRides: completedRides.length,
      totalSpent: totalSpent
    }));
  };

  // Refresh data when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAccountStatus();
    });
    return unsubscribe;
  }, [navigation]);

  const loadAccountStatus = async () => {
    try {
      const cancellationCount = await AsyncStorage.getItem('userCancellationCount');
      const savedMaxCancellations = await AsyncStorage.getItem('maxCancellations');
      const accountBlocked = await AsyncStorage.getItem('accountBlocked');
      
      const count = cancellationCount && !isNaN(parseInt(cancellationCount)) ? parseInt(cancellationCount) : 0;
      const max = savedMaxCancellations && !isNaN(parseInt(savedMaxCancellations)) ? parseInt(savedMaxCancellations) : 3;
      const blocked = accountBlocked === 'true';
      
      setUserCancellationCount(count);
      setMaxCancellations(max);
      setIsAccountBlocked(blocked && count >= max);
      
      console.log('Loaded AsyncStorage: userCancellationCount=', count, 'maxCancellations=', max, 'accountBlocked=', blocked, 'actuallyBlocked=', blocked && count >= max);
    } catch (error) {
      console.error('Error loading account status:', error);
      setUserCancellationCount(0);
      setMaxCancellations(3);
      setIsAccountBlocked(false);
    }
  };

  // Update ride data
  const updateRideData = (updatedRide) => {
    setRides(prevRides => 
      prevRides.map(ride => 
        ride.id === updatedRide.id ? updatedRide : ride
      )
    );
    loadAccountStatus();
  };

  // Reset cancellation count (called from customer support)
  const resetCancellationCount = async () => {
    try {
      await AsyncStorage.setItem('maxCancellations', '3');
      await AsyncStorage.setItem('accountBlocked', 'false');
      await AsyncStorage.setItem('userCancellationCount', '0');
      
      setMaxCancellations(3);
      setUserCancellationCount(0);
      setIsAccountBlocked(false);
      
      console.log('Reset AsyncStorage: userCancellationCount=0, maxCancellations=3, accountBlocked=false');
    } catch (error) {
      console.error('Error resetting cancellation count:', error);
      Alert.alert('Error', 'Failed to reset cancellation count.');
    }
  };

  // Check if account is blocked
  const checkAccountBlocked = () => {
    const blocked = isAccountBlocked && userCancellationCount >= maxCancellations;
    console.log('checkAccountBlocked:', 'isAccountBlocked=', isAccountBlocked, 'userCancellationCount=', userCancellationCount, 'maxCancellations=', maxCancellations, 'result=', blocked);
    return blocked;
  };

  // Show blocked alert with customer support option
  const showAccountBlockedAlert = () => {
    const cancelledRidesCount = rides.filter(ride => ride.status === 'Cancelled').length;
    
    Alert.alert(
      '🚫 Account Temporarily Blocked',
      `You have reached the maximum limit of ${maxCancellations} ride cancellations (${cancelledRidesCount} cancelled rides).\n\nYour account has been temporarily blocked to ensure service quality for all users.\n\n📞 Contact customer support to restore your account with 3 fresh cancellation chances.`,
      [
        {
          text: 'View Cancellation History',
          onPress: () => navigation.navigate('CancellationTracker')
        },
        {
          text: 'Contact Customer Support',
          onPress: () => {
            Alert.alert(
              'Customer Support',
              'Choose how you would like to contact customer support:',
              [
                {
                  text: 'Chat Support',
                  onPress: () => handleCustomerSupport()
                },
                {
                  text: 'Call Support',
                  onPress: () => handleCustomerSupport()
                },
                {
                  text: 'Cancel',
                  style: 'cancel'
                }
              ]
            );
          }
        },
        {
          text: 'OK',
          style: 'cancel'
        }
      ]
    );
  };

  // Handle customer support interaction
  const handleCustomerSupport = async () => {
    Alert.alert(
      'Customer Support Chat',
      'Customer support representative is reviewing your account...\n\nYour account will be restored with 3 fresh cancellation chances.',
      [
        {
          text: 'Restore My Account',
          onPress: async () => {
            await resetCancellationCount();
            
            Alert.alert(
              'Account Restored Successfully',
              'Your account has been restored with 3 fresh cancellation chances.\n\nPlease be more careful with future bookings to avoid account restrictions.',
              [{ 
                text: 'OK',
                onPress: () => {
                  loadAccountStatus();
                }
              }]
            );
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  // Calculate countdown
  const calculateCountdown = (rideDate, rideTime, rideId) => {
    const now = new Date();
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

  // Update countdowns
  useEffect(() => {
    updateCountdowns();
    const interval = setInterval(() => {
      updateCountdowns();
    }, 60000);
    return () => clearInterval(interval);
  }, [rides]);

  const updateCountdowns = () => {
    const newCountdowns = {};
    rides.forEach(ride => {
      if (ride.status === 'Booked') {
        const countdown = calculateCountdown(ride.date, ride.time, ride.id);
        if (countdown) {
          newCountdowns[ride.id] = countdown;
        }
      }
    });
    setCountdowns(newCountdowns);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#10B981';
      case 'Cancelled':
        return '#EF4444';
      case 'Booked':
        return '#3B82F6';
      case 'Posted':
        return '#8B5CF6';
      case 'Archived':
        return '#6B7280';
      default:
        return '#3B82F6';
    }
  };

  const getRideStatus = (ride) => {
    if (ride.status === 'Booked') {
      const now = new Date();
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
    const accountBlocked = checkAccountBlocked();

    // Determine navigation target based on userBooked and status
    const navigationTarget = item.userBooked
      ? currentStatus === 'Booked'
        ? 'UserBooked'
        : currentStatus === 'Completed'
        ? 'UserCompleated'
        : currentStatus === 'Cancelled'
        ? 'UserCancelled'
        : 'RidePlan'
      : 'RidePlan';

    return (
      <TouchableOpacity 
        style={[
          styles.rideCard, 
          item.status === 'Cancelled' && accountBlocked && styles.blockedRideCard,
          item.driverPosted && styles.driverRideCard,
          item.userBooked && styles.userRideCard
        ]} 
        activeOpacity={0.7}
        onPress={() => {
          if (accountBlocked && item.status === 'Cancelled') {
            showAccountBlockedAlert();
            return;
          }
          
          navigation.navigate(navigationTarget, { 
            rideData: item,
            updateRideData: updateRideData
          });
        }}
      >
        {/* Ride type indicator */}
        <View style={styles.rideTypeContainer}>
          <View style={[
            styles.rideTypeBadge,
            item.driverPosted ? styles.driverRideBadge : styles.userRideBadge
          ]}>
            <Ionicons 
              name={item.driverPosted ? "car-sport" : "person"} 
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

        {item.status === 'Cancelled' && (
          <View style={[
            styles.cancellationNotice,
            accountBlocked && styles.blockedCancellationNotice
          ]}>
            <Ionicons 
              name={accountBlocked ? "lock-closed-outline" : "information-circle-outline"} 
              size={16} 
              color="#EF4444" 
            />
            <Text style={[
              styles.cancellationText,
              accountBlocked && { color: '#FFFFFF' }
            ]}>
              {accountBlocked 
                ? "Account Blocked • Tap for Customer Support" 
                : `Cancelled • ${item.cancellationReason || 'Reason not specified'}`
              }
            </Text>
            {accountBlocked && (
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            )}
          </View>
        )}

        <View style={styles.routeContainer}>
          <View style={styles.routeItem}>
            <View style={styles.fromDot} />
            <Text style={styles.locationText} numberOfLines={1}>{item.from}</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeItem}>
            <Ionicons name="location" size={16} color="#EF4444" />
            <Text style={styles.locationText} numberOfLines={1}>{item.to}</Text>
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

        {/* Show driver info for completed rides */}
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

        {/* Show cancellation number for cancelled rides when account is blocked */}
        {item.status === 'Cancelled' && item.cancellationNumber && accountBlocked && (
          <View style={styles.cancellationNumberContainer}>
            <Text style={styles.cancellationNumberText}>
              Cancellation #{item.cancellationNumber} of {maxCancellations}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const completedRides = rides.filter(ride => getRideStatus(ride) === 'Completed');
  const postedRides = rides.filter(ride => ride.driverPosted === true);
  const userBookedRides = rides.filter(ride => ride.userBooked === true);
  const cancelledRides = rides.filter(ride => ride.status === 'Cancelled');

  const [activeFilter, setActiveFilter] = useState('All');
  
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
      style={[
        styles.filterButton, 
        activeFilter === title && styles.activeFilter
      ]}
      onPress={() => setActiveFilter(title)}
    >
      <Text style={[
        styles.filterText, 
        activeFilter === title && styles.activeFilterText
      ]}>
        {title} {count > 0 && `(${count})`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Rides</Text>
        <Text style={styles.subHeaderText}>
          {rides.length} rides • {userBookedRides.length} booked • {postedRides.length} posted
        </Text>
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
        keyExtractor={item => item.id}
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