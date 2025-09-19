import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const PublicationScreen = ({ navigation, route }) => {
  // Get data passed from BookedRidePlan
  const { rideData } = route.params || {};
  const [contactOptionsVisible, setContactOptionsVisible] = useState(false);

  // Function to handle phone call
  const handleCallSupport = () => {
    Alert.alert(
      "Call Support",
      "Would you like to call our support team?",
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
    Linking.openURL('mailto:support@ridesharer.com?subject=Support Request&body=Hello, I need assistance with my ride publication.');
  };

  // Function to handle chat support
  const handleChatSupport = () => {
    Alert.alert(
      "Chat Support",
      "Our chat support hours are 8AM-8PM daily. Would you like to start a chat?",
      [
        { text: "Not Now", style: "cancel" },
        { 
          text: "Start Chat", 
          onPress: () => {
            // In a real app, this would open a chat interface
            Alert.alert("Chat", "Connecting you with our support agent...");
          }
        }
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

  return (
    <ScrollView style={styles.container}>
      {/* Header with Saffron background and title in same line */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Your Ride Publication</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Subtitle below header */}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subHeaderText}>Active and looking for co-riders</Text>
      </View>

      {/* Main Content with White background */}
      <View style={styles.content}>
        {/* Publication Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#138808" />
            <Text style={styles.statusTitle}>Publication Active</Text>
          </View>
          <Text style={styles.statusDescription}>
            Your ride from {rideData?.from || "your location"} to {rideData?.to || "destination"} is now published and visible to potential co-riders.
          </Text>
        </View>

        {/* Ride Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Ride Information</Text>
          
          <View style={styles.detailItem}>
            <View style={[styles.iconContainer, {backgroundColor: '#FF9933'}]}>
              <Ionicons name="location-outline" size={20} color="#fff" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>From</Text>
              <Text style={styles.detailValue}>{rideData?.from || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={[styles.iconContainer, {backgroundColor: '#138808'}]}>
              <Ionicons name="navigate-outline" size={20} color="#fff" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>To</Text>
              <Text style={styles.detailValue}>{rideData?.to || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={[styles.iconContainer, {backgroundColor: '#FF9933'}]}>
              <Ionicons name="calendar-outline" size={20} color="#fff" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{rideData?.date || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={[styles.iconContainer, {backgroundColor: '#138808'}]}>
              <Ionicons name="time-outline" size={20} color="#fff" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{rideData?.time || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={[styles.iconContainer, {backgroundColor: '#FF9933'}]}>
              <Ionicons name="speedometer-outline" size={20} color="#fff" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Distance</Text>
              <Text style={styles.detailValue}>{rideData?.distance || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={[styles.iconContainer, {backgroundColor: '#138808'}]}>
              <Ionicons name="cash-outline" size={20} color="#fff" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Cost per seat</Text>
              <Text style={styles.detailValue}>{rideData?.cost || "Not specified"}</Text>
            </View>
          </View>
        </View>

        {/* Statistics Card */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Publication Stats</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, {backgroundColor: '#FF993320'}]}>
                <Ionicons name="eye-outline" size={24} color="#FF9933" />
              </View>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Views</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, {backgroundColor: '#13880820'}]}>
                <Ionicons name="people-outline" size={24} color="#138808" />
              </View>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Interests</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, {backgroundColor: '#00008020'}]}>
                <Ionicons name="chatbubble-outline" size={24} color="#000080" />
              </View>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Messages</Text>
            </View>
          </View>
        </View>

        {/* Support Section with Green background */}
        <View style={styles.supportCard}>
          <View style={styles.supportHeader}>
            <Ionicons name="help-buoy-outline" size={24} color="#fff" />
            <Text style={styles.supportTitle}>Need Assistance?</Text>
          </View>
          <Text style={styles.supportText}>
            Our support team is available 24/7 to help you with any questions about your ride publication.
          </Text>
          <TouchableOpacity style={styles.supportButton} onPress={showContactOptions}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
            <Ionicons name="chatbox-ellipses-outline" size={20} color="#fff" />
          </TouchableOpacity>
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
  header: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FF9933', // Saffron
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
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
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#6b7280',
  },
  placeholder: {
    width: 24,
  },
  content: {
    padding: 16,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#138808', // Green
    marginLeft: 8,
  },
  statusDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9933',
    paddingLeft: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  supportCard: {
    backgroundColor: '#138808', // Green
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.9,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  supportButtonText: {
    color: '#138808',
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default PublicationScreen;
