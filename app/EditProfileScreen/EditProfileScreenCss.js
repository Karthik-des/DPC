import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a2a44',
    flex: 1,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Glassmorphism effect
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarimg: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 12,
    padding: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 10,
    right: 170,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    padding: 10,
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    justifyContent: 'center',
    backgroundColor:'#0089d8', // Adjusted to a single color
    borderRadius: 7,
    alignItems: 'center',
  },
  saveButton: {
    marginTop: 20,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: '#0089d8', // Adjusted to a single color
    borderRadius: 24,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  backButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  load: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: '#0089d8',
    borderWidth: 9,
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '45%',
    left: '41%',
    borderStyle: 'dotted',
  },
  loadcome: {
    backgroundColor: 'grey',
  },
});