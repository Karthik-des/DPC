import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const CARDS = [
  {
    id: '1',
    image: require('../../assets/safety.jpg'),
    title: 'Proactive safety checks',
    action: 'More',
  },
  {
    id: '2',
    image: require('../../assets/livelocation.jpg'),
    title: 'Share live location',
    action: 'More',
  },
];

const Card = ({ item, index, onPress, fadeAnim }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, index]);

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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(item)}
        accessibilityLabel={item.title}
      >
        <Image
          source={item.image}
          style={styles.cardImage}
          onError={(error) => console.error(`${item.title} image error:`, error)}
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SafetyScreen = ({ user }) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleGoBack = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Unable to go back. Please try again.');
    }
  };

  const handleCardPress = (item) => {
    try {
      if (item.action === 'More') {
        navigation.navigate('More');
      } else {
        Alert.alert(item.title, 'This feature is coming soon!');
      }
    } catch (error) {
      console.error('Card navigation error:', error);
      Alert.alert('Error', 'Unable to navigate. Please try again.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, darkMode && styles.darkContainer]}>
      {/* Header */}
      <LinearGradient
        colors={['#0089d8', '#0070b0']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.back}
          accessibilityLabel="Go back to previous screen"
        >
          {/* <Ionicons name="arrow-back" size={28} color="#fff" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety Toolkit</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Subtitle */}
        <Animated.View style={[styles.subtitleContainer, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#ffffff', '#f1f5f9']}
            style={styles.subtitleGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={styles.subtitle}>
              At Bla Bla, your safety comes first. Here are some measures and provisions to ensure your safety.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('More')}>
              <Text style={styles.knowMore}>Know more</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Dark Mode Toggle */}
        <View style={styles.toggleContainer}>
          <Text style={[styles.toggleText, darkMode && styles.darkText]}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#020310ff', true: '#008fd8' }}
            thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
            accessibilityLabel="Toggle dark mode"
          />
        </View>

        {/* Horizontal Scroll Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollRow}
          contentContainerStyle={styles.scrollRowContent}
        >
          {CARDS.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              index={index}
              onPress={handleCardPress}
              fadeAnim={fadeAnim}
            />
          ))}
        </ScrollView>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddMore')}
            style={styles.settingsItem}
            accessibilityLabel="Add new trusted contacts"
          >
            <View>
              <Text style={[styles.settingsText, darkMode && styles.darkText]}>
                New trusted contacts
              </Text>
              <Text style={styles.settingsSubText}>
                Share ride trip details with your loved ones in a single tap
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={darkMode ? '#c82d2dff' : '#666'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 16,
  },
  darkContainer: {
    backgroundColor: '#1f2937',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  
   
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius:18,
    marginBottom: 10,
    marginTop: 18,
  },
  back: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignItems:'center',
    justifyContent: 'center',
    marginLeft: 16,
    width: '80%',
  },
  scrollContent: {
    paddingBottom: 80, 
  },
  subtitleContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtitleGradient: {
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  knowMore: {
    fontSize: 14,
    color: '#0089d8',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
  },
  toggleText: {
    fontSize: 16,
    color: '#0089d8',
    fontWeight: '600',
  },
  darkText: {
    color: '#c82d2dff',
  },
  scrollRow: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  scrollRowContent: {
    paddingRight: 16,
  },
  card: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 10,
    textAlign: 'center',
  },
  settingsSection: {
    paddingHorizontal: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingsSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default SafetyScreen;