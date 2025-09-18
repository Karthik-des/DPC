import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './YourRidesCss';

const YourRides = ({ navigation }) => {
  // Unified ride data
  const allRides = [
    { 
      id: '1', 
      date: '2025-09-14',
      from: 'Connaught Place', 
      to: 'Indira Gandhi International Airport', 
      status: 'Completed',
    },
    { 
      id: '2', 
      date: '2025-09-12',
      from: 'Phoenix Mall, Lower Parel', 
      to: 'Gateway of India', 
      status: 'Completed',
    },
    { 
      id: '3', 
      date: '2025-09-10',
      from: 'Bangalore City Railway Station', 
      to: 'Electronic City', 
      status: 'Completed',
    },
    { 
      id: '4', 
      date: '2025-09-08',
      from: 'Cyber Hub, Gurgaon', 
      to: 'Khan Market', 
      status: 'Completed',
    },
    { 
      id: '5', 
      date: '2025-09-05',
      from: 'Anna Salai, Chennai', 
      to: 'Chennai International Airport', 
      status: 'Completed',
    },
    { 
      id: '6', 
      date: '2025-09-03',
      from: 'Park Street, Kolkata', 
      to: 'Victoria Memorial', 
      status: 'Completed',
    },
    { 
      id: '7', 
      date: '2025-09-01',
      from: 'Banjara Hills, Hyderabad', 
      to: 'Charminar', 
      status: 'Completed',
    },
    { 
      id: '8', 
      date: '2025-08-30',
      from: 'MG Road, Pune', 
      to: 'Shaniwar Wada', 
      status: 'Completed',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#10B981';
      case 'Cancelled':
        return '#EF4444';
      case 'Archived':
        return '#6B7280';
      default:
        return '#3B82F6';
    }
  };

  const renderRideItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.rideCard} 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('RidePlan', { rideData: item })}
    >
      <View style={styles.rideHeader}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Rides</Text>
        <Text style={styles.subHeaderText}>Ride history and details</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, styles.activeFilter]}
          onPress={() => {}}
        >
          <Text style={[styles.filterText, styles.activeFilterText]}>
            All Rides
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={allRides}
        renderItem={renderRideItem}
        keyExtractor={item => item.id}
        style={styles.rideList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No rides found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default YourRides;