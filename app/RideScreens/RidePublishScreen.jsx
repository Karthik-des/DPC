import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import styles from './RidePublishStyles';

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
    color: '#1E1E1E',
  },
  subHeader: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
};

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
      navigation.navigate('HomeScreen');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(500)}>
        <View style={additionalStyles.headerRow}>
          <TouchableOpacity 
            style={additionalStyles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#09C912" />
          </TouchableOpacity>
          <View style={additionalStyles.headerContent}>
            <Text style={additionalStyles.headerTitle}>Publish Your Ride</Text>
            <Text style={additionalStyles.subHeader}>Add details for passengers</Text>
          </View>
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