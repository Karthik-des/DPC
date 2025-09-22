import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ContactDriverScreenCss';

const ContactDriverScreen = () => {
  const navigation = useNavigation();
  const driver = {
    name: 'John Doe',
    phone: '+919876543210',
    vehicle: 'Toyota Prius - AB123CD',
    image: 'https://i.pravatar.cc/150?img=68',
    age: 34,
    gender: 'Male',
    languages: 'English, Hindi',
    experience: '5 years',
    kycVerified: true,
    rating: 4.8,
    reviews: 123,
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    estimatedTime: '12 mins',
    pickupPoint: '123 Main Street, Bengaluru',
    dropoffPoint: '456 Park Lane, Whitefield',
  };

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ id: '1', text: 'Hello! I’m nearby.', sender: 'driver' }]);
  const [showChat, setShowChat] = useState(false);
  const [fullChat, setFullChat] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleCall = () => Linking.openURL(`tel:${driver.phone}`);
  const handleMessage = () => Linking.openURL(`sms:${driver.phone}`);
  const toggleChat = () => setShowChat(!showChat);
  const toggleFullChat = () => setFullChat(!fullChat);
  const toggleMap = () => setShowMap(!showMap);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: input, sender: 'user' }]);
    setInput('');
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.driverBubble,
      ]}
    >
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Back Button */}
       <View style={styles.header}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={styles.backButton}
                    >
                      <Ionicons name="arrow-back" size={24} color="#09C912" />
                    </TouchableOpacity>
                  
                    <View style={styles.placeholder} />
                  </View>

      <Text style={styles.header}>Driver Profile</Text>

      {/* Driver Info */}
      <View style={styles.card}>
        <TouchableOpacity onPress={toggleMap} style={styles.mapIconButton}>
          <Ionicons name="location" size={28} color="#2C3A47" />
        </TouchableOpacity>

        <Image source={{ uri: driver.image }} style={styles.avatar} />
        <Text style={styles.name}>{driver.name}</Text>
        <Text style={styles.rating}>⭐ {driver.rating} ({driver.reviews} reviews)</Text>
        <Text style={styles.detail}>Age: {driver.age} | Gender: {driver.gender}</Text>
        <Text style={styles.detail}>Languages: {driver.languages}</Text>
        <Text style={styles.detail}>Experience: {driver.experience}</Text>
        {driver.kycVerified && <Text style={styles.verified}>✅ Verified</Text>}
        <Text style={styles.detail}>Vehicle: {driver.vehicle}</Text>
        <Text style={styles.detail}>Phone: {driver.phone}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
            <Text style={styles.btnText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBtn} onPress={handleMessage}>
            <Text style={styles.btnText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatBtn} onPress={toggleChat}>
            <Text style={styles.btnText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate('BookRide')}
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Drawer */}
      {showChat && (
        <View style={[styles.chatDrawer, fullChat && styles.fullScreenDrawer]}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Chat with Driver</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={toggleFullChat}>
                <Ionicons name={fullChat ? 'contract' : 'expand'} size={24} color="#000" style={{ marginRight: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleChat}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messageList}
          />
          <View style={styles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Map Modal */}
      <Modal visible={showMap} animationType="slide">
        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>Driver's Live Location</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              ...driver.location,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={driver.location} title={driver.name} />
          </MapView>
          <TouchableOpacity style={styles.closeBtn} onPress={toggleMap}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ContactDriverScreen;