// src/screens/FeedbackScreen/FeedBackScreen.jsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { Picker } from '@react-native-picker/picker';
import styles from './FeedBackScreenCss';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [experience, setExperience] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    if (rating === 0 || experience === '') {
      Alert.alert('Please complete all required fields.');
      return;
    }

    // You can add submission logic here (e.g. API calls)
    setRating(0);
    setExperience('');
    setComments('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Feedback Form</Text>

      <Text style={styles.label}>How would you rate us?</Text>
      <StarRating
        rating={rating}
        onChange={setRating}
        starSize={35}
        color="#FFD700"
      />

      <Text style={styles.label}>Your experience:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={experience}
          onValueChange={(itemValue) => setExperience(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select an option" value="" enabled={false} />
          <Picker.Item label="Excellent" value="Excellent" />
          <Picker.Item label="Good" value="Good" />
          <Picker.Item label="Average" value="Average" />
          <Picker.Item label="Poor" value="Poor" />
        </Picker>
      </View>

      <Text style={styles.label}>Additional Comments:</Text>
      <TextInput
        style={styles.commentBox}
        placeholder="Write your comments here..."
        multiline
        numberOfLines={4}
        value={comments}
        onChangeText={setComments}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackForm;
