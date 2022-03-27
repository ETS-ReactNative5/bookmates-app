import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Vectorbook-logo.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

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

    // Handle showing backend errors
    const [error_message, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);  

    // API linking
    const onSubmitHandler = async (values, { resetForm }) => {
      const user = {
        email: values.email,
        password: values.password,
      };
  
      try {
        axios
          .post('http://10.0.2.2:3000/api/auth/login', user)
          .then(({ data }) => {
            console.log(data)
            navigation.navigate('BookmatesMap');
          })
          .catch((err) => {
            setErrorMessage(err.response.data);
            setIsError(true);
          });
      } catch (error) {
        console.warn('error');
      }
    };
  
  

  return (
      <Formik       
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={onSubmitHandler}

      //Yup to handle schema creation
      validationSchema={yup.object().shape({
        email: yup.string().email('Email must be valid').required('Email is required.'),
        password: yup.string().min(8, 'Password must be at least 8 characters.').required('Password is required.'),
      })}
    >
    {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5A7FCC" barStyle="light-content" />

        {/*Header part*/}
        <View style={styles.header}>
          <Image source={Logo} style={{ marginBottom: 20 }} />
          <Text style={styles.text_header}>bookmates</Text>
        </View>


        <View style={[styles.form, { backgroundColor: '#ffffff' }]}>
        {isError && <Text style={{ fontSize: 14, color: 'red', textAlign: 'center' }}>{error_message}</Text>}
          
          {/*Email Input Field*/}
          <View style={styles.action}>
            <Feather name="mail" color="#BDBDBD" size={20} style={{ marginTop: Platform.OS === 'ios' ? 15 : 25 }} />
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor="#BDBDBD"
              style={[styles.textInput, { color: '#242424' }]}
              autoCapitalize="none"
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
            />
          </View>

          {(touched.email && errors.email) && 
            <Text style={{ fontSize: 11, color: 'red', paddingLeft: 20 }}>{errors.email}</Text>
          }

          {/*Password Input Field*/}
          <View style={styles.action}>
            <Feather name="lock" color="#BDBDBD" size={20} style={{ marginTop: Platform.OS === 'ios' ? 15 : 25 }} />
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[styles.textInput, { color: '#242424' }]}
              autoCapitalize="none"
              onBlur={() => setFieldTouched('password')}
              onChangeText={handleChange('password')}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} style={{ marginTop: Platform.OS === 'ios' ? 15 : 25 }} />
              ) : (
                <Feather name="eye" color="grey" size={20} style={{ marginTop: Platform.OS === 'ios' ? 15 : 25 }} />
              )}
            </TouchableOpacity>
          </View>

          {(touched.password && errors.password) && 
            <Text style={{ fontSize: 11, color: 'red', paddingLeft: 20 }}>{errors.password}</Text>
          }


          {/*Sign in button*/}
          {/* onPress={() => navigation.navigate('BookmatesMap')} */}
          <View style={styles.button}>
            <TouchableOpacity onPress={() => handleSubmit()} style={[styles.signIn, { backgroundColor: '#5A7FCC', marginTop: 5, borderRadius: 30 }]}>
              <Text style={[styles.textSign, { color: '#ffffff' }]}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>

          {/*Forgot password?*/}
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPW')}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>

          {/*Sign up prompt*/}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 30 }}>
            <Text style={{ color: '#606060', textAlign: 'center' }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.prompt}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      )}
    </Formik>
  );
};
export default Login;

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
    fontFamily: 'Baloo2_600SemiBold',
  },
  prompt: {
    fontFamily: 'Baloo2_600SemiBold',
    color: '#5A7FCC',
    fontSize: 16,
  },
  forgot: {
    color: '#5A7FCC',
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'Baloo2_600SemiBold',
    fontSize: 16,
  },
});
