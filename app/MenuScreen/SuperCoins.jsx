import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
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
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const earnData = [
  {
    id: "1",
    title: "Complete a Car Ride",
    desc: "Earn 10 coins per ride",
    icon: "car",
    points: "+10 Coins",
    earnAmount: 10,
  },
  {
    id: "2",
    title: "Refer a Friend",
    desc: "Get 50 coins when they ride",
    icon: "people",
    points: "+50 Coins",
    earnAmount: 50,
  },
  {
    id: "3",
    title: "Daily Login",
    desc: "Log in daily for bonus coins",
    icon: "calendar",
    points: "+5 Coins",
    earnAmount: 5,
  },
  {
    id: "4",
    title: "Daily Travel",
    desc: "Travel in daily for bonus coins",
    icon: "calendar",
    points: "+100 Coins",
    earnAmount: 100,
  },
];

const redeemData = [
  {
    id: "1",
    title: "₹50 Off on Next Ride",
    desc: "Redeem for 100 coins",
    icon: "pricetag",
    cost: "100 Coins",
    code: "SUPER50",
    redeemAmount: 100,
  },
  {
    id: "2",
    title: "Free Upgrade to Premium Car",
    desc: "Redeem for 200 coins",
    icon: "star",
    cost: "200 Coins",
    code: "PREMIUMFREE",
    redeemAmount: 200,
  },
  {
    id: "3",
    title: "₹100 Cashback on Ride",
    desc: "Redeem for 150 coins",
    icon: "cash",
    cost: "150 Coins",
    code: "SUPER100",
    redeemAmount: 150,
  },
  {
    id: "4",
    title: "₹150 SuperCoin on Daily Ride",
    desc: "Redeem for 150 coins",
    icon: "calendar",
    cost: "150 Coins",
    code: "DAILY100",
    redeemAmount: 150,
  },
];

// Separate component for Earn Card to handle animations
const EarnCard = ({ item, index, onEarn }) => {
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 800,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, [cardAnim, index]);

  const handlePressIn = () => {
    Animated.spring(cardAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(cardAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ opacity: cardAnim, transform: [{ scale: cardAnim }] }}>
      <TouchableOpacity
        style={styles.earnCard}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onEarn(item)}
      >
        <LinearGradient
          colors={["#0089d8", "#0089d8"]}
          style={styles.earnGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={40} color="#ffffff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.earnTitle}>{item.title}</Text>
            <Text style={styles.earnDesc}>{item.desc}</Text>
          </View>
          <Text style={styles.points}>{item.points}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Separate component for Redeem Card
const RedeemCard = ({ item, isRedeemed, onRedeem, fadeAnim }) => {
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
        style={styles.redeemCard}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => !isRedeemed && onRedeem(item)}
        disabled={isRedeemed}
      >
        <LinearGradient
          colors={isRedeemed ? ["#6b7280", "#9ca3af"] : ["#0089d8", "#0089d8"]}
          style={styles.redeemGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={40} color="#ffffff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.redeemTitle}>{item.title}</Text>
            <Text style={styles.redeemDesc}>{item.desc}</Text>
          </View>
          <Text style={styles.cost}>{isRedeemed ? "Redeemed" : item.cost}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function SuperCoins() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [coinBalance, setCoinBalance] = useState(250);
  const [levelProgress, setLevelProgress] = useState(0.5);
  const [redeemedItems, setRedeemedItems] = useState([]);
  const [earnedItems, setEarnedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEarnModal, setIsEarnModal] = useState(false);
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

  const handleEarn = (item) => {
    const amount = item.earnAmount;
    setCoinBalance(coinBalance + amount);
    setEarnedItems([...earnedItems, item.id]);
    setSelectedItem(item);
    setIsEarnModal(true);
    setModalVisible(true);
    setLevelProgress((coinBalance + amount) / 500);
  };

  const handleRedeem = (item) => {
    const cost = item.redeemAmount;
    if (coinBalance >= cost) {
      setCoinBalance(coinBalance - cost);
      setRedeemedItems([...redeemedItems, item.id]);
      setSelectedItem(item);
      setIsEarnModal(false);
      setModalVisible(true);
      setLevelProgress((coinBalance - cost) / 500);
    } else {
      Alert.alert("Insufficient Coins", "You need more Super Coins to redeem this reward!");
    }
  };

  // Combine all sections into a single data array for FlatList
  const sections = [
    { type: 'header', id: 'header' },
    { type: 'balance', id: 'balance' },
    { type: 'toggle', id: 'toggle' },
    { type: 'earn', id: 'earn', data: earnData },
    { type: 'redeem', id: 'redeem', data: redeemData },
  ];

  const renderSection = ({ item }) => {
    switch (item.type) {
     
       
      case 'balance':
        return (
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
        );
      case 'toggle':
        return (
          <View style={styles.toggleContainer}>
            <Text style={[styles.toggleText, darkMode && styles.darkText]}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#020310", true: "#0089d8" }}
              thumbColor={darkMode ? "#ffffff" : "#f4f3f4"}
            />
          </View>
        );
      case 'earn':
        return (
          <View style={styles.sectionWrapper}>
            <Text style={[styles.sectionHeader, darkMode && styles.darkText]}>
              Earn Super Coins
            </Text>
            <View style={styles.divider} />
            <FlatList
              data={item.data}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => <EarnCard item={item} index={index} onEarn={handleEarn} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalListContent}
              bounces={true}
              nestedScrollEnabled={true}
            />
          </View>
        );
      case 'redeem':
        return (
          <View style={styles.sectionWrapper}>
            <Text style={[styles.sectionHeader, darkMode && styles.darkText]}>
              Redeem Super Coins
            </Text>
            <View style={styles.divider} />
            <FlatList
              data={item.data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RedeemCard
                  item={item}
                  isRedeemed={redeemedItems.includes(item.id)}
                  onRedeem={handleRedeem}
                  fadeAnim={fadeAnim}
                />
              )}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              bounces={true}
              nestedScrollEnabled={true}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
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
            <Text style={styles.modalTitle}>
              {isEarnModal ? "Earned Successfully!" : "Redeemed Successfully!"}
            </Text>
            <Text style={styles.modalSubtitle}>{selectedItem?.title}</Text>
            {!isEarnModal && (
              <Text style={styles.modalCode}>Code: {selectedItem?.code}</Text>
            )}
            <Text style={styles.modalDesc}>
              {isEarnModal
                ? `You have earned ${selectedItem?.earnAmount} Super Coins!`
                : "Applied to your next car ride. Enjoy the savings!"}
            </Text>
            <View style={styles.modalButtonContainer}>
              {!isEarnModal && (
                <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("BookRide");
                  }}
                >
                  <Text style={styles.modalButtonText}>Book Now</Text>
                </Pressable>
              )}
              <Pressable
                style={[
                  styles.modalButton,
                  isEarnModal ? styles.modalButtonEarn : styles.modalButtonSecondary,
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  darkContainer: {
    backgroundColor: "#1f2937",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 137, 216, 0.3)',
  },
  logo: {
    width: width * 0.4,
    height: 80,
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: '#0089d8',
    shadowColor: '#0089d8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  balanceSection: {
    marginBottom: 20,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, y: 4 },
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
    fontFamily: 'Roboto',
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
    height: 10,
  },
  levelText: {
    fontSize: 16,
    color: "#e5e7eb",
    fontWeight: "500",
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto',
  },
  darkText: {
    color: "#c82d2d",
  },
  sectionWrapper: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0089d8",
    marginBottom: 12,
    marginLeft: 8,
    fontFamily: 'Roboto',
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 16,
  },
  horizontalListContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  earnCard: {
    width: 320,
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, y: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  earnGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  redeemCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, y: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  redeemGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  earnTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    fontFamily: 'Roboto',
  },
  earnDesc: {
    fontSize: 14,
    color: "#e5e7eb",
    marginTop: 4,
    fontFamily: 'Roboto',
  },
  redeemTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    fontFamily: 'Roboto',
  },
  redeemDesc: {
    fontSize: 14,
    color: "#e5e7eb",
    marginTop: 4,
    fontFamily: 'Roboto',
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffd700",
    fontFamily: 'Roboto',
  },
  cost: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff4500",
    fontFamily: 'Roboto',
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    width: "90%",
    alignItems: "center",
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 137, 216, 0.3)',
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0089d8",
    marginBottom: 8,
    fontFamily: 'Roboto',
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    fontFamily: 'Roboto',
  },
  modalCode: {
    fontSize: 16,
    fontWeight: "700",
    color: "#22c55e",
    marginBottom: 12,
    fontFamily: 'Roboto',
  },
  modalDesc: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#0089d8",
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: "center",
  },
  modalButtonSecondary: {
    backgroundColor: "#6b7280",
  },
  modalButtonEarn: {
    backgroundColor: "#0089d8",
    flex: 1,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: 'Roboto',
  },
});