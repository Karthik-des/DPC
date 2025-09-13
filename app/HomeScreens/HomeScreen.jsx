import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/ui/Header";
import BottomNav from "../../components/ui/BottomNav";
import SearchForm from "../../components/ui/SearchForm";
import RideOptions from "../../components/ui/RideOptions";
import styles from "./HomeScreenStyles";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 60 }}>
        <Header />
        <SearchForm navigation={navigation} />
        <RideOptions />
      </ScrollView>
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;
