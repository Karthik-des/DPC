import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Switch,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './EditPublicationCss';

// Consistent header styles from CompleatedRidePlan
const additionalStyles = {
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 40,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginRight: 10,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  subHeader: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  saveButton: {
    padding: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
};

const EditPublicationScreen = ({ navigation, route }) => {
  // Get ride data passed from BookedRidePlan
  const { rideData } = route.params || {};
  
  // Form state
  const [from, setFrom] = useState(rideData?.from || '');
  const [to, setTo] = useState(rideData?.to || '');
  const [date, setDate] = useState(rideData?.date || '');
  const [time, setTime] = useState(rideData?.time || '');
  const [seatsAvailable, setSeatsAvailable] = useState(rideData?.seats || '3');
  const [pricePerSeat, setPricePerSeat] = useState(rideData?.cost || '');
  const [vehicleType, setVehicleType] = useState(rideData?.vehicleType || 'Sedan');
  const [amenities, setAmenities] = useState(rideData?.amenities || []);
  const [additionalInfo, setAdditionalInfo] = useState(rideData?.additionalInfo || '');
  const [isFlexibleTiming, setIsFlexibleTiming] = useState(rideData?.flexibleTiming || false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Available options
  const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'MPV', 'Luxury'];
  const amenityOptions = ['AC', 'Music', 'Charging Port', 'WiFi', 'Luggage Space', 'Pet Friendly'];

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB');
      setDate(formattedDate);
    }
  };

  // Handle time change
  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setTime(formattedTime);
    }
  };

  // Toggle amenity selection
  const toggleAmenity = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(item => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  // Validate form
  const validateForm = () => {
    if (!from.trim()) {
      Alert.alert('Error', 'Please enter your starting location');
      return false;
    }
    if (!to.trim()) {
      Alert.alert('Error', 'Please enter your destination');
      return false;
    }
    if (!date) {
      Alert.alert('Error', 'Please select a date');
      return false;
    }
    if (!time) {
      Alert.alert('Error', 'Please select a time');
      return false;
    }
    if (!pricePerSeat || isNaN(pricePerSeat) || parseFloat(pricePerSeat) <= 0) {
      Alert.alert('Error', 'Please enter a valid price per seat');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    const updatedRideData = {
      ...rideData,
      from,
      to,
      date,
      time,
      seats: seatsAvailable,
      cost: `₹${pricePerSeat}`,
      vehicleType,
      amenities,
      additionalInfo,
      flexibleTiming: isFlexibleTiming,
      updatedAt: new Date().toISOString()
    };

    // In a real app, you would save this data to your backend
    Alert.alert(
      'Success',
      'Your ride publication has been updated successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  // Handle cancel
  const handleCancel = () => {
    Alert.alert(
      'Cancel Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { text: 'Discard', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={additionalStyles.headerRow}>
        <TouchableOpacity
          style={additionalStyles.backButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <View style={additionalStyles.headerContent}>
          <Text style={additionalStyles.headerTitle}>Edit Publication</Text>
          <Text style={additionalStyles.subHeader}>Modify your ride details</Text>
        </View>
        <TouchableOpacity style={additionalStyles.saveButton} onPress={handleSubmit}>
          <Text style={additionalStyles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* Route Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>From</Text>
            <TextInput
              style={styles.input}
              value={from}
              onChangeText={setFrom}
              placeholder="Enter starting location"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>To</Text>
            <TextInput
              style={styles.input}
              value={to}
              onChangeText={setTo}
              placeholder="Enter destination"
            />
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.inputGroup, styles.flex1]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.inputLabel}>Date</Text>
              <View style={styles.dateTimeInput}>
                <Text style={styles.dateTimeText}>{date || 'Select date'}</Text>
                <Ionicons name="calendar" size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.inputGroup, styles.flex1, { marginLeft: 12 }]}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.inputLabel}>Time</Text>
              <View style={styles.dateTimeInput}>
                <Text style={styles.dateTimeText}>{time || 'Select time'}</Text>
                <Ionicons name="time" size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}

          <View style={styles.switchGroup}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel}>Flexible timing</Text>
              <Text style={styles.switchSubLabel}>Allow ±30 minutes flexibility</Text>
            </View>
            <Switch
              value={isFlexibleTiming}
              onValueChange={setIsFlexibleTiming}
              trackColor={{ false: '#E5E7EB', true: '#10B981' }}
              thumbColor={isFlexibleTiming ? '#fff' : '#fff'}
            />
          </View>
        </View>

        {/* Ride Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ride Details</Text>
          
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.inputLabel}>Seats Available</Text>
              <View style={styles.seatSelector}>
                <TouchableOpacity 
                  style={styles.seatButton}
                  onPress={() => setSeatsAvailable(Math.max(1, parseInt(seatsAvailable) - 1))}
                >
                  <Ionicons name="remove" size={20} color="#3B82F6" />
                </TouchableOpacity>
                <Text style={styles.seatCount}>{seatsAvailable}</Text>
                <TouchableOpacity 
                  style={styles.seatButton}
                  onPress={() => setSeatsAvailable(Math.min(6, parseInt(seatsAvailable) + 1))}
                >
                  <Ionicons name="add" size={20} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={[styles.inputGroup, styles.flex1, { marginLeft: 12 }]}>
              <Text style={styles.inputLabel}>Price per Seat (₹)</Text>
              <TextInput
                style={styles.input}
                value={pricePerSeat}
                onChangeText={setPricePerSeat}
                placeholder="0.00"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Vehicle Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vehicleScroll}>
              {vehicleTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.vehicleButton,
                    vehicleType === type && styles.vehicleButtonActive
                  ]}
                  onPress={() => setVehicleType(type)}
                >
                  <Text style={[
                    styles.vehicleButtonText,
                    vehicleType === type && styles.vehicleButtonTextActive
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <Text style={styles.sectionSubtitle}>Select amenities available in your vehicle</Text>
          
          <View style={styles.amenitiesGrid}>
            {amenityOptions.map((amenity) => (
              <TouchableOpacity
                key={amenity}
                style={[
                  styles.amenityButton,
                  amenities.includes(amenity) && styles.amenityButtonActive
                ]}
                onPress={() => toggleAmenity(amenity)}
              >
                <Ionicons 
                  name={amenities.includes(amenity) ? "checkmark-circle" : "ellipse-outline"} 
                  size={20} 
                  color={amenities.includes(amenity) ? "#10B981" : "#6B7280"} 
                />
                <Text style={[
                  styles.amenityText,
                  amenities.includes(amenity) && styles.amenityTextActive
                ]}>
                  {amenity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            placeholder="Any additional details about your ride (optional)"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Update Publication</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditPublicationScreen;