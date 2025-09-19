import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './CancelWarningScreenCss';
import { useNavigation, useRoute } from '@react-navigation/native';

const CancelWarningScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract params from BookingStatusScreen
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

  const handleCancel = () => {
    navigation.goBack(); // Returns to BookingStatusScreen
  };

  const handleConfirm = () => {
    navigation.navigate('CancelReasonScreen', {
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
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <View style={styles.headerrr}>
                     <TouchableOpacity
                       onPress={() => navigation.goBack()}
                       style={styles.backButton}
                     >
                       <Ionicons name="arrow-back" size={24} color="#09C912" />
                     </TouchableOpacity>
                   
                 
                   </View>
      </View>
      <Ionicons name="warning" size={60} color="#ff4b5c" style={styles.icon} />
      <Text style={styles.title}>Cancelling this ride may affect your future bookings</Text>
      <Text style={styles.description}>
        Plans changed? We get it. Just know that drivers can see how often you cancel. Cancel too
        often and they may be less likely to approve your next booking request.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
          <Ionicons name="close" size={22} color="#09C912" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleConfirm} style={styles.confirmBtn}>
          <Ionicons name="checkmark" size={22} color="#fff" />
          <Text style={styles.confirmText}>Confirm Cancellation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CancelWarningScreen;