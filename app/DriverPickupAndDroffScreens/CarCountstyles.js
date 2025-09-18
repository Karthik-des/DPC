// CarCountStyleCss.js
import { StyleSheet, Dimensions, } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F0FA' },
  
  // Scroll View Container - Apply flex here, not in contentContainerStyle
  scrollViewContainer: {
    flex: 1,
  },
  
  // Header Styles - Repositioned and adjusted

  header: {
    marginTop: 30,
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
    fontSize: 60, // Reduced size
    color: '#15b42a',
    fontWeight: 'bold',
  },
  
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28, // Slightly reduced
    fontWeight: 'bold',
    color: '#ff7700',
    marginRight: 44,
    marginTop:25 // To center the title properly
  },
  
  // Main Content Styles - Removed spacing
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 10, // Reduced from 30
    paddingBottom: 20,
    backgroundColor: '#fefefe',
  },
  
  titleSection: {
    alignItems: 'center',
    marginBottom: 20, // Reduced from 40
  },
  
  title: {
    fontSize: 24, // Slightly reduced
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 30, // Adjusted
    marginBottom: 6, // Reduced
  },
  
  subtitle: {
    fontSize: 15, // Slightly reduced
    color: '#666666',
    textAlign: 'center',
  },
  
  // Counter Card Styles - Reduced margins
  counterCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25, // Reduced padding
    marginBottom: 15, // Reduced from 25
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12, // Reduced
    elevation: 10,
  },
  
  counterButton: {
    width: 52, // Slightly smaller
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  
  counterButtonActive: {
    backgroundColor: '#ff7700',
  },
  
  counterButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  
  counterButtonText: {
    fontSize: 26, // Slightly smaller
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  counterButtonTextDisabled: {
    color: '#999999',
  },
  
  counterNumberContainer: {
    alignItems: 'center',
    marginHorizontal: 35, // Reduced
  },
  
  counterNumber: {
    fontSize: 46, // Slightly smaller
    fontWeight: 'bold',
    color: '#15b42a',
    marginBottom: 4, // Reduced
  },
  
  counterLabel: {
    fontSize: 13, // Slightly smaller
    color: '#666666',
    fontWeight: '800',
  },
  
  rangeInfo: {
    alignItems: 'center',
    marginTop: 8, // Reduced
  },
  
  rangeText: {
    fontSize: 11, // Slightly smaller
    color: '#999999',
  },
  
  // Options Card Styles - Reduced margins
  optionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18, // Reduced
    marginBottom: 15, // Reduced from 25
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  
  optionsTitle: {
    fontSize: 17, // Slightly reduced
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12, // Reduced
  },
  
  optionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10, // Reduced
    paddingHorizontal: 12, // Reduced
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  
  optionRowActive: {
    backgroundColor: '#f8f9ff',
  },
  
  checkbox: {
    width: 22, // Slightly smaller
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ff7700',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12, // Reduced
    elevation:10,
  },
  
  checkboxChecked: {
    backgroundColor: '#15b42a',
    borderColor: '#15b42a',
  },
  
  checkboxUnchecked: {
    backgroundColor: 'transparent',
    borderColor: '#cccccc',
  },
  
  checkIcon: {
    fontSize: 12, // Slightly smaller
    color: '#ffffff',
    fontWeight: 'bold',
  },
  
  optionContent: {
    flex: 1,
  },
  
  optionMainText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3, // Reduced
  },
  
  optionText: {
    fontSize: 15, // Slightly smaller
    fontWeight: '500',
    color: '#333333',
    marginRight: 6, // Reduced
  },
  
  optionIcon: {
    fontSize: 18, // Slightly smaller
  },
  
  optionSubText: {
    fontSize: 13, // Slightly smaller
    color: '#666666',
    lineHeight: 17, // Adjusted
  },
  
  // Seat Visual Card Styles - Reduced margins
  seatCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18, // Reduced
    marginBottom: 15, // Reduced from 25
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 15,
  },
  
  seatTitle: {
    fontSize: 15, // Slightly smaller
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 12, // Reduced
  },
  
  seatGrid: {
    alignItems: 'center',
  },
  
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10, // Reduced
  },
  
  seatIcon: {
    width: 34, // Slightly smaller
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, // Reduced
  },
  
  // Driver seat - always occupied and different color
  seatDriver: {
    backgroundColor: '#ff7700',
    shadowColor: '#ff7700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Customer seat - available
  seatCustomerAvailable: {
    backgroundColor: '#15b42a',
    shadowColor: '#15b42a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Customer seat - unavailable
  seatCustomerUnavailable: {
    backgroundColor: '#e0e0e0',
  },
  
  seatText: {
    fontSize: 10, // Slightly smaller
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  seatTextUnavailable: {
    color: '#999999',
  },
  
  // Seat legend - Reduced spacing
  seatLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12, // Reduced
    paddingHorizontal: 10,
  },
  
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6, // Reduced
  },
  
  legendIcon: {
    width: 14, // Slightly smaller
    height: 14,
    borderRadius: 4,
    marginRight: 5, // Reduced
  },
  
  legendText: {
    fontSize: 11, // Slightly smaller
    color: '#666666',
    fontWeight: '500',
  },
  
  // Next Button Styles - Reduced spacing
  nextButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12, // Reduced
    paddingBottom: 25, // Reduced
    backgroundColor: '#ffffff',
  },
  
  nextButton: {
    backgroundColor: '#15b42a',
    borderRadius: 20,
    paddingVertical: 14, // Reduced
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#15b42a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  
  nextButtonText: {
    fontSize: 17, // Slightly smaller
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 6, // Reduced
  },
  
  nextButtonIcon: {
    fontSize: 18, // Slightly smaller
    color: '#ffffff',
    fontWeight: 'bold',
  },
  
  // Animation helpers
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  
  // Utility styles
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
});