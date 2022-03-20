import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
export const ProfileBody = ({
  name,
  profileImage,
  followers,
  following,
  bio
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
                <Text
                    style={{
                    paddingVertical: 10,
                    fontWeight: 'bold',
                    }}>
                    {name}
                </Text>
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
        <Text>{bio}</Text>
    </SafeAreaView>

  );
};