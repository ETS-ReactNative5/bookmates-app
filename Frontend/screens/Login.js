import { View, Text, TextInput, StyleSheet, StatusBar, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Vectorbook-logo.png';

const Login = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6886C5" barStyle="light-content" />
      <View style={styles.header}>
        <Image source={Logo} style={{ marginBottom: 20 }} />
        <Text style={styles.text_header}>bookmates</Text>
      </View>

      <View style={[styles.form,{backgroundColor: '#ffffff'}]}>

      </View>

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6886C5',
  },
  header: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1.8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 28,
  },
})