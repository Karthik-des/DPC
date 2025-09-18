import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  buttonLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Roboto',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: width * 0.35,
    height: 90,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#070808ff',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a2a44',
    marginBottom: 12,
    marginLeft: 16,
    letterSpacing: 1,
    fontFamily: 'Roboto',
  },
  searchWrapper: {
    flex: 0.9, // ~80% of searchContainer (~64% of screen width)
    height: 50, // Same height as menuIcon
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Same glassmorphism
    borderRadius: 10, // Same as menuIcon
    borderWidth: 1, // Same as menuIcon
    borderColor: 'rgba(0, 137, 216, 0.2)', // Same #0089d8 border
    shadowColor: '#000', // Same shadow
    shadowOffset: { width: 1, height: 2 }, // Same shadow
    shadowOpacity: 0.2, // Same shadow
    shadowRadius: 8, // Same shadow
    elevation: 6, // Same elevation
    paddingHorizontal: 18, // Increased for better content spacing
  },
  searchInput: {
    fontSize: 16,
    color: '#888',
    flex: 1,
    fontFamily: 'Roboto',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a2a44',
    marginLeft: 16,
    marginBottom: 12,
    fontFamily: 'Roboto',
  },
  section: {
    marginBottom: 20,
  },
  locationItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a2a44',
    fontFamily: 'Roboto',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily: 'Roboto',
  },
  exploreOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  exploreItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 80,
  },
  optionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a2a44',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  banner: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  bannerLeft: {
    flex: 1,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Roboto',
  },
  bannerRight: {
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  placeImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  placeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a2a44',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  mapIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#0089d8',
    borderRadius: 12,
    padding: 2,
  },
  footerContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    height: 120,
  },
  footerBackground: {
    width: '100%',
    height: '100%',
  },
  footerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerHashtag: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 5,
    fontFamily: 'Roboto',
  },
  footerInfo: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'Roboto',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    width:'100%', // 80% of screen width
    alignSelf: 'center', // Center the container
    marginVertical: 20,
   // Adjusted for spacing
  },
  menuIcon: {
    flex: 0.2, // ~20% of searchContainer (~16% of screen width)
    height: 50, // Keep the same height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Same glassmorphism
    borderRadius: 22, // Same as searchWrapper
    borderWidth: 1, // Same as searchWrapper
    borderColor: 'rgba(11, 104, 158, 0.2)', // Same #0089d8 border
    shadowColor: '#000', // Same shadow
    shadowOffset: { width: 0, height: 2 }, // Same shadow
    shadowOpacity: 0.2, // Same shadow
    shadowRadius: 8, // Same shadow
    elevation: 6, // Same elevation
    marginRight: 8, // Small gap for visual separation
  },
});

// Add images object export
export const images = {
  a: require('../../assets/a.jpg'),
  b: require('../../assets/b.jpg'),
  c: require('../../assets/c.jpg'),
  d: require('../../assets/d.jpg'),
  e: require('../../assets/e.jpg'),
  f: require('../../assets/f.jpg'),
  footer: require('../../assets/footer.jpg'),
};