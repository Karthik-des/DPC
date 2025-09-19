import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Share, 
  Alert,
  ActionSheetIOS,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './RidePlanCss';

// Consistent header styles from YourRides
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
};

const BookedRidePlan = ({ navigation, route }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [hasProfilePicture, setHasProfilePicture] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [rideStatus, setRideStatus] = useState('Booked');

  const rideData = route?.params?.rideData || {};
  const { onCancelRide } = route.params || {};

  // Function to calculate countdown and status
  const calculateCountdown = () => {
    const now = new Date();
    const rideDateTime = new Date(`${rideData.date} ${rideData.time}`);
    
    if (rideDateTime < now) {
      setRideStatus('Completed');
      setCountdown('');
      return;
    }

    const timeDiff = rideDateTime.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    let countdownText = '';
    
    if (days > 0) {
      countdownText = `${days} day${days > 1 ? 's' : ''} to go`;
    } else if (hours > 0) {
      countdownText = `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min to go`;
    } else if (minutes > 0) {
      countdownText = `${minutes} minute${minutes > 1 ? 's' : ''} to go`;
    } else {
      countdownText = 'Starting soon';
    }

    setCountdown(countdownText);
    setRideStatus('Booked');
  };

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(() => {
      calculateCountdown();
    }, 1000);
    return () => clearInterval(interval);
  }, [rideData.date, rideData.time]);

  const handleVerifyId = () => {
    navigation.navigate('IdUpload', {
      onVerificationComplete: (success, docType, result) => {
        if (success) {
          setIsVerified(true);
        }
      }
    });
  };

  const pickImageFromCamera = async () => {
    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!cameraPermission.granted) {
        Alert.alert(
          'Camera Permission Required', 
          'Please allow camera access to take photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        setHasProfilePicture(true);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera. Please try again.');
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!galleryPermission.granted) {
        Alert.alert(
          'Gallery Permission Required', 
          'Please allow access to your photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        setHasProfilePicture(true);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to open gallery. Please try again.');
    }
  };

  const showImagePickerOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Gallery'],
          cancelButtonIndex: 0,
          title: 'Select Profile Picture',
          message: 'How would you like to add your profile picture?'
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            pickImageFromCamera();
          } else if (buttonIndex === 2) {
            pickImageFromGallery();
          }
        }
      );
    } else {
      Alert.alert(
        'Select Profile Picture',
        'How would you like to add your profile picture?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Take Photo', onPress: pickImageFromCamera },
          { text: 'Choose from Gallery', onPress: pickImageFromGallery },
        ],
        { cancelable: true }
      );
    }
  };

  const shareRideDetails = async () => {
    try {
      const shareMessage = `🚗 My Ride Details:
      
📍 From: ${rideData.from}
📍 To: ${rideData.to}
📅 Date: ${rideData.date}
🕐 Time: ${rideData.time}
📏 Distance: ${rideData.distance}
⏱️ Duration: ${rideData.estimatedTime}
💰 Cost: ${rideData.cost}
✅ Status: ${rideStatus}${countdown ? '\n⏰ ' + countdown : ''}`;

      await Share.share({
        message: shareMessage,
        title: 'Ride Details - ' + rideData.from + ' to ' + rideData.to
      });
    } catch (error) {
      console.error('Error sharing ride details:', error);
      Alert.alert('Error', 'Unable to share ride details. Please try again.');
    }
  };

  // Handle cancel ride button press - navigate to CancelRideScreen
  const handleCancelPress = () => {
    navigation.navigate('CancelRide', {
      rideData: rideData,
      onCancelRide: onCancelRide
    });
  };

  // Handle book similar ride - navigate to HomeScreen with prefilled data
  const handleBookSimilarRide = () => {
    navigation.navigate('HomeScreen', {
      prefillData: {
        from: rideData.from,
        to: rideData.to,
        date: rideData.date,
        time: rideData.time
      }
    });
  };

  // Navigate to PublicationScreen
  const handleViewPublication = () => {
    navigation.navigate('PublicationScreen', {
      rideData: rideData,
      profileImage: profileImage,
      isVerified: isVerified
    });
  };

  // Navigate to EditPublicationScreen
  const handleEditPublication = () => {
    navigation.navigate('EditPublicationScreen', { 
      rideData: {
        ...rideData,
        profileImage: profileImage,
        isVerified: isVerified
      } 
    });
  };

  // Navigate to SupportScreen
  const handleGetSupport = () => {
    navigation.navigate('SupportScreen');
  };

  const getStatusColor = () => {
    return '#3B82F6'; // Blue for Booked
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={additionalStyles.headerRow}>
        <TouchableOpacity
          style={additionalStyles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <View style={additionalStyles.headerContent}>
          <Text style={additionalStyles.headerTitle}>Ride Plan</Text>
          <Text style={additionalStyles.subHeader}>Trip Details</Text>
        </View>
      </View>

      {/* Ride Details Card */}
      <View style={styles.rideDetailsCard}>
        <View style={styles.routeSection}>
          <View style={styles.titleAndStatus}>
            <Text style={styles.sectionTitle}>Trip Details</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {rideStatus}
              </Text>
            </View>
          </View>
          
          {countdown && (
            <View style={styles.countdownContainer}>
              <Ionicons name="time-outline" size={20} color="#F59E0B" />
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>
          )}
          
          <View style={styles.routeContainer}>
            <View style={styles.routeItem}>
              <View style={styles.fromDot} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>{rideData.from}</Text>
                <Text style={styles.timeText}>{rideData.date} • {rideData.time}</Text>
              </View>
            </View>
            
            <View style={styles.routeLine} />
            
            <View style={styles.routeItem}>
              <Ionicons name="location" size={20} color="#EF4444" />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>{rideData.to}</Text>
                <Text style={styles.estimateText}>{rideData.estimatedTime} • {rideData.distance}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tripStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>{rideData.distance}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>{rideData.estimatedTime}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Cost</Text>
              <Text style={styles.statValueCost}>{rideData.cost}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Verification Section */}
      <View style={styles.verificationCard}>
        <Text style={styles.sectionTitle}>Verification & Profile</Text>
        
        <TouchableOpacity 
          style={[styles.verificationItem, isVerified && styles.verifiedItem]}
          onPress={handleVerifyId}
        >
          <View style={styles.verificationLeft}>
            <Ionicons 
              name={isVerified ? "checkmark-circle" : "document-text-outline"} 
              size={24} 
              color={isVerified ? "#10B981" : "#6B7280"} 
            />
            <View style={styles.verificationText}>
              <Text style={styles.verificationTitle}>Verify your Govt. ID</Text>
              <Text style={styles.verificationSubtitle}>
                {isVerified ? "ID verified successfully" : "Upload Aadhaar, PAN or Driving License"}
              </Text>
            </View>
          </View>
          <Ionicons 
            name={isVerified ? "checkmark-circle" : "chevron-forward"} 
            size={20} 
            color={isVerified ? "#10B981" : "#9CA3AF"} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.verificationItem, hasProfilePicture && styles.verifiedItem]}
          onPress={showImagePickerOptions}
        >
          <View style={styles.verificationLeft}>
            <View style={styles.profilePicturePlaceholder}>
              {hasProfilePicture && profileImage ? (
                <Image 
                  source={{ uri: profileImage }} 
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="camera-outline" size={20} color="#6B7280" />
              )}
            </View>
            <View style={styles.verificationText}>
              <Text style={styles.verificationTitle}>Add Profile Picture</Text>
              <Text style={styles.verificationSubtitle}>
                {hasProfilePicture ? "Profile picture added" : "Take a photo or choose from gallery"}
              </Text>
            </View>
          </View>
          <Ionicons 
            name={hasProfilePicture ? "checkmark-circle" : "chevron-forward"} 
            size={20} 
            color={hasProfilePicture ? "#10B981" : "#9CA3AF"} 
          />
        </TouchableOpacity>
      </View>

      {/* Publication & Support Section */}
      <View style={styles.publicationCard}>
        <Text style={styles.sectionTitle}>Publication & Support</Text>
        
        <TouchableOpacity 
          style={styles.actionItem}
          onPress={handleViewPublication}
        >
          <View style={styles.actionLeft}>
            <View style={styles.actionIcon}>
              <Ionicons name="globe-outline" size={20} color="#3B82F6" />
            </View>
            <View>
              <Text style={styles.actionTitle}>See your publication online</Text>
              <Text style={styles.actionSubtitle}>View your ride sharing profile</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionItem}
          onPress={handleEditPublication}
        >
          <View style={styles.actionLeft}>
            <View style={styles.actionIcon}>
              <Ionicons name="create-outline" size={20} color="#F59E0B" />
            </View>
            <View>
              <Text style={styles.actionTitle}>Edit your publication</Text>
              <Text style={styles.actionSubtitle}>Update ride preferences & details</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionItem}
          onPress={handleGetSupport}
        >
          <View style={styles.actionLeft}>
            <View style={styles.actionIcon}>
              <Ionicons name="help-circle-outline" size={20} color="#8B5CF6" />
            </View>
            <View>
              <Text style={styles.actionTitle}>Get support</Text>
              <Text style={styles.actionSubtitle}>Contact us for help & assistance</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Additional Actions */}
      <View style={styles.additionalActions}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleBookSimilarRide}
        >
          <Text style={styles.primaryButtonText}>Book Similar Ride</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={shareRideDetails}
        >
          <Ionicons name="share-outline" size={20} color="#1E293B" style={{ marginRight: 8 }} />
          <Text style={styles.secondaryButtonText}>Share Ride Details</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={handleCancelPress}
        >
          <Ionicons name="close-outline" size={20} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={styles.cancelButtonText}>Cancel Ride</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookedRidePlan;