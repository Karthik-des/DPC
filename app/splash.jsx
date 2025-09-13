import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
import { Redirect } from "expo-router";
import carVideo from "../assets/india3.mp4";

export default function Splash() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (done) {
    // go to tabs → first tab = HomeScreen
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.home}>
          <Video
            source={carVideo}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            isLooping
            style={{ width: "200%", height: 700 }}
          />
          <StatusBar style="auto" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  home: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
