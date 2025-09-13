import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 8,
  },
  headerGradient: {
    borderRadius: 24,
    padding: 10,
    
    shadowColor: '#d87921ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 10,
    // borderWidth:1.5,
    borderColor:'#d88900ff',
  },
  logoImg: {
    width: width * 0.9,
    height: 170,
    borderRadius: 20,
    shadowColor: '#0089d8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});

export default styles;
