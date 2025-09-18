// SafetyScreenCss.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent:'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    paddingVertical: 12,
  },
  // backArrow: {
  //   fontSize: 22,
  //   marginRight: 8,
  // },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    marginBottom: 4,
  },
  knowMore: {
    fontSize: 14,
    color: '#0089d8',
    fontWeight: '600',
    marginBottom: 16,
  },
  scrollRow: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  card: {
    width: 350,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 550,
    resizeMode: 'cover', // keeps full fill look like Rapido
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  settingsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingsSubText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  arrow: {
    fontSize: 22,
    color: '#999',
  },
});
