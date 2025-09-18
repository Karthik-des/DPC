// EnableScreen.jsx
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { Video } from 'expo-av';
import styles from './EnableStyles';
import { Ionicons } from '@expo/vector-icons';

const EnableScreen = ({ navigation, route }) => {
  const { passengerCount, isComfortOptionChecked } = route?.params || {};

  const handleEnableInstantBooking = () => {
    console.log('Enable Instant Booking pressed');
    console.log('Passenger Count:', passengerCount);
    console.log('Comfort Option:', isComfortOptionChecked);
    // Example navigation:
    // navigation.navigate('HomeScreen');
  };

  const handleReviewRequests = () => {
    console.log('Review every request pressed');
    console.log('Passenger Count:', passengerCount);
    console.log('Comfort Option:', isComfortOptionChecked);
    // Example navigation:
     navigation.navigate('PriceSelectionScreen');
  };

  const features = [
    { icon: '🔔', title: 'Instant Notifications' },
    { icon: '⚡', title: 'Quick Approvals' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
 <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
        <View style={styles.placeholder} />
      </View>


      {/* Main Content without ScrollView */}
      <View style={styles.mainContent}>
        {/* Video Section */}
        <View style={styles.videoContainer}>
          <Video
            source={require('../../assets/Enable.mp4')}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping={false}
            isMuted={false}
          />
        </View>

        {/* Welcome and Tip */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to Instant Booking!</Text>
          <Text style={styles.title}>
            Tip: Enable for faster rides across India.
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>{feature.icon}</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.enableButton}
            onPress={handleEnableInstantBooking}
            activeOpacity={0.8}
          >
            <Text style={styles.enableButtonText}>Enable</Text>
            <Text style={styles.enableButtonIcon}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reviewButton}
            onPress={handleReviewRequests}
            activeOpacity={0.8}
          >
            <Text style={styles.reviewButtonText}>Review</Text>
            <Text style={styles.reviewButtonIcon}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnableScreen;