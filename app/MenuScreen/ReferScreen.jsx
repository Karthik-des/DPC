import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Share,
  Clipboard,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ReferCss';

const ReferScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userName = 'Guest' } = route.params || {};
  const [referralCode] = useState('BLABLA' + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');

  const shareReferralCode = async () => {
    try {
      const message = `🎉 Hey! Join Dropic and get ₹50 instant bonus! Use my referral code: ${referralCode}\n\nDownload the app: https://blabla.app\n\nHappy riding! 🚗`;
      
      await Share.share({
        message: message,
        title: 'Join Dropic - Get ₹50 Bonus!',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const sendInvite = () => {
    if (!friendName || !friendPhone) {
      Alert.alert('Missing Info', 'Please enter your friend\'s name and phone number');
      return;
    }
    
    Alert.alert(
      'Invitation Sent!', 
      `Invitation sent to ${friendName} at ${friendPhone}`,
      [{ text: 'OK', onPress: () => {
        setFriendName('');
        setFriendPhone('');
      }}]
    );
  };

  const howItWorksSteps = [
    {
      step: '1',
      title: 'Share Your Code',
      description: 'Share your unique referral code with friends',
      icon: 'share-social',
    },
    {
      step: '2',
      title: 'Friend Signs Up',
      description: 'Your friend downloads the app and uses your code',
      icon: 'person-add',
    },
    {
      step: '3',
      title: 'Both Earn ₹50',
      description: 'You both get ₹50 bonus instantly!',
      icon: 'cash',
    },
  ];

  const benefits = [
    { icon: 'flash', text: 'Instant ₹50 bonus for both' },
    { icon: 'infinite', text: 'Unlimited referrals' },
    { icon: 'gift', text: 'Special rewards for top referrers' },
    { icon: 'trending-up', text: 'Earn more with every ride' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header section removed */}

        {/* Hero Section */}
        <LinearGradient colors={['#FFD700', '#FFA500']} style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>🎁</Text>
            <Text style={styles.heroTitle}>Earn ₹50 for Every Friend!</Text>
            <Text style={styles.heroSubtitle}>Share the joy of riding with Bla Bla</Text>
          </View>
          <View style={styles.coinContainer}>
            <Text style={styles.coinEmoji}>💰</Text>
            <Text style={styles.earnAmount}>₹50</Text>
          </View>
        </LinearGradient>

        {/* Referral Code Section */}
        <View style={styles.codeSection}>
          <Text style={styles.sectionTitle}>Your Referral Code</Text>
          <View style={styles.codeContainer}>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{referralCode}</Text>
            </View>
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Ionicons name="copy" size={20} color="#ffffff" />
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.shareButton} onPress={shareReferralCode}>
            <LinearGradient colors={['#0089d8', '#006bb3']} style={styles.shareButtonGradient}>
              <Ionicons name="share-social" size={24} color="#ffffff" />
              <Text style={styles.shareButtonText}>Share with Friends</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Invite Section */}
        <View style={styles.inviteSection}>
          <Text style={styles.sectionTitle}>Quick Invite</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Friend's Name"
              value={friendName}
              onChangeText={setFriendName}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Friend's Phone Number"
              value={friendPhone}
              onChangeText={setFriendPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.inviteButton} onPress={sendInvite}>
              <Text style={styles.inviteButtonText}>Send Invitation</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsContainer}>
            {howItWorksSteps.map((item, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepIconContainer}>
                  <Ionicons name={item.icon} size={24} color="#0089d8" />
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{item.title}</Text>
                  <Text style={styles.stepDescription}>{item.description}</Text>
                </View>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Why Refer Friends?</Text>
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name={benefit.icon} size={28} color="#FFD700" />
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Referral Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Friends Referred</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>₹0</Text>
              <Text style={styles.statLabel}>Total Earned</Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          <Text style={styles.termsText}>
            • Both you and your friend will receive ₹50 bonus after successful signup{'\n'}
            • Bonus amount will be credited within 24 hours{'\n'}
            • Offer valid for new users only{'\n'}
            • Bla Bla reserves the right to modify this offer
          </Text>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferScreen;