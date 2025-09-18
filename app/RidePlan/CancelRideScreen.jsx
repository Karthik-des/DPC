import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CancelRideScreen = ({ navigation, route }) => {
  const { rideData, onCancelRide, onResetCancellations } = route.params || {};
  const [selectedReason, setSelectedReason] = useState(null);
  const [userCancellationCount, setUserCancellationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccountBlocked, setIsAccountBlocked] = useState(false);
  const [maxCancellations, setMaxCancellations] = useState(3);

  // Load cancellation count and account status from AsyncStorage when component mounts
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedCount = await AsyncStorage.getItem('userCancellationCount');
      const accountBlocked = await AsyncStorage.getItem('accountBlocked');
      const savedMaxCancellations = await AsyncStorage.getItem('maxCancellations');
      
      const count = savedCount ? parseInt(savedCount) : 0;
      const blocked = accountBlocked === 'true';
      const max = savedMaxCancellations ? parseInt(savedMaxCancellations) : 3;
      
      setUserCancellationCount(count);
      setIsAccountBlocked(blocked);
      setMaxCancellations(max);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data. Please try again.');
      setUserCancellationCount(0);
      setIsAccountBlocked(false);
      setMaxCancellations(3);
      setIsLoading(false);
    }
  };

  const saveCancellationCount = async (count) => {
    try {
      await AsyncStorage.setItem('userCancellationCount', count.toString());
      setUserCancellationCount(count);
    } catch (error) {
      console.error('Error saving cancellation count:', error);
      Alert.alert('Error', 'Failed to save cancellation count.');
    }
  };

  const setAccountBlockedStatus = async (blocked) => {
    try {
      await AsyncStorage.setItem('accountBlocked', blocked.toString());
      setIsAccountBlocked(blocked);
    } catch (error) {
      console.error('Error setting account blocked status:', error);
      Alert.alert('Error', 'Failed to update account status.');
    }
  };

  const saveMaxCancellations = async (max) => {
    try {
      await AsyncStorage.setItem('maxCancellations', max.toString());
      setMaxCancellations(max);
    } catch (error) {
      console.error('Error saving max cancellations:', error);
      Alert.alert('Error', 'Failed to save cancellation limit.');
    }
  };

  const remainingChances = Math.max(0, maxCancellations - userCancellationCount);

  const cancellationReasons = [
    { id: 1, reason: 'Change of plans', icon: 'calendar-outline' },
    { id: 2, reason: 'Found alternative transport', icon: 'car-outline' },
    { id: 3, reason: 'Emergency situation', icon: 'warning-outline' },
    { id: 4, reason: 'Weather conditions', icon: 'rainy-outline' },
    { id: 5, reason: 'Traffic concerns', icon: 'speedometer-outline' },
    { id: 6, reason: 'Other reason', icon: 'ellipsis-horizontal-outline' }
  ];

  const handleCancelRide = () => {
    if (!rideData || !onCancelRide) {
      Alert.alert('Error', 'Ride data or cancellation handler is missing.');
      return;
    }

    if (isAccountBlocked || userCancellationCount >= maxCancellations) {
      showAccountBlockedAlert();
      return;
    }

    if (!selectedReason) {
      Alert.alert('Select Reason', 'Please select a reason for cancellation.');
      return;
    }

    const selectedReasonText = cancellationReasons.find(r => r.id === selectedReason)?.reason;

    if (remainingChances <= 1) {
      Alert.alert(
        'Final Warning - Account Will Be Blocked',
        `⚠️ This is your ${maxCancellations === 1 ? 'only' : 'final'} cancellation chance!\n\nReason: ${selectedReasonText}\n\nYour account will be temporarily blocked after this cancellation. You'll need to contact customer support to restore access with 3 fresh chances.\n\nAre you sure you want to continue?`,
        [
          { text: 'Keep My Ride', style: 'cancel' },
          {
            text: 'Cancel Anyway',
            style: 'destructive',
            onPress: () => confirmFinalCancellation(selectedReasonText)
          }
        ]
      );
    } else {
      const newRemainingChances = remainingChances - 1;
      Alert.alert(
        'Confirm Cancellation',
        `Reason: ${selectedReasonText}\n\n⚠️ You will have ${newRemainingChances} cancellation${newRemainingChances !== 1 ? 's' : ''} remaining after this.\n\nAfter ${maxCancellations} total cancellations, your account will be temporarily blocked.`,
        [
          { text: 'Keep My Ride', style: 'cancel' },
          {
            text: 'Cancel Ride',
            style: 'destructive',
            onPress: () => confirmCancellation(selectedReasonText)
          }
        ]
      );
    }
  };

  const confirmCancellation = async (reason) => {
    try {
      const newCount = userCancellationCount + 1;
      await saveCancellationCount(newCount);

      const updatedRideData = {
        ...rideData,
        status: 'Cancelled',
        cancellationReason: reason,
        cancelledAt: new Date().toISOString(),
        cancellationNumber: newCount
      };

      onCancelRide(updatedRideData);

      const remainingAfterThis = maxCancellations - newCount;
      
      Alert.alert(
        'Ride Cancelled Successfully',
        `Your ride has been cancelled.\n\n${remainingAfterThis > 0 
          ? `⚠️ You have ${remainingAfterThis} cancellation${remainingAfterThis !== 1 ? 's' : ''} remaining before your account gets blocked.`
          : '✅ Cancellation completed.'
        }`,
        [
          {
            text: remainingAfterThis === 0 ? 'View History' : 'OK',
            onPress: () => {
              if (remainingAfterThis === 0) {
                navigation.navigate('CancellationTracker');
              } else {
                navigation.goBack();
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error during cancellation:', error);
      Alert.alert('Error', 'Failed to cancel ride. Please try again.');
    }
  };

  const confirmFinalCancellation = async (reason) => {
    try {
      await saveCancellationCount(maxCancellations);
      await setAccountBlockedStatus(true);
      
      const updatedRideData = {
        ...rideData,
        status: 'Cancelled',
        cancellationReason: reason,
        cancelledAt: new Date().toISOString(),
        cancellationNumber: maxCancellations
      };

      onCancelRide(updatedRideData);

      Alert.alert(
        'Ride Cancelled - Account Blocked',
        `Your ride has been cancelled.\n\n🚫 Your account is now temporarily blocked due to reaching the ${maxCancellations}-cancellation limit. Please contact customer support using the button below to restore access with 3 fresh chances.`,
        [
          {
            text: 'Go Back',
            style: 'cancel',
            onPress: () => navigation.goBack()
          },
          {
            text: 'OK',
            onPress: () => navigation.navigate('CancellationTracker')
          }
        ]
      );
    } catch (error) {
      console.error('Error during final cancellation:', error);
      Alert.alert('Error', 'Failed to cancel ride. Please try again.');
    }
  };

  const handleCustomerSupport = async () => {
    try {
      // Reset to exactly 3 fresh cancellation chances
      await saveMaxCancellations(3);
      await setAccountBlockedStatus(false);
      await saveCancellationCount(0);
      
      if (typeof onResetCancellations === 'function') {
        onResetCancellations();
      }

      Alert.alert(
        'Account Restored',
        'Customer support has reviewed your account and provided exactly 3 fresh cancellation chances.\n\nYou can now book and try to avoid cancellations rides again.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Error restoring account:', error);
      Alert.alert('Error', 'Failed to restore account. Please try again.');
    }
  };

  const showAccountBlockedAlert = () => {
    Alert.alert(
      '🚫 Account Temporarily Blocked',
      `You have reached the maximum limit of ${maxCancellations} ride cancellations.\n\nYour account has been temporarily blocked to ensure service quality for all users.\n\n📞 Contact customer support to restore your account with 3 fresh cancellation chances.`,
      [
        {
          text: 'View Cancellation History',
          onPress: () => navigation.navigate('CancellationTracker')
        },
        {
          text: 'Contact Customer Support',
          onPress: handleCustomerSupport
        },
        {
          text: 'Go Back',
          style: 'cancel',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const setTestCancellationCount = async (count) => {
    try {
      await saveCancellationCount(count);
      await setAccountBlockedStatus(count >= maxCancellations);
    } catch (error) {
      console.error('Error setting test cancellation count:', error);
      Alert.alert('Error', 'Failed to set test cancellation count.');
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cancel Ride</Text>
        <TouchableOpacity 
          style={styles.historyButton}
          onPress={() => navigation.navigate('CancellationTracker')}
        >
          <Ionicons name="time-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[
          styles.warningCard,
          isAccountBlocked || userCancellationCount >= maxCancellations
            ? { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }
            : remainingChances === 1 
            ? { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }
            : remainingChances === 2 
            ? { backgroundColor: '#FFFBEB', borderColor: '#FED7AA' }
            : { backgroundColor: '#ECFDF5', borderColor: '#D1FAE5' }
        ]}>
          <View style={styles.warningContent}>
            <View style={styles.warningHeader}>
              <Ionicons 
                name={
                  isAccountBlocked || userCancellationCount >= maxCancellations 
                    ? "lock-closed-outline"
                    : remainingChances <= 1 
                    ? "warning-outline"
                    : remainingChances === 2 
                    ? "alert-circle-outline"
                    : "information-circle-outline"
                } 
                size={24} 
                color={
                  isAccountBlocked || userCancellationCount >= maxCancellations || remainingChances <= 1 
                    ? "#EF4444"
                    : remainingChances === 2 
                    ? "#F59E0B"
                    : "#10B981"
                } 
              />
              <Text style={[
                styles.warningText,
                { color: 
                  isAccountBlocked || userCancellationCount >= maxCancellations || remainingChances <= 1 
                    ? "#DC2626"
                    : remainingChances === 2 
                    ? "#92400E"
                    : "#047857"
                }
              ]}>
                {isAccountBlocked || userCancellationCount >= maxCancellations
                  ? `🚫 ACCOUNT BLOCKED: You have reached the ${maxCancellations}-cancellation limit. Contact customer support to restore access with 3 fresh chances.`
                  : remainingChances === 0
                  ? `🚫 ACCOUNT WILL BE BLOCKED: You have used all ${maxCancellations} cancellations. Contact support to restore access with 3 fresh chances.`
                  : remainingChances === 1
                  ? `⚠️ FINAL WARNING: You have only 1 cancellation remaining! Your account will be blocked after the next cancellation.`
                  : remainingChances === 2
                  ? `⚠️ CAUTION: You have 2 cancellations remaining. Your account will be blocked after ${maxCancellations} total cancellations.`
                  : `ℹ️ You have ${remainingChances} cancellations remaining out of ${maxCancellations}. Use them wisely.`
                }
              </Text>
            </View>
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={styles.viewHistoryButton}
                onPress={() => navigation.navigate('CancellationTracker')}
              >
                <Ionicons name="time-outline" size={16} color="#3B82F6" />
                <Text style={styles.viewHistoryText}>View History</Text>
                <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
              </TouchableOpacity>
              {(isAccountBlocked || userCancellationCount >= maxCancellations) && (
                <TouchableOpacity 
                  style={styles.supportButton}
                  onPress={handleCustomerSupport}
                >
                  <Ionicons name="headset-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.supportButtonText}>Contact Support</Text>
                  <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View style={styles.testContainer}>
          <Text style={styles.testTitle}>Test Scenarios (Remove in production)</Text>
          <View style={styles.testButtonsRow}>
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: '#10B981' }]}
              onPress={() => setTestCancellationCount(0)}
            >
              <Text style={styles.testButtonText}>0/3 Used</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: '#F59E0B' }]}
              onPress={() => setTestCancellationCount(1)}
            >
              <Text style={styles.testButtonText}>1/3 Used</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: '#EF4444' }]}
              onPress={() => setTestCancellationCount(2)}
            >
              <Text style={styles.testButtonText}>2/3 Used</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: '#6B7280' }]}
              onPress={() => setTestCancellationCount(3)}
            >
              <Text style={styles.testButtonText}>Blocked</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.testStatus}>
            Current: {userCancellationCount}/{maxCancellations} cancellations • {isAccountBlocked ? 'BLOCKED' : 'ACTIVE'}
          </Text>
        </View>

        {rideData ? (
          <View style={styles.rideInfoCard}>
            <Text style={styles.sectionTitle}>Ride Details</Text>
            <View style={styles.routeContainer}>
              <View style={styles.routeItem}>
                <View style={styles.fromDot} />
                <Text style={styles.locationText}>{rideData.from}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routeItem}>
                <Ionicons name="location" size={16} color="#EF4444" />
                <Text style={styles.locationText}>{rideData.to}</Text>
              </View>
            </View>
            <View style={styles.rideDetailsRow}>
              <Text style={styles.rideDetail}>{rideData.date} • {rideData.time}</Text>
              <Text style={styles.costText}>{rideData.cost}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.rideInfoCard}>
            <Text style={styles.sectionTitle}>Ride Details</Text>
            <Text style={styles.errorText}>No ride data available.</Text>
          </View>
        )}

        {!isAccountBlocked && userCancellationCount < maxCancellations && (
          <View style={styles.reasonCard}>
            <Text style={styles.sectionTitle}>Reason for Cancellation</Text>
            {cancellationReasons.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.reasonItem,
                  selectedReason === item.id && styles.selectedReason
                ]}
                onPress={() => setSelectedReason(item.id)}
              >
                <View style={styles.reasonLeft}>
                  <Ionicons 
                    name={item.icon} 
                    size={20} 
                    color={selectedReason === item.id ? '#3B82F6' : '#64748B'} 
                  />
                  <Text style={[
                    styles.reasonText,
                    selectedReason === item.id && styles.selectedReasonText
                  ]}>
                    {item.reason}
                  </Text>
                </View>
                <Ionicons 
                  name={selectedReason === item.id ? 'radio-button-on' : 'radio-button-off'} 
                  size={20} 
                  color={selectedReason === item.id ? '#3B82F6' : '#64748B'} 
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {(isAccountBlocked || userCancellationCount >= maxCancellations) && (
          <View style={styles.blockedMessageCard}>
            <Ionicons name="lock-closed" size={48} color="#EF4444" />
            <Text style={styles.blockedTitle}>Account Temporarily Blocked</Text>
            <Text style={styles.blockedMessage}>
              You cannot cancel more rides as you've reached the {maxCancellations}-cancellation limit. 
              Contact customer support to restore your account with 3 fresh cancellation chances.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.cancelRideButton,
            (isAccountBlocked || userCancellationCount >= maxCancellations || !rideData) && 
            { backgroundColor: '#9CA3AF', opacity: 0.6 }
          ]}
          onPress={handleCancelRide}
          disabled={isAccountBlocked || userCancellationCount >= maxCancellations || !rideData}
        >
          <Text style={styles.cancelRideButtonText}>
            {isAccountBlocked || userCancellationCount >= maxCancellations 
              ? 'Account Blocked - Contact Support' 
              : !rideData
              ? 'No Ride Selected'
              : 'Cancel This Ride'
            }
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.keepRideButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.keepRideButtonText}>Keep My Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
  },
  historyButton: {
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  warningCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  warningContent: {
    flex: 1,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  warningText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
    fontWeight: '500',
  },
  actionButtonsContainer: {
    gap: 8,
  },
  viewHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  viewHistoryText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginHorizontal: 8,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  supportButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginHorizontal: 8,
  },
  testContainer: {
    backgroundColor: '#F3F4F6',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    padding: 16,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    textAlign: 'center',
  },
  testButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  testButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  testStatus: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  rideInfoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  routeContainer: {
    marginBottom: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fromDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    marginRight: 16,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E2E8F0',
    marginLeft: 5,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    flex: 1,
  },
  rideDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  rideDetail: {
    fontSize: 14,
    color: '#64748B',
  },
  costText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
  },
  reasonCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedReason: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  reasonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reasonText: {
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  selectedReasonText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  blockedMessageCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
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
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cancelRideButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  cancelRideButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  keepRideButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  keepRideButtonText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748B',
  },
});

export default CancelRideScreen;