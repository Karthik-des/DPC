
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

 import ProfileScreen from '../ProfileScreen/ProfileScreen';
// import RegisterScreen from '../RegisterScreen/RegisterScreen';
 import LoginScreen from '../LoginScreen/LoginScreen';
// import BookingScreen from '../BookingScreen/BookingScreen';
// import ContactScreen from '../ContactScreen/ContactDriverScreen';
// import DisplayScreen from '../DisplayScreen/DisplayScreen';
// import FeedBackScreen from '../FeedbackScreen/FeedBackScreen';
// import EditProfileScreen from '../EditProfileScreen/EditProfileScreen';
// import SettingsScreen from '../SettingScreen/SettingScreen';
 import HomeScreen from '../HomeScreen/HomeScreen';

// import MenuScreen from '../HomeScreen/MenuScreen';
import { useNavigation } from '@react-navigation/native';
// import SuperCoins from '../MenuScreen/SuperCoins'
// import MyRideScreen from '../MenuScreen/MyRideScreen';

const Drawer = createDrawerNavigator();

function RestrictedScreen({ message }) {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, color: '#0089d8', textAlign: 'center' }}>{message}</Text>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: '#0089d8', borderRadius: 5 }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

function CustomDrawerContent(props) {
  const { navigation, setIsLoggedIn, isLoggedIn, user } = props;

  const handleLogout = () => { 
    if (navigation) {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => {
              setIsLoggedIn(false);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'G';
  const userName = user?.name?.toUpperCase() || 'GUEST';
  const userPhone = user?.phone || 'N/A';
  const userRating = user?.rating || 'N/A';

  const handleDrawerToggle = () => {
    navigation.toggleDrawer();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderBottomWidth: 3, borderBottomColor: '#0089d8' }}>
      </View>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 5, borderRadius: 8, margin: 10, marginTop: 0 }}>
      </TouchableOpacity>

      <DrawerItem
        label="Home"
        icon={() => <Ionicons name="home-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="Help"
        icon={() => <Ionicons name="help-circle-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('Help')}
      />
      {/* <DrawerItem
        label="Parcel - Send Items"
        icon={() => <Ionicons name="cube-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('Parcel')}
      /> */}
      <DrawerItem
        label="Payment"
        icon={() => <Ionicons name="wallet-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('Payment')}
      />
      <DrawerItem
        label="My Rides"
        icon={() => <Ionicons name="time-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('MyRides')}
      />
      <DrawerItem
        label="Safety"
        icon={() => <Ionicons name="shield-checkmark-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('Safety')}
      />
      <DrawerItem
        label={() => (
          <View>
            <Text style={{ fontSize: 16, color: '#333' }}>Refer and Earn</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>Get ₹50</Text>
          </View>
        )}
        icon={() => <Ionicons name="gift-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('ReferAndEarn')}
      />
      <DrawerItem
        label="My Rewards"
        icon={() => <Ionicons name="ribbon-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('MyRewards')}
      />
      <DrawerItem
        label="Super Coins"
        icon={() => <Ionicons name="cash-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('SuperCoins')}
      />
      <DrawerItem
        label="Notifications"
        icon={() => <Ionicons name="notifications-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('Notifications')}
      />
      <DrawerItem
        label="Claims rewards"
        icon={() => <Ionicons name="shield-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('Claims')}
      />
      <DrawerItem
        label="Settings"
        icon={() => <Ionicons name="settings-outline" size={25} color="#0089d8" />}
        onPress={() => navigation.navigate('Settings')}
      />

      <View style={{ marginTop: '22', padding: 20, backgroundColor: '#0089d8', borderRadius: 18, margin: 15 }}>
        <Text style={{ fontSize: 16, color: '#fff' }}>Earn money with Bla</Text>
        <Text style={{ fontSize: 14, color: '#fff' }}>Become a Captain!</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerStack({ isLoggedIn, setIsLoggedIn, user }) {
  return (
    <Drawer.Navigator
      initialRouteName={isLoggedIn ? 'Home' : 'Login'}
      drawerContent={(props) => <CustomDrawerContent {...props} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} user={user} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          borderRadius: 10,
        },
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: 'black',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile"> 
        {props => <ProfileScreen {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      </Drawer.Screen>
       {/* <Drawer.Screen name="Register" component={RegisterScreen} /> */}
    <Drawer.Screen name="Login" component={LoginScreen}  options={{ headerLeft: () => null }}  />
        {/*
      <Drawer.Screen name="Booking" component={BookingScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="Display" component={DisplayScreen} />
      <Drawer.Screen name="Feedback" component={FeedBackScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Restricted" component={RestrictedScreen} />
      <Drawer.Screen name="MenuScreen" component={MenuScreen} />
      <Drawer.Screen name="SuperCoins" component={SuperCoins} />
      <Drawer.Screen name="MyRides" component={MyRideScreen} /> */}
     
      {/* Removed menu item screens like Safety, Payment, MyRewards, etc., to use the outer stack */}
    </Drawer.Navigator>
  );
} 