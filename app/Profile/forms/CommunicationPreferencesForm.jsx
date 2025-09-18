import React from 'react';
import { View, Text } from 'react-native';
import styles from '../ProfileCss';

const CommunicationPreferencesForm = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Communication Preferences</Text>
    <Text>Push notifications</Text>
    <Text>Emails</Text>
    <Text>Text messages</Text>
    <Text>Phone calls</Text>
  </View>
);

export default CommunicationPreferencesForm;
