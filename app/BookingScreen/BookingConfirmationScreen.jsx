import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import styles from './BookingConfirmationScreenCss';

const BookingConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract params from BookingRequestScreen
  const {
    selectedDriver = { name: 'Unknown' },
    totalCost = '0',
    fromAddress = 'Unknown',
    toAddress = 'Unknown',
    addAddress = '',
    dropAddress = '',
    mainPassengers = '1',
    addPassengers = '0',
    dropPassengers = '0',
    totalDistance = '0',
    duration = '0',
    userName = 'Guest',
    date = new Date().toDateString(),
    startTime = '8:30 AM',
    endTime = '9:30 AM',
  } = route.params || {};

  // Calculate response time (placeholder: 1 hour from startTime)
  const responseTime = new Date(
    Date.parse(`${date} ${startTime}`) + 60 * 60 * 1000
  ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.backButtonContainer}>
           <View style={styles.headerrr}>
                       <TouchableOpacity
                         onPress={() => navigation.goBack()}
                         style={styles.backButton}
                       >
                         <Ionicons name="arrow-back" size={24} color="#09C912" />
                       </TouchableOpacity>
                     
                       <View style={styles.placeholder} />
                     </View>
         
        </View>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <View style={styles.circle}>
              <MaterialCommunityIcons name="clock-check-outline" size={40} color="#27AE60" />
            </View>
          </View>
          <Text style={styles.heading}>Booking Request Sent!</Text>
          <Text style={styles.subtext}>
            Your ride request has been sent to {selectedDriver.name}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={24} color="#3498DB" />
            <Text style={styles.cardTitle}>Awaiting Confirmation</Text>
          </View>
          
          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={styles.statusIcon}>
                <Ionicons name="time-outline" size={20} color="#FFF" />
              </View>
              <View style={styles.statusContent}>
                <Text style={styles.statusLabel}>Response Time</Text>
                <Text style={styles.statusValue}>By {responseTime}</Text>
              </View>
            </View>

            <View style={styles.statusItem}>
              <View style={[styles.statusIcon, { backgroundColor: '#F39C12' }]}>
                <Ionicons name="calendar-outline" size={20} color="#FFF" />
              </View>
              <View style={styles.statusContent}>
                <Text style={styles.statusLabel}>Ride Date</Text>
                <Text style={styles.statusValue}>{date}</Text>
              </View>
            </View>

            <View style={styles.statusItem}>
              <View style={[styles.statusIcon, { backgroundColor: '#9B59B6' }]}>
                <Ionicons name="person-outline" size={20} color="#FFF" />
              </View>
              <View style={styles.statusContent}>
                <Text style={styles.statusLabel}>Driver</Text>
                <Text style={styles.statusValue}>{selectedDriver.name}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Ride Summary</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Feather name="map-pin" size={18} color="#E74C3C" />
            </View>
            <Text style={styles.detailText} numberOfLines={2}>{fromAddress}</Text>
          </View>

          <View style={styles.dottedLine} />

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Feather name="flag" size={18} color="#27AE60" />
            </View>
            <Text style={styles.detailText} numberOfLines={2}>{toAddress}</Text>
          </View>

          {addAddress && (
            <>
              <View style={styles.dottedLine} />
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Ionicons name="add-circle" size={18} color="#3498DB" />
                </View>
                <Text style={styles.detailText} numberOfLines={2}>Pickup: {addAddress}</Text>
              </View>
            </>
          )}

          {dropAddress && (
            <>
              <View style={styles.dottedLine} />
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Ionicons name="remove-circle" size={18} color="#E74C3C" />
                </View>
                <Text style={styles.detailText} numberOfLines={2}>Dropoff: {dropAddress}</Text>
              </View>
            </>
          )}

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Passengers</Text>
            <Text style={styles.summaryValue}>
              {parseInt(mainPassengers) + parseInt(addPassengers)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Distance</Text>
            <Text style={styles.summaryValue}>{totalDistance} km</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Duration</Text>
            <Text style={styles.summaryValue}>{duration}</Text>
          </View>

          <View style={[styles.summaryRow, { marginTop: 8 }]}>
            <Text style={styles.totalLabel}>Total Fare</Text>
            <Text style={styles.totalValue}>₹{totalCost}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('BookingStatusScreen', {
              selectedDriver,
              totalCost,
              fromAddress,
              toAddress,
              addAddress,
              dropAddress,
              mainPassengers,
              addPassengers,
              dropPassengers,
              totalDistance,
              duration,
              userName,
              date,
              startTime,
              endTime,
            })}
          >
            <Text style={styles.primaryButtonText}>Track Booking Status</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.secondaryButtonText}>Browse More Rides</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingConfirmationScreen;