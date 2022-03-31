import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ProfileBody from '../components/ProfileBody';
import MyProfileNav from '../components/MyProfileNav';
import * as SecureStore from 'expo-secure-store';


const Profile = () => {
  
  const [user, setUser] = useState('')
  
  //Testing
  useEffect( async () => {

    const token = await SecureStore.getItemAsync('token')
    console.log(token)
    fetch('http://192.168.1.10:3000/api/user/getprofile',{
      headers:{
        "Authorization":"Bearer "+token,
      }}).then(res=>res.json())
  .then(result=>{
    setUser(result);
  })
  .catch(err => console.log(err))
  }, [])
  


  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody user={user}/>
      </View>
      <MyProfileNav user={user}/>
    </View>
  );
};

export default Profile;