import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Vectorbook-logo.png';

const ForgotPW = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#6886C5" barStyle="light-content" />

        {/*Header part*/}
        <View style={styles.header}>
            <Image source={Logo} style={{ marginBottom: 20 }} />
            <Text style={styles.text_header}>bookmates</Text>
        </View>

        <View style={[styles.form,{backgroundColor: '#ffffff'}]}>

            {/*Email Input Header*/}
            <Text style={[{color: '#6886C5', fontSize:20, fontFamily:'Baloo2_600SemiBold', textAlign:'center'}]}>
                TYPE YOUR EMAIL
            </Text>

            {/*Instructions*/}
            <View style={styles.instructions}> 
                <Text style={{textAlign:'center', fontSize:15, lineHeight:25}}>
                    We will send you instructions on how to reset your password
                </Text>
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

            {/*Send button*/}
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate('ChangePW')} style={[styles.signIn,{backgroundColor: '#6886C5',marginTop: 5,borderRadius: 30}]}>
                <Text style={[styles.textSign,{color: '#ffffff'}]}>
                    SEND
                </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default ForgotPW

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
      flex: 1.2,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_header: {
      fontFamily:'Baloo2_800ExtraBold',
      color: 'white',
      fontSize: 28,
    },
    action: {
      flexDirection: 'row',
      marginTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      width: '80%',
      alignSelf:'center',
      marginBottom:20
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 15 : 25,
      paddingLeft: 10,
      color: '#BDBDBD',
    },
    button: {
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? 20 : 30,
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
      fontFamily:'Baloo2_600SemiBold'
    },
    instructions: {
      backgroundColor: '#F1F1FE',
      width: '80%',
      alignSelf:'center',
      borderRadius: 12,
      marginTop: 15,
      padding: 15,
      marginTop: Platform.OS === 'ios' ? 15 : 25,
    }
  });
  

