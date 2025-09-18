import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './RidePlanCss';

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
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ride Details</Text>
        <View style={styles.placeholder} />
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

      {/* Completion Message */}
      <View style={styles.completedMessageCard}>
        <View style={styles.completedIcon}>
          <Ionicons name="checkmark-circle" size={64} color="#10B981" />
        </View>
        <Text style={styles.completedTitle}>Ride Completed Successfully!</Text>
        <Text style={styles.completedMessage}>
          Your ride has been completed. Thank you for choosing our service.
        </Text>
        <Text style={styles.completedSubMessage}>
          We hope you had a pleasant journey. Rate your experience to help us improve.
        </Text>
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