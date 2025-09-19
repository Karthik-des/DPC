import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import { Ionicons, MaterialIcons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

const additionalStyles = {
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
};

const SettingScreen = ({ navigation, setIsLoggedIn, setUser }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    location: true,
    darkMode: false,
    biometrics: false,
  });
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = ['English', 'Hindi', 'Telugu', 'Kannada'];

  const toggleSetting = (setting) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          onPress: () => {
            if (typeof setIsLoggedIn === 'function') {
              setIsLoggedIn(false);
            } else {
              console.warn('setIsLoggedIn is not a function or is undefined');
            }
            if (typeof setUser === 'function') {
              setUser(null);
            } else {
              console.warn('setUser is not a function or is undefined');
            }
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={additionalStyles.headerRow}>
        <TouchableOpacity 
          style={additionalStyles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <View style={additionalStyles.headerContent}>
          <Text style={additionalStyles.headerTitle}>Settings</Text>
          <Text style={additionalStyles.subHeader}>Manage your preferences</Text>
        </View>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <FontAwesome name="user-circle" size={60} color="#0089d8" />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userPhone}>john.doe@example.com</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('EditProfile')}>
            <Ionicons name="person-outline" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Edit Profile</Text>
            <AntDesign name="right" size={16} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionItem, styles.noBorder]}
            onPress={() => setShowLanguageDropdown(true)}
          >
            <Ionicons name="language" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Language</Text>
            <Text style={styles.optionValue}>{selectedLanguage}</Text>
            <AntDesign name="right" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APP PREFERENCES</Text>
          <View style={styles.optionItem}>
            <Ionicons name="notifications-outline" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Notifications</Text>
            <Switch
              value={settings.notifications}
              onValueChange={() => toggleSetting('notifications')}
              trackColor={{ false: '#f0f0f0', true: '#0089d8' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.optionItem}>
            <Ionicons name="location-outline" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Location Services</Text>
            <Switch
              value={settings.location}
              onValueChange={() => toggleSetting('location')}
              trackColor={{ false: '#f0f0f0', true: '#0089d8' }}
              thumbColor="#fff"
            />
          </View>
          <View style={[styles.optionItem, styles.noBorder]}>
            <Ionicons name="moon-outline" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Dark Mode</Text>
            <Switch
              value={settings.darkMode}
              onValueChange={() => toggleSetting('darkMode')}
              trackColor={{ false: '#f0f0f0', true: '#0089d8' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAYMENT & SECURITY</Text>
          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Payment')}>
            <MaterialIcons name="payment" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Payment Methods</Text>
            <AntDesign name="right" size={16} color="#999" />
          </TouchableOpacity>
          <View style={[styles.optionItem, styles.noBorder]}>
            <Ionicons name="finger-print" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Biometric Login</Text>
            <Switch
              value={settings.biometrics}
              onValueChange={() => toggleSetting('biometrics')}
              trackColor={{ false: '#f0f0f0', true: '#0089d8' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MORE</Text>
          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('ReferAndEarn')}>
            <Ionicons name="gift-outline" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Refer & Earn</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Get ₹50</Text>
            </View>
            <AntDesign name="right" size={16} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Help')}>
            <Feather name="help-circle" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Help & Support</Text>
            <AntDesign name="right" size={16} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionItem, styles.noBorder]} onPress={() => navigation.navigate('Safety')}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Safety Tips</Text>
            <AntDesign name="right" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL</Text>
          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Terms')}>
            <MaterialIcons name="description" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Terms & Conditions</Text>
            <AntDesign name="right" size={16} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionItem, styles.noBorder]} onPress={() => navigation.navigate('Privacy')}>
            <Feather name="lock" size={22} color="#0089d8" />
            <Text style={styles.optionText}>Privacy Policy</Text>
            <AntDesign name="right" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>App Version 4.2.7</Text>
      </ScrollView>

      <Modal
        visible={showLanguageDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageDropdown(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setShowLanguageDropdown(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.languageList}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language}
                  style={[
                    styles.languageOption,
                    selectedLanguage === language && styles.selectedLanguageOption,
                  ]}
                  onPress={() => handleLanguageChange(language)}
                >
                  <Text
                    style={[
                      styles.languageOptionText,
                      selectedLanguage === language && styles.selectedLanguageOptionText,
                    ]}
                  >
                    {language}
                  </Text>
                  {selectedLanguage === language && (
                    <Ionicons name="checkmark" size={20} color="#0089d8" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 15,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  profileInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto',
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Roboto',
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 10,
    fontFamily: 'Roboto',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
    fontFamily: 'Roboto',
  },
  optionValue: {
    fontSize: 14,
    color: '#999',
    marginRight: 5,
    fontFamily: 'Roboto',
  },
  badge: {
    backgroundColor: '#D6EAF8',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#0089d8',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0089d8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutText: {
    color: '#0089d8',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 15,
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 137, 216, 0.3)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto',
  },
  closeButton: {
    padding: 8,
  },
  languageList: {
    paddingHorizontal: 16,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  selectedLanguageOption: {
    backgroundColor: '#f5f5f5',
  },
  languageOptionText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto',
  },
  selectedLanguageOptionText: {
    color: '#0089d8',
    fontWeight: '500',
  },
});

export default SettingScreen;