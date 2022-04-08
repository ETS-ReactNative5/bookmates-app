import { StyleSheet, Text, SafeAreaView, Image, View, TouchableWithoutFeedback } from 'react-native';
import Logo from '../assets/Vectorbook-logo.png';
export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate('Login')
  }, 3000); 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={Logo} style={{ marginBottom: 20 }} />
        <Text style={styles.titleText}>bookmates</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A7FCC',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Baloo2_800ExtraBold',
  },
});
