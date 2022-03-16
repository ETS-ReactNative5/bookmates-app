import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Vectorbook-logo.png';

const Login = () => {

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6886C5" barStyle="light-content" />
      <View style={styles.header}>
        <Image source={Logo} style={{ marginBottom: 20 }} />
        <Text style={styles.text_header}>bookmates</Text>
      </View>

      <View style={[styles.form,{backgroundColor: '#ffffff'}]}>
        {/*Email Input Field*/}
        <Text style={[styles.text_footer,{color: '#BDBDBD',}]}>
          Email
        </Text>
        <View style={styles.action}>
          <Feather name="mail" color="#BDBDBD" size={20}/>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#666666"
            style={[styles.textInput,{color: '#BDBDBD'}]}
            autoCapitalize="none"
          />
        </View>
        {/*Password Input Field*/}
        <Text style={[styles.text_footer,{color: '#BDBDBD',marginTop: 35}]}>
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#BDBDBD" size={20} />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput,{color: '#BDBDBD'}]}
            autoCapitalize="none"
          />
        </View>
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
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})