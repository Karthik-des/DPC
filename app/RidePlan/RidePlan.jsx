import React, { useState, useEffect } from 'react';
import BookedRidePlan from './BookedRidePlan';
import CompleatedRidePlan from './CompleatedRidePlan';
import CancelledRidePlan from './CancelledRidePlan';

const RidePlan = ({ navigation, route }) => {
  const initialRideData = route?.params?.rideData || {};
  const [rideData, setRideData] = useState(initialRideData);
  
  // Function to handle ride cancellation
  const handleCancelRide = (updatedRideData) => {
    setRideData(updatedRideData);
    
    // Update the ride in the parent component's data (YourRides)
    if (route.params?.updateRideData) {
      route.params.updateRideData(updatedRideData);
    }
  };

  // Function to handle ride status changes and auto-complete past rides
  const getRideStatus = (ride) => {
    if (ride.status === 'Booked') {
      const now = new Date();
      const rideDateTime = new Date(`${ride.date} ${ride.time}`);
      
      if (rideDateTime <= now) {
        return 'Completed'; // Auto-complete past rides
      }
      return 'Booked';
    }
    return ride.status;
  };

  // Update ride data when route params change
  useEffect(() => {
    if (route?.params?.rideData) {
      setRideData(route.params.rideData);
    }
  }, [route?.params?.rideData]);

  // Get current ride status (handles auto-completion and spelling correction)
  const currentStatus = getRideStatus(rideData);
  // Fix the typo: "Compleated" should be "Completed"
  const normalizedStatus = currentStatus === 'Compleated' ? 'Completed' : currentStatus;

  // Route to appropriate component based on ride status
  switch (normalizedStatus) {
    case 'Booked':
      return (
        <BookedRidePlan 
          navigation={navigation} 
          route={{
            ...route,
            params: {
              ...route.params,
              rideData: rideData,
              onCancelRide: handleCancelRide
            }
          }}
        />
      );
    case 'Completed':
      return (
        <CompleatedRidePlan 
          navigation={navigation} 
          route={{
            ...route,
            params: {
              ...route.params,
              rideData: rideData
            }
          }}
        />
      );
    case 'Cancelled':
      return (
        <CancelledRidePlan 
          navigation={navigation} 
          route={{
            ...route,
            params: {
              ...route.params,
              rideData: rideData
            }
          }}
        />
      );
    default:
      // Default to completed if status is unknown
      return (
        <CompleatedRidePlan 
          navigation={navigation} 
          route={{
            ...route,
            params: {
              ...route.params,
              rideData: rideData
            }
          }}
        />
      );
  }
};

export default RidePlan;