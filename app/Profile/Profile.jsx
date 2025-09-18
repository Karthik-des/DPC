import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ProfileCss';

// Navigates to dedicated form screens instead of using a modal

const Profile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('about');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: 'naveenmech432l@gmail.com',
    phone: '',
    governmentId: '',
    miniBio: '',
    travelPreferences: {
      smokingAllowed: false,
      petsAllowed: false,
      musicPreference: 'any',
      chattiness: 'moderate',
    },
    vehicle: {
      make: '',
      model: '',
      year: '',
      color: '',
      licensePlate: '',
    },
  });

  const [profileImageUri, setProfileImageUri] = useState(null);

  const requestMediaPermissions = useCallback(async () => {
    const media = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return media.granted;
  }, []);

  const requestCameraPermissions = useCallback(async () => {
    const cam = await ImagePicker.requestCameraPermissionsAsync();
    return cam.granted;
  }, []);

  const pickFromGallery = useCallback(async () => {
    const granted = await requestMediaPermissions();
    if (!granted) {
      Alert.alert('Permission required', 'Please allow photo library access to select an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImageUri(result.assets[0].uri);
    }
  }, [requestMediaPermissions]);

  const takePhoto = useCallback(async () => {
    const granted = await requestCameraPermissions();
    if (!granted) {
      Alert.alert('Permission required', 'Please allow camera access to take a photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImageUri(result.assets[0].uri);
    }
  }, [requestCameraPermissions]);

  const openProfilePicturePicker = useCallback(() => {
    Alert.alert(
      'Profile picture',
      'Select a source',
      [
        { text: 'Choose from Gallery', onPress: pickFromGallery },
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }, [pickFromGallery, takePhoto]);

  const openFormScreen = useCallback((type) => {
    // map type to route
    const routeMap = {
      personal: '/Profile/forms/PersonalDetailsForm',
      govId: '/Profile/forms/VerifyGovIdForm',
      phone: '/Profile/forms/ConfirmPhoneForm',
      miniBio: '/Profile/forms/MiniBioForm',
      addVehicle: '/Profile/forms/AddVehicleForm',
      ratings: '/Profile/forms/RatingsForm',
      savedPassengers: '/Profile/forms/SavedPassengersForm',
      communicationPreferences: '/Profile/forms/CommunicationPreferencesForm',
      password: '/Profile/forms/ChangePasswordForm',
      postalAddress: '/Profile/forms/PostalAddressForm',
    };
    const path = routeMap[type];
    if (path) {
      router.push(path);
    }
  }, [router]);

  const handleFormSubmit = useCallback(() => {
    Alert.alert('Success', 'Information updated successfully!');
  }, []);

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateNestedFormData = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  // using separate screens for forms now


  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <TouchableOpacity style={styles.profileInfo} onPress={() => router.push('/Profile/ViewProfile')}>
        <View style={styles.profileImage}>
          {profileImageUri ? (
            <Image source={{ uri: profileImageUri }} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
          ) : (
            <Text style={styles.profileImageText}>A</Text>
          )}
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>Newcomer</Text>
          <Text style={styles.profileStatus}>Member since 2024</Text>
        </View>
        <View style={styles.chevronIcon}>
          <Ionicons name="chevron-forward" size={24} color="#bbb" />
        </View>
      </TouchableOpacity>
    </View>
  );

  const ProfileCompletion = () => (
    <View style={styles.completionSection}>
      <Text style={styles.completionTitle}>Complete your profile</Text>
      <Text style={styles.completionDescription}>
        This helps builds trust, encouraging members to travel with you.
      </Text>
      <Text style={styles.completionProgress}>0 out of 6 complete</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '0%' }]} />
      </View>
      <TouchableOpacity onPress={openProfilePicturePicker}>
        <Text style={styles.addProfilePicture}>Add profile picture</Text>
      </TouchableOpacity>
    </View>
  );

  const EditPersonalDetails = () => (
    <TouchableOpacity style={styles.menuItem} onPress={() => openFormScreen('personal')}>
      <View style={styles.menuItemIcon}>
        <Ionicons name="person" size={20} color="#ffffff" />
      </View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>Edit personal details</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#bbb" />
    </TouchableOpacity>
  );

  const VerificationSection = () => (
    <View>
      <Text style={styles.sectionHeader}>Verify your profile</Text>
      
      <TouchableOpacity style={styles.verificationItem} onPress={() => openFormScreen('govId')}>
        <View style={styles.verificationIcon}>
          <Ionicons name="add" size={18} color="#ffffff" />
        </View>
        <View style={styles.verificationContent}>
          <Text style={styles.verificationTitle}>Verify your Govt. ID</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.verificationItem}>
        <View style={styles.verificationIcon}>
          <Ionicons name="add" size={18} color="#ffffff" />
        </View>
        <View style={styles.verificationContent}>
          <Text style={styles.verificationTitle}>Confirm email</Text>
          <Text style={styles.verificationSubtitle}>naveenmech432l@gmail.com</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.verificationItem} onPress={() => openFormScreen('phone')}>
        <View style={styles.verificationIcon}>
          <Ionicons name="add" size={18} color="#ffffff" />
        </View>
        <View style={styles.verificationContent}>
          <Text style={styles.verificationTitle}>Confirm phone number</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const ReliabilitySection = () => (
    <View style={styles.reliabilitySection}>
      <Text style={styles.reliabilityTitle}>Your carpooling reliability</Text>
      <View style={styles.reliabilityItem}>
        <View style={styles.reliabilityIcon}>
          <Ionicons name="checkmark" size={16} color="#ffffff" />
        </View>
        <Text style={styles.reliabilityText}>Never cancels bookings as a passenger</Text>
      </View>
    </View>
  );

  const AboutYouSection = () => (
    <View>
      <Text style={styles.sectionHeader}>About you</Text>
      
      <TouchableOpacity style={styles.verificationItem} onPress={() => openFormScreen('miniBio')}>
        <View style={styles.verificationIcon}>
          <Ionicons name="add" size={18} color="#ffffff" />
        </View>
        <View style={styles.verificationContent}>
          <Text style={styles.verificationTitle}>Add a mini bio</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.verificationItem}>
        <View style={styles.verificationIcon}>
          <Ionicons name="add" size={18} color="#ffffff" />
        </View>
        <View style={styles.verificationContent}>
          <Text style={styles.verificationTitle}>Edit travel preferences</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const VehiclesSection = () => (
    <View>
      <Text style={styles.sectionHeader}>Vehicles</Text>
      
      <TouchableOpacity style={styles.verificationItem} onPress={() => openFormScreen('addVehicle')}>
        <View style={styles.verificationIcon}>
          <Ionicons name="add" size={18} color="#ffffff" />
        </View>
        <View style={styles.verificationContent}>
          <Text style={styles.verificationTitle}>Add vehicle</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const handleAccountItemClick = (type) => {
    const routeMap = {
      ratings: '/Profile/forms/RatingsForm',
      savedPassengers: '/Profile/forms/SavedPassengersForm',
      communicationPreferences: '/Profile/forms/CommunicationPreferencesForm',
      password: '/Profile/forms/ChangePasswordForm',
      postalAddress: '/Profile/forms/PostalAddressForm',
    };
    const path = routeMap[type];
    if (path) {
      router.push(path);
    }
  };

  const AccountSection = () => {
    const accountMenuItems = [
      { title: 'Ratings', icon: 'star-outline', type: 'ratings' },
      { title: 'Saved passengers', icon: 'bookmark-outline', type: 'savedPassengers' },
      { title: 'Communication preferences', icon: 'chatbubble-outline', type: 'communicationPreferences' },
      { title: 'Password', icon: 'lock-closed-outline', type: 'password' },
      { title: 'Postal address', icon: 'location-outline', type: 'postalAddress' },
      { title: 'Payout methods', icon: 'card-outline' },
      { title: 'Payouts', icon: 'wallet-outline' },
      { title: 'Payment methods', icon: 'credit-card-outline' },
      { title: 'Payments & refunds', icon: 'receipt-outline' },
      { title: 'Help', icon: 'help-circle-outline' },
      { title: 'Terms and Conditions', icon: 'document-text-outline' },
      { title: 'Data protection', icon: 'shield-checkmark-outline' },
    ];

    return (
      <View style={styles.accountSection}>
        {accountMenuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.accountMenuItem,
              index === accountMenuItems.length - 1 && styles.accountMenuItemLast,
            ]}
            onPress={() => handleAccountItemClick(item.type)}
          >
            <Text style={styles.accountMenuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderAboutContent = () => (
    <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <ProfileHeader />
        <ProfileCompletion />
        <EditPersonalDetails />
        <VerificationSection />
        <ReliabilitySection />
        <AboutYouSection />
        <VehiclesSection />
      </View>
    </ScrollView>
  );

  const renderAccountContent = () => (
    <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <AccountSection />
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header with Tabs */}
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'about' ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab('about')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'about' && styles.activeTabText,
              ]}
            >
              About you
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'account' ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab('account')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'account' && styles.activeTabText,
              ]}
            >
              Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {activeTab === 'about' ? renderAboutContent() : renderAccountContent()}
      
      {/* forms are now separate screens; modal removed */}
    </SafeAreaView>
  );
};

export default Profile;