import React, { useState } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator,StyleSheet,Image,TextInput,SafeAreaView,Modal,ScrollView,} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import * as SecureStore from 'expo-secure-store';

const EditProfile = ({ route, navigation }) => {
  const { first_name, last_name, profileImage, email, bio } = route.params;
  const [fname, setFName] = useState(first_name);
  const [lname, setLName] = useState(last_name);
  const [profileImageURL, setProfileImageURL] = useState(profileImage);
  const [bioText, setBioText] = useState(bio);
  const [emailAddress, setEmailAddress] = useState(email);
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [error_message, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState({
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
  
  // Pick image from phone gallery
  const pickImage = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (data.cancelled) {
      return;
    }

    let selectedImage = {
      uri: data.uri,
      type: `test/${data.uri.split('.')[1]}`,
      name: `test.${data.uri.split('.')[1]}`,
    };
    setRefreshing(true)
    handleUpload(selectedImage);
  };

  // Upload to Cloudinary
  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'bookmates-SEF');
    data.append('cloud_name', 'dhgvftljk');
    fetch('https://api.cloudinary.com/v1_1/dhgvftljk/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setRefreshing(false)
        setProfileImageURL(data.url);
      });
  };

  const editData = async () => {
    try {
      const token = await SecureStore.getItemAsync('token')
      const { data } = await axios({
        method: 'put',
        headers: {
          Authorization:'Bearer '+token,
        },
        url: 'http://18.191.232.230:3000/api/user/editprofile',
        data: {
          first_name: fname,
          last_name: lname,
          email: emailAddress,
          profile_bio: bioText,
          profile_image_URL: profileImageURL,
          password: password
        },
      });

      navigation.goBack();
    } catch (err) {
      if (err.response.status === 404) {
        console.log('Resource could not be found!');
      } else {
        console.log(err.message);
      }
    }
  }
  
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            paddingTop: 20,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionic name="close-outline" style={{ fontSize: 35 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Profile Settings</Text>
            <TouchableOpacity onPress={editData}>
              <Ionic name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Image source={{ uri: `${profileImageURL}` }} style={{ width: 80, height: 80, borderRadius: 100 }} />
            <TouchableOpacity onPress={pickImage}>
              <Text
                style={{
                  color: '#3493D9',
                  paddingTop: 10,
                  fontSize: 16,
                }}
              >
                Change Profile Picture
              </Text>
              {refreshing ? <ActivityIndicator /> : null}
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ paddingTop: 10 }}>
              <Text
                style={{
                  opacity: 0.5,
                }}
              >
                First Name
              </Text>
              <TextInput
                placeholder="First name"
                defaultValue={fname}
                style={{
                  marginTop:7,
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }}
                onChangeText={(e) => setFName(e)}
              />
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text
                style={{
                  opacity: 0.5,
                }}
              >
                Last Name
              </Text>
              <TextInput
                placeholder="Last name"
                defaultValue={lname}
                style={{
                  marginTop:7,
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }}
                onChangeText={(e) => setLName(e)}
              />
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text
                style={{
                  opacity: 0.5,
                }}
              >
                Email
              </Text>
              <TextInput
                placeholder="Email"
                defaultValue={emailAddress}
                style={{
                  marginTop:7,
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }}
                onChangeText={(e) => setEmailAddress(e)}
              />
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text
                style={{
                  opacity: 0.5,
                }}
              >
                Bio
              </Text>
              <TextInput
                placeholder="Bio"
                defaultValue={bioText}
                multiline={true}
                style={{
                  marginTop:7,
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }}
                onChangeText={(e) => setBioText(e)}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={{
                color: '#3493D9',
                paddingTop: 30,
                paddingHorizontal: 20,
                fontSize: 16,
              }}
            >
              Change Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async ()=> {
            // await SecureStore.deleteItemAsync("token");
            navigation.navigate('Login');
          }}>
            <Text
              style={{
                color: '#3493D9',
                padding: 20,
                paddingBottom:80,
                fontSize: 16,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainerStyle}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Formik
                initialValues={{
                  password: '',
                  password_confirmation: '',
                }}
                onSubmit={(values)=> {
                  setPassword(values.password);
                  setModalVisible(false);
                }}
                validationSchema={yup.object().shape({
                  password: yup
                    .string()
                    .min(8, 'Password must be at least 8 characters.')
                    .required('Password is required.'),
                  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match.'),
                })}
              >
                {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                  <View
                    style={{
                      borderRadius: 20,
                      padding: 20,
                      width: 300,
                      justifyContent: 'center',
                      backgroundColor: '#FFFFFFFF',
                    }}
                  >
                    <View style={{ justifyContent: 'center' }}>
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
                        <Text style={{ fontSize: 11, color: 'red', paddingLeft: 20 }}>
                          {errors.password_confirmation}
                        </Text>
                      )}
                    </View>
                    <View style={{ marginLeft: 10 , flexDirection:'row', justifyContent:'space-around'}}>
                    <TouchableOpacity
                        style={styles.cancelbutton}
                        onPress={() => {
                          setPassword();
                          setModalVisible(false)}}>
                        <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.confirmbutton}
                        onPress={() => {handleSubmit()}}
                      >
                        <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
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
  modalContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  confirmbutton:{
    width: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A7FCC',
    borderRadius: 20,
    marginTop: 20,
  },
  cancelbutton:{
    width: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 20,
    marginTop: 20,
  }
});
