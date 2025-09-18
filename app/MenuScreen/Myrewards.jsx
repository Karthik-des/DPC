import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Modal,
  Pressable,
  Switch,
  Alert,
  Clipboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const rewardsData = [
  {
    id: "1",
    title: "₹50 Off on Next Car Ride",
    desc: "Valid for 7 days",
    icon: "car",
    coinCost: 50,
    code: "CAR50",
  },
  {
    id: "2",
    title: "Free Car Drop With Food Order",
    desc: "Valid till Aug 30",
    icon: "car",
    coinCost: 150,
    code: "CARPORTFREE",
  },
  {
    id: "3",
    title: "₹100 Cashback",
    desc: "On 3 car rides this week",
    icon: "cash",
    coinCost: 75,
    code: "CASH100",
  },
];

const RewardCard = ({ item, index, isClaimed, onClaim, fadeAnim }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
        style={styles.card}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => !isClaimed && onClaim(item)}
        disabled={isClaimed}
        accessibilityLabel={`Claim reward: ${item.title}`}
      >
        <LinearGradient
          colors={isClaimed ? ["#6b7280", "#9ca3af"] : ["#0089d8", "#0089d8"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={32} color="#ffffff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <Text style={styles.points}>{item.coinCost} Super Coins</Text>
          </View>
          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>
              {isClaimed ? "Claimed" : "Claim Now"}
            </Text>
            {!isClaimed && (
              <Ionicons name="chevron-forward" size={20} color="#ffffff" />
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function MyRewards({ user }) {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [coinBalance, setCoinBalance] = useState(250); // Example balance from SuperCoins
  const [levelProgress, setLevelProgress] = useState(0.5); // Progress to next level (0-1)
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(progressAnim, {
      toValue: levelProgress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim, progressAnim, levelProgress]);

  const handleClaim = (reward) => {
    if (coinBalance >= reward.coinCost) {
      setCoinBalance(coinBalance - reward.coinCost);
      setClaimedRewards([...claimedRewards, reward.id]);
      setSelectedReward(reward);
      setModalVisible(true);
      setLevelProgress((coinBalance - reward.coinCost) / 500); // Example: next level at 500 coins
    } else {
      Alert.alert("Insufficient Super Coins", `You need ${reward.coinCost} Super Coins to claim this reward!`);
    }
  };

  const handleCopyCode = () => {
    if (selectedReward?.code) {
      Clipboard.setString(selectedReward.code);
      Alert.alert("Code Copied", `The code ${selectedReward.code} has been copied to your clipboard.`);
    }
  };

  const renderItem = ({ item, index }) => (
    <RewardCard
      item={item}
      index={index}
      isClaimed={claimedRewards.includes(item.id)}
      onClaim={handleClaim}
      fadeAnim={fadeAnim}
    />
  );

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Animated.View style={[styles.balanceSection, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={["#0089d8", "#0089d8"]}
          style={styles.balanceGradient}
        >
          <Ionicons name="trophy" size={48} color="#ffd700" style={styles.balanceIcon} />
          <Text style={styles.balanceText}>{coinBalance} Super Coins</Text>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.levelText}>Progress to Gold Level</Text>
        </LinearGradient>
      </Animated.View>
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleText, darkMode && styles.darkText]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#020310ff", true: "#008fd8" }}
          thumbColor={darkMode ? "#ffffff" : "#f4f3f4"}
          accessibilityLabel="Toggle dark mode"
        />
      </View>
      <Animated.View style={[styles.listContainerWrapper, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={["#ffffff", "#f1f5f9"]}
          style={styles.listContainerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text style={styles.header}>🎁 My Car Rewards</Text>
          <View style={styles.divider} />
          <FlatList
            data={rewardsData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </LinearGradient>
      </Animated.View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons
              name="checkmark-circle"
              size={48}
              color="#22c55e"
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Reward Claimed!</Text>
            <Text style={styles.modalSubtitle}>{selectedReward?.title}</Text>
            <Text style={styles.modalCode}>Code: {selectedReward?.code}</Text>
            <Text style={styles.modalDesc}>
              This reward has been added to your wallet. Use it at checkout for your next car ride within {selectedReward?.desc.toLowerCase()}.
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("BookRide"); // Changed to match DrawerStack.jsx
                }}
                accessibilityLabel="Book a ride"
              >
                <Text style={styles.modalButtonText}>Book</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalButtonCopy]}
                onPress={handleCopyCode}
                accessibilityLabel="Copy reward code"
              >
                <Text style={styles.modalButtonText}>Copy</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => setModalVisible(false)}
                accessibilityLabel="Close modal"
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  darkContainer: {
    backgroundColor: "#1f2937",
  },
  balanceSection: {
    marginBottom: 20,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignSelf: "center",
    width: "100%",
  },
  balanceGradient: {
    padding: 24,
    alignItems: "center",
  },
  balanceIcon: {
    marginBottom: 12,
  },
  balanceText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#ffd700",
    borderRadius: 5,
  },
  levelText: {
    fontSize: 16,
    color: "#e5e7eb",
    fontWeight: "500",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
  },
  toggleText: {
    fontSize: 16,
    color: "#0089d8",
    fontWeight: "600",
  },
  darkText: {
    color: "#c82d2dff",
  },
  listContainerWrapper: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    marginBottom: 24,
  },
  listContainerGradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0089d8",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 80,
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.3,
  },
  desc: {
    fontSize: 14,
    color: "#e5e7eb",
    marginTop: 4,
    fontWeight: "400",
  },
  points: {
    fontSize: 12,
    color: "#ffd700",
    marginTop: 6,
    fontWeight: "600",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
    marginRight: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    width: "85%",
    alignItems: "center",
    elevation: 10,
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0089d8",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  modalCode: {
    fontSize: 16,
    fontWeight: "700",
    color: "#22c55e",
    marginBottom: 12,
  },
  modalDesc: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#0089d8",
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: "center",
  },
  modalButtonCopy: {
    backgroundColor: "#22c55e",
  },
  modalButtonSecondary: {
    backgroundColor: "#6b7280",
  },
  modalButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
});