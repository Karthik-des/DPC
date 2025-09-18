import React from 'react';
import { View, Text } from 'react-native';
import styles from '../ProfileCss';

const RatingsForm = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Ratings</Text>
    <Text>You haven't received any ratings yet.</Text>
  </View>
);

export default RatingsForm;
