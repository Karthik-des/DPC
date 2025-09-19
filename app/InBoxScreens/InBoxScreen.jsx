import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, FlatList, RefreshControl, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './InBoxStyles';

const InboxScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filterType, setFilterType] = useState('all');

  // Mock data - replace with AsyncStorage or API later
  const loadNotifications = () => {
    const mockNotifications = [
      {
        id: '1',
        title: 'Profile Updated Successfully',
        message: 'Your vehicle details have been verified and updated.',
        type: 'profile_update',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        read: false,
        icon: 'person',
        navigationTarget: 'ProfileScreen',
        navigationParams: { section: 'vehicle' },
      },
      {
        id: '2',
        title: 'Order Canceled',
        message: 'Passenger #123 canceled the ride from Bangalore to Mysore. Refund processed.',
        type: 'cancellation',
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        read: true,
        icon: 'close-circle',
        navigationTarget: 'CancelRide',
        navigationParams: { rideId: '123' },
      },
      {
        id: '3',
        title: 'Driver Booked',
        message: 'New passenger booked your ride for tomorrow. Route: Chennai to Bangalore.',
        type: 'booking_driver',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        read: false,
        icon: 'checkmark-circle',
        navigationTarget: 'YourRides',
        navigationParams: { rideId: '456' },
      },
      {
        id: '4',
        title: 'Passenger Booked Successfully',
        message: 'Your booking with Driver #456 is confirmed. Pickup at 10 AM.',
        type: 'booking_passenger',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        read: true,
        icon: 'car',
        navigationTarget: 'YourRides',
        navigationParams: { rideId: '789' },
      },
      {
        id: '5',
        title: 'Route Optimized',
        message: 'Your selected route now includes a stopover at Vellore for more passengers.',
        type: 'route_change',
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        read: false,
        icon: 'map',
        navigationTarget: 'RouteSelectionScreen',
        navigationParams: { routeId: '101' },
      },
    ];
    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
    setRefreshing(false);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(notifications.filter(n => n.type === filterType));
    }
  }, [filterType, notifications]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadNotifications(); // Replace with API call later
    }, 1000);
  };

  const handleNotificationPress = (item) => {
    if (!item.read) {
      const updated = notifications.map(n => 
        n.id === item.id ? { ...n, read: true } : n
      );
      setNotifications(updated);
      setFilteredNotifications(filterType === 'all' ? updated : updated.filter(n => n.type === filterType));
      setUnreadCount(prev => prev - 1);
    }
    if (item.navigationTarget) {
      navigation.navigate(item.navigationTarget, item.navigationParams || {});
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setFilteredNotifications(filterType === 'all' ? updated : updated.filter(n => n.type === filterType));
    setUnreadCount(0);
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.read && styles.unreadCard
      ]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
      accessibilityLabel={`Notification: ${item.title}`}
      accessibilityHint="Tap to view details"
    >
      <View style={styles.notificationIconContainer}>
        <Ionicons 
          name={item.icon} 
          size={24} 
          color={item.read ? '#666' : '#09C912'} 
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.timestamp}>
            {new Date(item.timestamp).toLocaleString('en-IN', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
      {!item.read && (
        <View style={styles.unreadDot} />
      )}
    </TouchableOpacity>
  );

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Bookings', value: 'booking_driver' },
    { label: 'Passenger', value: 'booking_passenger' },
    { label: 'Cancellations', value: 'cancellation' },
    { label: 'Profile', value: 'profile_update' },
    { label: 'Route', value: 'route_change' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen"
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Inbox {unreadCount > 0 && `(${unreadCount})`}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.filterButton,
                filterType === option.value && styles.activeFilterButton
              ]}
              onPress={() => handleFilterChange(option.value)}
              accessibilityLabel={`Filter by ${option.label}`}
            >
              <Text style={[
                styles.filterText,
                filterType === option.value && styles.activeFilterText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#09C912']} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off" size={60} color="#999" />
            <Text style={styles.emptyText}>
              {filterType === 'all' ? 'No notifications yet' : `No ${filterType.replace('_', ' ')} notifications`}
            </Text>
            <Text style={styles.emptySubtext}>
              Updates will appear here when something happens
            </Text>
          </View>
        }
      />

      {unreadCount > 0 && (
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.markAllButton} 
            onPress={handleMarkAllRead}
            accessibilityLabel="Mark all notifications as read"
          >
            <LinearGradient colors={['#09C912', '#07A90A']} style={styles.gradient}>
              <Ionicons name="checkmark-circle" size={20} color="#FFF" />
              <Text style={styles.markAllText}>Mark All as Read</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default InboxScreen;