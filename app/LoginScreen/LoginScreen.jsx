import React, { useState, useEffect, useRef } from 'react';
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
  Modal,
  Animated,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './LoginScreenCss';
import carVideo from '../../assets/carl.mp4';

// Mock users array (simulating backend)
const users = [
  { username: 'maga', password: 'maga123', email: 'maga@example.com' },
  { username: 'root', password: '1234', email: 'root@example.com' },
];

// Number of particles for bomb blast effect
const PARTICLE_COUNT = 8;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigation = useNavigation();
  const logoFadeAnim = useRef(new Animated.Value(0)).current;
  const formFadeAnim = useRef(new Animated.Value(0)).current;
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const glowScaleAnim = useRef(new Animated.Value(1)).current;
  const glowOpacityAnim = useRef(new Animated.Value(0.3)).current;
  const particleAnims = useRef(
    Array(PARTICLE_COUNT)
      .fill()
      .map(() => ({
        translateX: new Animated.Value(0),
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(0),
      }))
  ).current;

  // Border color interpolation (assumed logo colors)
  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ['#0089d8', '#ff0000', '#ffffff', '#ffd700', '#212121'],
  });

  // Animate particles for bomb blast effect
  const animateParticles = () => {
    particleAnims.forEach((anim, index) => {
      const angle = (index / PARTICLE_COUNT) * 2 * Math.PI;
      const distance = 100 + Math.random() * 50; // Random distance for variation
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(anim.translateX, {
              toValue: Math.cos(angle) * distance,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: Math.sin(angle) * distance,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(anim.translateX, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    });
  };

  // Load saved credentials and animate logo/form/border/glow/particles
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedCredentials = await AsyncStorage.getItem('userCredentials');
        if (savedCredentials) {
          const { username: savedUsername, remember } = JSON.parse(savedCredentials);
          setUsername(savedUsername || '');
          setRememberMe(remember || false);
        }
      } catch (error) {
        console.error('Error loading credentials:', error);
      }
    };
    loadCredentials();

    // Animate logo, form, border, glow, and particles
    Animated.parallel([
      Animated.timing(logoFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(formFadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(borderColorAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(borderColorAnim, {
            toValue: 2,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(borderColorAnim, {
            toValue: 3,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(borderColorAnim, {
            toValue: 4,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(borderColorAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ),
      Animated.loop(
        Animated.parallel([
          Animated.timing(glowScaleAnim, {
            toValue: 1.2,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacityAnim, {
            toValue: 0.6,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    animateParticles();
  }, [logoFadeAnim, formFadeAnim, borderColorAnim, glowScaleAnim, glowOpacityAnim]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Both fields are required.');
      return;
    }

    const userExists = users.some(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      if (rememberMe) {
        try {
          await AsyncStorage.setItem(
            'userCredentials',
            JSON.stringify({ username, remember: true })
          );
        } catch (error) {
          console.error('Error saving credentials:', error);
        }
      } else {
        try {
          await AsyncStorage.removeItem('userCredentials');
        } catch (error) {
          console.error('Error clearing credentials:', error);
        }
      }
      navigation.navigate('Home', { userName: username || 'Guest' });
    } else {
      Alert.alert('Login Failed', 'Incorrect username or password.');
    }
  };

  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    setForgotPasswordModal(true);
  };

  const handleResetPassword = () => {
    if (!resetEmail.trim()) {
      Alert.alert('Validation Error', 'Please enter your email address.');
      return;
    }

    const user = users.find((u) => u.email === resetEmail);
    if (user) {
      Alert.alert(
        'Password Reset',
        `A password reset link has been sent to ${resetEmail}. Please check your email.`,
        [{ text: 'OK', onPress: () => setForgotPasswordModal(false) }]
      );
      setResetEmail('');
    } else {
      Alert.alert('Error', 'No account found with this email address.');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <Animated.View style={[styles.logoContainer, { opacity: logoFadeAnim }]}>
          <Animated.View
            style={[
              styles.glow,
              {
                transform: [{ scale: glowScaleAnim }],
                opacity: glowOpacityAnim,
              },
            ]}
          />
          {particleAnims.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.particle,
                {
                  transform: [
                    { translateX: anim.translateX },
                    { translateY: anim.translateY },
                  ],
                  opacity: anim.opacity,
                },
              ]}
            />
          ))}
          <Animated.Image
            source={require('../../assets/Dropic.png')}
            style={[styles.logo, { borderColor }]}
            onError={(e) => console.log('Image error:', e.nativeEvent.error)}
          />
        </Animated.View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={true}
        >
          <Animated.View style={[styles.formBox, { opacity: formFadeAnim }]}>
            <Video
              source={carVideo}
              rate={1.0}
              isMuted
              resizeMode="cover"
              shouldPlay
              isLooping
              style={styles.videoInsideForm}
            />
            <Text style={styles.title}>Welcome Back, Patriot!</Text>

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

            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.rememberMeContainer}>
              <TouchableOpacity
                style={[styles.checkbox, rememberMe ? styles.checkboxChecked : null]}
                onPress={() => setRememberMe(!rememberMe)}
                accessibilityLabel="Remember Me toggle"
              >
                {rememberMe && <Ionicons name="star" size={16} color="#ff0000" />}
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRegisterRedirect}>
              <Text style={styles.linkText}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Forgot Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={forgotPasswordModal}
        onRequestClose={() => setForgotPasswordModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <Text style={styles.modalSubtitle}>Enter your email address to receive a password reset link.</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email Address"
                value={resetEmail}
                onChangeText={setResetEmail}
                style={styles.input}
                placeholderTextColor="#888"
                autoCapitalize="none"
                keyboardType="email-address"
                accessibilityLabel="Email input for password reset"
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={handleResetPassword}
              >
                <Text style={styles.buttonText}>Send Reset Link</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.modalCancelButton]}
                onPress={() => setForgotPasswordModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}