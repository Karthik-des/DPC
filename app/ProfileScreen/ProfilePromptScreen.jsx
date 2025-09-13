import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ProfilePromptStyles';

const ProfilePromptScreen = ({ navigation }) => {
  const [showArrow, setShowArrow] = useState(false);
  const [nextScreen, setNextScreen] = useState(null);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleYesPress = () => {
    setShowArrow(true);
    setNextScreen('ProfilePictureScreen'); // Navigate to profile picture screen
  };

  const handleNoPress = () => {
    setShowArrow(true);
    setNextScreen('RidePublishScreen'); // Navigate to RidePublishScreen
  };

  const handleArrowPress = () => {
    if (nextScreen === 'ProfilePictureScreen') {
      navigation.navigate('ProfilePictureScreen');
    } else if (nextScreen === 'RidePublishScreen') {
      navigation.navigate('RidePublishScreen'); // Navigate to RidePublishScreen
    }
    setShowArrow(false);
    setNextScreen(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen"
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Add your profile picture</Text>
        <Text style={styles.subtitle}>
          Passengers will want to see who you are.
        </Text>
        <TouchableOpacity
          style={styles.yesButton}
          onPress={handleYesPress}
          accessibilityLabel="Yes, add profile picture"
          accessibilityHint="Proceeds to set your profile picture"
        >
          <LinearGradient
            colors={['#09C912', '#07A90A']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Yes, sure!</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.noButton}
          onPress={handleNoPress}
          accessibilityLabel="No, skip profile picture"
          accessibilityHint="Proceeds without setting a profile picture"
        >
          <Text style={styles.noButtonText}>No, thanks</Text>
        </TouchableOpacity>
        {showArrow && (
          <Animated.View style={styles.arrowContainer}>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={handleArrowPress}
              accessibilityLabel="Confirm selection"
              accessibilityHint="Confirms your choice and navigates to the next screen"
            >
              <Ionicons name="arrow-down-circle" size={50} color="#09C912" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProfilePromptScreen;