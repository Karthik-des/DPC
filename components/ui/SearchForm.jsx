import React, { useState, useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import axios from "axios";
import Animated, { FadeIn } from "react-native-reanimated";
import styles from "./SearchFormStyles";

// Note: Store API keys in environment variables in production
const API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRhYTY0YmIzYjkwMjRmZjU5MGFhYjlmNjViN2M4M2FjIiwiaCI6Im11cm11cjY0In0=";

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Text style={{ padding: 20, color: "red" }}>
          Something went wrong.
        </Text>
      );
    }
    return this.props.children;
  }
}

const SearchForm = ({ navigation, route }) => {
  const { userName = "Guest", carType = "" } = route?.params || {};
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [addLocation, setAddLocation] = useState("");
  const [addType, setAddType] = useState("Add");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mainPassengers, setMainPassengers] = useState(1);
  const [addPassengers, setAddPassengers] = useState(0);
  const [dropPassengers, setDropPassengers] = useState(0);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [addSuggestions, setAddSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Request location permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
      }
    })();
  }, []);

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = async (query, inputType) => {
    if (!query) {
      if (inputType === "from") setFromSuggestions([]);
      else if (inputType === "to") setToSuggestions([]);
      else setAddSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await axios.get(
        `https://api.openrouteservice.org/geocode/autocomplete`,
        {
          params: {
            api_key: API_KEY,
            text: query,
            size: 5,
          },
          timeout: 5000,
        }
      );
      const suggestions =
        response.data.features.map((feature) => ({
          label: feature.properties.label || "",
          coordinates: feature.geometry.coordinates || [],
        })) || [];

      if (inputType === "from") setFromSuggestions(suggestions);
      else if (inputType === "to") setToSuggestions(suggestions);
      else setAddSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
      Alert.alert(
        "Error",
        "Failed to fetch location suggestions. Using fallback suggestions."
      );
      const dummySuggestions = [
        { label: `${query} City Center` },
        { label: `${query} Airport` },
        { label: `${query} Station` },
        { label: `${query} Park` },
        { label: `${query} Mall` },
      ];
      if (inputType === "from") setFromSuggestions(dummySuggestions);
      else if (inputType === "to") setToSuggestions(dummySuggestions);
      else setAddSuggestions(dummySuggestions);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleInputChange = (text, inputType) => {
    if (inputType === "from") {
      setFromLocation(text);
      debouncedFetchSuggestions(text, "from");
    } else if (inputType === "to") {
      setToLocation(text);
      debouncedFetchSuggestions(text, "to");
    } else {
      setAddLocation(text);
      debouncedFetchSuggestions(text, "add");
    }
  };

  const handleSuggestionSelect = (suggestion, inputType) => {
    if (inputType === "from") {
      setFromLocation(suggestion.label);
      setFromSuggestions([]);
    } else if (inputType === "to") {
      setToLocation(suggestion.label);
      setToSuggestions([]);
    } else {
      setAddLocation(suggestion.label);
      setAddSuggestions([]);
    }
    setActiveInput(null);
  };

  const clearInput = (inputType) => {
    if (inputType === "from") {
      setFromLocation("");
      setFromSuggestions([]);
    } else if (inputType === "to") {
      setToLocation("");
      setToSuggestions([]);
    } else {
      setAddLocation("");
      setAddSuggestions([]);
      if (addType === "Add") setAddPassengers(0);
      else setDropPassengers(0);
    }
    setActiveInput(null);
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const location = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 10000)
        ),
      ]);
      const { latitude, longitude } = location.coords;

      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode.length > 0) {
        const address = geocode[0];
        const formatted = `${address.name || ""} ${address.street || ""} ${
          address.city || ""
        } ${address.region || ""}`;
        setFromLocation(formatted);
        setFromSuggestions([]);
      } else {
        Alert.alert("Error", "Unable to get address from coordinates.");
      }
    } catch (error) {
      console.error("Error fetching current location:", error.message);
      Alert.alert(
        "Error",
        "Failed to fetch current location. Ensure GPS is enabled and try again."
      );
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const toggleAddType = () => {
    setAddType((prev) => (prev === "Add" ? "Drop" : "Add"));
    if (addType === "Add") setDropPassengers(0);
    else setAddPassengers(0);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handlePassengerChange = (increment, type) => {
    if (type === "main") {
      setMainPassengers((prev) => {
        const newValue = prev + (increment ? 1 : -1);
        return Math.max(1, Math.min(8, newValue));
      });
    } else if (type === "add" && addType === "Add") {
      setAddPassengers((prev) => {
        const newValue = prev + (increment ? 1 : -1);
        const remainingCapacity = 8 - mainPassengers;
        return Math.max(0, Math.min(remainingCapacity, Math.min(8, newValue)));
      });
    } else if (type === "drop" && addType === "Drop") {
      setDropPassengers((prev) => {
        const newValue = prev + (increment ? 1 : -1);
        return Math.max(0, Math.min(mainPassengers, Math.min(8, newValue)));
      });
    }
  };

  const handleSearch = () => {
    if (!fromLocation || !toLocation) {
      Alert.alert(
        "Missing Fields",
        "Please fill in both Leaving from and Going to fields."
      );
      return;
    }
    const params = {
      fromAddress: fromLocation,
      toAddress: toLocation,
      [addType.toLowerCase() + "Address"]: addLocation || "",
      mainPassengers: mainPassengers.toString(),
      [addType.toLowerCase() + "Passengers"]:
        addType === "Add" ? addPassengers.toString() : dropPassengers.toString(),
      date: date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      userName: userName || "Guest",
      carType: carType || "",
    };
    navigation.navigate("DisplayScreen", params);
  };

  // Render suggestions as simple View components instead of FlatList
  const renderSuggestions = (suggestions, inputType) => {
    if (!suggestions.length) return null;
    
    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        style={styles.suggestionContainer}
      >
        {suggestions.map((item, index) => (
          <TouchableOpacity
            key={`${item.label}-${index}`}
            style={styles.suggestionItem}
            onPress={() => handleSuggestionSelect(item, inputType)}
          >
            <Text style={styles.suggestionText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    );
  };

  return (
    <ErrorBoundary>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <LinearGradient
          colors={["#ffffff", "#f0f4f8"]}
          style={[styles.searchCard, { flex: 1 }]}
        >
          <ScrollView
            contentContainerStyle={{ padding: 0 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Welcome Text */}
            <Animated.View entering={FadeIn.duration(300)}>
              <Text style={styles.welcomeText}>Hello, {userName}</Text>
            </Animated.View>

            {/* From Input */}
            <Animated.View entering={FadeIn.duration(300)} style={styles.inputWrapper}>
              <Ionicons
                name="location"
                size={28}
                color="#09C912"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Leaving from"
                value={fromLocation}
                onChangeText={(text) => handleInputChange(text, "from")}
                onFocus={() => setActiveInput("from")}
                placeholderTextColor="#666"
              />
              {fromLocation && (
                <TouchableOpacity
                  onPress={() => clearInput("from")}
                  style={styles.clearButton}
                >
                  <Ionicons name="close" size={20} color="#666" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={getCurrentLocation}
                style={styles.locationButton}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <ActivityIndicator size="small" color="#09C912" />
                ) : (
                  <Ionicons name="navigate" size={20} color="#09C912" />
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* From Suggestions */}
            {activeInput === "from" &&
              (isLoadingSuggestions ? (
                <ActivityIndicator size="small" color="#09C912" style={styles.loader} />
              ) : (
                renderSuggestions(fromSuggestions, "from")
              ))}

            {/* To Input */}
            <Animated.View entering={FadeIn.duration(300)} style={styles.inputWrapper}>
              <Ionicons name="flag" size={28} color="#09C912" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Going to"
                value={toLocation}
                onChangeText={(text) => handleInputChange(text, "to")}
                onFocus={() => setActiveInput("to")}
                placeholderTextColor="#666"
              />
              {toLocation && (
                <TouchableOpacity
                  onPress={() => clearInput("to")}
                  style={styles.clearButton}
                >
                  <Ionicons name="close" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </Animated.View>

            {/* To Suggestions */}
            {activeInput === "to" &&
              (isLoadingSuggestions ? (
                <ActivityIndicator size="small" color="#09C912" style={styles.loader} />
              ) : (
                renderSuggestions(toSuggestions, "to")
              ))}

            {/* Add Input */}
            <Animated.View entering={FadeIn.duration(300)} style={styles.inputWrapper}>
              <Ionicons
                name={addType === "Add" ? "add" : "remove"}
                size={28}
                color="#09C912"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder={`${addType} Location (Optional)`}
                value={addLocation}
                onChangeText={(text) => handleInputChange(text, "add")}
                onFocus={() => setActiveInput("add")}
                placeholderTextColor="#666"
              />
              {addLocation ? (
                <TouchableOpacity onPress={() => clearInput("add")} style={styles.clearButton}>
                  <Ionicons name="close" size={20} color="#666" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={toggleAddType} style={styles.clearButton}>
                  <Ionicons name={addType === "Add" ? "remove" : "add"} size={20} color="#666" />
                </TouchableOpacity>
              )}
            </Animated.View>

            {/* Add Suggestions */}
            {activeInput === "add" &&
              (isLoadingSuggestions ? (
                <ActivityIndicator size="small" color="#09C912" style={styles.loader} />
              ) : (
                renderSuggestions(addSuggestions, "add")
              ))}

            {/* Date Input */}
            <Animated.View entering={FadeIn.duration(300)} style={styles.inputWrapper}>
              <Ionicons name="calendar" size={28} color="#09C912" style={styles.icon} />
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[styles.input, styles.datePickerText]}>
                  {date.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Main Passenger Input */}
            <Animated.View entering={FadeIn.duration(300)} style={[styles.inputWrapper, styles.passengerWrapper]}>
              <Ionicons name="person" size={35} color="#09C912" style={styles.icon} />
              <View style={styles.passengerControl}>
                <TouchableOpacity
                  style={[styles.passengerButton, mainPassengers === 1 && styles.disabledButton]}
                  onPress={() => handlePassengerChange(false, "main")}
                  disabled={mainPassengers === 1}
                >
                  <MaterialIcons name="remove" size={15} color={mainPassengers === 1 ? "#ccc" : "#fff"} />
                </TouchableOpacity>
                <Text style={[styles.input, styles.passengerText]}>{mainPassengers}</Text>
                <TouchableOpacity
                  style={[styles.passengerButton, mainPassengers === 8 && styles.disabledButton]}
                  onPress={() => handlePassengerChange(true, "main")}
                  disabled={mainPassengers === 8}
                >
                  <MaterialIcons name="add" size={15} color={mainPassengers === 8 ? "#ccc" : "#fff"} />
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Location Passenger Input */}
            {addLocation && addType === "Add" && (
              <Animated.View entering={FadeIn.duration(300)} style={[styles.inputWrapper, styles.passengerWrapper]}>
                <Ionicons name="person-add" size={35} color="#09C912" style={styles.icon} />
                <View style={styles.passengerControl}>
                  <TouchableOpacity
                    style={[styles.passengerButton, addPassengers === 0 && styles.disabledButton]}
                    onPress={() => handlePassengerChange(false, "add")}
                    disabled={addPassengers === 0}
                  >
                    <MaterialIcons name="remove" size={15} color={addPassengers === 0 ? "#ccc" : "#fff"} />
                  </TouchableOpacity>
                  <Text style={[styles.input, styles.passengerText]}>
                    {addPassengers} (rest: {8 - mainPassengers})
                  </Text>
                  <TouchableOpacity
                    style={[styles.passengerButton, addPassengers === 8 - mainPassengers && styles.disabledButton]}
                    onPress={() => handlePassengerChange(true, "add")}
                    disabled={addPassengers === 8 - mainPassengers}
                  >
                    <MaterialIcons name="add" size={15} color={addPassengers === 8 - mainPassengers ? "#ccc" : "#fff"} />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}

            {addLocation && addType === "Drop" && (
              <Animated.View entering={FadeIn.duration(300)} style={[styles.inputWrapper, styles.passengerWrapper]}>
                <Ionicons name="person-remove" size={35} color="#09C912" style={styles.icon} />
                <View style={styles.passengerControl}>
                  <TouchableOpacity
                    style={[styles.passengerButton, dropPassengers === 0 && styles.disabledButton]}
                    onPress={() => handlePassengerChange(false, "drop")}
                    disabled={dropPassengers === 0}
                  >
                    <MaterialIcons name="remove" size={15} color={dropPassengers === 0 ? "#ccc" : "#fff"} />
                  </TouchableOpacity>
                  <Text style={[styles.input, styles.passengerText]}>
                    {dropPassengers} (Max: {mainPassengers})
                  </Text>
                  <TouchableOpacity
                    style={[styles.passengerButton, dropPassengers === mainPassengers && styles.disabledButton]}
                    onPress={() => handlePassengerChange(true, "drop")}
                    disabled={dropPassengers === mainPassengers}
                  >
                    <MaterialIcons name="add" size={15} color={dropPassengers === mainPassengers ? "#ccc" : "#fff"} />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}

            {/* Search Button */}
            <Animated.View entering={FadeIn.duration(300)}>
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search Rides</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "calendar"}
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </LinearGradient>
      </KeyboardAvoidingView>
    </ErrorBoundary>
  );
};

export default SearchForm;