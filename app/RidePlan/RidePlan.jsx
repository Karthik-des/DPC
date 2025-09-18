import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Share, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './RidePlanCss';

const RidePlan = ({ navigation, route }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [hasProfilePicture, setHasProfilePicture] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // ✅ FIX: added state

  // Default ride data
  const defaultRideData = {
    id: '1',
    date: '2025-09-14',
    time: '2:30 PM',
    from: 'Connaught Place',
    to: 'Indira Gandhi International Airport',
    distance: '18.5 km',
    estimatedTime: '45 min',
    cost: '₹285',
    status: 'Completed'
  };

  // Ride data from params or defaults
  const rideData = route?.params?.rideData ? {
    ...route.params.rideData,
    time: route.params.rideData.time || '2:30 PM',
    distance: route.params.rideData.distance || '15.2 km',
    estimatedTime: route.params.rideData.estimatedTime || '35 min',
    cost: route.params.rideData.cost || '₹250'
  } : defaultRideData;

  const handleVerifyId = () => {
    setIsVerified(!isVerified);
  };

  // ✅ FIX: Profile image picker
  const handleAddProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'You need to allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setHasProfilePicture(true);
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
✅ Status: ${rideData.status}`;

      const result = await Share.share({
        message: shareMessage,
        title: 'Ride Details - ' + rideData.from + ' to ' + rideData.to
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Ride details shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing ride details:', error);
      Alert.alert('Error', 'Unable to share ride details. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ride Plan</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Ride Details Card */}
      <View style={styles.rideDetailsCard}>
        <View style={styles.routeSection}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          
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
        
        {/* ID Verification */}
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

        {/* Profile Picture */}
        <TouchableOpacity 
          style={[styles.verificationItem, hasProfilePicture && styles.verifiedItem]}
          onPress={handleAddProfilePicture}
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
                {hasProfilePicture ? "Profile picture added" : "Help others recognize you"}
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
        
        <TouchableOpacity style={styles.actionItem}>
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

        <TouchableOpacity style={styles.actionItem}>
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

        <TouchableOpacity style={styles.actionItem}>
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
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Book Similar Ride</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={shareRideDetails}
        >
          <Ionicons name="share-outline" size={20} color="#1E293B" style={{ marginRight: 8 }} />
          <Text style={styles.secondaryButtonText}>Share Ride Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RidePlan;
