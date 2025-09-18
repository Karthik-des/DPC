import React from 'react';
import { View, Text } from 'react-native';
import styles from '../ProfileCss';

const ChangePasswordForm = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Change Password</Text>
    <Text>It must have at least 8 characters, 1 letter, 1 number and 1 special character.</Text>
  </View>
);

export default ChangePasswordForm;
