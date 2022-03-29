import React, { useState, useEffect } from 'react';
import {View,Text,TouchableOpacity,ToastAndroid,Image,TextInput,SafeAreaView, ScrollView} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({route, navigation}) => {

  const {first_name, last_name, profileImage, email, bio} = route.params;

  const [fname, setFName] = useState(first_name);
  const [lname, setLName] = useState(last_name);
  const [profileImageURL, setProfileImageURL] = useState(profileImage);
  const [bioText, setBioText] = useState(bio);
  const [emailAddress, setEmailAddress] = useState(email);

  // Pick image from phone gallery
  const pickImage = async () => {
    
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    
    if(!permission.granted){
      return;
    }
    
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images
    });
    if (data.cancelled){
      return;
    }
    
    let selectedImage = {
      uri:data.uri,
      type:`test/${data.uri.split(".")[1]}`,
      name:`test.${data.uri.split(".")[1]}`};
      console.log(selectedImage);
      handleUpload(selectedImage);
    }
    
  // Upload to Cloudinary
  const handleUpload = (image)=>{
    const data = new FormData(); 
    data.append('file',image);  
    data.append('upload_preset','bookmates-SEF');
    data.append('cloud_name','dhgvftljk');
    fetch("https://api.cloudinary.com/v1_1/dhgvftljk/image/upload",{ 
      method:'post',
      body:data
    }).then(res=>res.json())
    .then(data=>{  
      setProfileImageURL(data.url)
    })
  }
  
  async function editData(){
    try {
        const { data } = await axios({
            method: 'put',
            headers:{
              "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQwMzYzOTFkOTA1ZTEwZTVmYzYwZDYiLCJpYXQiOjE2NDgzOTUwNjl9.L6bFuQ50tiGUFhfJrc-81CmVXVH1Xr-DmOXIj2-gvR0"
            },
            url: 'http://192.168.1.10:3000/api/user/editprofile',
            data: {
              first_name: fname,
              last_name: lname,
              email: emailAddress,
              profile_bio: bioText,
              profile_image_URL: profileImageURL
            }
        });

        navigation.goBack()    
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
      <ScrollView>

        <View style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          paddingTop:20,
          paddingHorizontal:10
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionic name="close-outline" style={{fontSize: 35}} />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Profile Settings</Text>
            <TouchableOpacity
              onPress={editData}>
              <Ionic name="checkmark" style={{fontSize: 35, color: '#3493D9'}} />
            </TouchableOpacity>
          </View>
          <View style={{padding: 20, alignItems: 'center'}}>
            <Image
              source={{uri: `${profileImageURL}`}}
              style={{width: 80, height: 80, borderRadius: 100}}
            />
            <TouchableOpacity onPress={pickImage}>
              <Text
                style={{
                  color: '#3493D9',
                  paddingTop:10,
                  fontSize:16
                }}>
                Change Profile Picture
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 20}}>
          <View style={{paddingTop: 10}}>
              <Text
                style={{
                  opacity: 0.5,
                }}>
                First name
              </Text>
              <TextInput
                placeholder="First name"
                defaultValue={fname}
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }}
                onChangeText={(e) => setFName(e)}
              />
            </View>
            <View style={{paddingTop: 20}}>
              <Text
                style={{
                  opacity: 0.5,
                }}>
                Last name
              </Text>
              <TextInput
                placeholder="Last name"
                defaultValue={lname}
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }}
                onChangeText={(e) => setLName(e)}
              />
            </View>
            <View style={{paddingTop: 20}}>
              <Text
                style={{
                  opacity: 0.5,
                }}>
                Email
              </Text>
              <TextInput
                placeholder="Email"
                defaultValue={emailAddress}
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }}
                onChangeText={(e) => setEmailAddress(e)}
              />
            </View>
            <View style={{paddingTop: 20}}>
            <Text
                style={{
                  opacity: 0.5,
                }}>
                Bio
              </Text>
              <TextInput
                placeholder="Bio"
                defaultValue={bioText}
                multiline={true}
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }}
                onChangeText={(e) => setBioText(e)}
              />
            </View>
          </View>
          <TouchableOpacity>
            <Text
                style={{
                  color: '#3493D9',
                  paddingTop:30,
                  paddingHorizontal:20,
                  fontSize:16
                }}>
                Change Password
              </Text>
          </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#3493D9',
                  padding:20,
                  fontSize:16
                }}>
                Sign out
              </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;