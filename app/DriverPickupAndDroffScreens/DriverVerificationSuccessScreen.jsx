import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './DriverVerificationSucessStyles';

const DriverVerificationSuccessScreen = ({ navigation }) => {
  const handleGoHome = () => {
    navigation.navigate('RidePublishScreen'); // Adjust 'Home' to your actual home screen name
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={100} color="#09C912" style={styles.icon} />
        <Text style={styles.title}>Verification Submitted!</Text>
        <Text style={styles.message}>
          Thank you for submitting your documents. Our team will review them, and you will be notified via the app once the verification is complete. This process may take up to 48 hours.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGoHome}>
          <LinearGradient colors={['#09C912', '#07A90A']} style={styles.gradient}>
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DriverVerificationSuccessScreen;