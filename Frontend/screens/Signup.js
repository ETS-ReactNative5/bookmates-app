import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Vectorbook-logo.png';

const Signup = ({ navigation }) => {

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

      <View style={[styles.form,{backgroundColor: '#ffffff'}]}>

        {/*First Name Input Field*/}
        <View style={styles.action}>
        <Feather name="user" size={24} color="#BDBDBD" style={{marginTop: Platform.OS === 'ios' ? 15 : 25}}/>
          <TextInput
            placeholder="Enter your first name"
            placeholderTextColor="#BDBDBD"
            style={[styles.textInput,{color: '#BDBDBD'}]}
            autoCapitalize="none"
          />
        </View>

        {/*Last Name Input Field*/}
        <View style={styles.action}>
        <Feather name="user" size={24} color="#BDBDBD" style={{marginTop: Platform.OS === 'ios' ? 15 : 25}}/>
          <TextInput
            placeholder="Enter your last name"
            placeholderTextColor="#BDBDBD"
            style={[styles.textInput,{color: '#BDBDBD'}]}
            autoCapitalize="none"
          />
        </View>

        {/*Email Input Field*/}
        <View style={styles.action}>
          <Feather name="mail" color="#BDBDBD" size={20} style={{marginTop: Platform.OS === 'ios' ? 15 : 25}}/>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#BDBDBD"
            style={[styles.textInput,{color: '#BDBDBD'}]}
            autoCapitalize="none"
          />
        </View>

        {/*Password Input Field*/}
        <View style={styles.action}>
          <Feather name="lock" color="#BDBDBD" size={20} style={{marginTop: Platform.OS === 'ios' ? 15 : 25}} />
          <TextInput
            placeholder="Choose a password"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput,{color: '#BDBDBD'}]}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? 
            (<Feather name="eye-off" color="grey" size={20} style={{marginTop: Platform.OS === 'ios' ? 15 : 25}} />) 
            : 
            (<Feather name="eye" color="grey" size={20} style={{marginTop: Platform.OS === 'ios' ? 15 : 25}}/>)}
          </TouchableOpacity>
        </View>

        {/*Sign in button*/}
        <View style={styles.button}>
          <TouchableOpacity style={[styles.signIn,{backgroundColor: '#6886C5',marginTop: 5,borderRadius: 30}]}>
            <Text style={[styles.textSign,{color: '#ffffff'}]}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>

        {/*Sign up prompt*/}
        <Text style={{ color: '#606060', marginTop: 25, textAlign: 'center' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#6886C5', fontFamily:'Baloo2_800ExtraBold',textAlign:'center'}}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Signup

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
    width: '90%',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 15 : 25,
    paddingLeft: 10,
    color: '#BDBDBD',
  },
  button: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 15 : 25,
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
    fontFamily:'Baloo2_800ExtraBold',
  },
})