import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray backdrop
   
   
  },
  lottieBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  inner: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    ssssminHeight: height * 1.2, // Ensures full scrollability
  },
  formBox: {
    width: '90%',
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Glassmorphism
    borderRadius: 24,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1.8,
    borderColor: 'rgba(0, 137, 216, 0.3)', // #0089d8
  },
  videoInsideForm: {
    width: '70%',
    height: 150,
    borderRadius: 24,
    marginTop: 30, // Removed negative margin
    marginBottom: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#0089d8',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#212121',
    marginBottom: 36,
    textAlign: 'center',
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 137, 216, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 1.2,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 137, 216, 0.2)', // #0089d8
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    color: '#212121',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 137, 216, 0.2)',
  },
  passwordInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    color: '#212121',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  eyeIcon: {
    padding: 8,
  },
  button: {
    backgroundColor: '#0089d8',
    paddingVertical: 14,
    borderRadius: 40,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '800',
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  linkText: {
    color: '#0089d8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 137, 216, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: '#0089d8',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 137, 216, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

export default styles;