import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "../HomeScreens/HomeScreen";
import ProfilePrompt from "../ProfileScreen/ProfilePromptScreen";
import ProfilePictureScreen from "../ProfileScreen/ProfilePictureScreen";
import RidePublishScreen from "../RideScreens/RidePublishScreen";
import YourRides from "../YourRides/YourRides";
import RidePlan from "../RidePlan/RidePlan";
import  Profile from "../Profile/Profile";
const Stack = createNativeStackNavigator();

export default function TabIndex() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfilePrompt" component={ProfilePrompt} />
      <Stack.Screen name="ProfilePictureScreen" component={ProfilePictureScreen} />
      <Stack.Screen name="RidePublishScreen" component={RidePublishScreen} />
      <Stack.Screen name="YourRides" component={YourRides} />
      <Stack.Screen name="RidePlan" component={RidePlan} />
      <Stack.Screen name="Profile" component={Profile} />


    </Stack.Navigator>
  );
}
