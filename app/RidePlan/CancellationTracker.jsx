import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CancellationTracker = ({ navigation, route }) => {
  // This should come from your user management system/AsyncStorage
  const [userCancellationCount, setUserCancellationCount] = useState(0);
  const [cancellationHistory, setCancellationHistory] = useState([]);
  
  const maxCancellations = 3;
  const remainingChances = maxCancellations - userCancellationCount;

  // Mock data - replace with actual data from your backend/AsyncStorage
  useEffect(() => {
    // Load user's cancellation data
    // AsyncStorage.getItem('userCancellationCount').then(count => {
    //   setUserCancellationCount(parseInt(count) || 0);
    // });
    
    // Mock cancellation history
    setCancellationHistory([
      {
        id: 1,
        date: '2024-01-15',
        from: 'Downtown Plaza',
        to: 'Airport Terminal',
        reason: 'Change of plans',
        timestamp: '10:30 AM'
      },
      {
        id: 2,
        date: '2024-01-10',
        from: 'Home',
        to: 'Office Complex',
        reason: 'Emergency situation',
        timestamp: '8:15 AM'
      }
    ]);
    
    // Set mock cancellation count for demo
    setUserCancellationCount(2);
  }, []);

  const getStatusColor = () => {
    if (remainingChances <= 0) return '#EF4444'; // Red - blocked
    if (remainingChances === 1) return '#F59E0B'; // Yellow - warning
    return '#10B981'; // Green - safe
  };

  const getStatusText = () => {
    if (remainingChances <= 0) return 'Account Blocked';
    if (remainingChances === 1) return 'Final Warning';
    return 'Good Standing';
  };

  const handleContactSupport = () => {
    // Navigate to support screen or handle contact
    // navigation.navigate('Support');
    console.log('Contact support pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cancellation History</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Test Buttons - Remove in production */}
        <View style={styles.testContainer}>
          <Text style={styles.testTitle}>Test Scenarios (Remove in production)</Text>
          <View style={styles.testButtonsRow}>
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: '#10B981' }]}
              onPress={() => setUserCancellationCount(0)}
            >
              <Text style={styles.testButtonText}>0/3 Used</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: '#F59E0B' }]}
              onPress={() => setUserCancellationCount(2)}
            >
              <Text style={styles.testButtonText}>2/3 Used</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: '#EF4444' }]}
              onPress={() => setUserCancellationCount(3)}
            >
              <Text style={styles.testButtonText}>Blocked</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
          
          <View style={styles.countersContainer}>
            <View style={styles.counterItem}>
              <Text style={styles.counterNumber}>{userCancellationCount}</Text>
              <Text style={styles.counterLabel}>Cancellations Used</Text>
            </View>
            <View style={styles.counterDivider} />
            <View style={styles.counterItem}>
              <Text style={[styles.counterNumber, { color: getStatusColor() }]}>
                {Math.max(0, remainingChances)}
              </Text>
              <Text style={styles.counterLabel}>Remaining</Text>
            </View>
          </View>

          {remainingChances <= 0 && (
            <TouchableOpacity 
              style={styles.supportButton} 
              onPress={handleContactSupport}
            >
              <Ionicons name="headset-outline" size={20} color="#FFFFFF" />
              <Text style={styles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Warning Messages */}
        {remainingChances === 3 && (
          <View style={[styles.warningCard, { backgroundColor: '#ECFDF5', borderColor: '#D1FAE5' }]}>
            <Ionicons name="information-circle-outline" size={24} color="#10B981" />
            <Text style={[styles.warningText, { color: '#047857' }]}>
              You have 3 cancellation chances remaining this month. Use them wisely to avoid account restrictions.
            </Text>
          </View>
        )}
        
        {remainingChances === 2 && (
          <View style={[styles.warningCard, { backgroundColor: '#FFFBEB', borderColor: '#FED7AA' }]}>
            <Ionicons name="alert-circle-outline" size={24} color="#F59E0B" />
            <Text style={[styles.warningText, { color: '#92400E' }]}>
              You have 2 cancellation chances remaining. Be careful - your account will be blocked after 3 total cancellations.
            </Text>
          </View>
        )}

        {remainingChances === 1 && (
          <View style={[styles.warningCard, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
            <Ionicons name="warning-outline" size={24} color="#EF4444" />
            <Text style={[styles.warningText, { color: '#DC2626' }]}>
              ⚠️ FINAL WARNING: You have only 1 cancellation chance left! Your account will be temporarily blocked if you cancel another ride.
            </Text>
          </View>
        )}

        {remainingChances <= 0 && (
          <View style={[styles.warningCard, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
            <Ionicons name="close-circle-outline" size={24} color="#EF4444" />
            <Text style={[styles.warningText, { color: '#DC2626' }]}>
              🚫 ACCOUNT BLOCKED: You have used all 3 cancellation chances. Your account is temporarily blocked. Contact support to restore access.
            </Text>
          </View>
        )}

        {/* Policy Information */}
        <View style={styles.policyCard}>
          <Text style={styles.sectionTitle}>Cancellation Policy</Text>
          <View style={styles.policyItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#3B82F6" />
            <Text style={styles.policyText}>
              Users are allowed up to {maxCancellations} ride cancellations per month
            </Text>
          </View>
          <View style={styles.policyItem}>
            <Ionicons name="time-outline" size={20} color="#3B82F6" />
            <Text style={styles.policyText}>
              Accounts are temporarily blocked after exceeding the limit
            </Text>
          </View>
          <View style={styles.policyItem}>
            <Ionicons name="refresh-outline" size={20} color="#3B82F6" />
            <Text style={styles.policyText}>
              Cancellation count resets at the beginning of each month
            </Text>
          </View>
        </View>

        {/* Cancellation History */}
        {cancellationHistory.length > 0 && (
          <View style={styles.historyCard}>
            <Text style={styles.sectionTitle}>Recent Cancellations</Text>
            {cancellationHistory.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyDate}>{item.date}</Text>
                  <Text style={styles.historyTime}>{item.timestamp}</Text>
                </View>
                <View style={styles.routeContainer}>
                  <View style={styles.routeItem}>
                    <View style={styles.fromDot} />
                    <Text style={styles.locationText}>{item.from}</Text>
                  </View>
                  <View style={styles.routeLine} />
                  <View style={styles.routeItem}>
                    <Ionicons name="location" size={14} color="#EF4444" />
                    <Text style={styles.locationText}>{item.to}</Text>
                  </View>
                </View>
                <Text style={styles.reasonText}>Reason: {item.reason}</Text>
              </View>
            ))}
          </View>
        )}

        {cancellationHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle-outline" size={64} color="#10B981" />
            <Text style={styles.emptyTitle}>No Cancellations</Text>
            <Text style={styles.emptySubtitle}>You haven't cancelled any rides yet!</Text>
          </View>
        )}
      </ScrollView>
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  countersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  counterItem: {
    flex: 1,
    alignItems: 'center',
  },
  counterNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  counterLabel: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  counterDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 20,
  },
  supportButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  warningCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  policyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
  policyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  policyText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  historyItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 16,
    marginBottom: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  historyTime: {
    fontSize: 14,
    color: '#64748B',
  },
  routeContainer: {
    marginBottom: 8,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  fromDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 12,
  },
  routeLine: {
    width: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
    marginLeft: 3,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  reasonText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
  // Test styles - Remove in production
  testContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  testButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  testButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CancellationTracker;