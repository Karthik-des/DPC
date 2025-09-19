import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./BottomNavStyles";

const BottomNav = ({ navigation }) => (
  <View style={styles.bottomNav}>
    <LinearGradient colors={["#ffffff", "#f0f4f8"]} style={styles.bottomNavGradient}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("HomeScreen")}>
        <Ionicons name="search-outline" size={32} color="#09C912" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("DriverPickupScreen")}>
        <Ionicons name="add-circle-outline" size={32} color="#09C912" />
        <Text style={styles.navText}>Publish</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("YourRides")}>
        <Ionicons name="map-outline" size={32} color="#09C912" />
        <Text style={styles.navText}>Your rides</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Inbox")}>
        <Ionicons name="chatbubble-outline" size={32} color="#09C912" />
        <Text style={styles.navText}>Inbox</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person-outline" size={32} color="#09C912" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

export default BottomNav;
