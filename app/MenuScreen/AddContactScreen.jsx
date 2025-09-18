import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  Switch,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';

const ContactRow = ({ item, index, onSelect, isSelected, fadeAnim }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, index]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: fadeAnim }}>
      <TouchableOpacity
        style={[
          styles.contactRow,
          isSelected && { backgroundColor: '#e6f4ff', borderColor: '#0089d8' },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onSelect(item)}
        accessibilityLabel={`Select contact: ${item.name}`}
      >
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>
            {item.phoneNumbers?.[0]?.number || 'No phone number'}
          </Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={22} color="#0089d8" />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function AddContactScreen({ navigation, route }) {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phoneNumbers?.[0]?.number?.includes(searchQuery)
      )
    );
  }, [searchQuery, contacts]);

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        });
        if (data.length > 0) {
          setContacts(data);
          setFilteredContacts(data);
        } else {
          Alert.alert('No Contacts', 'No contacts found on your device.');
        }
      } else if (status === 'denied') {
        Alert.alert(
          'Permission Denied',
          'Contact permission is required to load contacts. Please enable it in app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      } else {
        Alert.alert('Permission Required', 'Please allow contact access to proceed.');
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
      Alert.alert('Error', 'Failed to load contacts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (contact) => {
    const phone = contact.phoneNumbers?.[0]?.number?.replace(/\D/g, '') || '';
    if (phone.length < 10) {
      Alert.alert('Invalid Phone Number', 'Please select a contact with a valid phone number.');
      return;
    }
    setSelected({ id: contact.id, name: contact.name, phone });
  };

  const handleSave = () => {
    if (!selected) {
      Alert.alert('No Contact Selected', 'Please select a contact to save.');
      return;
    }
    try {
      if (route.params?.onSave) {
        route.params.onSave(selected); // Pass the selected contact to the parent
      } else {
        console.warn('onSave callback not provided by parent screen');
      }
      navigation.goBack(); // Navigate back to the emergency page
    } catch (error) {
      console.error('Navigation or save error:', error);
      Alert.alert('Error', 'Unable to save contact. Please try again.');
    }
  };

  const handleGoBack = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Unable to go back. Please try again.');
    }
  };

  const getContainerStyle = () => ({
    ...styles.container,
    ...(darkMode && styles.darkContainer),
  });

  const getToggleContainerStyle = () => ({
    ...styles.toggleContainer,
    backgroundColor: darkMode ? '#374151' : '#f9fafb',
  });

  const getSearchGradientColors = () => (darkMode ? ['#374151', '#4b5563'] : ['#f3f4f6', '#e5e7eb']);
  const getSearchIconColor = () => (darkMode ? '#d1d5db' : '#9ca3af');
  const getSearchInputStyle = () => ({
    ...styles.searchInput,
    ...(darkMode && styles.darkSearchInput),
    color: darkMode ? '#e5e7eb' : '#333',
  });
  const getEmptyTextStyle = () => ({
    ...styles.emptyText,
    ...(darkMode && styles.darkText),
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      <LinearGradient
        colors={['#0089d8', '#0070b0']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={handleGoBack}
          accessibilityLabel="Go back to previous screen"
        >
          {/* <Ionicons name="arrow-back" size={28} color="#fff" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add  your favourite Contact to safety</Text>
        <View style={{ width: 34 }} />
      </LinearGradient>

      <View style={getToggleContainerStyle()}>
        <Text style={[styles.toggleText, darkMode && styles.darkText]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#d1d5db', true: '#0089d8' }}
          thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          accessibilityLabel="Toggle dark mode"
        />
      </View>

      <Animated.View style={[styles.searchBox, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={getSearchGradientColors()}
          style={styles.searchGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={getSearchIconColor()}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search contacts..."
            style={getSearchInputStyle()}
            placeholderTextColor={darkMode ? '#9ca3af' : '#6b7280'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Search phone contacts"
          />
        </LinearGradient>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          style={styles.loadBtn}
          onPress={loadContacts}
          disabled={isLoading}
          accessibilityLabel="Load phone contacts"
        >
          <LinearGradient
            colors={['#0089d8', '#0070b0']}
            style={styles.loadBtnGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loadBtnText}>Load Phone Contacts</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ContactRow
            item={item}
            index={index}
            onSelect={handleSelect}
            isSelected={selected?.id === item.id}
            fadeAnim={fadeAnim}
          />
        )}
        ListEmptyComponent={
          <Text style={getEmptyTextStyle()}>
            {isLoading ? 'Loading contacts...' : 'No contacts found'}
          </Text>
        }
      />

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          disabled={!selected}
          accessibilityLabel="Save selected contact"
        >
          <View style={[styles.saveBtnGradient, !selected && styles.disabledBtn]}>
            <Text style={styles.saveBtnText}>Save Contact</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 16,
  },
  darkContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderRadius: 22,
    marginBottom: 15,
    marginTop: 18,
  },
  back: {
    width: 20,
    height: 20,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 12,
    flex: 1,
    borderRadius: 18,
    marginBottom: 10,
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0089d8',
  },
  darkText: {
    color: '#c82d2dff',
  },
  searchBox: {
    marginHorizontal: 12,
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'transparent',
  },
  darkSearchInput: {
    color: '#e5e7eb',
  },
  loadBtn: {
    alignSelf: 'center',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadBtnGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  loadBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 120,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  contactPhone: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 12,
    right: 12,
  },
  saveBtn: {
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  saveBtnGradient: {
    backgroundColor: '#0089d8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 1.5,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
});