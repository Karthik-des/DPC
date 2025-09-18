import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 4,
    color: 'black',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  textField: {
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
    borderRadius:32,
  },
  messageInput: {
    minHeight: 60,
    textAlignVertical: 'top',
    borderRadius:32,
  },
  quickButtonText: {
   
    color: '#0e0e0f',
    fontWeight: '600',
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 32,
    color: '#fff',
    backgroundColor: '#0089d8',
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
   
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 10,
    fontWeight: '600',
    color: '#000',
  },
  quickButton: {
    marginBottom: 10,
    borderColor: '#0e0e0fff',
    borderWidth: 1,
  },
  map: {
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    width: width - 32,
    alignSelf: 'center',
  },
  address: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  addressButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  divider: {
    marginVertical: 20,
    height: 1,
    backgroundColor: '#0e0e0fff',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor:'',
  },
  backButtonText: {
    color: '#0e0f0fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
