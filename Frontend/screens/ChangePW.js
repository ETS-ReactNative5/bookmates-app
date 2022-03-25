import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Vectorbook-logo.png';

const ChangePW = () => {
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5A7FCC" barStyle="light-content" />

      {/*Header part*/}
      <View style={styles.header}>
        <Image source={Logo} style={{ marginBottom: 20 }} />
        <Text style={styles.text_header}>bookmates</Text>
      </View>

      <View style={[styles.form, { backgroundColor: '#ffffff' }]}>
        {/*Password Input Header*/}
        <Text style={[{ color: '#5A7FCC', fontSize: 20, fontFamily: 'Baloo2_600SemiBold', textAlign: 'center' }]}>
          TYPE NEW PASSWORD
        </Text>

        {/*Password Input Field*/}
        <View style={styles.action}>
          <Feather name="lock" color="#BDBDBD" size={20} style={{ marginTop: 30 }} />
          <TextInput
            placeholder="Choose new password"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={data.secureTextEntry1 ? true : false}
            style={[styles.textInput, { color: '#BDBDBD' }]}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={updateSecureTextEntry1}>
            {data.secureTextEntry1 ? (
              <Feather name="eye-off" color="grey" size={20} style={{ marginTop: 30 }} />
            ) : (
              <Feather name="eye" color="grey" size={20} style={{ marginTop: 30 }} />
            )}
          </TouchableOpacity>
        </View>

        {/*Confirm Password Input Field*/}
        <View style={styles.action}>
          <Feather name="lock" color="#BDBDBD" size={20} style={{ marginTop: 30 }} />
          <TextInput
            placeholder="Confirm new password"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={data.secureTextEntry2 ? true : false}
            style={[styles.textInput, { color: '#BDBDBD' }]}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={updateSecureTextEntry2}>
            {data.secureTextEntry2 ? (
              <Feather name="eye-off" color="grey" size={20} style={{ marginTop: 30 }} />
            ) : (
              <Feather name="eye" color="grey" size={20} style={{ marginTop: 30 }} />
            )}
          </TouchableOpacity>
        </View>

        {/*Send button*/}
        <View style={styles.button}>
          <TouchableOpacity style={[styles.signIn, { backgroundColor: '#5A7FCC', marginTop: 5, borderRadius: 30 }]}>
            <Text style={[styles.textSign, { color: '#ffffff' }]}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePW;

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
    flex: 1.2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    fontFamily: 'Baloo2_800ExtraBold',
    color: 'white',
    fontSize: 28,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    width: '80%',
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    marginTop: 30,
    paddingLeft: 10,
    color: '#BDBDBD',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontFamily: 'Baloo2_600SemiBold',
  },
});
