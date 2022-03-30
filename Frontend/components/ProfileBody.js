import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const ProfileBody = ({user}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 25,
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
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{(user.followers && user.followers.length) || 0}</Text>
          <Text>Followers</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, paddingRight: 15 }}>{(user.following && user.following.length) || 0}</Text>
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditProfile' ,{
              first_name: user.first_name,
              last_name: user.last_name,
              profileImage: user.profile_image_URL,
              email: user.email,
              bio: user.profile_bio,
            })
          }
          style={{ width: 100, height: 30, flexDirection:'row', justifyContent: 'center', alignItems:'center', backgroundColor: '#5A7FCC', borderRadius: 20 }}
        >
          <Feather name="settings" size={18} color="#FFF" />
          <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold', marginLeft:5 }}> 
            Settings
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ paddingVertical: 15, paddingLeft: 10 }}>{user.profile_bio}</Text>
    </SafeAreaView>
  );
};

export default ProfileBody;
