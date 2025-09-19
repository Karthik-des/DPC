import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Alert,
  TextInput,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Consistent header styles from CompleatedRidePlan
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

const SupportScreen = ({ navigation, route }) => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Support categories
  const categories = [
    { id: 'general', label: 'General Help', icon: 'help-circle' },
    { id: 'technical', label: 'Technical Issues', icon: 'hardware-chip' },
    { id: 'payment', label: 'Payment Issues', icon: 'card' },
    { id: 'safety', label: 'Safety Concerns', icon: 'shield-checkmark' },
    { id: 'account', label: 'Account Issues', icon: 'person' },
  ];

  // Common questions based on category
  const commonQuestions = {
    general: [
      "How do I cancel a ride?",
      "How do I change my ride details?",
      "How do I contact my driver?",
    ],
    technical: [
      "App is crashing or not responding",
      "I'm having trouble with GPS",
      "Payment is not processing",
    ],
    payment: [
      "I was charged incorrectly",
      "How do I get a refund?",
      "My payment method isn't working",
    ],
    safety: [
      "I feel unsafe during my ride",
      "How do I report a driver?",
      "What safety measures are in place?",
    ],
    account: [
      "I can't log into my account",
      "How do I update my profile?",
      "I want to delete my account",
    ],
  };

  // Function to handle phone call
  const handleCallSupport = () => {
    Alert.alert(
      "Call Support",
      "Would you like to call our 24/7 support team?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Call", 
          onPress: () => Linking.openURL('tel:+18005551234')
        }
      ]
    );
  };

  // Function to handle email support
  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@ridesharer.com?subject=Support Request&body=Hello, I need assistance with...');
  };

  // Function to handle chat support
  const handleChatSupport = () => {
    Alert.alert(
      "Live Chat",
      "Our support agents are available 24/7. Would you like to start a chat?",
      [
        { text: "Not Now", style: "cancel" },
        { 
          text: "Start Chat", 
          onPress: () => {
            // In a real app, this would open a chat interface
            Alert.alert("Chat Support", "Connecting you with our support agent...");
          }
        }
      ]
    );
  };

  // Function to handle FAQ selection
  const handleFAQSelect = (question) => {
    Alert.alert(
      question,
      "Would you like to view the answer to this question or contact support directly?",
      [
        { text: "View Answer", onPress: () => showAnswer(question) },
        { text: "Contact Support", onPress: () => showContactOptions() },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  // Function to show answer (simplified)
  const showAnswer = (question) => {
    // In a real app, this would show the actual answer
    Alert.alert(
      question,
      "Here would be the detailed answer to your question. For more specific assistance, please contact our support team.",
      [
        { text: "OK" },
        { text: "Contact Support", onPress: () => showContactOptions() }
      ]
    );
  };

  // Function to show contact options
  const showContactOptions = () => {
    Alert.alert(
      "Contact Support",
      "How would you like to contact us?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call Support", onPress: handleCallSupport },
        { text: "Email Support", onPress: handleEmailSupport },
        { text: "Chat Support", onPress: handleChatSupport },
      ]
    );
  };

  // Function to handle message submission
  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert("Error", "Please enter your message before submitting.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Message Sent",
        "Thank you for contacting us. We'll get back to you within 24 hours.",
        [{ text: "OK", onPress: () => setMessage('') }]
      );
    }, 1500);
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
          <Text style={additionalStyles.headerTitle}>Support Center</Text>
          <Text style={additionalStyles.subHeader}>Get help with your ride</Text>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroIcon}>
          <Ionicons name="help-buoy" size={40} color="#FF9933" />
        </View>
        <Text style={styles.heroTitle}>How can we help you?</Text>
        <Text style={styles.heroSubtitle}>
          We're here to assist you with any questions or concerns about your ride sharing experience.
        </Text>
      </View>

      {/* Quick Contact Options */}
      <View style={styles.quickContact}>
        <Text style={styles.sectionTitle}>Quick Support</Text>
        <View style={styles.contactOptions}>
          <TouchableOpacity style={styles.contactOption} onPress={handleCallSupport}>
            <View style={[styles.optionIcon, { backgroundColor: '#13880820' }]}>
              <Ionicons name="call" size={24} color="#138808" />
            </View>
            <Text style={styles.optionText}>Call Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption} onPress={handleEmailSupport}>
            <View style={[styles.optionIcon, { backgroundColor: '#FF993320' }]}>
              <Ionicons name="mail" size={24} color="#FF9933" />
            </View>
            <Text style={styles.optionText}>Email Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption} onPress={handleChatSupport}>
            <View style={[styles.optionIcon, { backgroundColor: '#00008020' }]}>
              <Ionicons name="chatbubbles" size={24} color="#000080" />
            </View>
            <Text style={styles.optionText}>Live Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Selection */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>What do you need help with?</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={20} 
                color={activeCategory === category.id ? '#fff' : '#FF9933'} 
              />
              <Text style={[
                styles.categoryText,
                activeCategory === category.id && styles.categoryTextActive
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Common Questions */}
      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>Common Questions</Text>
        <View style={styles.faqList}>
          {commonQuestions[activeCategory].map((question, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              onPress={() => handleFAQSelect(question)}
            >
              <Text style={styles.faqText}>{question}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.contactForm}>
        <Text style={styles.sectionTitle}>Send us a message</Text>
        <TextInput
          style={styles.messageInput}
          multiline
          numberOfLines={5}
          placeholder="Describe your issue or question in detail..."
          value={message}
          onChangeText={setMessage}
          textAlignVertical="top"
        />
        <TouchableOpacity 
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Text style={styles.submitButtonText}>Sending...</Text>
          ) : (
            <>
              <Ionicons name="send" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.submitButtonText}>Send Message</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Support Info */}
      <View style={styles.supportInfo}>
        <Text style={styles.infoTitle}>Support Availability</Text>
        <View style={styles.infoItem}>
          <Ionicons name="time" size={20} color="#138808" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>24/7 Support</Text>
            <Text style={styles.infoDescription}>Our team is available round the clock</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="alert-circle" size={20} color="#FF9933" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Emergency</Text>
            <Text style={styles.infoDescription}>Call 911 for emergencies</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="document-text" size={20} color="#000080" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Response Time</Text>
            <Text style={styles.infoDescription}>We typically respond within 24 hours</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  heroSection: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF993310',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  quickContact: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactOption: {
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  categorySection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  categoryScroll: {
    marginHorizontal: -16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryButtonActive: {
    backgroundColor: '#FF9933',
    borderColor: '#FF9933',
  },
  categoryText: {
    marginLeft: 8,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  faqSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  faqList: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  faqText: {
    fontSize: 14,
    color: '#4b5563',
    flex: 1,
    paddingRight: 16,
  },
  contactForm: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#138808',
    padding: 16,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  supportInfo: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default SupportScreen;
