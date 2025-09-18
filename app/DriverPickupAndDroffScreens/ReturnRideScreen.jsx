import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ReturnRideScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const handleYes = () => {
    // Logic for "Yes, sure!" button
    navigation.navigate('RouteSelectionScreen');
  };

  const handleNo = () => {
    // Logic for "No, thanks" button
    navigation.navigate('ProfilePrompt');
  };

  const handleBack = () => {
    // Logic for back button
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: 'https://via.placeholder.com/200x150' }} // Replace with actual surfing image URL
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Coming back as well?</Text>
        <Text style={styles.subtitle}>Publish your return ride now!</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleYes}>
          <Text style={styles.buttonText}>Yes, sure!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleNo}>
          <Text style={styles.secondaryButtonText}>No, thanks</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F0FA' },
  header: {
    marginTop: 70,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#09C912',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#09C912',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReturnRideScreen;