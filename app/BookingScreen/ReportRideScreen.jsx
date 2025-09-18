import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './ReportRideScreenCss';
// import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';



const ReportRideScreen = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim().length === 0) {
      alert('Please enter some details');
    } else {
      alert('Report submitted successfully!');
    }
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
<Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <Image
          source={require('../../assets/Dropic.png')}
          style={styles.logo}
          onError={(e) => console.log('Image error:', e.nativeEvent.error)}
        />
      </Animated.View>

        {/* <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={40} color="#0089d8" />
        </TouchableOpacity> */}
      </View>

   
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
