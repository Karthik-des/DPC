import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Animated,
  StatusBar,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StartNewClaimScreenCss as styles } from './StartNewClaimScreenCss';

const StartNewClaimScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [animatedValue] = useState(new Animated.Value(0));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [formData, setFormData] = useState({
    incidentType: '',
    incidentDate: '',
    incidentTime: '',
    location: '',
    description: '',
    policeReportNumber: '',
    witnessDetails: '',
    damageDescription: '',
    injuryDetails: '',
    documents: [],
    photos: [],
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: currentStep,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const incidentTypes = [
    { id: 'accident', title: 'Vehicle Accident', icon: 'car-sport', description: 'Collision with another vehicle or object' },
    { id: 'theft', title: 'Theft/Burglary', icon: 'lock-closed', description: 'Vehicle or parts stolen' },
    { id: 'vandalism', title: 'Vandalism', icon: 'hammer', description: 'Intentional damage to vehicle' },
    { id: 'natural', title: 'Natural Disaster', icon: 'cloud', description: 'Flood, hail, storm damage' },
    { id: 'fire', title: 'Fire Damage', icon: 'flame', description: 'Vehicle fire or fire damage' },
    { id: 'other', title: 'Other', icon: 'ellipsis-horizontal', description: 'Other type of incident' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const scrollToInput = (inputRef) => {
    if (scrollViewRef.current && inputRef) {
      inputRef.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x, y, width, height) => {
          scrollViewRef.current.scrollTo({
            y: y - 100,
            animated: true,
          });
        }
      );
    }
  };

  const handleIncidentTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      incidentType: type
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString();
      handleInputChange('incidentDate', formattedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setSelectedTime(selectedTime);
      const formattedTime = selectedTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      handleInputChange('incidentTime', formattedTime);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        const newPhotos = result.assets.map(asset => asset.uri);
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, ...newPhotos]
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.incidentType !== '';
      case 2:
        return formData.incidentDate !== '' && formData.incidentTime !== '' && formData.location !== '';
      case 3:
        return formData.description !== '';
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      <View style={styles.progressBarContainer}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { width: `${progressPercentage}%` }
          ]} 
        />
      </View>
      <Text style={styles.stepText}>Step {currentStep} of {totalSteps}</Text>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What type of incident occurred?</Text>
      <Text style={styles.stepSubtitle}>Select the type of incident that best describes your situation</Text>
      
      <View style={styles.incidentTypesGrid}>
        {incidentTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.incidentTypeCard,
              formData.incidentType === type.id && styles.selectedIncidentType
            ]}
            onPress={() => handleIncidentTypeSelect(type.id)}
          >
            <LinearGradient
              colors={formData.incidentType === type.id ? ['#667eea', '#764ba2'] : ['#ffffff', '#f8f9ff']}
              style={styles.incidentTypeGradient}
            >
              <Ionicons
                name={type.icon}
                size={32}
                color={formData.incidentType === type.id ? '#ffffff' : '#667eea'}
              />
              <Text style={[
                styles.incidentTypeTitle,
                formData.incidentType === type.id && styles.selectedText
              ]}>
                {type.title}
              </Text>
              <Text style={[
                styles.incidentTypeDescription,
                formData.incidentType === type.id && styles.selectedDescriptionText
              ]}>
                {type.description}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>When and where did it happen?</Text>
      <Text style={styles.stepSubtitle}>Provide the details about when and where the incident occurred</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Date of Incident</Text>
        <View style={styles.dateTimeContainer}>
          <TextInput
            style={styles.dateTimeInput}
            value={formData.incidentDate}
            placeholder="Select date"
            editable={false}
          />
          <TouchableOpacity style={styles.dateTimeButton} onPress={showDatePickerModal}>
            <Text style={styles.dateTimeButtonText}>Select Date</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Time of Incident</Text>
        <View style={styles.dateTimeContainer}>
          <TextInput
            style={styles.dateTimeInput}
            value={formData.incidentTime}
            placeholder="Select time"
            editable={false}
          />
          <TouchableOpacity style={styles.dateTimeButton} onPress={showTimePickerModal}>
            <Text style={styles.dateTimeButtonText}>Select Time</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => handleInputChange('location', text)}
          placeholder="Enter the location where the incident occurred"
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Tell us what happened</Text>
      <Text style={styles.stepSubtitle}>Provide a detailed description of the incident</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          placeholder="Describe what happened in detail..."
          multiline
          numberOfLines={6}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Police Report Number (if applicable)</Text>
        <TextInput
          style={styles.input}
          value={formData.policeReportNumber}
          onChangeText={(text) => handleInputChange('policeReportNumber', text)}
          placeholder="Enter police report number"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Witness Details (if any)</Text>
        <TextInput
          style={styles.textArea}
          value={formData.witnessDetails}
          onChangeText={(text) => handleInputChange('witnessDetails', text)}
          placeholder="Provide witness information if available..."
          multiline
          numberOfLines={4}
        />
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Additional Information</Text>
      <Text style={styles.stepSubtitle}>Add any additional details and photos</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Damage Description</Text>
        <TextInput
          style={styles.textArea}
          value={formData.damageDescription}
          onChangeText={(text) => handleInputChange('damageDescription', text)}
          placeholder="Describe the damage to your vehicle..."
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Injury Details (if any)</Text>
        <TextInput
          style={styles.textArea}
          value={formData.injuryDetails}
          onChangeText={(text) => handleInputChange('injuryDetails', text)}
          placeholder="Describe any injuries sustained..."
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.photoSection}>
        <Text style={styles.label}>Photos (Optional)</Text>
        <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
          <Ionicons name="camera" size={24} color="#667eea" />
          <Text style={styles.addPhotoText}>Add Photos</Text>
        </TouchableOpacity>
        
        {formData.photos.length > 0 && (
          <View style={styles.photoGrid}>
            {formData.photos.map((photo, index) => (
              <View key={index} style={styles.photoItem}>
                <Image source={{ uri: photo }} style={{ width: '100%', height: '100%' }} />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: '#ff6b6b',
                    borderRadius: 12,
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => removePhoto(index)}
                >
                  <Ionicons name="close" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Tips for better claim processing:</Text>
        <Text style={styles.tipText}>• Take clear photos of all damage</Text>
        <Text style={styles.tipText}>• Include photos of the accident scene</Text>
        <Text style={styles.tipText}>• Keep all relevant documents ready</Text>
        <Text style={styles.tipText}>• Provide accurate and detailed information</Text>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
       
        <Text style={styles.headerTitle}>Start New Claim</Text>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      {renderStepIndicator()}

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={true}
          scrollEventThrottle={16}
          nestedScrollEnabled={true}
        >
          {renderCurrentStep()}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.navigationContainer}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Ionicons name="arrow-back" size={20} color="#667eea" />
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.nextButton, !validateStep(currentStep) && styles.disabledButton]} 
          onPress={handleNext}
          disabled={!validateStep(currentStep)}
        >
          <LinearGradient colors={['#00b894', '#00a085']} style={styles.nextButtonGradient}>
            <Text style={styles.nextButtonText}>
              {currentStep === totalSteps ? 'Submit Claim' : 'Next Step'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <LinearGradient colors={['#00b894', '#00a085']} style={styles.successHeader}>
              <Ionicons name="checkmark-circle" size={60} color="#ffffff" />
              <Text style={styles.successTitle}>Claim Submitted!</Text>
              <Text style={styles.successSubtitle}>Your claim has been successfully submitted</Text>
            </LinearGradient>
            
            <View style={styles.successBody}>
              <Text style={styles.claimNumber}>Claim Number: #CLM2025001234</Text>
              <Text style={styles.successMessage}>
                We've received your claim and will review it within 7-10 business days. 
                You'll receive updates via email and app notifications.
              </Text>
              
              <View style={styles.nextSteps}>
                <Text style={styles.nextStepsTitle}>What's Next:</Text>
                <Text style={styles.nextStepItem}>• Our team will review your submission</Text>
                <Text style={styles.nextStepItem}>• We may contact you for additional information</Text>
                <Text style={styles.nextStepItem}>• Track your claim status in the app</Text>
                <Text style={styles.nextStepItem}>• Receive settlement details once approved</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.okButton} 
                onPress={() => {
                  setShowSuccessModal(false);
                  navigation.navigate('Home');
                }}
              >
                <LinearGradient colors={['#00b894', '#00a085']} style={styles.okButtonGradient}>
                  <Text style={styles.okButtonText}>OK</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default StartNewClaimScreen;