import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CancellationHistory = ({ navigation, route }) => {
  const { driverCancellationCount, maxCancellations, isAccountBlocked, rides } = route.params || {};
  const [cancellationHistory, setCancellationHistory] = useState([]);
  const [accountStatus, setAccountStatus] = useState({
    cancellationCount: driverCancellationCount || 0,
    maxCancellations: maxCancellations || 3,
    isBlocked: isAccountBlocked || false,
  });

  useEffect(() => {
    loadCancellationHistory();
    loadCurrentAccountStatus();
  }, []);

  const loadCurrentAccountStatus = async () => {
    try {
      const count = await AsyncStorage.getItem('driverCancellationCount');
      const max = await AsyncStorage.getItem('maxCancellations');
      const blocked = await AsyncStorage.getItem('accountBlocked');
      
      setAccountStatus({
        cancellationCount: count ? parseInt(count) : 0,
        maxCancellations: max ? parseInt(max) : 3,
        isBlocked: blocked === 'true',
      });
    } catch (error) {
      console.error('Error loading account status:', error);
    }
  };

  const loadCancellationHistory = () => {
    // Mock data - in real app, this would come from API or AsyncStorage
    const mockHistory = [
      {
        id: '1',
        date: '2025-09-15',
        time: '2:30 PM',
        from: 'Connaught Place',
        to: 'Airport',
        reason: 'Emergency situation',
        cancellationNumber: 1,
        cancelledAt: '2025-09-15T14:30:00',
        cost: '₹285',
        status: 'Driver Posted'
      },
      {
        id: '2',
        date: '2025-09-10',
        time: '10:15 AM',
        from: 'Phoenix Mall',
        to: 'Gateway of India',
        reason: 'Traffic concerns',
        cancellationNumber: 2,
        cancelledAt: '2025-09-10T10:15:00',
        cost: '₹220',
        status: 'Driver Posted'
      },
      {
        id: '3',
        date: '2025-09-05',
        time: '6:45 PM',
        from: 'Railway Station',
        to: 'Electronic City',
        reason: 'Change of plans',
        cancellationNumber: 3,
        cancelledAt: '2025-09-05T18:45:00',
        cost: '₹420',
        status: 'Driver Posted'
      }
    ];
    
    // Filter to show only up to current cancellation count
    const filteredHistory = mockHistory.slice(0, accountStatus.cancellationCount);
    setCancellationHistory(filteredHistory);
  };

  const getStatusColor = (cancellationNumber) => {
    if (cancellationNumber >= maxCancellations) return '#EF4444'; // Red for blocked
    if (cancellationNumber === maxCancellations - 1) return '#F59E0B'; // Orange for warning
    return '#6B7280'; // Gray for safe
  };

  const renderCancellationItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <View style={styles.cancellationBadge}>
          <Ionicons name="close-circle" size={16} color="#EF4444" />
          <Text style={styles.cancellationBadgeText}>
            Cancellation #{item.cancellationNumber}
          </Text>
        </View>
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: getStatusColor(item.cancellationNumber) }
        ]}>
          <Text style={styles.statusText}>
            {item.cancellationNumber >= maxCancellations ? 'BLOCKED' : 'COUNTED'}
          </Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routeItem}>
          <View style={styles.fromDot} />
          <Text style={styles.locationText}>{item.from}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeItem}>
          <Ionicons name="location" size={16} color="#EF4444" />
          <Text style={styles.locationText}>{item.to}</Text>
        </View>
      </View>

      <View style={styles.cancellationDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={14} color="#6B7280" />
          <Text style={styles.detailText}>{item.date} at {item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="information-circle-outline" size={14} color="#6B7280" />
          <Text style={styles.detailText}>Reason: {item.reason}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={14} color="#6B7280" />
          <Text style={styles.detailText}>
            Cancelled: {new Date(item.cancelledAt).toLocaleDateString()} at{' '}
            {new Date(item.cancelledAt).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="wallet-outline" size={14} color="#6B7280" />
          <Text style={styles.detailText}>Amount: {item.cost}</Text>
        </View>
      </View>
    </View>
  );

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Customer Support',
      'Choose how you would like to contact our support team:',
      [
        {
          text: 'Chat Support',
          onPress: () => navigation.navigate('SupportChatScreen', { 
            rideData: {}, 
            accountStatus: accountStatus 
          })
        },
        {
          text: 'Call Support',
          onPress: () => {
            // In real app, this would open the phone dialer
            Alert.alert('Calling Support', 'Contacting customer support at +91 98765 43210');
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const remainingChances = Math.max(0, accountStatus.maxCancellations - accountStatus.cancellationCount);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Cancellation History</Text>
          <Text style={styles.subHeader}>
            Driver ride cancellation tracking
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Status Card */}
        <View style={[
          styles.statusCard,
          accountStatus.isBlocked 
            ? { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }
            : remainingChances === 1
            ? { backgroundColor: '#FFFBEB', borderColor: '#FED7AA' }
            : { backgroundColor: '#ECFDF5', borderColor: '#D1FAE5' }
        ]}>
          <View style={styles.statusHeader}>
            <Ionicons 
              name={accountStatus.isBlocked ? 'lock-closed' : remainingChances <= 1 ? 'warning' : 'checkmark-circle'} 
              size={24} 
              color={accountStatus.isBlocked ? '#EF4444' : remainingChances <= 1 ? '#F59E0B' : '#10B981'} 
            />
            <Text style={[
              styles.statusTitle,
              { color: accountStatus.isBlocked ? '#DC2626' : remainingChances <= 1 ? '#92400E' : '#047857' }
            ]}>
              {accountStatus.isBlocked 
                ? 'Driver Account Blocked'
                : remainingChances === 0
                ? 'Maximum Cancellations Reached'
                : remainingChances === 1
                ? 'Final Cancellation Warning'
                : 'Driver Account Active'
              }
            </Text>
          </View>

          <View style={styles.statusStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{accountStatus.cancellationCount}</Text>
              <Text style={styles.statLabel}>Used</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{remainingChances}</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{accountStatus.maxCancellations}</Text>
              <Text style={styles.statLabel}>Total Limit</Text>
            </View>
          </View>

          {accountStatus.isBlocked && (
            <TouchableOpacity
              style={styles.supportButton}
              onPress={handleContactSupport}
            >
              <Ionicons name="headset-outline" size={16} color="#FFFFFF" />
              <Text style={styles.supportButtonText}>Contact Support to Restore</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Cancellation Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${(accountStatus.cancellationCount / accountStatus.maxCancellations) * 100}%`,
                  backgroundColor: accountStatus.cancellationCount >= accountStatus.maxCancellations ? '#EF4444' : '#F59E0B'
                }
              ]} 
            />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>0</Text>
            <Text style={[
              styles.progressLabel, 
              { color: accountStatus.cancellationCount >= accountStatus.maxCancellations ? '#EF4444' : '#6B7280' }
            ]}>
              {accountStatus.cancellationCount}/{accountStatus.maxCancellations}
            </Text>
          </View>
        </View>

        {/* Cancellation History List */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>
            Cancellation History ({cancellationHistory.length})
          </Text>
          
          {cancellationHistory.length > 0 ? (
            <FlatList
              data={cancellationHistory}
              renderItem={renderCancellationItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="checkmark-circle-outline" size={48} color="#10B981" />
              <Text style={styles.emptyText}>No Cancellations Yet</Text>
              <Text style={styles.emptySubText}>
                You haven't cancelled any driver rides yet. Keep it up!
              </Text>
            </View>
          )}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips to Avoid Cancellations</Text>
          <View style={styles.tipItem}>
            <Ionicons name="bulb-outline" size={16} color="#F59E0B" />
            <Text style={styles.tipText}>Plan your rides in advance to avoid last-minute changes</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="bulb-outline" size={16} color="#F59E0B" />
            <Text style={styles.tipText}>Check traffic conditions before booking</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="bulb-outline" size={16} color="#F59E0B" />
            <Text style={styles.tipText}>Confirm your schedule before posting driver rides</Text>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  subHeader: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  statusCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  statusStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginHorizontal: 8,
  },
  progressContainer: {
    margin: 16,
    marginTop: 0,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  historySection: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cancellationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cancellationBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
    marginLeft: 4,
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  routeContainer: {
    marginBottom: 12,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fromDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    marginRight: 12,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 4,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  cancellationDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  tipsSection: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
});

export default CancellationHistory;