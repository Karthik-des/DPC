import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
  },
  searchCard: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 16,
   borderColor: '#8cf298ff',
    padding: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation:10,
  },
  icon: {
    padding: 10,
    color: '#09C912',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  datePickerButton: {
    flex: 1,
    padding: 10,
  },
  datePickerText: {
    color: '#333',
    fontSize: 16,
  },
  passengerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0, // Minimal padding to keep elements close
  },
  passengerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0, // Removed padding to eliminate extra space
  },
  passengerButton: {
    padding: 6,
    backgroundColor: '#09C912',
    borderRadius: 20,
    marginHorizontal: 65, // Removed margin to bring buttons closer to number
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  passengerText: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#5cf564ff',
    fontWeight: '600',
    paddingHorizontal: 5,
  },
  searchButton: {
    backgroundColor: '#09c912',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
     marginHorizontal:50,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    elevation:10,
  },
  optionsContainer: {
    padding: 10,
  },
});

export default styles;
