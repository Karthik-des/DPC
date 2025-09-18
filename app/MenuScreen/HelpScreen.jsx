import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialIcons, FontAwesome, Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const navigation = useNavigation();

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqs = [
    {
      id: 1,
      question: "How do I book a ride?",
      answer: "Open the app, enter your pickup and drop locations, select your vehicle type, and confirm your booking."
    },
    {
      id: 2,
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, net banking, and cash payments."
    },
    {
      id: 3,
      question: "How do I cancel a ride?",
      answer: "Go to your active rides, select the ride you want to cancel, and tap the cancel button."
    },
    {
      id: 4,
      question: "What if I left something in the vehicle?",
      answer: "Contact our customer support immediately with your ride details and item description."
    },
    {
      id: 5,
      question: "How do I become a driver partner?",
      answer: "Download the partner app from our website and follow the registration process."
    }
  ];

  const contactSupport = () => {
    Linking.openURL('mailto:support@carpoolstart.com');
  };

  const callSupport = () => {
    Linking.openURL('tel:+18001234567');
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/18001234567');
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          {/* <Ionicons name="arrow-back" size={24} color="white" /> */}
        </TouchableOpacity>
        <Text style={styles.headerText}>Help & Support</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3059/3059518.png' }} 
            style={styles.heroImage}
          />
          <Text style={styles.heroText}>We're here to help you!</Text>
          <Text style={styles.heroSubText}>Find answers to common questions or contact our support team</Text>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={contactSupport}>
            <MaterialIcons name="email" size={24} color="#2E86DE" />
            <Text style={styles.quickActionText}>Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={callSupport}>
            <Feather name="phone" size={24} color="#2E86DE" />
            <Text style={styles.quickActionText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={openWhatsApp}>
            <FontAwesome name="whatsapp" size={24} color="#2E86DE" />
            <Text style={styles.quickActionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
        
        {/* FAQs Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        {faqs.map(item => (
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity 
              style={styles.faqQuestion} 
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.questionText}>{item.question}</Text>
              <AntDesign 
                name={expandedItems[item.id] ? "up" : "down"} 
                size={16} 
                color="#666" 
              />
            </TouchableOpacity>
            
            {expandedItems[item.id] && (
              <View style={styles.faqAnswer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
        
        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Still need help?</Text>
          <Text style={styles.contactText}>Our customer support team is available 24/7</Text>
          
          <TouchableOpacity style={styles.supportButton} onPress={callSupport}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal:16
  },
  header: {
    backgroundColor: '#2E86DE',
    paddingVertical:10,
    padding: 10,
 
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:24,
    marginTop:15
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heroImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  heroText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  heroSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAction: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  quickActionText: {
    marginTop: 8,
    color: '#333',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginRight: 10,
  },
  faqAnswer: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  supportButton: {
    backgroundColor: '#2E86DE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  supportButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HelpScreen;
