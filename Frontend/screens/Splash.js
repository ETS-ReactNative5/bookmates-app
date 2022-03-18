import { StyleSheet, Text, SafeAreaView, Image, View, TouchableWithoutFeedback } from 'react-native';
import Logo from '../assets/Vectorbook-logo.png';
export default function SplashScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <View style={styles.container}>
          <Image source={Logo} style={{ marginBottom: 20 }} />
          <Text style={styles.titleText}>bookmates</Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6886C5',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    fontFamily:'Baloo2_800ExtraBold',
  },
});
