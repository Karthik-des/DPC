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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ContactRow = ({ item, index, onDelete, fadeAnim }) => {
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

  const confirmDelete = () => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(item.id),
        },
      ]
    );
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: fadeAnim }}>
      <TouchableOpacity
        style={styles.contactRow}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        accessibilityLabel={`Contact: ${item.name}, Phone: ${item.phone}`}
      >
        <View style={styles.avatar}>
          <LinearGradient
            colors={['#0089d8', '#0056b3']}
            style={styles.avatarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </LinearGradient>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
        <TouchableOpacity
          onPress={confirmDelete}
          style={styles.deleteBtn}
          accessibilityLabel={`Delete contact ${item.name}`}
        >
          <Ionicons name="trash-outline" size={22} color="#ff4444" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function EmergencyContactScreen({ user }) {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [darkMode, setDarkMode] = useState(false);
  const [contacts, setContacts] = useState([
    { id: '1', name: 'chumma', phone: '987654321' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, pulseAnim]);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.includes(searchQuery)
      )
    );
  }, [searchQuery, contacts]);

  const handleGoBack = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Unable to go back. Please try again.');
    }
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleAddMore = () => {
    if (contacts.length >= 4) {
      Alert.alert('Limit Reached', 'You can only add up to 4 contacts.');
      return;
    }
    try {
      navigation.navigate('AddContact', {
        onSave: (newContact) => {
          setContacts((prev) => [
            ...prev,
            { ...newContact, id: String(Date.now()) }, // Generate a unique ID
          ]);
        },
      });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Unable to navigate to Add Contact. Please try again.');
    }
  };

  const handleHelp = () => {
    try {
      navigation.navigate('Help');
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Help feature is coming soon!');
    }
  };

  const containerStyle = [styles.container, darkMode && styles.darkContainer];
  const toggleContainerStyle = [
    styles.toggleContainer,
    { backgroundColor: darkMode ? '#2d3748' : '#f9fafb' },
  ];
  const searchInputStyle = [styles.searchInput, darkMode && styles.darkSearchInput];
  const infoTextStyle = [styles.infoText, darkMode && styles.darkText];
  const emptyTextStyle = [styles.emptyText, darkMode && styles.darkText];

  return (
    <SafeAreaView style={containerStyle}>
      <LinearGradient
        colors={['#0089d8', '#0056b3']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.back}
          accessibilityLabel="Go back to previous screen"
        >
          {/* <Ionicons name="arrow-back" size={28} color="#fff" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <TouchableOpacity
          onPress={handleHelp}
          style={styles.helpBtn}
          accessibilityLabel="Open help"
        >
          <Ionicons name="help-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={toggleContainerStyle}>
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
          colors={darkMode ? ['#374151', '#4b5563'] : ['#f9fafb', '#e5e7eb']}
          style={styles.searchGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={darkMode ? '#d1d5db' : '#9ca3af'}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search contacts"
            style={searchInputStyle}
            placeholderTextColor={darkMode ? '#9ca3af' : '#6b7280'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Search emergency contacts"
          />
        </LinearGradient>
      </Animated.View>

      <Text style={infoTextStyle}>You can add up to 4 contacts only</Text>

      <FlatList
        data={filteredContacts}
        renderItem={({ item, index }) => (
          <ContactRow
            item={item}
            index={index}
            onDelete={handleDelete}
            fadeAnim={fadeAnim}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={emptyTextStyle}>No contacts found</Text>}
      />

      <Animated.View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.addMoreBtn}
          onPress={handleAddMore}
          accessibilityLabel="Add new emergency contact"
        >
          <LinearGradient
            colors={['#0089d8', '#003087']}
            style={styles.addMoreGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.addMoreText}>Add More</Text>
          </LinearGradient>
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
    marginTop: 20,
    marginBottom: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 18,
    marginTop: 18,
    marginBottom: 12,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  helpBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  darkSearchInput: {
    color: '#e5e7eb',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarGradient: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  phone: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  deleteBtn: {
    padding: 8,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  addMoreBtn: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addMoreGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  addMoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});