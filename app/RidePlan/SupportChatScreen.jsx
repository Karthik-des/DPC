import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const SupportChatScreen = ({ navigation, route }) => {
  const { rideData } = route.params;
  const [messages, setMessages] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null);
  const [showReasonPicker, setShowReasonPicker] = useState(true);
  const socketRef = useRef(null);

  const restorationReasons = [
    { id: 1, reason: 'I need chances to continue my rides', response: 'Thank you for your request. We understand your need to continue using our service. Your account has been restored with 3 fresh cancellation chances.' },
    { id: 2, reason: 'I promise not to repeat cancellations', response: 'We appreciate your commitment. Your account has been restored with 3 fresh cancellation chances. Please be cautious with future bookings.' },
    { id: 3, reason: 'Unforeseen circumstances caused cancellations', response: 'We understand that unexpected situations can occur. Your account has been restored with 3 fresh cancellation chances.' },
    { id: 4, reason: 'I was unaware of the cancellation policy', response: 'Thank you for reaching out. We have  restored your account with 3 fresh cancellation chances. Please review our cancellation policy to avoid future issues.' },
    { id: 5, reason: 'Other reason', response: 'Thank you for contacting us. After review, your account has been restored with 3 fresh cancellation chances.' },
  ];

  useEffect(() => {
    // Initialize socket
    socketRef.current = io('http://your-server:3000'); // Replace with your Socket.IO server URL

    // Join room
    socketRef.current.emit('joinRoom', { room: `support_${rideData.rideId || 'general'}`, user: 'Passenger' });

    // Set initial message
    setMessages([
      {
        _id: 1,
        text: 'Please select a reason for requesting account restoration.',
        createdAt: new Date(),
        user: { _id: 2, name: 'Support Team' },
      },
    ]);

    // Handle incoming messages
    const handleMessage = (message) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: message.id,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.userId === 'Passenger' ? 1 : 2,
              name: message.userId === 'Passenger' ? 'You' : 'Support Team',
            },
          },
        ])
      );
    };

    socketRef.current.on('message', handleMessage);

    // Cleanup
    return () => {
      socketRef.current.off('message', handleMessage);
      socketRef.current.disconnect();
    };
  }, [rideData]);

  const resetCancellationCount = async () => {
    try {
      await AsyncStorage.setItem('maxCancellations', '3');
      await AsyncStorage.setItem('accountBlocked', 'false');
      await AsyncStorage.setItem('driverCancellationCount', '0');
      await AsyncStorage.setItem('isRestored', 'true'); // Ensure normal flow resumes
      return true;
    } catch (error) {
      console.error('Error resetting cancellation count:', error);
      Alert.alert('Error', 'Failed to reset cancellation count.');
      return false;
    }
  };

  const handleReasonSelection = useCallback(
    (reason) => {
      setSelectedReason(reason.id);
      setShowReasonPicker(false);

      const message = {
        _id: Math.random().toString(36).substring(7),
        text: reason.reason,
        createdAt: new Date(),
        user: { _id: 1, name: 'You' },
      };

      const adminResponse = {
        _id: Math.random().toString(36).substring(7),
        text: reason.response,
        createdAt: new Date(Date.now() + 1000),
        user: { _id: 2, name: 'Support Team' },
      };

      setMessages((previousMessages) => GiftedChat.append(previousMessages, [message, adminResponse]));

      socketRef.current.emit('sendMessage', {
        room: `support_${rideData.rideId || 'general'}`,
        userId: 'Passenger',
        text: message.text,
        id: message._id,
        createdAt: message.createdAt,
      });

      resetCancellationCount().then((success) => {
        if (success) {
          Alert.alert(
            'Account Restored',
            'Your account has been restored with 3 fresh cancellation chances.',
            [{ 
              text: 'OK', 
              onPress: () => navigation.navigate('YourRides', { filter: 'Cancelled' })
            }]
          );
        }
      });
    },
    [rideData, navigation]
  );

  const onSend = useCallback(
    (newMessages = []) => {
      const message = newMessages[0];
      socketRef.current.emit('sendMessage', {
        room: `support_${rideData.rideId || 'general'}`,
        userId: 'Passenger',
        text: message.text,
        id: message._id,
        createdAt: message.createdAt,
      });
      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    },
    [rideData]
  );

  const renderReasonItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.reasonItem, selectedReason === item.id && styles.selectedReason]}
      onPress={() => handleReasonSelection(item)}
    >
      <Text
        style={[styles.reasonText, selectedReason === item.id && styles.selectedReasonText]}
      >
        {item.reason}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={additionalStyles.headerRow}>
        <TouchableOpacity
          style={additionalStyles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <View style={additionalStyles.headerContent}>
          <Text style={additionalStyles.headerTitle}>Support Chat</Text>
          <Text style={additionalStyles.subHeader}>Chat with our support team</Text>
        </View>
      </View>

      {showReasonPicker && (
        <View style={styles.reasonContainer}>
          <Text style={styles.sectionTitle}>Select Reason for Restoration</Text>
          <FlatList
            data={restorationReasons}
            renderItem={renderReasonItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.reasonList}
          />
        </View>
      )}

      {!showReasonPicker && (
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{ _id: 1, name: 'You' }}
          placeholder="Type a message..."
          showUserAvatar={false}
          renderBubble={(props) => (
            <View
              style={[
                styles.messageBubble,
                props.currentMessage.user._id === 1
                  ? styles.userMessageBubble
                  : styles.supportMessageBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  props.currentMessage.user._id === 1
                    ? { color: '#FFFFFF' }
                    : { color: '#1E293B' },
                ]}
              >
                {props.currentMessage.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  props.currentMessage.user._id === 1
                    ? { color: '#D1D5DB' }
                    : { color: '#6B7280' },
                ]}
              >
                {new Date(props.currentMessage.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  reasonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  reasonList: {
    maxHeight: 300,
  },
  reasonItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedReason: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  reasonText: {
    fontSize: 16,
    color: '#1E293B',
  },
  selectedReasonText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  messageBubble: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    maxWidth: '80%',
  },
  userMessageBubble: {
    backgroundColor: '#3B82F6',
    alignSelf: 'flex-end',
  },
  supportMessageBubble: {
    backgroundColor: '#F1F5F9',
    alignSelf: 'flex-start',
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
});

export default SupportChatScreen;