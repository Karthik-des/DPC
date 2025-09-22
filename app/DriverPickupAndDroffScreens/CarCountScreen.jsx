// CarCountScreen.jsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Animated,
  Pressable 
} from 'react-native';
import styles from './CarCountstyles'; 
import { Ionicons } from '@expo/vector-icons';

const CarCountScreen = ({ navigation }) => {
  const [passengerCount, setPassengerCount] = useState(4);
  const [isComfortOptionChecked, setIsComfortOptionChecked] = useState(true);
  
  // Animation values
  const [decrementScale] = useState(new Animated.Value(1));
  const [incrementScale] = useState(new Animated.Value(1));
  const [nextButtonScale] = useState(new Animated.Value(1));
  
  const MIN_PASSENGERS = 1;
  const MAX_PASSENGERS = 7; // Updated to 7 for seats 2-8 (seat 1 is driver)

  const handleDecrement = () => {
    if (passengerCount > MIN_PASSENGERS) {
      animateButton(decrementScale);
      setPassengerCount(passengerCount - 1);
    } 
  };

  const handleIncrement = () => {
    if (passengerCount < MAX_PASSENGERS) {
      animateButton(incrementScale);
      setPassengerCount(passengerCount + 1);
    }
  };

  const animateButton = (scaleValue) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNext = () => {
    console.log('Navigation button pressed');
    console.log('Navigation object:', navigation);
    
    animateButton(nextButtonScale);
    
    // Add a small delay to ensure animation completes
    setTimeout(() => {
      try {
        if (navigation && navigation.navigate) {
          navigation.navigate('PriceSelectionScreen', {
            passengerCount,
            isComfortOptionChecked,
          });
          console.log('Navigation successful');
        } else {
          console.error('Navigation object is not available');
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }, 150);
  };

  const handleComfortToggle = () => {
    setIsComfortOptionChecked(!isComfortOptionChecked);
  };

  const renderSeatGrid = () => {
    const seatLayout = [
      [1, 'driver'],
      [2, 3],
      [4, 5],
      [6, 7]
    ];
    
    return seatLayout.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.seatRow}>
        {row.map((seat, seatIndex) => {
          const isDriver = seat === 'driver';
          const seatNumber = typeof seat === 'number' ? seat : 0;
          const isAvailablePassenger = !isDriver && seatNumber <= passengerCount;
          
          let seatStyle;
          let textStyle = styles.seatText;
          
          if (isDriver) {
            seatStyle = styles.seatDriver;
          } else if (isAvailablePassenger) {
            seatStyle = styles.seatCustomerAvailable;
          } else {
            seatStyle = styles.seatCustomerUnavailable;
            textStyle = [styles.seatText, styles.seatTextUnavailable];
          }
          
          return (
            <View
              key={`${rowIndex}-${seatIndex}`}
              style={[styles.seatIcon, seatStyle]}
            >
              <Text style={textStyle}>
                {isDriver ? '👨‍✈️' : seatNumber}
              </Text>
            </View>
          );
        })}
      </View>
    ));
  };

  const renderSeatLegend = () => (
    <View style={styles.seatLegend}>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, styles.seatDriver]} />
        <Text style={styles.legendText}>Driver</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, styles.seatCustomerAvailable]} />
        <Text style={styles.legendText}>Available</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, styles.seatCustomerUnavailable]} />
        <Text style={styles.legendText}>Unavailable</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pickup Time</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollViewContainer} 
        contentContainerStyle={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            How many passengers can you take?
          </Text>
          <Text style={styles.subtitle}>
            Choose the number of available seats
          </Text>
        </View>

        {/* Counter Section */}
        <View style={styles.counterCard}>
          <View style={styles.counterContainer}>
            <Animated.View style={{ transform: [{ scale: decrementScale }] }}>
              <TouchableOpacity
                style={[
                  styles.counterButton,
                  passengerCount <= MIN_PASSENGERS
                    ? styles.counterButtonDisabled
                    : styles.counterButtonActive,
                ]}
                onPress={handleDecrement}
                disabled={passengerCount <= MIN_PASSENGERS}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.counterButtonText,
                    passengerCount <= MIN_PASSENGERS && styles.counterButtonTextDisabled,
                  ]}
                >
                  - {/* Added the decrement symbol */}
                  
                </Text> 
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.counterNumberContainer}>
              <Text style={styles.counterNumber}>{passengerCount}</Text>
              <Text style={styles.counterLabel}>
                passenger{passengerCount !== 1 ? 's' : ''}
              </Text>
            </View>

            <Animated.View style={{ transform: [{ scale: incrementScale }] }}>
              <TouchableOpacity
                style={[
                  styles.counterButton,
                  passengerCount >= MAX_PASSENGERS
                    ? styles.counterButtonDisabled
                    : styles.counterButtonActive, 
                ]}
                onPress={handleIncrement}
                disabled={passengerCount >= MAX_PASSENGERS}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.counterButtonText,
                    passengerCount >= MAX_PASSENGERS && styles.counterButtonTextDisabled,
                  ]}
                >
                  +
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={styles.rangeInfo}>
            <Text style={styles.rangeText}>
              Range: {MIN_PASSENGERS} - {MAX_PASSENGERS} passengers
            </Text>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.optionsCard}>
          <Text style={styles.optionsTitle}>Passenger Preferences</Text>
          
          <Pressable
            style={[
              styles.optionRow,
              isComfortOptionChecked && styles.optionRowActive,
            ]}
            onPress={handleComfortToggle}
            android_ripple={{ color: '#f0f0f0', borderless: false }}
          >
            <View
              style={[
                styles.checkbox,
                isComfortOptionChecked
                  ? styles.checkboxChecked
                  : styles.checkboxUnchecked,
              ]}
            >
              {isComfortOptionChecked && (
                <Text style={styles.checkIcon}>✓</Text>
              )}
            </View>
            
            <View style={styles.optionContent}>
              <View style={styles.optionMainText}>
                <Text style={styles.optionText}>Priority comfort seating</Text>
                <Text style={styles.optionIcon}>🪑</Text>
              </View>
              <Text style={styles.optionSubText}>
                Maximize space between passengers for comfortable journey
              </Text>
            </View>
          </Pressable>
        </View>

        {/* Seat Visual Section */}
        <View style={styles.seatCard}>
          <Text style={styles.seatTitle}>Car Seat Layout</Text>
          <View style={styles.seatGrid}>
            {renderSeatGrid()}
          </View>
          {renderSeatLegend()}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <Animated.View style={{ transform: [{ scale: nextButtonScale }] }}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>Continue</Text>
            <Text style={styles.nextButtonIcon}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default CarCountScreen;