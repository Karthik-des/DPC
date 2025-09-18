import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "../HomeScreens/HomeScreen";
import ProfilePrompt from "../ProfileScreen/ProfilePromptScreen";
import ProfilePictureScreen from "../ProfileScreen/ProfilePictureScreen";
import RidePublishScreen from "../RideScreens/RidePublishScreen";
import YourRides from "../YourRides/YourRides";
import RidePlan from "../RidePlan/RidePlan";
import IdUpload from "../IdUpload/IdUpload";
import CancelRide from "../RidePlan/CancelRideScreen";
import CancellationTracker from "../RidePlan/CancellationTracker";
import PublicationScreen from "../RidePlan/PublicationScreen";
import SupportScreen from "../RidePlan/SupportScreen";
import EditPublicationScreen from "../RidePlan/EditPublicationScreen";
import UserBooked from "../RidePlan/UserBooked";
import UserCancelled from "../RidePlan/UserCancelled";
import UserCompleated from "../RidePlan/UserCompleated";  
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
      <Stack.Screen name="IdUpload" component={IdUpload} />
      <Stack.Screen name="CancelRide" component={CancelRide} />
      <Stack.Screen name="CancellationTracker" component={CancellationTracker} />
      <Stack.Screen name="PublicationScreen" component={PublicationScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen name="EditPublicationScreen" component={EditPublicationScreen} />
      <Stack.Screen name="UserBooked" component={UserBooked} />
      <Stack.Screen name="UserCancelled" component={UserCancelled} />
      <Stack.Screen name="UserCompleated" component={UserCompleated} /> 
      <Stack.Screen name="Profile" component={Profile} />


    </Stack.Navigator>
  );
}
