import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const PickupTimeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { date, time } = route.params || {};
  const [pickupTime, setPickupTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [displayTime, setDisplayTime] = useState(time || '08:00');

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || pickupTime;
    setShowPicker(Platform.OS === 'ios');
    if (event.type === 'set' && selectedTime) {
      setPickupTime(currentTime);
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      setDisplayTime(`${hours}:${minutes}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pickup Time</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Date + Time info */}
        <Text style={styles.label}>Selected Date: {date}</Text>
        <Text style={styles.label}>Selected Time: {displayTime}</Text>

        {/* Time Picker Button */}
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeInputContainer}>
          <Text style={styles.timeInput}>{displayTime}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            // Add navigation or confirmation logic here
            navigation.navigate('CarCountScreen', { date, time: displayTime });
          }}
        >
          <LinearGradient colors={['#09C912', '#07A90A']} style={styles.submitButtonGradient}>
            <Text style={styles.submitText}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Android Picker */}
        {Platform.OS === 'android' && showPicker && (
          <DateTimePicker value={pickupTime} mode="time" display="clock" onChange={onTimeChange} />
        )}

        {/* iOS Picker */}
        <Modal transparent={true} visible={showPicker && Platform.OS === 'ios'} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <DateTimePicker value={pickupTime} mode="time" display="spinner" onChange={onTimeChange} />
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.okButton}>
                  <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F0FA' },
  header: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: { width: 40 },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  label: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '900',
    color: '#1E1E1E',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  timeInput: {
    fontSize: 34,
    flex: 1,
    textAlign: 'center',
    color: '#1E1E1E',
  },
  dropdownArrow: {
    fontSize: 18,
    color: '#09c912',
    marginLeft: 10,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    color: '#09c912',
    fontSize: 16,
  },
  okButton: {
    padding: 10,
  },
  okText: {
    color: '#09c912',
    fontSize: 16,
  },
});

export default PickupTimeScreen;