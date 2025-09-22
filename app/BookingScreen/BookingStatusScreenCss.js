import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  backButtonContainer: {
    marginTop: 40,
    marginLeft: 8,
  },
   headerrr: {
    marginTop: 20,
    // paddingHorizontal: 2,
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: '#000', // Changed to #09C912 accent
  },
  logo: {
    width: width * 0.4,
    height: 100,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#000', // Changed to #09C912 border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  banner: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#09C912', // Changed to #09C912 accent
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 12,
  },
  responseBox: {
    backgroundColor: '#09C912', // Changed to #09C912 background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
  },
  responseText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  ridePlanBox: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#09C912', // Changed to #09C912 accent for ride plan
  },
  ridePlanHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
    alignSelf: 'center',
  },
  rideDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09C912', // Changed to #09C912 for time
    marginBottom: 12,
  },
  duration: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7F8C8D',
    marginBottom: 10,
  },
  locations: {
    marginLeft: 20,
    flex: 1,
  },
  city: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  stop: {
    fontSize: 15,
    color: '#34495E',
    marginBottom: 8,
  },
  paymentBox: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 18,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#09C912', // Changed to #09C912 for payment
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  seats: {
    fontSize: 15,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#09C912', // Changed to #09C912 for price
  },
  driverBox: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#09C912', // Changed to #09C912 for driver
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#09C912', // Changed to #09C912 border
  },
  driverName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  carDetails: {
    fontSize: 15,
    fontWeight: '500',
    color: '#34495E',
    marginBottom: 4,
  },
  carColor: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  noPassenger: {
    fontSize: 15,
    fontWeight: '500',
    color: '#7F8C8D',
    marginBottom: 20,
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  footer: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#09C912', // Changed to #09C912 for footer
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09C912', // Changed to #09C912 for links
  },
});