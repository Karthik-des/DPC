import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
  Animated,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ClaimsCss';

const Claims = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userName = 'Guest' } = route.params || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLegalContent, setSelectedLegalContent] = useState(null);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [animatedValues] = useState({
    fadeAnim: new Animated.Value(0),
    slideAnim: new Animated.Value(50),
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValues.fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues.slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClaimInsurance = () => {
    Alert.alert(
      '🚗 Claim Insurance',
      "Ready to submit your car insurance claim? We'll guide you through the process step by step.",
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Claim', onPress: () => navigation.navigate('NewClaims') } // Fixed screen name
      ]
    );
  };

  const handleLegalView = (content) => {
    setSelectedLegalContent(content);
    setModalVisible(true);
  };

  const handleHelpPress = () => {
    setHelpModalVisible(true);
  };

  const claimProcedureContent = `📋 Claim Procedure

🔔 Step 1: Report the Incident
• Contact our support team within 24 hours
• Call 1800-123-4567 (24/7 available)
• Use our mobile app for instant reporting

📄 Step 2: Submit Documents
• Upload incident proof (police report, photos)
• Provide medical bills if applicable
• Submit vehicle registration documents
• Include driver's license copy

⏱️ Step 3: Review Process
• Our expert team reviews within 7-10 business days
• Site inspection may be scheduled if required
• Additional documentation requests will be sent via app

✅ Step 4: Claim Resolution
• Receive real-time updates via email and app
• Direct bank transfer upon approval
• Detailed settlement report provided

💡 Pro Tips:
• Keep all original documents safe
• Take clear photos of damage immediately
• Cooperate fully with our investigation team`;

  const termsAndConditionsContent = `📜 Terms and Conditions

⏰ Filing Requirements:
• Claims must be filed within 30 days of incident
• Late submissions may result in claim rejection
• Emergency claims accepted within 48 hours

👤 Profile Requirements:
• Email address must be verified and current
• Date of birth should match policy documents
• Phone number must be active for communication
• Address details should be up-to-date

⚠️ Important Conditions:
• Fraudulent claims result in immediate account suspension
• Coverage is subject to policy terms and premium status
• Pre-existing damage is not covered
• Claims under influence of alcohol/drugs are void

🔒 Privacy & Security:
• All personal information is encrypted and secure
• Data is shared only with authorized personnel
• Complete confidentiality maintained throughout process

📞 For clarifications, contact our legal team at legal@acko.com`;

  const helpContent = `🆘 Help Center - Car Insurance Claims

📞 Emergency Contact:
• Helpline: 1800-123-4567 (24/7)
• WhatsApp: +91-98765-43210
• Email: support@acko.com
• Live Chat: Available in app

⚡ Quick Actions:
• Track claim status in real-time
• Upload additional documents instantly
• Schedule callback from expert
• Download claim forms

🚨 Emergency Protocol:
• For accidents: Dial 112 immediately
• Inform Acko within 2 hours of incident
• Do not leave accident site without proper documentation
• Take photos of all vehicles and surroundings

🔧 Common Issues & Solutions:
• Missing Documents: Check required documents list in app
• Delayed Response: Track status or call support
• Technical Issues: Clear app cache or reinstall
• Payment Delays: Verify bank account details

⏰ Current Status:
Time: 12:05 PM IST, Monday, August 18, 2025
Claims submitted now will be processed by tomorrow morning.
Weekend support available for emergencies.

💬 Need more help? Our AI assistant is available 24/7 in the app chat section.`;

  const coverageData = [
    {
      icon: 'shield-checkmark',
      title: 'Personal Accident/Accidental Death',
      amount: '₹5,00,000',
      color: '#e74c3c',
      description: 'Complete protection for you and your family'
    },
    {
      icon: 'medical',
      title: 'Medical Expense for Hospitalization',
      amount: '₹1,00,000',
      color: '#27ae60',
      description: 'Covers all hospitalization costs'
    },
    {
      icon: 'fitness',
      title: 'OPD Treatment',
      amount: '₹3,000',
      color: '#3498db',
      description: 'Outpatient treatment coverage'
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#e6f0fa" />
      
      <LinearGradient colors={['#004adfff', '#0a22b7ff']} style={styles.header}>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Claims Center</Text>
          <Text style={styles.headerSubtitle}>Hello, {userName}!</Text>
        </View>
        <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
          <Ionicons name="help-circle" size={24} color="#ffffff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            { opacity: animatedValues.fadeAnim },
            { transform: [{ translateY: animatedValues.slideAnim }] }
          ]}
        >
          <LinearGradient colors={['#ff6b6b', '#ee5a52']} style={styles.warningBanner}>
            <View style={styles.warningIconContainer}>
              <Ionicons name="warning" size={20} color="#ffffff" />
            </View>
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>Action Required</Text>
              <Text style={styles.warningText}>
                Complete your profile to unlock instant claim processing
              </Text>
            </View>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#667eea" />
              <Text style={styles.sectionTitle}>Policy Coverage</Text>
            </View>
            
            {coverageData.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.coverageCard,
                  {
                    opacity: animatedValues.fadeAnim,
                    transform: [{ 
                      translateX: animatedValues.slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, index % 2 === 0 ? -50 : 50]
                      })
                    }]
                  }
                ]}
              >
                <LinearGradient 
                  colors={['#ffffff', '#f8f9ff']} 
                  style={styles.coverageCardGradient}
                >
                  <View style={[styles.coverageIcon, { backgroundColor: item.color }]}>
                    <Ionicons name={item.icon} size={24} color="#ffffff" />
                  </View>
                  <View style={styles.coverageDetails}>
                    <Text style={styles.coverageTitle}>{item.title}</Text>
                    <Text style={styles.coverageDescription}>{item.description}</Text>
                    <Text style={styles.coverageAmount}>Up to {item.amount}</Text>
                  </View>
                  <TouchableOpacity style={styles.coverageAction}>
                    <Ionicons name="chevron-forward" size={20} color="#667eea" />
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text-outline" size={24} color="#0e33d7ff" />
              <Text style={styles.sectionTitle}>Legal & Documentation</Text>
            </View>
            
            <View style={styles.legalContainer}>
              <TouchableOpacity 
                style={styles.legalCard}
                onPress={() => handleLegalView('claimProcedure')}
              >
                <LinearGradient colors={['#0c389fff', '#0a499cff']} style={styles.legalCardGradient}>
                  <Ionicons name="list" size={24} color="#ffffff" />
                  <Text style={styles.legalCardTitle}>Claim Procedure</Text>
                  <Text style={styles.legalCardSubtitle}>Step-by-step guide</Text>
                  <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.legalCard}
                onPress={() => handleLegalView('termsAndConditions')}
              >
                <LinearGradient colors={['#ff6b6b', '#ee5a52']} style={styles.legalCardGradient}>
                  <Ionicons name="shield-checkmark" size={24} color="#ffffff" />
                  <Text style={styles.legalCardTitle}>Terms & Conditions</Text>
                  <Text style={styles.legalCardSubtitle}>Important policies</Text>
                  <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            <View style={styles.importantNote}>
              <Ionicons name="information-circle" size={16} color="#f39c12" />
              <Text style={styles.legalNote}>
                Ensure your email, date of birth, and phone number are accurate to prevent claim cancellations.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.claimButtonContainer} onPress={handleClaimInsurance}>
            <LinearGradient colors={['#21549cff', '#1268e0ff']} style={styles.claimButton}>
              <Ionicons name="add-circle" size={28} color="#ffffff" />
              <View style={styles.claimButtonText}>
                <Text style={styles.claimButtonTitle}>Start New Claim</Text>
                <Text style={styles.claimButtonSubtitle}>Quick & Easy Process</Text>
              </View>
              <Ionicons name="arrow-forward-circle" size={28} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.poweredBy}>🔒 Secured by Acko Insurance • Available 24/7</Text>
          </View>
        </Animated.View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedLegalContent === 'claimProcedure' ? '📋 Claim Procedure' : '📜 Terms & Conditions'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                <Ionicons name="close-circle" size={28} color="#ffffff" />
              </TouchableOpacity>
            </LinearGradient>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalText}>
                {selectedLegalContent === 'claimProcedure' ? claimProcedureContent : termsAndConditionsContent}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={helpModalVisible}
        onRequestClose={() => setHelpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient colors={['#00b894', '#00a085']} style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🆘 Help Center</Text>
              <TouchableOpacity onPress={() => setHelpModalVisible(false)} style={styles.modalCloseButton}>
                <Ionicons name="close-circle" size={28} color="#ffffff" />
              </TouchableOpacity>
            </LinearGradient>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalText}>{helpContent}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Claims;