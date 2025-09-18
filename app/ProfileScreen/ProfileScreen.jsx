import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Clipboard,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './ProfileScreenCss';

const ProfileScreen = ({ isLoggedIn, setIsLoggedIn, user }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || 'Peter',
    phone: user?.phone || '60000000023',
    rating: user?.rating || 5.00,
    avatarUrl: user?.avatarUrl || 'https://i.pravatar.cc/150?img=56',
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Mock loading delay
  }, [user]); // Re-run if user changes

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleCopyPhone = () => {
    Clipboard.setString(userData.phone);
    Alert.alert('Copied!', 'Phone number copied to clipboard.');
  };

  const handleLogout = () => {
    if (!setIsLoggedIn) {
      console.warn('setIsLoggedIn is not available');
      return;
    }
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setIsLoggedIn(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission', 'Sorry, we need camera roll permissions to upload photos!');
        return false;
      }
    }
    return true;
  };

  const handleAvatarPress = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    let result;
    if (Platform.OS === 'web') {
      Alert.alert('Info', 'Photo upload is not fully supported on web. Please use a mobile device.');
      // For web, you’d need a custom file input (e.g., react-dropzone), but this is a fallback
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (result && !result.canceled) {
      setUserData((prev) => ({ ...prev, avatarUrl: result.assets[0].uri }));
      Alert.alert('Success', 'Profile photo updated!');
    } else if (result?.canceled) {
      Alert.alert('Cancelled', 'Photo upload was cancelled.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0089d8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Profile</Text> */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out" size={24} color="#0089d8" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.8}>
            <Image
              source={{ uri: userData.avatarUrl }}
              style={styles.avatar}
              onError={() => Alert.alert('Error', 'Failed to load profile image.')}
            />
            <View style={styles.editAvatar}>
              <Ionicons name="camera" size={18} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userData.name}</Text>
        <TouchableOpacity onPress={handleCopyPhone} style={styles.phoneContainer}>
          <Text style={styles.phone}>{userData.phone}</Text>
          <Ionicons name="copy" size={16} color="#0089d8" style={styles.copyIcon} />
        </TouchableOpacity>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>Rating: {userData.rating} ⭐</Text>
          <TouchableOpacity onPress={() => Alert.alert('Rating', 'View detailed rating stats here.')}>
            <Ionicons name="star" size={16} color="#0089d8" style={styles.ratingIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
          <Ionicons name="create" size={20} color="#ffffff" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('BookRide')}>
          <Ionicons name="calendar" size={20} color="#ffffff" />
          <Text style={styles.actionText}>View Bookings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;