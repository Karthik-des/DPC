import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./RideOptionsStyles";

const rideOptions = [
  { id: "1", title: "Mungil Tootris → Bengaluru, Karnataka", date: "Tomorrow, 1 passenger" },
  { id: "2", title: "Mungil Tootris → Bengaluru, Karnataka", date: "1 passenger" },
];

const RideOptions = () => (
  <View style={styles.optionsContainer}>
    {rideOptions.map((item) => (
      <LinearGradient key={item.id} colors={["#ffffff", "#f0f4f8"]} style={styles.rideItem}>
        <Text style={styles.rideTitle}>{item.title}</Text>
        <Text style={styles.rideDate}>{item.date}</Text>
      </LinearGradient>
    ))}
  </View>
);

export default RideOptions;
