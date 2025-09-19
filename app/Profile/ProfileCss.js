import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Header Styles
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
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  
  activeTab: {
    backgroundColor: '#09C912',
  },
  
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  
  activeTabText: {
    color: '#ffffff',
  },
  
  // Content Styles
  scrollContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  contentContainer: {
    padding: 20,
  },
  
  // Profile Header Section
  profileHeader: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  
  profileImageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  profileDetails: {
    flex: 1,
  },
  
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  
  profileStatus: {
    fontSize: 16,
    color: '#09C912',
    fontWeight: '500',
  },
  
  chevronIcon: {
    marginLeft: 'auto',
  },
  
  // Profile Completion Section
  completionSection: {
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  
  completionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 8,
  },
  
  completionDescription: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
    marginBottom: 16,
  },
  
  completionProgress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1565c0',
    marginBottom: 16,
  },
  
  progressBar: {
    height: 8,
    backgroundColor: '#bbdefb',
    borderRadius: 4,
    marginBottom: 20,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: '#1976d2',
    borderRadius: 4,
    width: '0%',
  },
  
  addProfilePicture: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Menu Items
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#09C912',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  
  menuItemContent: {
    flex: 1,
  },
  
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  
  // Section Headers
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    marginTop: 8,
  },
  
  // Verification Items
  verificationItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  verificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#09C912',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  
  verificationContent: {
    flex: 1,
  },
  
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  
  verificationSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  
  // Reliability Section
  reliabilitySection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  reliabilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  
  reliabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  
  reliabilityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  
  reliabilityText: {
    fontSize: 16,
    color: '#666666',
    flex: 1,
  },
  
  // Account Settings
  accountSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  
  accountMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  accountMenuItemLast: {
    borderBottomWidth: 0,
  },
  
  accountMenuText: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
    fontWeight: '500',
  },
  
  // Utility Styles
  iconText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  chevron: {
    fontSize: 18,
    color: '#bbb',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },

  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '100%',
    maxWidth: 520,
    maxHeight: height * 0.95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    alignSelf: 'center',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },

  closeButton: {
    padding: 5,
  },

  modalContent: {
    padding: 20,
    maxHeight: height * 0.82,
    flex: 1,
  },

  modalScrollContent: {
    paddingBottom: 20,
  },

  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  // Form Styles
  formGroup: {
    marginBottom: 20,
  },

  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },

  formInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    color: '#2c3e50',
  },

  helpText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginTop: 10,
    fontStyle: 'italic',
  },

  // Button Styles
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },

  saveButton: {
    flex: 1,
    backgroundColor: '#09C912',
    borderRadius: 12,
    padding: 16,
    marginLeft: 10,
    alignItems: 'center',
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Additional Form Styles
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  switchLabel: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },

  switch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    padding: 2,
    justifyContent: 'center',
  },

  switchActive: {
    backgroundColor: '#09C912',
  },

  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  switchThumbActive: {
    alignSelf: 'flex-end',
  },

  radioGroup: {
    marginTop: 8,
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    borderColor: '#09C912',
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#09C912',
  },

  radioLabel: {
    fontSize: 16,
    color: '#2c3e50',
  },

  // Change Password Form Styles
  changePasswordContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  
  changePasswordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },

  // Communication Preferences Form Styles
  communicationPreferencesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  
  communicationPreferencesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },

  // Ratings Form Styles
  ratingsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  
  ratingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },

  // Saved Passengers Form Styles
  savedPassengersContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  
  savedPassengersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
});

export default styles;