import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import styles from './TaxiInfoScreenCss';

const TaxiInfoScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
          <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
            <Image
              source={require('../../assets/Dropic.png')}
              style={styles.logo}
              onError={(e) => console.log('Image error:', e.nativeEvent.error)}
            />
          </Animated.View>

          <View style={styles.content}>
            <Image
              source={require('../../assets/taxy premium.jpg')}
              style={styles.taxiImage}
              onError={(error) => console.error('Taxi image error:', error)}
              defaultSource={require('../../assets/usericon.jpg')}
            />
            <Text style={styles.infoText}>
              Experience luxury with our new premium taxi service! Enjoy comfortable rides with AC, 
              spacious interiors, and professional drivers. Book now for a premium travel experience.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map', { carType: 'Premium' })}>
              <Text style={styles.buttonLabel}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TaxiInfoScreen;