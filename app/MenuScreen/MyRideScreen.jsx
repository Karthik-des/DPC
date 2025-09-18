import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MyRideScreen = ({ isLoggedIn, user }) => {
  const navigation = useNavigation();
  const [rideHistory, setRideHistory] = useState([]);
  const userName = user && typeof user.name === 'string' && user.name.length > 0
    ? user.name
    : 'Guest';

  // Placeholder ride history data (replace with API call in production)
  useEffect(() => {
    if (isLoggedIn) {
      // Simulate fetching ride history from an API
      const mockRideData = [
        {
          id: '1',
          date: '2025-08-15',
          destination: 'MG Road, Bengaluru',
          price: '₹250',
          status: 'Completed',
          driver: 'Ravi Kumar',
          carType: 'Car AC',
        },
        {
          id: '2',
          date: '2025-08-14',
          destination: 'Koramangala, Bengaluru',
          price: '₹180',
          status: 'Completed',
          driver: 'Anita Sharma',
          carType: 'Car Non-AC',
        },
        {
          id: '3',
          date: '2025-08-13',
          destination: 'Whitefield, Bengaluru',
          price: '₹300',
          status: 'Cancelled',
          driver: 'Suresh Reddy',
          carType: 'Car AC',
        },
      ];
      setRideHistory(mockRideData);
    } else {
      setRideHistory([]);
    }
  }, [isLoggedIn]);

  const renderRideItem = ({ item }) => (
    <TouchableOpacity
      style={styles.rideItem}
      onPress={() => {
        // Navigate to a ride details screen (to be implemented)
        Alert.alert('Ride Details', `Details for ride to ${item.destination}`);
      }}
      accessibilityLabel={`View details for ride to ${item.destination} on ${item.date}`}
    >
      <View style={styles.rideInfo}>
        <Text style={styles.rideDate}>{item.date}</Text>
        <Text style={styles.rideDestination}>{item.destination}</Text>
        <Text style={styles.rideDriver}>Driver: {item.driver}</Text>
        <Text style={styles.rideCarType}>{item.carType}</Text>
      </View>
      <View style={styles.rideMeta}>
        <Text style={styles.ridePrice}>{item.price}</Text>
        <Text
          style={[
            styles.rideStatus,
            { color: item.status === 'Completed' ? '#28a745' : '#ff4444' },
          ]}
        >
          {item.status}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          {/* <Ionicons name="arrow-back" size={28} color="#0089d8" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Rides</Text>
      </View>

      {isLoggedIn ? (
        <>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              Hello, {userName}! You have completed {rideHistory.length} rides.
            </Text>
          </View>
          {rideHistory.length > 0 ? (
            <FlatList
              data={rideHistory}
              renderItem={renderRideItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No rides found.</Text>
            </View>
          )}
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Please log in to view your ride history.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleGoToLogin}
            accessibilityLabel="Go to login screen"
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingHorizontal:16
  },
  header: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal:16,
    marginTop:20,
    borderRadius:22
    
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0089d8',
    alignItems:'center',
    justifyContent:'center',
    marginLeft: 16,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    padding: 10,
  },
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  rideInfo: {
    flex: 1,
  },
  rideDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rideDestination: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rideDriver: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rideCarType: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rideMeta: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0089d8',
  },
  rideStatus: {
    fontSize: 14,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#0089d8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyRideScreen;