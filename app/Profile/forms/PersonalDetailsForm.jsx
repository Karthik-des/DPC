import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PersonalDetailsForm = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSave = () => {
    Alert.alert('Saved', 'Personal details updated.');
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={{ backgroundColor: '#ffffff', paddingTop: 50, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#09c912" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>Edit Personal Details</Text>
        <View style={{ width: 40, height: 40 }} />
      </View>

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 8 }}>First Name</Text>
        <TextInput value={firstName} onChangeText={setFirstName} placeholder="Enter first name" placeholderTextColor="#9CA3AF" style={{ height: 52, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, backgroundColor: '#ffffff', marginBottom: 16 }} />

        <Text style={{ fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Last Name</Text>
        <TextInput value={lastName} onChangeText={setLastName} placeholder="Enter last name" placeholderTextColor="#9CA3AF" style={{ height: 52, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, backgroundColor: '#ffffff' }} />
      </View>

      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#F3F4F6' }}>
        <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#09C912', height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '700' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PersonalDetailsForm;


