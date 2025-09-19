import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity,Clipboard } from 'react-native';
import { useRouter } from 'expo-router'; // Added for Expo Router
import { useNavigation } from '@react-navigation/native'; // Added for React Navigation compatibility
import { Ionicons } from '@expo/vector-icons'; // Added for back arrow
import Animated, { FadeIn, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import styles from './PaymentScreenCss.js';

const gpayIcon = require('../../assets/Payment-Icons/gpay.png');
const phonepeIcon = require('../../assets/Payment-Icons/phonepe.png');
const qrIcon = require('../../assets/Payment-Icons/qr.png');
const cashIcon = require('../../assets/Payment-Icons/cash.png');
const upiIcon = require('../../assets/Payment-Icons/upi.png');

const PaymentOption = ({ icon, text, subText, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress();
  };

  return (
    <Animated.View style={[styles.option, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.optionInner}
      >
        <View style={styles.optionContent}>
          <Image source={icon} style={styles.appLogo} />
          <View>
            <Text style={styles.optionText}>{text}</Text>
            {subText && <Text style={styles.subText}>{subText}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const PaymentScreen = () => {
  const referralCode = 'ABC123'; // Replace with your project's referral code
  const scale = useSharedValue(1);
  const router = useRouter(); // Added for Expo Router
  const navigation = useNavigation(); // Added for React Navigation

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleCopyCode = () => {
    Clipboard.setString(referralCode);
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    alert('Referral code copied!');
  };

  const handlePayment = (method) => {
    console.log(`Selected payment method: ${method}`);
    // Add your payment processing logic here
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#09C912" />
              </TouchableOpacity>
            
              <View style={styles.placeholder} />
            </View>

      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
      
        <Text style={styles.headerTitle}>Choose Payment Method</Text>
      </Animated.View>

      {/* Referral Code Section */}
      <View style={styles.referralSection}>
        <Text style={styles.referralTitle}>Refer & Earn</Text>
        <Text style={styles.referralSubText}>Share this code to earn rewards!</Text>
        <Animated.View style={[styles.referralContainer, animatedStyle]}>
          <Text style={styles.referralCode}>{referralCode}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopyCode}
            activeOpacity={0.8}
          >
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={upiIcon} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Pay by any UPI app</Text>
        </View>
        <PaymentOption
          icon={gpayIcon}
          text="GPay"
          onPress={() => handlePayment('GPay')}
        />
        <PaymentOption
          icon={phonepeIcon}
          text="PhonePe"
          onPress={() => handlePayment('PhonePe')}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pay Later</Text>
        <PaymentOption
          icon={qrIcon}
          text="Pay at Drop"
          subText="Go cashless with QR code"
          onPress={() => handlePayment('QR')}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Others</Text>
        <PaymentOption
          icon={cashIcon}
          text="Cash"
          onPress={() => handlePayment('Cash')}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Secured by 256-bit encryption</Text>
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;