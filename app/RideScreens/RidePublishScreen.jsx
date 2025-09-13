import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import styles from './RidePublishStyles';

const RidePublishScreen = ({ navigation }) => {
  const [comment, setComment] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    if (!comment.trim()) {
      Alert.alert('Add a Comment', 'Please add a comment for your passengers.');
      return;
    }
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      Alert.alert('Success', 'Ride published successfully!');
      navigation.goBack();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(500)}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#09C912" />
          </TouchableOpacity>
          <Text style={styles.title}>Ready to publish your ride?</Text>
        </View>

        <Text style={styles.subtitle}>
          Would you like to add a comment for your passengers?
        </Text>

        <View style={styles.commentSection}>
          <View style={styles.commentHeader}>
            <Ionicons name="chatbubble-outline" size={20} color="#FF6B35" />
            <Text style={styles.commentLabel}>Add a comment</Text>
          </View>
          <TextInput
            style={[styles.commentInput, comment ? styles.commentInputFilled : null]}
            multiline
            placeholder="Flexible about where and when to meet? Not taking the motorway? Got limited space in your boot? Keep passengers in the loop."
            placeholderTextColor="#999"
            value={comment}
            onChangeText={setComment}
            maxLength={500}
          />
          {comment.length > 0 && (
            <Text style={styles.charCount}>{comment.length}/500</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.publishButton}
          onPress={handlePublish}
          disabled={isPublishing}
        >
          {isPublishing ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Ionicons name="hourglass-outline" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Publishing...</Text>
            </Animated.View>
          ) : (
            <LinearGradient
              colors={['#58ee64ff', '#0acd1bff']}
              style={styles.gradient}
            >
              <Ionicons name="send" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Publish ride</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default RidePublishScreen;