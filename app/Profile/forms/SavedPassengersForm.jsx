import React from 'react';
import { View, Text } from 'react-native';
import styles from '../ProfileCss';

const SavedPassengersForm = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Saved Passengers</Text>
    <Text>No saved passengers yet. Save frequent travelers while booking a bus ride to speed things up next time.</Text>
  </View>
);

export default SavedPassengersForm;
