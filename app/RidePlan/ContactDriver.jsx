import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet, Clipboard, Linking, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

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
    color: '#1E293B',
  },
  subHeader: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
};

const ContactDriver = ({ navigation, route }) => {
  const { rideData } = route.params;
  const phoneNumber = '7989745771';
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [driverReply, setDriverReply] = useState('');

  const userMessages = [
    { id: '1', text: 'Please, wait 5 min', reply: 'No Problem, I will wait 5 min.' },
    { id: '2', text: 'Please hurry, I’m at the main entrance', reply: 'Almost there, navigating traffic.' },
    { id: '3', text: 'I’m at the pickup point', reply: 'I see you, pulling up now.' },
    { id: '4', text: 'Can you make it quick?', reply: 'Doing my best, within 3 minutes.' },
  ];

  const handleMessageSelect = (message) => {
    setSelectedMessage(message.text);
    setDriverReply(message.reply);
  };

  const handleCallDriver = () => {
    Alert.alert(
      'Call Driver',
      `Are you sure you want to call ${rideData.driverName} at ${phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: async () => {
            console.log(`Initiating call to ${phoneNumber}`);
            try {
              const supported = await Linking.canOpenURL(`tel:${phoneNumber}`);
              if (supported) {
                await Linking.openURL(`tel:${phoneNumber}`);
                Alert.alert('Calling', `Connecting to ${rideData.driverName}...`);
              } else {
                Alert.alert('Error', 'Phone calls are not supported on this device.');
              }
            } catch (error) {
              Alert.alert('Error', 'Unable to initiate call.');
            }
          },
        },
      ]
    );
  };

  const handleMessageDriver = () => {
    try {
      navigation.navigate('ChatScreen', { rideData, phoneNumber, historyOnly: false });
      console.log('Navigating to ChatScreen with rideData:', rideData, 'phoneNumber:', phoneNumber, 'historyOnly: false');
    } catch (error) {
      Alert.alert('Navigation Error', 'Unable to open chat. Please try again.');
      console.error('Navigation error:', error);
    }
  };

  const handleViewAllMessages = () => {
    try {
      navigation.navigate('ChatScreen', { rideData, phoneNumber, historyOnly: true });
      console.log('Navigating to ChatScreen with rideData:', rideData, 'phoneNumber:', phoneNumber, 'historyOnly: true');
    } catch (error) {
      Alert.alert('Navigation Error', 'Unable to view chat history. Please try again.');
      console.error('Navigation error:', error);
    }
  };

  const handleCopyPhoneNumber = () => {
    Clipboard.setString(phoneNumber);
    Alert.alert('Copied', 'Phone number copied to clipboard!');
  };

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.messageBubble,
        selectedMessage === item.text ? styles.selectedMessageBubble : styles.userMessageBubble,
      ]}
      onPress={() => handleMessageSelect(item)}
      activeOpacity={0.7}
    >
      <Text style={[styles.messageText, { color: '#FFFFFF' }]}>{item.text}</Text>
      <Text style={[styles.messageTime, { color: '#D1D5DB' }]}>Today, 2:{30 + parseInt(item.id) * 5} PM</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={additionalStyles.headerRow}>
        <TouchableOpacity 
          style={additionalStyles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <View style={additionalStyles.headerContent}>
          <Text style={additionalStyles.headerTitle}>Contact Driver</Text>
          <Text style={additionalStyles.subHeader}>Reach out to {rideData.driverName}</Text>
        </View>
      </View>

      <Animated.View entering={FadeIn.duration(500)} style={styles.content}>
        <View style={styles.driverCard}>
          <View style={styles.driverAvatar}>
            <Ionicons name="person" size={48} color="#64748B" />
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{rideData.driverName}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.ratingText}>{rideData.driverRating} / 5</Text>
            </View>
            <View style={styles.phoneContainer}>
              <Ionicons name="call-outline" size={18} color="#64748B" />
              <Text style={styles.phoneText}>{phoneNumber}</Text>
              <TouchableOpacity onPress={handleCopyPhoneNumber} style={styles.copyButton}>
                <Ionicons name="copy-outline" size={18} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Animated.View entering={FadeIn.duration(600).delay(100)} style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleCallDriver}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#3B82F6', '#60A5FA']}
              style={styles.gradientButton}
            >
              <Ionicons name="call" size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Call Driver</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleMessageDriver}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#10B981', '#34D399']}
              style={styles.gradientButton}
            >
              <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Message Driver</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(600).delay(200)} style={styles.messagePreviewSection}>
          <Text style={styles.sectionTitle}>Messages Here</Text>
          <View style={styles.messageCard}>
            <FlatList
              data={userMessages}
              renderItem={renderMessageItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
            {selectedMessage && (
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{driverReply}</Text>
                <Text style={styles.messageTime}>Today, 2:{35 + (userMessages.findIndex(m => m.text === selectedMessage) + 1) * 2} PM</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.viewAllMessages} onPress={handleViewAllMessages} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All Messages</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F59E0B',
    marginLeft: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 16,
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
  },
  copyButton: {
    padding: 8,
  },
  actionSection: {
    marginBottom: 24,
  },
  actionButton: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  messagePreviewSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  messageBubble: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userMessageBubble: {
    backgroundColor: '#3B82F6',
    alignSelf: 'flex-end',
  },
  selectedMessageBubble: {
    backgroundColor: '#1E40AF',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 14,
    color: '#1E293B',
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'right',
  },
  viewAllMessages: {
    alignItems: 'center',
    marginTop: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
});

export default ContactDriver;