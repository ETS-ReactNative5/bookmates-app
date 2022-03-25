import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Vectorbook-logo.png';

const Signup = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  // Handle showing/hiding password inputs
  const [data, setData] = React.useState({
    check_textInputChange: false,
    secureTextEntry1: true,
    secureTextEntry2: true,
  });

  const updateSecureTextEntry1 = () => {
    setData({
      ...data,
      secureTextEntry1: !data.secureTextEntry1,
    });
  };

  const updateSecureTextEntry2 = () => {
    setData({
      ...data,
      secureTextEntry2: !data.secureTextEntry2,
    });
  };

  const onSubmitHandler = () => {
    const payload = {
        first_name,
        last_name,
        email,
        password,
    };
    fetch('http://10.0.2.2:3000/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(async res => { 
        try {
            const jsonRes = await res.json();
            if (res.status !== 200) {
                setMessage(jsonRes.message);
            } else {
                setMessage(jsonRes.message);
                navigation.navigate('Login')
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5A7FCC" barStyle="light-content" />

      {/*Header part*/}
      <View style={styles.header}>
        <Image source={Logo} style={{ marginBottom: 20 }} />
        <Text style={styles.text_header}>bookmates</Text>
      </View>

      <View style={[styles.form, { backgroundColor: '#ffffff' }]}>
        {/*First Name Input Field*/}
        <View style={styles.action}>
          <Feather name="user" size={24} color="#BDBDBD" style={{ marginTop: 15 }} />
          <TextInput
            placeholder="Enter your first name"
            placeholderTextColor="#BDBDBD"
            style={[styles.textInput, { color: '#BDBDBD' }]}
            autoCapitalize="none"
            onChangeText={setFirstName}
          />
        </View>

        {/*Last Name Input Field*/}
        <View style={styles.action}>
          <Feather name="user" size={24} color="#BDBDBD" style={{ marginTop: 15 }} />
          <TextInput
            placeholder="Enter your last name"
            placeholderTextColor="#BDBDBD"
            style={[styles.textInput, { color: '#BDBDBD' }]}
            autoCapitalize="none"
            onChangeText={setLastName}
          />
        </View>

        {/*Email Input Field*/}
        <View style={styles.action}>
          <Feather name="mail" color="#BDBDBD" size={20} style={{ marginTop: 15 }} />
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#BDBDBD"
            style={[styles.textInput, { color: '#BDBDBD' }]}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
        </View>

        {/*Password Input Field*/}
        <View style={styles.action}>
          <Feather name="lock" color="#BDBDBD" size={20} style={{ marginTop: 15 }} />
          <TextInput
            placeholder="Choose a password"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={data.secureTextEntry1 ? true : false}
            style={[styles.textInput, { color: '#BDBDBD' }]}
            autoCapitalize="none"
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={updateSecureTextEntry1}>
            {data.secureTextEntry1 ? (
              <Feather name="eye-off" color="grey" size={20} style={{ marginTop: 15 }} />
            ) : (
              <Feather name="eye" color="grey" size={20} style={{ marginTop: 15 }} />
            )}
          </TouchableOpacity>
        </View>

        {/*Confirm Password Input Field*/}
        <View style={styles.action}>
          <Feather name="lock" color="#BDBDBD" size={20} style={{ marginTop: 15 }} />
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={data.secureTextEntry2 ? true : false}
            style={[styles.textInput, { color: '#BDBDBD' }]}
            autoCapitalize="none"
            onChangeText={setPasswordConfirmation}            
          />
          <TouchableOpacity onPress={updateSecureTextEntry2}>
            {data.secureTextEntry2 ? (
              <Feather name="eye-off" color="grey" size={20} style={{ marginTop: 15 }} />
            ) : (
              <Feather name="eye" color="grey" size={20} style={{ marginTop: 15 }} />
            )}
          </TouchableOpacity>
        </View>

        {/*Sign up button*/}
        <View style={styles.button}>
          <TouchableOpacity onPress={onSubmitHandler} style={[styles.signIn, { backgroundColor: '#5A7FCC', marginTop: 15, borderRadius: 30 }]}>
            <Text style={[styles.textSign, { color: '#ffffff' }]}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        {/*Sign in prompt*/}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 30 }}>
          <Text style={{ color: '#606060', textAlign: 'center' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.prompt}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A7FCC',
  },
  header: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 2.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Baloo2_800ExtraBold',
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
    alignSelf: 'center',
    width: '90%',
  },
  textInput: {
    flex: 1,
    marginTop: 15,
    paddingLeft: 10,
    color: '#BDBDBD',
  },
  button: {
    alignItems: 'center',
    marginTop: 15,
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
    fontFamily: 'Baloo2_600SemiBold',
  },
  prompt: {
    fontFamily: 'Baloo2_600SemiBold',
    color: '#5A7FCC',
    fontSize: 16,
  },
});
