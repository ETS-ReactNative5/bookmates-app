import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Vectorbook-logo.png';

const Login = ({ navigation }) => {

  const [data, setData] = React.useState({
    check_textInputChange: false,
    secureTextEntry: true,
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

      {/*Header part*/}
      <View style={styles.header}>
        <Image source={Logo} style={{ marginBottom: 20 }} />
        <Text style={styles.text_header}>bookmates</Text>
      </View>

      <View style={[styles.form, { backgroundColor: '#ffffff' }]}>
        {/*Email Input Field*/}
        <View style={styles.action}>
          <Feather name="mail" color="#BDBDBD" size={20} style={{ marginTop: Platform.OS === 'ios' ? 15 : 25 }} />
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#BDBDBD"
            style={[styles.textInput, { color: '#BDBDBD' }]}
            autoCapitalize="none"
          />
        </View>

        {/*Password Input Field*/}
        <View style={styles.action}>
          <Feather name="lock" color="#BDBDBD" size={20} style={{ marginTop: Platform.OS === 'ios' ? 15 : 25 }} />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput, { color: '#BDBDBD' }]}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} style={{ marginTop: Platform.OS === 'ios' ? 15 : 25 }} />
            ) : (
              <Feather name="eye" color="grey" size={20} style={{ marginTop: Platform.OS === 'ios' ? 15 : 25 }} />
            )}
          </TouchableOpacity>
        </View>

        {/*Sign in button*/}
        <View style={styles.button}>
          <TouchableOpacity style={[styles.signIn, { backgroundColor: '#6886C5', marginTop: 5, borderRadius: 30 }]}>
            <Text onPress={() => navigation.navigate('Home')} style={[styles.textSign, { color: '#ffffff' }]}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        {/*Forgot password?*/}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPW')}>
          <Text style={styles.forgot}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/*Sign up prompt*/}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:30}}>
          <Text style={{ color: '#606060', textAlign: 'center' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.prompt}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Login;

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
    color: 'white',
    fontSize: 28,
    fontFamily:'Baloo2_800ExtraBold',
  },
  form_text: {
    color: '#BDBDBD',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    width: '90%',
    alignSelf:'center',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 15 : 25,
    paddingLeft: 10,
    color: '#BDBDBD',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontFamily:'Baloo2_600SemiBold',
  },
  prompt: {
    fontFamily:'Baloo2_600SemiBold',
    color: '#6886C5', 
    fontSize:16
  },
  forgot: { 
    color: '#6886C5', 
    marginTop:30, 
    textAlign: 'center',
    fontFamily:'Baloo2_600SemiBold',
    fontSize: 16
  }
});
