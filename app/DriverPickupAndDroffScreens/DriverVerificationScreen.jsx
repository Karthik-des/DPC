import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import styles from './DriverVerificationStyles';

const DriverVerificationScreen = ({ navigation }) => {
  const [documents, setDocuments] = useState({
    drivingLicense: null,
    aadhaarCard: null,
    panCard: null,
    vehicleRC: null,
    vehicleInsurance: null,
    policeVerification: null,
    profilePhoto: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const requiredDocuments = [
    { key: 'drivingLicense', label: 'Driving License', icon: 'card-outline' },
    { key: 'aadhaarCard', label: 'Aadhaar Card', icon: 'id-card-outline' },
    { key: 'panCard', label: 'PAN Card', icon: 'card-outline' },
    { key: 'vehicleRC', label: 'Vehicle RC', icon: 'car-outline' },
    { key: 'vehicleInsurance', label: 'Vehicle Insurance', icon: 'shield-checkmark-outline' },
    { key: 'policeVerification', label: 'Police Verification', icon: 'shield-outline' },
    { key: 'profilePhoto', label: 'Profile Photo', icon: 'person-circle-outline' },
  ];

  const pickDocument = async (key, isImage = false) => {
    // Alert user about original documents requirement before picking
    Alert.alert(
      'Important',
      'Please upload only original documents. Scanned copies or edited files will be rejected.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: async () => {
            try {
              let result;

              if (isImage) {
                // Request media library permissions for image picking
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                  Alert.alert('Permission Denied', 'Gallery access is required.');
                  return;
                }
                result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.8,
                });

                if (result.canceled) {
                  Alert.alert('Cancelled', 'Image selection was cancelled.');
                  return;
                }

                // Extract the first asset for image picker
                const asset = result.assets[0];
                result = { uri: asset.uri, name: asset.fileName || asset.uri.split('/').pop() };
              } else {
                // Request document picker permissions (if needed)
                if (Platform.OS === 'android') {
                  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                  if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Storage access is required to pick documents.');
                    return;
                  }
                }

                result = await DocumentPicker.getDocumentAsync({
                  type: [
                    'application/pdf',
                    'image/*',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  ],
                  copyToCacheDirectory: true,
                  multiple: false,
                });

                console.log('DocumentPicker result:', result); // Debug the full result

                if (result.canceled) {
                  Alert.alert('Cancelled', 'Document selection was cancelled.');
                  return;
                }

                // Extract the first asset from DocumentPicker result
                if (!result.assets || result.assets.length === 0) {
                  Alert.alert('Error', 'No document selected. Please try a different file.');
                  return;
                }

                const asset = result.assets[0];
                if (!asset.uri || asset.uri === '') {
                  Alert.alert('Error', 'Invalid file selected. Please try a different file.');
                  return;
                }

                result = { uri: asset.uri, name: asset.name || asset.uri.split('/').pop() };
              }

              console.log('Processed document:', result);
              setDocuments(prev => ({ ...prev, [key]: result }));
            } catch (error) {
              console.error('Pick document error:', error);
              Alert.alert('Error', `Failed to pick document: ${error.message}`);
            }
          },
        },
      ]
    );
  };

  const handleSubmit = () => {
    const missingDocs = requiredDocuments.filter(doc => !documents[doc.key]);
    if (missingDocs.length > 0) {
      Alert.alert('Incomplete', `Please upload: ${missingDocs.map(d => d.label).join(', ')}`);
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      Alert.alert('Success', 'Documents submitted for verification. You can now continue.');
    }, 2000);
  };

  const handleContinue = () => {
    const missingDocs = requiredDocuments.filter(doc => !documents[doc.key]);
    if (missingDocs.length > 0) {
      Alert.alert('Incomplete', `Please upload: ${missingDocs.map(d => d.label).join(', ')}`);
      return;
    }
    navigation.navigate('DriverVerificationSuccessScreen');
  };

  const removeDocument = (key) => {
    setDocuments(prev => ({ ...prev, [key]: null }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Verification</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          <Text style={styles.boldText}>Note:</Text> Only upload original documents. Scanned copies or edited files will be rejected.
        </Text>
        {requiredDocuments.map((doc) => (
          <View key={doc.key} style={styles.documentItem}>
            <View style={styles.documentHeader}>
              <Ionicons name={doc.icon} size={24} color="#09C912" />
              <Text style={styles.documentLabel}>{doc.label}</Text>
              {documents[doc.key] ? (
                <TouchableOpacity onPress={() => removeDocument(doc.key)}>
                  <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                </TouchableOpacity>
              ) : null}
            </View>
            {documents[doc.key] ? (
              <View style={styles.uploadedContainer}>
                {doc.key === 'profilePhoto' ? (
                  <Image source={{ uri: documents[doc.key].uri }} style={styles.previewImage} />
                ) : (
                  <View style={styles.documentPreview}>
                    <Ionicons name="document-attach-outline" size={40} color="#09C912" />
                    <Text style={styles.fileName}>
                      {documents[doc.key].name || (documents[doc.key].uri ? documents[doc.key].uri.split('/').pop() : 'Unknown File')}
                    </Text>
                  </View>
                )}
                <Text style={styles.uploadedText}>Uploaded</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickDocument(doc.key, doc.key === 'profilePhoto')}
              >
                <LinearGradient colors={['#09C912', '#07A90A']} style={styles.gradientButton}>
                  <Ionicons name="cloud-upload-outline" size={20} color="#FFF" />
                  <Text style={styles.uploadButtonText}>Upload {doc.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.submitButton, isUploading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isUploading}
      >
        <LinearGradient
          colors={isUploading ? ['#BDBDBD', '#9E9E9E'] : ['#09C912', '#07A90A']}
          style={styles.submitGradient}
        >
          <Text style={styles.submitButtonText}>
            {isUploading ? 'Submitting...' : 'Submit Documents'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        disabled={isUploading || requiredDocuments.some(doc => !documents[doc.key])}
      >
        <LinearGradient
          colors={['#09C912', '#07A90A']}
          style={styles.continueGradient}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DriverVerificationScreen;