import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './BookRideScreenCss';
import { useNavigation, useRoute } from '@react-navigation/native';
import drivericon from '../../assets/drivericon.jpg';
import passenger from '../../assets/usericon.jpg';
import {
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

const BookRideScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract data from DisplayScreen
  const {
    selectedDriver = { name: 'Unknown', carModel: 'Unknown', type: 'Unknown', rating: '4.5' },
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
    timeSlot = '8:30 AM - 9:30 AM',
    date = new Date().toDateString(),
    userName = 'Guest',
  } = route.params || {};

  // Map data to match original BookRideScreen
  const [startTime, endTime] = timeSlot.split(' - ');
  const landmark = addAddress || dropAddress || 'None';
  const fare = totalCost;
  const driverTrips = selectedDriver.trips || '100';

  // Handle booking request
  const handleRequestToBook = () => {
    navigation.navigate('BookingRequestScreen', {
      selectedDriver,
      totalCost: fare,
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
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
      </View>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <Text style={styles.headerTitle}>Ride Details</Text>
        <Text style={styles.headerSubtitle}>Review and confirm your booking</Text>
      </Animated.View>

      <Text style={styles.dateTitle}>Your Trip on {date}</Text>

      <View style={styles.card}>
        <Text style={styles.time}>{startTime} → {endTime}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#E74C3C" style={styles.infoIcon} />
          <Text style={styles.place}>{fromAddress}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="flag-outline" size={16} color="#27AE60" style={styles.infoIcon} />
          <Text style={styles.place}>{toAddress}</Text>
        </View>
        {landmark !== 'None' && (
          <View style={styles.infoRow}>
            <Ionicons name="navigate-outline" size={16} color="#3498DB" style={styles.infoIcon} />
            <Text style={styles.place}>{landmark}</Text>
          </View>
        )}
        
        <View style={styles.sectionDivider} />
        
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={16} color="#7F8C8D" style={styles.infoIcon} />
          <Text style={styles.place}>Main Passengers: {mainPassengers}</Text>
        </View>
        {addPassengers > 0 && (
          <View style={styles.infoRow}>
            <Ionicons name="person-add-outline" size={16} color="#27AE60" style={styles.infoIcon} />
            <Text style={styles.place}>Additional Passengers: {addPassengers}</Text>
          </View>
        )}
        {dropPassengers > 0 && (
          <View style={styles.infoRow}>
            <Ionicons name="person-remove-outline" size={16} color="#E74C3C" style={styles.infoIcon} />
            <Text style={styles.place}>Drop-off Passengers: {dropPassengers}</Text>
          </View>
        )}
        
        <View style={styles.sectionDivider} />
        
        <View style={styles.infoRow}>
          <Ionicons name="distance-outline" size={16} color="#7F8C8D" style={styles.infoIcon} />
          <Text style={styles.place}>Distance: {totalDistance} km</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#7F8C8D" style={styles.infoIcon} />
          <Text style={styles.place}>Duration: {duration}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>Driver Information</Text>
        <TouchableOpacity
          style={styles.rowBetween}
          onPress={() => navigation.navigate('ContactDriver')}
        >
          <View style={styles.row}>
            <Image source={drivericon} style={styles.avatar} />
            <View>
              <Text style={styles.driverName}>{selectedDriver.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#F1C40F" />
                <Text style={[styles.detailText, { marginLeft: 4 }]}>{selectedDriver.rating} • {driverTrips} trips</Text>
              </View>
              <Text style={styles.detailText}>{selectedDriver.carModel} • {selectedDriver.type}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
        </TouchableOpacity>

        <View style={{ marginTop: 12, gap: 6 }}>
          <View style={styles.infoRow}>
            <Ionicons name="checkmark-circle-outline" size={16} color="#27AE60" style={styles.infoIcon} />
            <Text style={styles.detailText}>Verified Profile</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Trusted</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="cancel" size={16} color="#E74C3C" style={styles.infoIcon} />
            <Text style={styles.detailText}>Rarely cancels rides</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="navigate-outline" size={16} color="#3498DB" style={styles.infoIcon} />
            <Text style={styles.detailText}>Drop points on highways only</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="lock-outline" size={16} color="#7F8C8D" style={styles.infoIcon} />
            <Text style={styles.detailText}>Booking approval required</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5 name="smoking-ban" size={16} color="#E74C3C" style={styles.infoIcon} />
            <Text style={styles.detailText}>No smoking</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5 name="dog" size={16} color="#7F8C8D" style={styles.infoIcon} />
            <Text style={styles.detailText}>Pets allowed with prior notice</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="people-outline" size={16} color="#7F8C8D" style={styles.infoIcon} />
            <Text style={styles.detailText}>Max. 3 passengers</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('ContactDriverScreen')}>
          <Text style={styles.contactText}>Contact Driver</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('ReportRideScreen')}>
          <Text style={styles.contactText}>Report Ride</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>Passenger Information</Text>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Image source={passenger} style={styles.avatarSmall} />
            <View>
              <Text style={styles.passengerText}>{userName}</Text>
              <Text style={styles.detailText}>Traveling to {toAddress}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('PassengerContact')}>
            <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.dateRight}>{date}</Text>
        <Text style={styles.summaryTime}>{startTime} → {endTime}</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#E74C3C" style={styles.infoIcon} />
          <Text style={styles.summaryPlace}>{fromAddress}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="flag-outline" size={16} color="#27AE60" style={styles.infoIcon} />
          <Text style={styles.summaryPlace}>{toAddress}</Text>
        </View>
        
        {landmark !== 'None' && (
          <View style={styles.infoRow}>
            <Ionicons name="navigate-outline" size={16} color="#3498DB" style={styles.infoIcon} />
            <Text style={styles.summaryPlace}>{landmark}</Text>
          </View>
        )}
        
        <View style={styles.driverSummary}>
          <Image source={drivericon} style={styles.avatarSmall} />
          <View>
            <Text style={styles.detailText}>{selectedDriver.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#F1C40F" />
              <Text style={[styles.detailText, { marginLeft: 4, fontSize: 12 }]}>{selectedDriver.rating}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.price}>₹{fare}</Text>
        
        <TouchableOpacity style={styles.bookButton} onPress={handleRequestToBook}>
          <Text style={styles.bookText}>Request to Book</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookRideScreen;