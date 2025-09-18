// ContactDetailsScreen.jsx
import React, { useState } from 'react';
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import { TextInput, Button, Text, Divider } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './PassengerContactScreenCss';


const { width } = Dimensions.get('window');

const PassengerContactScreen = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please enter both subject and message.');
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert('Success', 'Your message has been sent successfully!');
      setSubject('');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openMapsApp = () => {
    const url = Platform.select({
      ios: 'http://maps.apple.com/?ll=12.978260,77.724992',
      android: 'geo:12.978260,77.724992',
    });
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Could not open maps app')
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Button
        // ion={({ size }) => (
        //   <Iccon name="arrow-left" size={size} color="#000" />
        // )}
        mode="text"
        onPress={() => navigation.navigate('Home')}
        style={styles.backButton}
        contentStyle={styles.backButtonContent}
      >
        {/* <Text style={styles.backButtonText}>Back</Text> */}
      </Button>

      <Text style={styles.header}>Contact Support</Text>
      <Text style={styles.subHeader}>We're here to help, 24/7.</Text>

      <TextInput
        label="Subject"
        value={subject}
        onChangeText={setSubject}
        style={styles.textField}
        maxLength={100}
        accessibilityLabel="Enter the subject"
        mode="outlined"
        placeholder="Enter subject"
        multiline={false}
        outlineColor="#000"
        activeOutlineColor="#000"
      />

      <TextInput
        label="Message"
        value={message}
        multiline
        numberOfLines={5}
        onChangeText={setMessage}
        style={[styles.textField, styles.messageInput]}
        maxLength={500}
        right={<TextInput.Affix text={`${message.length}/500`} />}
        accessibilityLabel="Enter your message"
        mode="outlined"
        placeholder="Type your message here..."
        outlineColor="#000"
        activeOutlineColor="#000"
      />

      <Button
        mode="contained"
        onPress={handleSend}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        disabled={isSubmitting}
        accessibilityLabel="Send message"
      >
        {isSubmitting ? <ActivityIndicator color="#000" /> : 'Send'}
      </Button>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Quick Support</Text>

      <Button
        icon={({ size }) => (
          <Icon name="chat" size={size} color="#000" />
        )}
        mode="outlined"
        onPress={() => Alert.alert('Opening live chat...')}
        style={styles.quickButton}
        accessibilityLabel="Live chat support"
      >
        <Text style={styles.quickButtonText}>Live Chat Support</Text>
      </Button>

      <Button
        icon={({ size }) => (
          <Icon name="phone" size={size} color="#000" />
        )}
        mode="outlined"
        onPress={() => Linking.openURL('tel:+918945673820')}
        style={styles.quickButton}
        accessibilityLabel="Call support"
      >
        <Text style={styles.quickButtonText}>Call Support: +91 8945673820</Text>
      </Button>

      <Button
        icon={({ size }) => (
          <Icon name="email" size={size} color="#000" />
        )}
        mode="outlined"
        onPress={() => Linking.openURL('mailto:support@blabla.com')}
        style={styles.quickButton}
        accessibilityLabel="Email support"
      >
        <Text style={styles.quickButtonText}>Email: support@blabla.com</Text>
      </Button>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 12.97826,
          longitude: 77.724992,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={openMapsApp}
        accessibilityLabel="Our location"
        accessibilityHint="Double tap to open in maps app"
      >
        <Marker
          coordinate={{ latitude: 12.97826, longitude: 77.724992 }}
          title="Our Office"
          description="Neil Rao Towers., Whitefield, India"
        />
      </MapView>

      <Button
        mode="text"
        onPress={openMapsApp}
        style={styles.addressButton}
        accessibilityLabel="Open address in maps app"
      >
        <Text style={styles.address}>Neil Rao Towers</Text>
      </Button>
    </ScrollView>
  );
};

export default PassengerContactScreen;
