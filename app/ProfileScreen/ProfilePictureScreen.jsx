import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import styles from './ProfilePictureStyles';

const ProfilePictureScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const fadeAnim = new Animated.Value(0); // Initialize fade animation

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required to take a photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required to choose a photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleSave = () => {
    if (!profileImage) {
      Alert.alert('No Image', 'Please select or take a profile picture first.');
      return;
    }
    // Add logic to save the image (e.g., to a server or state management)
    Alert.alert('Success', 'Profile picture saved!');
    navigation.goBack(); // Return to previous screen after saving
  };

  return (
    <SafeAreaView style={styles.container} accessibilityLabel="Profile Setup Screen">
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
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
        <Text style={styles.headerTitle} accessibilityRole="header">Set Profile Picture</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="person-circle-outline" size={100} color="#9CA3AF" />
              <Text style={styles.placeholderText}>No image selected</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleTakePhoto}
            accessibilityLabel="Take a photo"
            accessibilityHint="Opens camera to take a new profile picture"
          >
            <LinearGradient
              colors={['#09C912', '#07A90A']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Take Photo</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleChoosePhoto}
            accessibilityLabel="Choose from gallery"
            accessibilityHint="Opens gallery to select a profile picture"
          >
            <LinearGradient
              colors={['#09C912', '#07A90A']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          accessibilityLabel="Save profile picture"
          accessibilityHint="Saves the selected profile picture and returns to previous screen"
        >
          <LinearGradient
            colors={['#09C912', '#07A90A']}
            style={styles.buttonGradient}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePictureScreen;