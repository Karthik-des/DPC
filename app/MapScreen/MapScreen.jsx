import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  TextInput,
  Button,
} from 'react-native-paper';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import axios from 'axios';
import styles from './MapScreenCss';

const API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRhYTY0YmIzYjkwMjRmZjU5MGFhYjlmNjViN2M4M2FjIiwiaCI6Im11cm11cjY0In0=';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return <Text style={{ padding: 20, color: 'red' }}>Something went wrong.</Text>;
    }
    return this.props.children;
  }
}

const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    console.log('route.params:', route.params);
  }, []);
  const { userName = 'Guest', carType = '' } = route.params || {};
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [location, setLocation] = useState('');
  const [addType, setAddType] = useState('Add');
  const [mainPassengers, setMainPassengers] = useState(1);
  const [addPassengers, setAddPassengers] = useState(0);
  const [dropPassengers, setDropPassengers] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
      }
    })();
  }, []);

  const fetchSuggestions = async (query, inputType) => {
    if (!query) {
      if (inputType === 'from') setFromSuggestions([]);
      else if (inputType === 'to') setToSuggestions([]);
      else setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`https://api.openrouteservice.org/geocode/autocomplete`, {
        params: {
          api_key: API_KEY,
          text: query,
          size: 5,
        },
      });
      console.log('API response:', response?.data);
      const suggestions = response?.data?.features?.map(feature => ({
        label: feature?.properties?.label || '',
        coordinates: feature?.geometry?.coordinates || [],
      })) || [];

      if (inputType === 'from') setFromSuggestions(suggestions);
      else if (inputType === 'to') setToSuggestions(suggestions);
      else setLocationSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error.message);
      Alert.alert('Error', 'Failed to fetch location suggestions.');
    }
  };

  const handleInputChange = (text, inputType) => {
    if (inputType === 'from') {
      setFrom(text);
      fetchSuggestions(text, 'from');
    } else if (inputType === 'to') {
      setTo(text);
      fetchSuggestions(text, 'to');
    } else {
      setLocation(text);
      fetchSuggestions(text, 'location');
    }
  };

  const handleSuggestionSelect = (suggestion, inputType) => {
    if (inputType === 'from') {
      setFrom(suggestion.label);
      setFromSuggestions([]);
    } else if (inputType === 'to') {
      setTo(suggestion.label);
      setToSuggestions([]);
    } else {
      setLocation(suggestion.label);
      setLocationSuggestions([]);
    }
    setActiveInput(null);
  };

  const toggleAddType = () => {
    setAddType(prev => (prev === 'Add' ? 'Drop' : 'Add'));
    if (addType === 'Add') setDropPassengers(0);
    else setAddPassengers(0);
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      const location = await Promise.race([
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 5000 }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000)),
      ]);
      const { latitude, longitude } = location.coords;

      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode.length > 0) {
        const address = geocode[0];
        const formatted = `${address.name || ''}, ${address.street || ''}, ${address.city || ''}, ${address.region || ''}`;
        setFrom(formatted);
        setFromSuggestions([]);
      } else {
        Alert.alert('Error', 'Unable to get address from coordinates.');
      }
    } catch (error) {
      console.error('Error fetching current location:', error.message);
      Alert.alert('Error', 'Failed to fetch current location. Ensure GPS is enabled and try again.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSearch = () => {
    if (!from || !to) {
      Alert.alert('Missing Fields', 'Please fill in both From and To fields.');
      return;
    }
    const params = {
      fromAddress: from,
      toAddress: to,
      [addType.toLowerCase() + 'Address']: location || '',
      mainPassengers: mainPassengers.toString(),
      [addType.toLowerCase() + 'Passengers']: addType === 'Add' ? addPassengers.toString() : dropPassengers.toString(),
      date: date.toDateString(),
      userName: userName || 'Guest',
      carType: carType || '',
    };
    console.log('Navigating with params:', params);
    navigation.navigate('Display', params);
  };

  const handlePassengerChange = (increment, type) => {
    if (type === 'main') {
      setMainPassengers(prev => {
        const newValue = prev + (increment ? 1 : -1);
        return Math.max(1, Math.min(8, newValue));
      });
    } else if (type === 'add' && addType === 'Add') {
      setAddPassengers(prev => {
        const newValue = prev + (increment ? 1 : -1);
        const remainingCapacity = 8 - mainPassengers;
        return Math.max(0, Math.min(remainingCapacity, Math.min(8, newValue)));
      });
    } else if (type === 'drop' && addType === 'Drop') {
      setDropPassengers(prev => {
        const newValue = prev + (increment ? 1 : -1);
        return Math.max(0, Math.min(mainPassengers, Math.min(8, newValue)));
      });
    }
  };

  const data = [
    { type: 'header' },
    { type: 'welcome' },
    { type: 'fromInput' },
    { type: 'fromSuggestions' },
    { type: 'toInput' },
    { type: 'toSuggestions' },
    { type: 'locationInput' },
    { type: 'locationSuggestions' },
    { type: 'passengersInput' },
    { type: 'locationPassengersInput' },
    { type: 'dateInput' },
    { type: 'searchButton' },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
            <Image
              source={require('../../assets/Dropic.png')}
              style={styles.logo}
              onError={(e) => console.log('Image error:', e.nativeEvent.error)}
            />
          </Animated.View>
        );
      case 'welcome':
        return (
          <Animated.View entering={FadeIn.duration(300)}>
            <Text style={styles.welcomeText}>Hello, {userName}!</Text>
          </Animated.View>
        );
      case 'fromInput':
        return (
          <Animated.View entering={FadeIn.duration(300)} style={styles.inputContainer}>
            <TextInput
              label="From"
              value={from}
              onChangeText={(text) => handleInputChange(text, 'from')}
              onFocus={() => setActiveInput('from')}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#0089d8' } }}
              right={
                from ? (
                  <TextInput.Icon
                    icon="close"
                    onPress={() => {
                      setFrom('');
                      setFromSuggestions([]);
                    }}
                    forceTextInputFocus={false}
                  />
                ) : null
              }
            />
            <Button
              icon="crosshairs-gps"
              mode="text"
              onPress={getCurrentLocation}
              style={styles.locationButton}
              labelStyle={styles.locationLabel}
              disabled={isLoadingLocation}
            >
              {isLoadingLocation ? (
                <ActivityIndicator size="small" color="#0089d8" />
              ) : (
                <Text>Use Current Location</Text>
              )}
            </Button>
          </Animated.View>
        );
      case 'fromSuggestions':
        return activeInput === 'from' && fromSuggestions.length > 0 ? (
          <Animated.View entering={FadeIn.duration(300)} style={styles.suggestionContainer}>
            {fromSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionSelect(suggestion, 'from')}
              >
                <Text style={styles.suggestionText}>{suggestion.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        ) : null;
      case 'toInput':
        return (
          <Animated.View entering={FadeIn.duration(300)} style={styles.inputContainer}>
            <TextInput
              label="To"
              value={to}
              onChangeText={(text) => handleInputChange(text, 'to')}
              onFocus={() => setActiveInput('to')}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#0089d8' } }}
              right={
                to ? (
                  <TextInput.Icon
                    icon="close"
                    onPress={() => {
                      setTo('');
                      setToSuggestions([]);
                    }}
                    forceTextInputFocus={false}
                  />
                ) : null
              }
            />
          </Animated.View>
        );
      case 'toSuggestions':
        return activeInput === 'to' && toSuggestions.length > 0 ? (
          <Animated.View entering={FadeIn.duration(300)} style={styles.suggestionContainer}>
            {toSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionSelect(suggestion, 'to')}
              >
                <Text style={styles.suggestionText}>{suggestion.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        ) : null;
      case 'locationInput':
        return (
          <Animated.View entering={FadeIn.duration(300)} style={styles.inputContainer}>
            <TextInput
              label={`${addType} Location (Optional)`}
              value={location}
              onChangeText={(text) => handleInputChange(text, 'location')}
              onFocus={() => setActiveInput('location')}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#0089d8' } }}
              right={
                location ? (
                  <TextInput.Icon
                    icon="close"
                    onPress={() => {
                      setLocation('');
                      setLocationSuggestions([]);
                      if (addType === 'Add') setAddPassengers(0);
                      else setDropPassengers(0);
                    }}
                    forceTextInputFocus={false}
                  />
                ) : (
                  <TextInput.Icon
                    icon={addType === 'Add' ? 'plus' : 'minus'}
                    onPress={toggleAddType}
                    forceTextInputFocus={false}
                  />
                )
              }
            />
          </Animated.View>
        );
      case 'locationSuggestions':
        return activeInput === 'location' && locationSuggestions.length > 0 ? (
          <Animated.View entering={FadeIn.duration(300)} style={styles.suggestionContainer}>
            {locationSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionSelect(suggestion, 'location')}
              >
                <Text style={styles.suggestionText}>{suggestion.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        ) : null;
      case 'passengersInput':
        return (
          <Animated.View entering={FadeIn.duration(300)} style={styles.passengerContainer}>
            <Text style={styles.passengerLabel}>Main Route Passengers</Text>
            <View style={styles.passengerControl}>
              <TouchableOpacity
                style={[styles.passengerButton, mainPassengers === 1 && styles.disabledButton]}
                onPress={() => handlePassengerChange(false, 'main')}
                disabled={mainPassengers === 1}
              >
                <MaterialIcons name="remove" size={20} color={mainPassengers === 1 ? '#ccc' : '#0089d8'} />
              </TouchableOpacity>
              <Text style={styles.passengerCount}>{mainPassengers}</Text>
              <TouchableOpacity
                style={[styles.passengerButton, mainPassengers === 8 && styles.disabledButton]}
                onPress={() => handlePassengerChange(true, 'main')}
                disabled={mainPassengers === 8}
              >
                <MaterialIcons name="add" size={20} color={mainPassengers === 8 ? '#ccc' : '#0089d8'} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      case 'locationPassengersInput':
        return location && addType === 'Add' ? (
          <Animated.View entering={FadeIn.duration(300)} style={styles.passengerContainer}>
            <Text style={styles.passengerLabel}>
              Add Location Passengers (Remaining: {8 - mainPassengers})
            </Text>
            <View style={styles.passengerControl}>
              <TouchableOpacity
                style={[styles.passengerButton, addPassengers === 0 && styles.disabledButton]}
                onPress={() => handlePassengerChange(false, 'add')}
                disabled={addPassengers === 0}
              >
                <MaterialIcons name="remove" size={20} color={addPassengers === 0 ? '#ccc' : '#0089d8'} />
              </TouchableOpacity>
              <Text style={styles.passengerCount}>{addPassengers}</Text>
              <TouchableOpacity
                style={[styles.passengerButton, addPassengers === (8 - mainPassengers) && styles.disabledButton]}
                onPress={() => handlePassengerChange(true, 'add')}
                disabled={addPassengers === (8 - mainPassengers)}
              >
                <MaterialIcons name="add" size={20} color={addPassengers === (8 - mainPassengers) ? '#ccc' : '#0089d8'} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : location && addType === 'Drop' ? (
          <Animated.View entering={FadeIn.duration(300)} style={styles.passengerContainer}>
            <Text style={styles.passengerLabel}>
              Drop Location Passengers (Max: {mainPassengers})
            </Text>
            <View style={styles.passengerControl}>
              <TouchableOpacity
                style={[styles.passengerButton, dropPassengers === 0 && styles.disabledButton]}
                onPress={() => handlePassengerChange(false, 'drop')}
                disabled={dropPassengers === 0}
              >
                <MaterialIcons name="remove" size={20} color={dropPassengers === 0 ? '#ccc' : '#0089d8'} />
              </TouchableOpacity>
              <Text style={styles.passengerCount}>{dropPassengers}</Text>
              <TouchableOpacity
                style={[styles.passengerButton, dropPassengers === mainPassengers && styles.disabledButton]}
                onPress={() => handlePassengerChange(true, 'drop')}
                disabled={dropPassengers === mainPassengers}
              >
                <MaterialIcons name="add" size={20} color={dropPassengers === mainPassengers ? '#ccc' : '#0089d8'} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : null;
      case 'dateInput':
        return (
          <Animated.View entering={FadeIn.duration(300)} style={styles.dateInputContainer}>
            <TextInput
              label="Date"
              value={date.toDateString()}
              mode="outlined"
              style={styles.input}
              onFocus={() => setShowDatePicker(true)}
              theme={{ colors: { primary: '#0089d8' } }}
              right={<TextInput.Icon icon="calendar" onPress={() => setShowDatePicker(true)} />}
            />
          </Animated.View>
        );
      case 'searchButton':
        return (
          <Animated.View entering={FadeIn.duration(300)}>
            <LinearGradient
              colors={['#3d8ae1', '#3c9fe1']}
              style={styles.button}
            >
              <Button
                mode="contained"
                onPress={handleSearch}
                style={{ backgroundColor: 'transparent' }}
                labelStyle={styles.buttonLabel}
              >
                Search Rides
              </Button>
            </LinearGradient>
          </Animated.View>
        );
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.type}-${index}`}
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}
      </KeyboardAvoidingView>
    </ErrorBoundary>
  );
};

export default MapScreen;