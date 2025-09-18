import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Video } from 'expo-av';
import styles from './RegisterScreenCss';
import carVideo from '../../assets/carl.mp4';

// Mock users array (simulating backend)
const users = [
  { username: 'maga', password: 'maga123' }, // Default user
  { username: 'admin', password: '1234' },
];

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }
    if (users.some((user) => user.username === username)) {
      Alert.alert('Validation Error', 'Username already exists.');
      return;
    }

    users.push({ username, password });
    Alert.alert('Success', 'Account created! Please log in.', [
      {
        text: 'OK',
        onPress: () => {
          setTimeout(() => navigation.navigate('Login'), 500);
        },
      },
    ]);
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { minHeight: Dimensions.get('window').height * 1.2 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={true}
        >
          <View style={styles.formBox}>
            <Video
              source={carVideo}
              rate={1.0}
              isMuted
              resizeMode="cover"
              shouldPlay
              isLooping
              style={styles.videoInsideForm}
            />
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                placeholderTextColor="#888"
                autoCapitalize="none"
                accessibilityLabel="Username input"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="Email input"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secure}
                style={styles.input}
                placeholderTextColor="#888"
                accessibilityLabel="Password input"
              />
              <TouchableOpacity
                onPress={() => setSecure(!secure)}
                style={styles.eyeIcon}
                accessibilityLabel={secure ? 'Show password' : 'Hide password'}
              >
                <Ionicons name={secure ? 'eye-off' : 'eye'} size={24} color="#0089d8" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={secure}
                style={styles.input}
                placeholderTextColor="#888"
                accessibilityLabel="Confirm password input"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLoginRedirect}>
              <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}