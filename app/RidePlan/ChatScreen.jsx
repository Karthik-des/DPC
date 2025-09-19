import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

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

const ChatScreen = ({ navigation, route }) => {
  const { rideData, phoneNumber, historyOnly = false } = route.params;
  const [messages, setMessages] = useState([]);
  const socket = io('http://your-server:3000'); // Replace with your Socket.IO server URL

  useEffect(() => {
    socket.emit('joinRoom', { room: rideData.rideId || phoneNumber, user: 'Passenger' });

    socket.on('message', (message) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [{
          _id: message.id,
          text: message.text,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.userId === 'Passenger' ? 1 : 2,
            name: message.userId === 'Passenger' ? 'You' : rideData.driverName,
          },
        }])
      );
    });

    setMessages([
      {
        _id: 4,
        text: 'Doing my best, ETA 3 minutes.',
        createdAt: new Date(Date.now() - 2 * 60 * 1000),
        user: { _id: 2, name: rideData.driverName },
      },
      {
        _id: 3,
        text: 'Can you make it quick?',
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        user: { _id: 1, name: 'You' },
      },
      {
        _id: 2,
        text: 'I see you, pulling up now.',
        createdAt: new Date(Date.now() - 7 * 60 * 1000),
        user: { _id: 2, name: rideData.driverName },
      },
      {
        _id: 1,
        text: 'I’m at the pickup point',
        createdAt: new Date(Date.now() - 10 * 60 * 1000),
        user: { _id: 1, name: 'You' },
      },
    ]);

    return () => {
      socket.disconnect();
    };
  }, [socket, rideData, phoneNumber]);

  const onSend = useCallback((newMessages = []) => {
    if (historyOnly) return; // Prevent sending messages in history-only mode
    const message = newMessages[0];
    socket.emit('sendMessage', {
      room: rideData.rideId || phoneNumber,
      userId: 'Passenger',
      text: message.text,
      id: message._id,
      createdAt: message.createdAt,
    });
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  }, [rideData, phoneNumber, historyOnly]);

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
          <Text style={additionalStyles.headerTitle}>{rideData.driverName}</Text>
          <Text style={additionalStyles.subHeader}>
            {historyOnly ? 'Chat History' : 'Chat with your driver'}
          </Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1, name: 'You' }}
        placeholder={historyOnly ? 'Chat history view only' : 'Type a message...'}
        showUserAvatar={false}
        renderInputToolbar={historyOnly ? () => null : undefined}
        renderBubble={(props) => (
          <View style={[
            styles.messageBubble,
            props.currentMessage.user._id === 1 ? styles.userMessageBubble : styles.driverMessageBubble,
          ]}>
            <Text style={[
              styles.messageText,
              props.currentMessage.user._id === 1 ? { color: '#FFFFFF' } : { color: '#1E293B' },
            ]}>
              {props.currentMessage.text}
            </Text>
            <Text style={[
              styles.messageTime,
              props.currentMessage.user._id === 1 ? { color: '#D1D5DB' } : { color: '#6B7280' },
            ]}>
              {new Date(props.currentMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
  driverMessageBubble: {
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

export default ChatScreen;