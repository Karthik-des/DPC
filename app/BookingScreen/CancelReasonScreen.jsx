import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './CancelReasonScreenCss';
import { Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';

const reasons = [
  'The car owner changed the date/schedule',
  'I found another ride',
  'The car owner asked me to cancel',
  'The date is no longer suitable',
  'I made a mistake and shouldn’t have booked',
  'I found another means of transportation',
  'The car owner is no longer offering the ride',
  'The car owner is unreachable',
  'Something came up, I’m no longer travelling at all',
  'The driver changed the pick-up point',
];

const CancelReasonScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract params from CancelWarningScreen
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

  const handleReasonSelect = (reason) => {
    navigation.navigate('CancelCommentScreen', { 
      selectedReason: reason,
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
      </View>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <Image
          source={require('../../assets/Dropic.png')}
          style={styles.logo}
          onError={(e) => console.log('Image error:', e.nativeEvent.error)}
        />
      </Animated.View>

      <Text style={styles.title}>What’s the reason?</Text>

      {reasons.map((reason, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.reasonItem} 
          onPress={() => handleReasonSelect(reason)}
        >
          <Text style={styles.reasonText}>{reason}</Text>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CancelReasonScreen;