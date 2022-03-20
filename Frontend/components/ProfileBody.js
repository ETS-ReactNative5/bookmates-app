import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export const ProfileBody = ({name,profileImage,followers,following,bio, email}) => {
    const navigation = useNavigation(); 
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
        <View style={{flexDirection:'row', justifyContent:'space-between', alignContent:'center'}}>
            <Text
                style={{

                fontWeight: 'bold',
                }}>
                {name}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile',{
                name: name,
                profileImage: profileImage,
                email: email,
                bio: bio})} 
                style={{width:100, height:22, backgroundColor:'#6886C5', borderRadius:20}}>
                <Text style={{textAlign:'center', color:'#FFF', fontWeight:'bold'}}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
        <Text style={{paddingVertical: 15}}>{bio}</Text>
    </SafeAreaView>

  );
};