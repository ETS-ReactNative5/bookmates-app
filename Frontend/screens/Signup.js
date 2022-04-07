import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Vectorbook-logo.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Signup = ({ navigation }) => {
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

  //  Handle showing backend errors
  const [error_message, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // API linking
  const onSubmitHandler = async (values, { resetForm }) => {
    const user = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
    };

    try {
      await axios
        .post('http://18.191.232.230:3000/api/auth/register', user)
        .then(({ data }) => {
          resetForm();
          navigation.navigate('Login');
        })
        .catch((err) => {
          setErrorMessage(err.response.data);
          setIsError(true);
          resetForm();
        });
    } catch (error) {
      console.log('error');
    }
  };

  return (
    // Formik to handle form actions
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }}
      onSubmit={onSubmitHandler}
      // Yup to handle schema creation
      validationSchema={yup.object().shape({
        first_name: yup
          .string()
          .required('First name is required.')
          .min(3, 'First name must be at least 3 characters.'),
        last_name: yup.string().required('Last name is required.').min(3, 'Last name must be at least 3 characters.'),
        email: yup.string().email('Email must be valid').required('Email is required.'),
        password: yup.string().min(8, 'Password must be at least 8 characters.').required('Password is required.'),
        password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match.')
      })}
    >
      {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
        <View style={styles.container}>
          <StatusBar backgroundColor="#5A7FCC" barStyle="light-content" />

          {/* Header part */}
          <View style={styles.header}>
            <Image source={Logo} style={{ marginBottom: 20 }} />
            <Text style={styles.text_header}>bookmates</Text>
          </View>

          {/* Display error message from backend at the top */}
          <View style={[styles.form, { backgroundColor: '#ffffff' }]}>
            {!! isError && <Text style={{ fontSize: 14, color: 'red', textAlign: 'center' }}>{error_message}</Text>}

            {/* First Name Input Field */}
            <View style={styles.action}>
              <Feather name="user" size={24} color="#BDBDBD" style={{ marginTop: 15 }} />
              <TextInput
                placeholder="Enter your first name"
                placeholderTextColor="#BDBDBD"
                style={[styles.textInput, { color: '#242424' }]}
                autoCapitalize="none"
                onBlur={() => setFieldTouched('first_name')}
                onChangeText={handleChange('first_name')}
              />
            </View>

            {/* Display error based on schema after every input */}
            {touched.first_name && errors.first_name && (
              <Text style={{ fontSize: 11, color: 'red', paddingLeft: 20 }}>{errors.first_name}</Text>
            )}

            {/* Last Name Input Field */}
            <View style={styles.action}>
              <Feather name="user" size={24} color="#BDBDBD" style={{ marginTop: 15 }} />
              <TextInput
                placeholder="Enter your last name"
                placeholderTextColor="#BDBDBD"
                style={[styles.textInput, { color: '#242424' }]}
                autoCapitalize="none"
                onBlur={() => setFieldTouched('last_name')}
                onChangeText={handleChange('last_name')}
              />
            </View>

            {touched.last_name && errors.last_name && (
              <Text style={{ fontSize: 11, color: 'red', paddingLeft: 20 }}>{errors.last_name}</Text>
            )}

            {/* Email Input Field */}
            <View style={styles.action}>
              <Feather name="mail" color="#BDBDBD" size={20} style={{ marginTop: 15 }} />
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor="#BDBDBD"
                style={[styles.textInput, { color: '#242424' }]}
                autoCapitalize="none"
                onBlur={() => setFieldTouched('email')}
                onChangeText={handleChange('email')}
              />
            </View>

            {touched.email && errors.email && (
              <Text style={{ fontSize: 11, color: 'red', paddingLeft: 20 }}>{errors.email}</Text>
            )}

            {/* Password Input Field */}
            <View style={styles.action}>
              <Feather name="lock" color="#BDBDBD" size={20} style={{ marginTop: 15 }} />
              <TextInput
                placeholder="Choose a password"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={data.secureTextEntry1 ? true : false}
                style={[styles.textInput, { color: '#242424' }]}
                autoCapitalize="none"
                onBlur={() => setFieldTouched('password')}
                onChangeText={handleChange('password')}
              />
              <TouchableOpacity onPress={updateSecureTextEntry1}>
                {data.secureTextEntry1 ? (
                  <Feather name="eye-off" color="grey" size={20} style={{ marginTop: 15 }} />
                ) : (
                  <Feather name="eye" color="grey" size={20} style={{ marginTop: 15 }} />
                )}
              </TouchableOpacity>
            </View>

            {touched.password && errors.password && (
              <Text style={{ fontSize: 11, color: 'red', paddingLeft: 20 }}>{errors.password}</Text>
            )}

            {/* Confirm Password Input Field */}
            <View style={styles.action}>
              <Feather name="lock" color="#BDBDBD" size={20} style={{ marginTop: 15 }} />
              <TextInput
                placeholder="Confirm password"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={data.secureTextEntry2 ? true : false}
                style={[styles.textInput, { color: '#242424' }]}
                autoCapitalize="none"
                onBlur={() => setFieldTouched('password_confirmation')}
                onChangeText={handleChange('password_confirmation')}
              />
              <TouchableOpacity onPress={updateSecureTextEntry2}>
                {data.secureTextEntry2 ? (
                  <Feather name="eye-off" color="grey" size={20} style={{ marginTop: 15 }} />
                ) : (
                  <Feather name="eye" color="grey" size={20} style={{ marginTop: 15 }} />
                )}
              </TouchableOpacity>
            </View>

            {touched.password_confirmation && errors.password_confirmation && (
              <Text style={{ fontSize: 11, color: 'red', paddingLeft: 20 }}>{errors.password_confirmation}</Text>
            )}

            {/* Sign up button */}
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={[styles.signIn, { backgroundColor: '#5A7FCC', marginTop: 15, borderRadius: 30 }]}
              >
                <Text style={[styles.textSign, { color: '#ffffff' }]}>SIGN UP</Text>
              </TouchableOpacity>
            </View>

            {/* Sign in prompt */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 30 }}>
              <Text style={{ color: '#606060', textAlign: 'center' }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.prompt}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
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
    flex: 2.6,
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