import React from 'react';
import {View,Text,TouchableOpacity,ToastAndroid,Image,TextInput,SafeAreaView} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

const EditProfile = ({route, navigation}) => {
  const {first_name, last_name, profileImage, email, bio} = route.params;

  return (
    <SafeAreaView>
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
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => {navigation.goBack();}}>
            <Ionic name="checkmark" style={{fontSize: 35, color: '#3493D9'}} />
          </TouchableOpacity>
        </View>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Image
            source={{uri: `${profileImage}`}}
            style={{width: 80, height: 80, borderRadius: 100}}
          />
          <TouchableOpacity>
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
              defaultValue={first_name}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
              }}
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
              defaultValue={last_name}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
              }}
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
              defaultValue={email}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
              }}
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
              defaultValue={bio}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
              }}
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
    </SafeAreaView>
  );
};

export default EditProfile;