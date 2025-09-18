import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from './EditProfileScreenCss';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Karthik');
  const [email, setEmail] = useState('karthik@example.com');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('2000-01-01');
  const [load, setLoad] = useState(false);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    if (load) {
      spinAnim.setValue(0);
      const loopAnimation = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animationRef.current = loopAnimation.start();
      return () => {
        if (animationRef.current) {
          loopAnimation.stop();
        }
      };
    } else if (animationRef.current) {
      spinAnim.setValue(0);
      animationRef.current = null;
    }
  }, [load, spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleSave = () => {
    if (!name || !email || !gender || !dob) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
      Alert.alert('Success', 'Profile Updated!');
      navigation.navigate('Profile');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0089d8" />
        </TouchableOpacity> */}
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=56' }}
            style={styles.avatarimg}
            onError={() => Alert.alert('Error', 'Failed to load profile image.')}
          />
          <TouchableOpacity
            onPress={() => alert('Edit Image')}
            style={styles.editAvatar}
          >
            <Ionicons name="create-outline" size={18} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
          style={styles.input}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Gender:</Text>
        <TextInput
          value={gender}
          onChangeText={setGender}
          placeholder="Enter Gender"
          style={styles.input}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Date of Birth:</Text>
        <TextInput
          value={dob}
          onChangeText={setDob}
          placeholder="YYYY-MM-DD"
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity
          onPress={handleSave}
          style={[styles.saveButton, load && styles.saveButtonDisabled]}
          disabled={load}
        >
          {load ? (
            <Animated.View style={[styles.load, { transform: [{ rotate: spin }] }]} />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;