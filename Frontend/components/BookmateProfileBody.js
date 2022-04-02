import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BookmateProfileBody = ({ user }) => {
  const [followed, setFollowed] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const follow = async () => {

    const token = await SecureStore.getItemAsync('token');
    try {
      const { data } = await axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        url: 'http://192.168.1.10:3000/api/user/follow',
        data: {
          user_id: user._id,
        },
      }).then((res) => {
        setFollowed(true);
      });
    } catch (err) {
      setErrorMessage('Error! Please try again later.');
    }
  };

  const unfollow = async () => {
    
    const token = await SecureStore.getItemAsync('token');
    try {
      const { data } = await axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        url: 'http://192.168.1.10:3000/api/user/follow',
        data: {
          user_id: user._id,
        },
      }).then((res) => {
        setFollowed(false);
      });
    } catch (err) {
      console.log(err)
      setErrorMessage('Error! Please try again later.');
    }

  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
          paddingLeft: 10,
        }}
      >
        <View>
          <Image
            source={{uri: `${user.profile_image_URL}`}}
            style={{
              resizeMode: 'cover',
              width: 70,
              height: 70,
              borderRadius: 100,
            }}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{user.followers.length}</Text>
          <Text>Followers</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, paddingRight: 15 }}>{user.following.length}</Text>
          <Text style={{ paddingRight: 15 }}>Following</Text>
        </View>
      </View>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}
      >
        <Text
          style={{
            fontWeight: 'bold',
          }}
        >
          {user.first_name} {user.last_name} 
        </Text>

        {followed ? (
        <TouchableOpacity
          onPress={() => unfollow()}
          style={{ width: 100, height: 30, justifyContent: 'center', backgroundColor: '#5A7FCC', borderRadius: 20 }}
        >  
          <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Unfollow</Text>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity
          onPress={() => follow()}
          style={{ width: 100, height: 30, justifyContent: 'center', backgroundColor: '#5A7FCC', borderRadius: 20 }}
          >
            <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Follow</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={{ paddingVertical: 15, paddingLeft: 10 }}>{user.profile_bio}</Text>
    </SafeAreaView>
  );
};

export default BookmateProfileBody;
