import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F7', padding: 15 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  backButton: { position: 'absolute', top: 40, left: 15, zIndex: 2 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    marginTop: 60,
    alignItems: 'center',
  },
  mapIconButton: { position: 'absolute', top: 15, right: 15 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold' },
  rating: { color: '#888', marginBottom: 4 },
  detail: { fontSize: 14, color: '#555', textAlign: 'center', marginTop: 2 },
  verified: { color: 'green', marginTop: 5, fontWeight: 'bold' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 15,
  },
  callBtn: { flex: 1, marginRight: 5, backgroundColor: '#0089d8', padding: 10, borderRadius: 32 },
  messageBtn: { flex: 1, marginHorizontal: 5, backgroundColor: '#0089d8', padding: 10, borderRadius: 32 },
  chatBtn: { flex: 1, marginLeft: 5, backgroundColor: '#0089d8', padding: 10, borderRadius: 32 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  bookBtn: { marginTop: 10, backgroundColor: '#0089d8', padding: 12, borderRadius: 32, width: '100%' },
  bookText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },

  chatDrawer: {
    position: 'absolute',
    bottom: 0,
    height: height / 2,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 5,
    padding: 10,
  },
  fullScreenDrawer: { height: height, paddingTop: 50 },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatTitle: { fontSize: 18, fontWeight: 'bold' },
  messageList: { flex: 1 },
  messageBubble: { marginBottom: 6, padding: 10, borderRadius: 8, maxWidth: '75%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#dff9fb' },
  driverBubble: { alignSelf: 'flex-start', backgroundColor: '#c7ecee' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  input: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  mapContainer: { flex: 1 },
  mapTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', padding: 10 },
  map: { flex: 1 },
  closeBtn: { backgroundColor: '#333', padding: 12, alignItems: 'center' },
  closeText: { color: '#fff', fontWeight: 'bold' },
});

export default styles;