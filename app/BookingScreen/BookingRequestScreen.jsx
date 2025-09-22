import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import styles from './BookingRequestScreenCss';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

const BookingRequestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract params from BookRideScreen
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

  // Calculate total seats
  const totalSeats = parseInt(mainPassengers) + parseInt(addPassengers);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
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
        <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
          <Text style={styles.headerTitle}>Booking Request</Text>
          <Text style={styles.headerSubtitle}>Review and confirm your trip details</Text>
        </Animated.View>

        <View style={styles.content}>
          <Text style={styles.heading}>Check Your Booking Request</Text>
          <Text style={styles.note}>
            Your booking won't be confirmed until the driver approves your request
          </Text>

          <View style={styles.rideCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="calendar-outline" size={20} color="#3498DB" />
              <Text style={styles.date}>{date}</Text>
            </View>
            
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={18} color="#7F8C8D" />
              <Text style={styles.timeRoute}>{startTime} → {endTime}</Text>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.routeRow}>
                <Ionicons name="location-outline" size={16} color="#E74C3C" />
                <Text style={styles.route}>{fromAddress}</Text>
              </View>
              <View style={styles.routeRow}>
                <Ionicons name="flag-outline" size={16} color="#27AE60" />
                <Text style={styles.route}>{toAddress}</Text>
              </View>
              {addAddress && (
                <View style={styles.routeRow}>
                  <Ionicons name="add-circle-outline" size={16} color="#3498DB" />
                  <Text style={styles.route}>Add: {addAddress}</Text>
                </View>
              )}
              {dropAddress && (
                <View style={styles.routeRow}>
                  <Ionicons name="remove-circle-outline" size={16} color="#E74C3C" />
                  <Text style={styles.route}>Drop: {dropAddress}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.rideCard}>
            <Text style={styles.priceLabel}>Price Summary</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>{totalSeats} seat{totalSeats > 1 ? 's' : ''}</Text>
              <Text style={styles.priceValue}>₹{totalCost}</Text>
            </View>
            <View style={styles.paymentMethod}>
              <Ionicons name="cash-outline" size={18} color="#27AE60" />
              <Text style={styles.cash}>Cash Payment</Text>
            </View>
            <Text style={styles.subText}>Pay directly to the driver</Text>
          </View>

          <View style={styles.messageCard}>
            <Text style={styles.messageLabel}>
              Send a message to {selectedDriver.name}
            </Text>
            <Text style={styles.messageSubtitle}>
              Introduce yourself and share any special requests
            </Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={5}
              placeholder={`Hello ${selectedDriver.name}, I'm ${userName}! I've just booked your ride. I'd be glad to travel with you. Can I get more information on ...?`}
              placeholderTextColor="#95a5a6"
            />
          </View>

          <TouchableOpacity
            style={styles.requestButton}
            onPress={() => navigation.navigate('BookingConfirmationScreen', {
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
            <FontAwesome name="paper-plane" size={16} color="#fff" />
            <Text style={styles.buttonText}>Send Booking Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BookingRequestScreen;