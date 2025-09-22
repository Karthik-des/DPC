import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Alert, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import styles from './ProfilePictureStyles';

const ProfilePictureScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const fadeAnim = new Animated.Value(0); // Initialize fade animation

  // Run animation when screen is focused
  useFocusEffect(
    useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Reset animation when screen is unfocused
      return () => {
        fadeAnim.setValue(0);
      };
    }, [fadeAnim])
  );

  const validateImage = (asset) => {
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB max
    const MIN_IMAGE_WIDTH = 500; // Minimum width
    const MIN_IMAGE_HEIGHT = 500; // Minimum height
    const validImageTypes = ['image/jpeg', 'image/png'];

    if (!validImageTypes.includes(asset.mimeType)) {
      Alert.alert('Error', 'Invalid image format. Please upload a JPEG or PNG file.');
      return false;
    }

    if (asset.fileSize && asset.fileSize > MAX_IMAGE_SIZE) {
      Alert.alert('Error', 'Image size exceeds 2MB. Please select a smaller file.');
      return false;
    }

    if (asset.width && asset.height) {
      if (asset.width < MIN_IMAGE_WIDTH || asset.height < MIN_IMAGE_HEIGHT) {
        Alert.alert(
          'Error',
          `Image resolution is too low (${asset.width}x${asset.height}). Please upload a high-quality photo (minimum 500x500 pixels).`
        );
        return false;
      }

      const commonScreenshotResolutions = [
        { width: 1080, height: 1920 },
        { width: 1170, height: 2532 },
        { width: 1440, height: 2560 },
        { width: 1080, height: 2340 },
      ];
      const isScreenshot = commonScreenshotResolutions.some(
        res => asset.width === res.width && asset.height === res.height
      );
      if (isScreenshot) {
        Alert.alert(
          'Error',
          'This image appears to be a screenshot. Please take a photo of yourself using your camera.'
        );
        return false;
      }
    }

    return true;
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required to take a photo.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log('ImagePicker result (camera):', result);

      if (result.canceled) {
        Alert.alert('Cancelled', 'Photo capture was cancelled.');
        return;
      }

      const asset = result.assets[0];
      const processedResult = {
        uri: Platform.OS === 'android' && !asset.uri.startsWith('file://') ? `file://${asset.uri}` : asset.uri,
        name: asset.fileName || asset.uri.split('/').pop(),
        mimeType: asset.mimeType || 'image/jpeg',
        fileSize: asset.fileSize || 0,
        width: asset.width || 0,
        height: asset.height || 0,
      };

      if (!validateImage(processedResult)) {
        return;
      }

      setProfileImage(processedResult);
      Alert.alert('Success', 'Photo captured successfully.');
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', `Failed to take photo: ${error.message}`);
    }
  };

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required to choose a photo.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log('ImagePicker result (gallery):', result);

      if (result.canceled) {
        Alert.alert('Cancelled', 'Photo selection was cancelled.');
        return;
      }

      const asset = result.assets[0];
      const processedResult = {
        uri: Platform.OS === 'android' && !asset.uri.startsWith('file://') ? `file://${asset.uri}` : asset.uri,
        name: asset.fileName || asset.uri.split('/').pop(),
        mimeType: asset.mimeType || 'image/jpeg',
        fileSize: asset.fileSize || 0,
        width: asset.width || 0,
        height: asset.height || 0,
      };

      if (!validateImage(processedResult)) {
        return;
      }

      setProfileImage(processedResult);
      Alert.alert('Success', 'Photo selected successfully.');
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', `Failed to choose photo: ${error.message}`);
    }
  };

  const handleSave = () => {
    if (!profileImage) {
      Alert.alert('No Image', 'Please select or take a profile picture first.');
      return;
    }
    // Navigate to DriverVerification and pass profileImage data
    navigation.navigate('DriverVerification', {
      profilePhoto: {
        uri: profileImage.uri,
        name: profileImage.name,
        mimeType: profileImage.mimeType,
      },
    });
    Alert.alert('Success', 'Profile picture saved!');
  };

  return (
    <SafeAreaView style={styles.container} accessibilityLabel="Profile Setup Screen">
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
          >
            <Ionicons name="arrow-back" size={24} color="#09C912" />
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.headerTitle} accessibilityRole="header">
          Set Profile Picture
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage.uri }}
              style={styles.profileImage}
              onError={(e) => {
                console.error('Image load error:', e.nativeEvent.error);
                Alert.alert('Error', 'Failed to load the image. Please try another photo.');
                setProfileImage(null); // Reset on error
              }}
            />
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
            <LinearGradient colors={['#09C912', '#07A90A']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleChoosePhoto}
            accessibilityLabel="Choose from gallery"
            accessibilityHint="Opens gallery to select a profile picture"
          >
            <LinearGradient colors={['#09C912', '#07A90A']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          accessibilityLabel="Save profile picture"
          accessibilityHint="Saves the selected profile picture and navigates to Driver Verification"
        >
          <LinearGradient colors={['#09C912', '#07A90A']} style={styles.buttonGradient}>
            <Text style={styles.saveButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePictureScreen;