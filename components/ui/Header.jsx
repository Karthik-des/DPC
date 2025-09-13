import React from "react";
import { View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./HeaderStyles"; // Create a HeaderStyles.js later

const Header = () => (
  <View style={styles.header}>
    <LinearGradient colors={["#E6F0FA", "#ffffff"]} style={styles.headerGradient}>
      <Image
        source={require("../../assets/Dropic.png")}
        style={styles.logoImg}
        accessibilityLabel="DROPIC Logo"
      />
    </LinearGradient>
  </View>
);

export default Header;
