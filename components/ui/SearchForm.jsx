import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./SearchFormStyles";

const SearchForm = ({ navigation }) => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [passengers, setPassengers] = useState(1);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const incrementPassengers = () => setPassengers((p) => (p < 10 ? p + 1 : 10));
  const decrementPassengers = () => setPassengers((p) => (p > 1 ? p - 1 : 1));

  const handleSearch = () => {
    navigation.navigate("SearchResults", {
      from: fromLocation,
      to: toLocation,
      date: date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
      passengers,
    });
  };

  return (
    <View style={styles.searchContainer}>
      <LinearGradient colors={["#ffffff", "#f0f4f8"]} style={styles.searchCard}>
        {/* Leaving from */}
        <TouchableOpacity onPress={() => navigation.navigate("leavefrom")}>
          <View style={styles.inputWrapper}>
            <Ionicons name="location-sharp" size={28} color="#09C912" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Leaving from"
              value={fromLocation}
              onChangeText={setFromLocation}
              placeholderTextColor="#666"
              editable={false}
              onPressIn={() => navigation.navigate("leavefrom")}
            />
          </View>
        </TouchableOpacity>

        {/* Going to */}
        <TouchableOpacity onPress={() => navigation.navigate("gotofrom")}>
          <View style={styles.inputWrapper}>
            <Ionicons name="flag-sharp" size={28} color="#09C912" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Going to"
              value={toLocation}
              onChangeText={setToLocation}
              placeholderTextColor="#666"
              editable={false}
              onPressIn={() => navigation.navigate("gotofrom")}
            />
          </View>
        </TouchableOpacity>

        {/* Date Picker */}
        <View style={styles.inputWrapper}>
          <Ionicons name="calendar-sharp" size={28} color="#09C912" style={styles.icon} />
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.input, styles.datePickerText]}>
              {date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}
            </Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} minimumDate={new Date()} />
        )}

        {/* Passenger Counter */}
        <View style={[styles.inputWrapper, styles.passengerWrapper]}>
          <Ionicons name="person-circle-sharp" size={35} color="#09C912" style={styles.icon} />
          <View style={styles.passengerControl}>
            <TouchableOpacity style={styles.passengerButton} onPress={decrementPassengers}>
              <Ionicons name="remove-circle-sharp" size={15} color="#fff" />
            </TouchableOpacity>
            <Text style={[styles.input, styles.passengerText]}>{passengers}</Text>
            <TouchableOpacity style={styles.passengerButton} onPress={incrementPassengers}>
              <Ionicons name="add-circle-sharp" size={15} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Search button */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchForm;
