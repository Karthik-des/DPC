import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Added for Expo Router
import { useNavigation } from '@react-navigation/native'; // Added for React Navigation compatibility
import { Ionicons } from '@expo/vector-icons'; // Uncommented and used for back arrow
import Animated, { FadeIn } from 'react-native-reanimated';
import styles from './ReportRideScreenCss';

const ReportRideScreen = () => {
  const [comment, setComment] = useState('');
  const router = useRouter(); // Added for Expo Router
  const navigation = useNavigation(); // Added for React Navigation

  const handleSubmit = () => {
    if (comment.trim().length === 0) {
      alert('Please enter some details');
    } else {
      alert('Report submitted successfully!');
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.headerrr}>
                     <TouchableOpacity
                       onPress={() => navigation.goBack()}
                       style={styles.backButton}
                     >
                       <Ionicons name="arrow-back" size={24} color="#09C912" />
                     </TouchableOpacity>
                   
                   
                   </View>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        
        <Image
          source={require('../../assets/Dropic.png')}
          style={styles.logo}
          onError={(e) => console.log('Image error:', e.nativeEvent.error)}
        />
      </Animated.View>

      <Text style={styles.heading}>Please tell us more</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Max. 150 characters"
        placeholderTextColor="#666"
        maxLength={150}
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportRideScreen;