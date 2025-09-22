// EnableStyle.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
  },

  header: {
    marginTop: 40,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  backButtonText: {
    fontSize: 60,
    color: '#15b42a',
    fontWeight: 'bold',
        marginTop: 20, // Negative margin to pull video closer to header

  },

  // ScrollView container - only flex here, no layout props
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#fefefe',
  },

  // ContentContainerStyle - layout props go here
  mainContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  videoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    height: height * 0.30, // Reduced from 0.3 to 0.15 (half the space)
    justifyContent: 'center', // Changed from flex-end to center
    paddingHorizontal: 20,
    marginTop: -30, // Negative margin to pull video closer to header
  },

  video: {
    width: width * 0.9, // 90% of screen width
    height: 300,
    borderRadius: 10,
    marginTop:50,
  },

  titleContainer: {
    marginTop:40,
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 5,
  },

  featuresContainer: {
    width: '100%',
    marginBottom: 20,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },

  featureIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  featureIconText: {
    fontSize: 18,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },

  actionContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },

  enableButton: {
    backgroundColor: '#ff7700', // Sky blue button
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#ff7700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '100%',
    maxWidth: 280,
    marginTop: -20,
  },

  enableButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },

  enableButtonIcon: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  reviewButton: {
    backgroundColor: '#15b42a', // Different color for review button
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#15b42a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '100%',
    maxWidth: 280,
  },

  reviewButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },

  reviewButtonIcon: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});