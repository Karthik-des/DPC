import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import styles from './CancelCommentScreenCss';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

const CancelCommentScreen = () => {
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  // Extract params from CancelReasonScreen
  const {
    selectedReason,
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

  const handleSubmit = async () => {
    // Validate that comment is not empty
    if (!comment.trim()) {
      Alert.alert('Error', 'Please enter a comment before submitting.');
      return;
    }

    // Placeholder for API call to submit cancellation reason and comment
    try {
      // Example API call (replace with your endpoint)
      // await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userName, selectedReason, comment, ...route.params }),
      // });
      navigation.navigate('HomeScreen', { userName }); // Pass userName or other params if needed
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Failed to submit cancellation. Please try again.');
    }
  };

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
        <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
          <Image
            source={require('../../assets/Dropic.png')}
            style={styles.logo}
            onError={(e) => console.log('Image error:', e.nativeEvent.error)}
          />
        </Animated.View>

        <Text style={styles.title}>Please tell us more</Text>

        <TextInput
          style={styles.input}
          placeholder="Max. 150 characters"
          placeholderTextColor="#888"
          multiline
          maxLength={150}
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelCommentScreen;