import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
export const ProfileBody = ({
  name,
  profileImage,
  followers,
  following,
  bio, 
  id
}) => {
  return (
      <SafeAreaView>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
        }}>
            <View>
                <Image
                    source={profileImage}
                    style={{
                    resizeMode: 'cover',
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    }}
                />
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>{followers}</Text>
                <Text>Followers</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>{following}</Text>
                <Text>Following</Text>
            </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text
                style={{
                paddingVertical: 10,
                fontWeight: 'bold',
                }}>
                {name}
            </Text>
            <TouchableOpacity style={{width:100, height:22, backgroundColor:'#6886C5', borderRadius:20}}>
                <Text style={{textAlign:'center', color:'#FFF', fontWeight:'bold'}}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
        <Text>{bio}</Text>
    </SafeAreaView>

  );
};