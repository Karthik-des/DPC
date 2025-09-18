import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray from your palette for a clean backdrop
  },
  inner: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff', // White from your palette for crisp header
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 137, 216, 0.3)', // Subtle #0089d8 accent
  },
  logo: {
    width: width * 0.4,
    height: 80,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#090909ff', // Your vibrant blue for logo pop
    shadowColor: '#0089d8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 36,
    fontFamily: 'Roboto', // Kept your Roboto font
    color: '#212121', // Your dark gray for bold text
    textShadowColor: 'rgba(0, 137, 216, 0.3)', // Subtle #0089d8 shadow
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 1.2,
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with slight transparency
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 137, 216, 0.2)', // #0089d8 accent
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    color: '#212121', // Your dark gray for text
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  dateInputContainer: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 137, 216, 0.2)',
  },
  locationButton: {
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 14,
    color: '#0089d8', // Your vibrant blue
    fontWeight: '700',
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 137, 216, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  button: {
    marginTop: 20,
    paddingVertical: 7,
    backgroundColor: '#0089d8', // Your vibrant blue for buttons
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // Your white for button text
    textAlign: 'center',
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  suggestionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 137, 216, 0.2)',
  },
  suggestionItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 137, 216, 0.1)', // Subtle #0089d8 accent
  },
  suggestionText: {
    fontSize: 14,
    color: '#212121', // Your dark gray
    fontWeight: '600',
    fontFamily: 'Roboto',
  },
  passengerContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 137, 216, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  passengerLabel: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  passengerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerButton: {
    padding: 10,
    backgroundColor: '#f5f5f5', // Your light gray for buttons
    borderRadius: 12,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#e0e0e0', // Your gray for disabled state
    opacity: 0.5,
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    minWidth: 28,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#212121',
    marginTop: 20,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 137, 216, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default styles;