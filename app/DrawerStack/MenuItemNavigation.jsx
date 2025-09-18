import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddContactScreen from '../MenuScreen/AddContactScreen'
import { NavigationContainer } from '@react-navigation/native';
import EmergencyContactScreen from '../MenuScreen/EmergencyContactScreen';
import SafetyToolkit from '../MenuScreen/SafetyScreen';
import SafetyMore from '../MenuScreen/SafetyMore';


const Stack = createStackNavigator();

const MenuItemNavigation = () => {
  return (
 <NavigationContainer>
    <Stack.Navigator  name='AddContact' component={AddContactScreen} />
    <Stack.Screen name='AddMore' component={EmergencyContactScreen} />
    <Stack.Screen name='Safety' component={SafetyToolkit} />
    <Stack.Screen name='More' component={SafetyMore} />
 </NavigationContainer>
  )
}

export default MenuItemNavigation
