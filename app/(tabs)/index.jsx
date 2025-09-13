import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "../HomeScreens/HomeScreen";
import ProfilePrompt from "../ProfileScreen/ProfilePromptScreen";
import ProfilePictureScreen from "../ProfileScreen/ProfilePictureScreen";
import RidePublishScreen from "../RideScreens/RidePublishScreen";

const Stack = createNativeStackNavigator();

export default function TabIndex() {
  return (
    <Stack.Navigator initialRouteName="ProfilePrompt" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfilePrompt" component={ProfilePrompt} />
      <Stack.Screen name="ProfilePictureScreen" component={ProfilePictureScreen} />
      <Stack.Screen name="RidePublishScreen" component={RidePublishScreen} />
    </Stack.Navigator>
  );
}
