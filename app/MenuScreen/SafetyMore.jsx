import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FEATURES = [
  {
    icon: 'shield-check',
    title: '24X7 Proactive Safety Checks',
    desc:
      'We send notifications and follow-up calls in case of:\n- Drop at different location\n- Unplanned stops / Vehicle not moving\n- Route deviations during the ride',
  },
  {
    icon: 'alert-decagram-outline',
    title: 'SOS Button',
    desc:
      'Calls our Central Emergency Response Team who guide you to on-ground help.',
  },
  {
    icon: 'clock-check-outline',
    title: 'Late Night Ride Completion Check',
    desc:
      'We call you after late-night rides to confirm your safety.',
  },
  {
    icon: 'map-marker-check-outline',
    title: 'Live Location Sharing',
    desc:
      'Let friends & family track your ride in real-time.',
  },
  {
    icon: 'account-lock-outline',
    title: 'Your Ride. Your Rules.',
    desc:
      'Ask the Captain to drive as per your comfort, within traffic rules.',
  },
  {
    icon: 'account-group-outline',
    title: 'Add Trusted Contacts',
    desc:
      'Add loved ones as trusted contacts for quick reach-out.',
  },
  {
    icon: 'account-off-outline',
    title: "Don't Share Personal Information",
    desc:
      'Do not share contact/location via third-party apps. Use app communication only.',
  },
  {
    icon: 'message-draw',
    title: 'Always Share Feedback',
    desc:
      'Help us improve by sharing your experience after every ride.',
  },
];

export default function SafetyToolkitScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
         {/* <Ionicons name="arrow-back" size={22} color="#000" /> */}
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
           {/* <Ionicons name="arrow-back" size={22} color="#000" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety toolkit</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Intro Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Safety all the way</Text>
          <Text style={styles.heroSub}>
            At Rapido, your safety comes first. Here are some measures and provisions to ensure your safety, every time.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>What we offer?</Text>
          {FEATURES.map((feature, idx) => (
            <View key={idx} style={styles.featureRow}>
              <MaterialCommunityIcons
                name={feature.icon}
                size={36}
                color="#0f4c81"
                style={styles.icon}
              />
              <View style={styles.textWrap}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f9fb' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e6ea',
    backgroundColor: '#fff',
  },
  back: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', marginLeft: 6 },
  container: { paddingBottom: 20 },
  hero: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 12,
    borderRadius: 12,
    elevation: 2,
  },
  heroTitle: { fontSize: 20, fontWeight: '800', color: '#0f4c81', marginBottom: 6 },
  heroSub: { fontSize: 14, color: '#6b7280', lineHeight: 20 },
  card: {
    marginHorizontal: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeading: { fontSize: 18, fontWeight: '700', color: '#1f4a7a', marginBottom: 10 },
  featureRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8eef6',
  },
  icon: { marginRight: 10 },
  textWrap: { flex: 1 },
  featureTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  featureDesc: { fontSize: 13, color: '#666', marginTop: 6, lineHeight: 18 },
});
