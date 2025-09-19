import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


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
import InboxScreen from "../InBoxScreens/InBoxScreen";


import DisplayScreen from "../DisplayScreen/DisplayScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import RegisterScreen from "../RegisterScreen/RegisterScreen";
import LoginScreen from "../LoginScreen/LoginScreen";
import EditProfileScreen from "../EditProfileScreen/EditProfileScreen";

import BookingScreen from "../BookingScreen/BookingScreen";
import BookRideScreen from "../BookingScreen/BookRideScreen";
import BookingRequestScreen from "../BookingScreen/BookingRequestScreen";
import ReportRideScreen from "../BookingScreen/ReportRideScreen";
import BookingConfirmationScreen from "../BookingScreen/BookingConfirmationScreen";
import BookingStatusScreen from "../BookingScreen/BookingStatusScreen";
import CancelWarningScreen from "../BookingScreen/CancelWarningScreen";
import CancelReasonScreen from "../BookingScreen/CancelReasonScreen";
import CancelCommentScreen from "../BookingScreen/CancelCommentScreen";




import SafetyToolkit from "../MenuScreen/SafetyScreen";
import SafetyMore from "../MenuScreen/SafetyMore";
import EmergencyContactScreen from "../MenuScreen/EmergencyContactScreen";
import AddContactScreen from "../MenuScreen/AddContactScreen";
import MyRewards from "../MenuScreen/Myrewards";
import SuperCoins from "../MenuScreen/SuperCoins";
import MyRideScreen from "../MenuScreen/MyRideScreen";
import SettingScreen from "../SettingScreen/SettingScreen";
import ClaimsScreen from "../MenuScreen/Claims";
import NotificationScreen from "../MenuScreen/NotificationScreen";
import ReferScreen from "../MenuScreen/ReferScreen";
import StartNewClaimScreen from "../MenuScreen/StartNewClaimScreen";
import HelpScreen from "../MenuScreen/HelpScreen";
import PrivacyScreen from "../MenuScreen/PrivacyScreen";
import TermsScreen from "../MenuScreen/TermsScreen";

import PassengerContactScreen from "../ContactScreen/PassengerContactScreen";
import ContactDriverScreen from "../ContactScreen/ContactDriverScreen";

import PaymentScreen from "../PaymentScreen/PaymentScreen";
import FeedBackScreen from "../FeedbackScreen/FeedBackScreen";
import MapScreen from "../MapScreen/MapScreen";



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

      {/* Main Screens */}

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
      <Stack.Screen name="Inbox" component={InboxScreen}/> 



      <Stack.Screen name="DisplayScreen" component={DisplayScreen} />


      {/* Profile & Auth */}
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      {/* Booking */}
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="BookRideScreen" component={BookRideScreen} />
      <Stack.Screen name="BookingRequestScreen" component={BookingRequestScreen} />
      <Stack.Screen name="ReportRideScreen" component={ReportRideScreen} />
      <Stack.Screen name="BookingConfirmationScreen" component={BookingConfirmationScreen} />
      <Stack.Screen name="BookingStatusScreen" component={BookingStatusScreen} />
      <Stack.Screen name="CancelWarningScreen" component={CancelWarningScreen} />
      <Stack.Screen name="CancelReasonScreen" component={CancelReasonScreen} />
      <Stack.Screen name="CancelCommentScreen" component={CancelCommentScreen} />
{/* 
      Drawer & Menu
      <Stack.Screen name="DrawerStack" component={DrawerStack} />
      <Stack.Screen name="TaxiInfoScreen" component={TaxiInfoScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} /> */}

      {/* Menu Extra */}
      <Stack.Screen name="SafetyToolkit" component={SafetyToolkit} />
      <Stack.Screen name="SafetyMore" component={SafetyMore} />
      <Stack.Screen name="EmergencyContactScreen" component={EmergencyContactScreen} />
      <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
      <Stack.Screen name="MyRewards" component={MyRewards} />
      <Stack.Screen name="SuperCoins" component={SuperCoins} />
      <Stack.Screen name="MyRideScreen" component={MyRideScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ClaimsScreen" component={ClaimsScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="ReferScreen" component={ReferScreen} />
      <Stack.Screen name="StartNewClaimScreen" component={StartNewClaimScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />

      {/* Contact */}
      <Stack.Screen name="PassengerContactScreen" component={PassengerContactScreen} />
      <Stack.Screen name="ContactDriverScreen" component={ContactDriverScreen} />

      {/* Misc */}
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="FeedBackScreen" component={FeedBackScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />

    

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
