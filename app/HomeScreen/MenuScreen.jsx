


import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import styles from './MenuScreenCss'; // Reuse the existing styles

const Drawer = createDrawerNavigator();

const MenuScreen = () => {
  const route = useRoute();
  const { userName = 'Guest' } = route.params || {}; // Get username from login

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
      <ScrollView>
        {/* Top User Info Section */}
        <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, margin: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="person-circle-outline" size={24} color="#0089d8" />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0089d8' }}>
                {userName.toUpperCase()}
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>N/A</Text> {/* Placeholder for phone */}
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" style={{ marginLeft: 'auto' }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={{ fontSize: 16, color: '#666', marginLeft: 10 }}>N/A My Rating</Text>
            <Ionicons name="chevron-forward" size={24} color="#000" style={{ marginLeft: 'auto' }} />
          </View>
        </View>

        {/* Menu Items */}
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="help-circle-outline" size={20} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>Help</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="cube-outline" size={20} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>Parcel - Send Items</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="card-outline" size={20} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>Payment</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>My Rides</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>Safety</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="gift-outline" size={20} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>Refer and Earn</Text>
          <Text style={{ fontSize: 14, color: '#666', marginLeft: 10 }}>Get ₹50</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="ribbon-outline" size={20} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>My Rewards</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="ticket-outline" size={20} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>Power Pass</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="cash-outline" size={20} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>SuperCoins</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Ionicons name="notifications-outline" size={25} color="#666" />
          <Text style={{ fontSize: 16, color: '#333', flex: 1, marginLeft: 10 }}>Notifications</Text>
          <Ionicons name="chevron-forward" size={25} color="#666" />
        </TouchableOpacity>

        {/* Footer Banner */}
        <View style={{ padding: 16, backgroundColor: '#fffaf0', borderRadius: 8, margin: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#333' }}>Earn money with Rapido</Text>
          <Text style={{ fontSize: 14, color: '#666' }}>Become a Captain!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeScreenWithDrawer = () => {
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
    navigation.navigate('Drawer', { screen: 'Menu', params: { userName } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <Image
            source={require('../../assets/blablalogo.png')}
            style={styles.logo}
            onError={(error) => console.error('Logo image error:', error)}
          />
          <View style={styles.iconGroup}>
            <TouchableOpacity onPress={handleMenuPress} accessibilityLabel="Open menu">
              <Ionicons name="menu" size={28} color="#0089d8" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.welcomeText}>Hello, {userName}!</Text>

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleMenuPress} style={styles.menuIcon} accessibilityLabel="Open menu">
            <Ionicons name="menu" size={28} color="#0089d8" />
          </TouchableOpacity>
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
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <MenuScreen {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreenWithDrawer} />
        <Drawer.Screen name="Menu" component={MenuScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
