import React from 'react';
import { View, Text } from 'react-native';
import styles from '../ProfileCss';

const PostalAddressForm = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Postal Address</Text>
    <Text>Please enter your postal address.</Text>
  </View>
);

export default PostalAddressForm;
