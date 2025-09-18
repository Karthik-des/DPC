import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './BookingStatusScreenCss';
import driverIcon from '../../assets/drivericon.jpg'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

const BookingStatusScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract params from BookingConfirmationScreen
  const {
    selectedDriver = { name: 'Unknown', carModel: 'Unknown', type: 'Unknown' },
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

  // Calculate total seats
  const totalSeats = parseInt(mainPassengers) + parseInt(addPassengers);

  // Calculate response time (placeholder: 1 hour from startTime)
  const responseTime = new Date(
    Date.parse(`${date} ${startTime}`) + 60 * 60 * 1000
  ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
                 <Image
                   source={require('../../assets/Dropic.png')}
                   style={styles.logo}
                   onError={(e) => console.log('Image error:', e.nativeEvent.error)}
                 />
               </Animated.View>
          </View>

          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Your booking is awaiting the driver’s approval
            </Text>
            <View style={styles.responseBox}>
              <Text style={styles.responseText}>
                {selectedDriver.name} will respond before {responseTime} today
              </Text>
            </View>
          </View>

          <View style={styles.ridePlanBox}>
            <Text style={styles.ridePlanHeading}>Ride plan</Text>
            <Text style={styles.rideDate}>{date}</Text>
            <View style={styles.rideDetails}>
              <View>
                <Text style={styles.time}>{startTime}</Text>
                <Text style={styles.duration}>{duration}</Text>
                <Text style={styles.time}>{endTime}</Text>
              </View>
              <View style={styles.locations}>
                <Text style={styles.city}>{fromAddress}</Text>
                {addAddress && <Text style={styles.stop}>{addAddress}</Text>}
                <Text style={styles.city}>{toAddress}</Text>
                {dropAddress && <Text style={styles.stop}>{dropAddress}</Text>}
              </View>
            </View>
          </View>

          <View style={styles.paymentBox}>
            <Text style={styles.paymentText}>Pay Through upi</Text>
            <Text style={styles.seats}>{totalSeats} seat{totalSeats > 1 ? 's' : ''}</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('PaymentScreen', {
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
              <Text style={styles.price}>₹{totalCost}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.driverBox}>
            <Image source={driverIcon} style={styles.driverImage} />
            <View>
              <Text style={styles.driverName}>{selectedDriver.name}</Text>
              <Text style={styles.carDetails}>{selectedDriver.carModel}</Text>
              <Text style={styles.carColor}>{selectedDriver.type}</Text>
            </View>
          </View>

          <Text style={styles.noPassenger}>No other passengers yet</Text>

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Display')}>
              <Text style={styles.linkText}>See ride offer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CancelWarningScreen', {
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
              <Text style={styles.linkText}>Cancel request</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingStatusScreen;