import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlockedPage = ({ navigation }) => {
  const [userCancellationCount, setUserCancellationCount] = useState(0);
  const [maxCancellations, setMaxCancellations] = useState(3);
  const [isAccountBlocked, setIsAccountBlocked] = useState(false);

  useEffect(() => {
    const loadAccountStatus = async () => {
      try {
        const cancellationCount = await AsyncStorage.getItem('userCancellationCount');
        const savedMaxCancellations = await AsyncStorage.getItem('maxCancellations');
        const accountBlocked = await AsyncStorage.getItem('accountBlocked');

        const count = cancellationCount && !isNaN(parseInt(cancellationCount)) ? parseInt(cancellationCount) : 0;
        const max = savedMaxCancellations && !isNaN(parseInt(savedMaxCancellations)) ? parseInt(savedMaxCancellations) : 3;
        const blocked = accountBlocked === 'true';

        setUserCancellationCount(count);
        setMaxCancellations(max);
        setIsAccountBlocked(blocked);
        console.log('BlockedPage loaded: userCancellationCount=', count, 'maxCancellations=', max, 'isAccountBlocked=', blocked);
      } catch (error) {
        console.error('Error loading account status:', error.message);
      }
    };

    loadAccountStatus();

    const unsubscribe = navigation.addListener('focus', () => {
      loadAccountStatus();
    });

    return unsubscribe;
  }, [navigation]);

  const handleCustomerSupport = () => {
    try {
      navigation.navigate('SupportChatScreen', { rideData: {} });
      console.log('Navigating to SupportChatScreen');
    } catch (error) {
      console.error('Navigation error:', error.message);
      Alert.alert('Navigation Error', 'Unable to open support chat. Please try again.');
    }
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:+919876543210').catch((err) => {
      console.error('Error opening phone dialer:', err);
      Alert.alert('Error', 'Unable to initiate call. Please try again.');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Account Blocked</Text>
          <Text style={styles.subHeader}>
            {userCancellationCount} of {maxCancellations} cancellations used
          </Text>
        </View>
      </View>

      <View style={styles.blockedCard}>
        <Ionicons name="lock-closed" size={48} color="#EF4444" />
        <Text style={styles.blockedTitle}>Account Temporarily Blocked</Text>
        <Text style={styles.blockedMessage}>
          Your account has been temporarily blocked due to reaching the {maxCancellations}-cancellation limit. To restore access with 3 fresh cancellation chances, please contact customer support.
        </Text>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.supportButton}
            onPress={handleCustomerSupport}
          >
            <Ionicons name="chatbubble-outline" size={16} color="#FFFFFF" />
            <Text style={styles.supportButtonText}>Chat with Support</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.supportButton, { backgroundColor: '#3B82F6' }]}
            onPress={handleCallSupport}
          >
            <Ionicons name="call-outline" size={16} color="#FFFFFF" />
            <Text style={styles.supportButtonText}>Call Support</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewHistoryButton}
            onPress={() => navigation.navigate('CancellationTracker')}
          >
            <Ionicons name="time-outline" size={16} color="#3B82F6" />
            <Text style={styles.viewHistoryText}>View Cancellation History</Text>
            <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
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
  blockedCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  blockedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF4444',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  blockedMessage: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtonsContainer: {
    width: '100%',
    gap: 12,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  supportButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginHorizontal: 8,
  },
  viewHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  viewHistoryText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
    marginHorizontal: 8,
  },
});

export default BlockedPage;