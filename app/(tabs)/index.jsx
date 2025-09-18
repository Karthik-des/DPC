import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "../HomeScreens/HomeScreen";
import ProfilePrompt from "../ProfileScreen/ProfilePromptScreen";
import ProfilePictureScreen from "../ProfileScreen/ProfilePictureScreen";
import RidePublishScreen from "../RideScreens/RidePublishScreen";
import DriverPickupScreen from "../DriverPickupAndDroffScreens/DriverPIckupScreen";
import DriverDropoffScreen from "../DriverPickupAndDroffScreens/DriverDropoffScreen";
import RouteSelectionScreen from "../DriverPickupAndDroffScreens/RouteSelectionScreen";
import StopoverSelectionScreen from "../DriverPickupAndDroffScreens/StopoverSelectionScreen";
import CalendarScreen  from "../DriverPickupAndDroffScreens/CalendarScreen";
import PickupTimeScreen from "../DriverPickupAndDroffScreens/PickupTimeScreen";
import CarCountScreen from "../DriverPickupAndDroffScreens/CarCountScreen";
import EnableScreen from "../DriverPickupAndDroffScreens/EnableScreen";
import PriceSelectionScreen from "../DriverPickupAndDroffScreens/PriceSelectionScreen";
import ReturnRideScreen from "../DriverPickupAndDroffScreens/ReturnRideScreen";
import DriverVerification from "../DriverPickupAndDroffScreens/DriverVerificationScreen";
import DriverVerificationSuccessScreen from "../DriverPickupAndDroffScreens/DriverVerificationSuccessScreen";

const Stack = createNativeStackNavigator();

export default function TabIndex() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfilePrompt" component={ProfilePrompt} />
      <Stack.Screen name="ProfilePictureScreen" component={ProfilePictureScreen} />
      <Stack.Screen name="RidePublishScreen" component={RidePublishScreen} />
      <Stack.Screen name="DriverPickupScreen" component={DriverPickupScreen} />
      <Stack.Screen name="DriverDropoffScreen" component={DriverDropoffScreen} />
      <Stack.Screen name="RouteSelectionScreen" component={RouteSelectionScreen} />
      <Stack.Screen name="StopoverSelectionScreen" component={StopoverSelectionScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="PickupTimeScreen" component={PickupTimeScreen} />
      <Stack.Screen name="CarCountScreen" component={CarCountScreen} />
      <Stack.Screen name="EnableScreen" component={EnableScreen} />
      <Stack.Screen name="PriceSelectionScreen" component={PriceSelectionScreen} />
      <Stack.Screen name="ReturnRideScreen" component={ReturnRideScreen} />
      <Stack.Screen name="DriverVerification" component={DriverVerification} />
      <Stack.Screen name="DriverVerificationSuccessScreen" component={DriverVerificationSuccessScreen} />

    </Stack.Navigator>
  );
}
