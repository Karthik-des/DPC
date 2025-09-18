import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles from './ViewProfileCss';

const ViewProfile = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleMessage = () => {
    Alert.alert('Message', 'Contact feature will be available once profile is verified.');
  };

  const handleReport = () => {
    Alert.alert('Report User', 'Report functionality coming soon.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card (basic identity) */}
        <View style={styles.profileMainCard}>
          <View style={styles.profileAvatarContainer}>
            <View style={styles.avatarGradientRing}>
              <View style={styles.avatarInner}>
                <Text style={styles.avatarLetter}>A</Text>
              </View>
            </View>
            <View style={styles.onlineIndicator}>
              <View style={styles.onlineInnerDot} />
            </View>
          </View>

          <View style={styles.verificationBadges}>
            <View style={styles.badgePending}>
              <Ionicons name="shield-outline" size={16} color="#F59E0B" />
              <Text style={styles.badgePendingText}>Verification Pending</Text>
            </View>
            <View style={styles.badgeNew}>
              <Ionicons name="sparkles" size={16} color="#3B82F6" />
              <Text style={styles.badgeNewText}>New Member</Text>
            </View>
          </View>

          {/* Trust signals */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark" size={16} color="#10B981" />
              <Text style={styles.trustText}>Email Confirmed</Text>
            </View>
            <View style={styles.trustItem}>
              <Ionicons name="person-circle-outline" size={16} color="#10B981" />
              <Text style={styles.trustText}>Profile Completed 40%</Text>
            </View>
          </View>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="star" size={24} color="#FFB800" />
            </View>
            <Text style={styles.statValue}>-</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="car" size={24} color="#09C912" />
            </View>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="chatbubbles" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Ionicons name="person" size={20} color="#09C912" />
            </View>
            <Text style={styles.sectionTitle}>About</Text>
          </View>
          <Text style={styles.aboutText}>
            Welcome to our carpooling community! This user is new to the platform and is currently setting up their profile. Once they complete verification and add more details, you'll see more about their preferences and trips here.
          </Text>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>New Member</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Setting up profile</Text>
            </View>
          </View>
        </View>

        {/* Verification Status */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Ionicons name="shield-checkmark" size={20} color="#09C912" />
            </View>
            <Text style={styles.sectionTitle}>Verification Status</Text>
          </View>

          <View style={styles.verificationList}>
            <View style={styles.verificationItem}>
              <View style={[styles.verIconCircle, styles.verIconPending]}>
                <Ionicons name="mail" size={18} color="#F59E0B" />
              </View>
              <View style={styles.verItemContent}>
                <Text style={styles.verItemTitle}>Email Verification</Text>
                <Text style={styles.verItemStatus}>Verification pending</Text>
              </View>
              <View style={styles.verStatusBadge}>
                <Text style={styles.verStatusText}>Pending</Text>
              </View>
            </View>

            <View style={styles.verificationItem}>
              <View style={[styles.verIconCircle, styles.verIconPending]}>
                <Ionicons name="call" size={18} color="#F59E0B" />
              </View>
              <View style={styles.verItemContent}>
                <Text style={styles.verItemTitle}>Phone Verification</Text>
                <Text style={styles.verItemStatus}>Not verified</Text>
              </View>
              <View style={styles.verStatusBadge}>
                <Text style={styles.verStatusText}>Pending</Text>
              </View>
            </View>

            <View style={styles.verificationItem}>
              <View style={[styles.verIconCircle, styles.verIconPending]}>
                <Ionicons name="card" size={18} color="#F59E0B" />
              </View>
              <View style={styles.verItemContent}>
                <Text style={styles.verItemTitle}>ID Verification</Text>
                <Text style={styles.verItemStatus}>Documents required</Text>
              </View>
              <View style={styles.verStatusBadge}>
                <Text style={styles.verStatusText}>Pending</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Travel Preferences */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Ionicons name="settings" size={20} color="#09C912" />
            </View>
            <Text style={styles.sectionTitle}>Travel Preferences</Text>
          </View>
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIconBg}>
              <Ionicons name="car-sport" size={48} color="#E5E7EB" />
            </View>
            <Text style={styles.emptyTitle}>No preferences set</Text>
            <Text style={styles.emptyDescription}>
              Preferences will appear once the profile is completed
            </Text>
          </View>
        </View>

        {/* Public Information */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Ionicons name="information-circle" size={20} color="#09C912" />
            </View>
            <Text style={styles.sectionTitle}>Public Information</Text>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconBg}>
                <Ionicons name="location" size={18} color="#09C912" />
              </View>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>Not specified</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconBg}>
                <Ionicons name="calendar" size={18} color="#09C912" />
              </View>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>December 2024</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconBg}>
                <Ionicons name="time" size={18} color="#09C912" />
              </View>
              <Text style={styles.infoLabel}>Last Active</Text>
              <Text style={styles.infoValue}>Recently joined</Text>
            </View>
          </View>
        </View>

        {/* Report Section */}
        <View style={styles.reportSection}>
          <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
            <Ionicons name="flag-outline" size={20} color="#EF4444" />
            <Text style={styles.reportText}>Report this profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewProfile;


