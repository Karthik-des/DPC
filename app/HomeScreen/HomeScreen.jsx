import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles, { images } from './HomeScreenCss';

const allLocations = [
  { title: '🕓 Kadugodi', subtitle: 'Railway station, Whitefield', lat: 12.986, lng: 77.728, image: images.a },
  { title: '🚌 Majestic Bus Stand', subtitle: 'Kempegowda, Gandhi Nagar', lat: 12.9784, lng: 77.5726, image: images.b },
  { title: '🏬 KLM Shopping Mall', subtitle: 'Marathahalli, Bengaluru', lat: 12.956, lng: 77.701, image: images.c },
  { title: '🏞️ Cubbon Park', subtitle: 'Near Vidhana Soudha', lat: 12.9763, lng: 77.5929, image: images.d },
  { title: '🏙️ Indiranagar', subtitle: 'Metro Station, Bengaluru', lat: 12.9719, lng: 77.6412, image: images.e },
  { title: '🌆 MG Road', subtitle: 'Central Bengaluru', lat: 12.9753, lng: 77.6067, image: images.f },
];

const openMap = (lat, lng) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  Linking.openURL(url);
};

const LocationItem = ({ title, subtitle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.locationItem} accessibilityLabel={`Navigate to ${title}`}>
    <View>
      <Text style={styles.locationTitle}>{title}</Text>
      <Text style={styles.subText}>{subtitle}</Text>
    </View>
    <Ionicons name="location-sharp" size={20} color="#0089d8" />
  </TouchableOpacity>
);

const ExploreOption = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.exploreItem} accessibilityLabel={`Select ${label}`}>
    <Text style={styles.optionIcon}>{icon}</Text>
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

const Places = ({ locations }) => (
  <View style={{ marginBottom: 20 }}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }}>
      {locations.map((item, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image 
            source={item.image} 
            style={styles.placeImage} 
            onError={(error) => console.error('Image loading error:', error)}
          />
          <Text style={styles.placeName}>{item.title.replace(/^[^\w\s]+/, '')}</Text>
          <TouchableOpacity style={styles.mapIcon} onPress={() => openMap(item.lat, item.lng)} accessibilityLabel={`Open map for ${item.title}`}>
            <Ionicons name="location-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userName = 'Guest' } = route.params || {};

  const handleSearchPress = () => {
    navigation.navigate('Map', {
      location: { title: 'Unknown location', subtitle: '' },
      userName,
    });
  };

  const handleMenuPress = () => {
     navigation.navigate('Drawer', {
      screen: 'DrawerStack',
      params: { userName },
    });
  };

  try {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.header}>
            <Image 
              source={require('../../assets/Dropic.png')} 
              style={styles.logo}
              onError={(error) => console.error('Logo image error:', error)}
            />
            <View style={styles.iconGroup}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} accessibilityLabel="Go to profile">
                <Ionicons name="person-circle-outline" size={45} color="#0089d8" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.welcomeText}>Hello, {userName}!</Text>

          <View style={styles.searchContainer}>
            {/* <TouchableOpacity onPress={handleMenuPress} style={styles.menuIcon} accessibilityLabel="Open menu">
              <Ionicons name="menu" size={28} color="#0089d8" />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.searchWrapper}
              onPress={handleSearchPress}
              activeOpacity={0.8}
              accessibilityLabel="Search for a location"
            >
              <Ionicons name="search" size={20} color="#0089d8" style={{ marginHorizontal: 10 }} />
              <Text style={[styles.searchInput, { color: '#888' }]}>Where are you going?</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.heading}>Nearby Locations</Text>
          <View style={styles.section}>
            {allLocations.map((loc, index) => (
              <LocationItem
                key={index}
                title={loc.title}
                subtitle={loc.subtitle}
                onPress={() => openMap(loc.lat, loc.lng)}
              />
            ))}
          </View>

          <Text style={styles.heading}>Explore Options</Text>
          <View style={styles.exploreOptions}>
            <ExploreOption
              icon="🚕"
              label="Car AC"
              onPress={() => navigation.navigate('Map', { carType: 'AC', userName })}
            />
            <ExploreOption
              icon="📦"
              label="Car with Parcel"
              onPress={() => navigation.navigate('Map', { carType: 'Parcel', userName })}
            />
            <ExploreOption
              icon="🚗"
              label="Car Non AC"
              onPress={() => navigation.navigate('Map', { carType: 'Non-AC', userName })}
            />
          </View>

          <LinearGradient colors={['#3d8ae1', '#3c9fe1']} style={styles.banner}>
            <TouchableOpacity onPress={() => navigation.navigate('TaxiInfo')} style={styles.bannerContent} accessibilityLabel="Explore premium taxi service">
              <View style={styles.bannerLeft}>
                <Text style={styles.bannerText}>Discover Our New{"\n"}Premium Taxi Service</Text>
              </View>
              <View style={styles.bannerRight}>
                <Ionicons name="car-sport" size={40} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </LinearGradient>

          <Text style={styles.heading}>Go Places with Bla Bla</Text>
          <Places locations={allLocations} />

          <View style={styles.footerContainer}>
            <Image 
              source={images.footer} 
              style={styles.footerBackground} 
              resizeMode="cover"
              onError={(error) => console.error('Footer image error:', error)}
            />
            <View style={styles.footerOverlay}>
              <Text style={styles.footerHashtag}>#goBlaBla</Text>
              <Text style={styles.footerInfo}>🇮🇳 Made for India</Text>
              <Text style={styles.footerInfo}>❤️ Crafted in Bengaluru</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } catch (error) {
    console.error('HomeScreen error:', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>Error: {error.message}</Text>
      </View>
    );
  }
};

export default HomeScreen;