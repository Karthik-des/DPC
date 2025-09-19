import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Soft blue-gray for a premium backdrop
    paddingHorizontal: 24,
    paddingTop: 16,
    marginTop:40,
  },
   headerrr: {
    marginTop: 20,
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
    borderWidth: 2.5,
    borderColor: '#080909ff', // Your vibrant blue for logo pop
    shadowColor: '#0089d8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },

profileIcon: {
  width: 42,
  height: 42,
  borderRadius: 21,
  resizeMode: 'cover',
},

  profileIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#003049',
    textAlign: 'center',
    marginBottom: 20,
  },

  textArea: {
    height: 120,
    borderColor: '#09cc12',
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    backgroundColor: '#ffffff',
    color: '#000',
    textAlignVertical: 'top',
  },

  submitButton: {
    marginTop: 30,
    backgroundColor: '#09c912',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
