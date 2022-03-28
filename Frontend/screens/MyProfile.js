import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ProfileBody from '../components/ProfileBody';
import ProfileNav from '../components/ProfileNav';


const Profile = () => {
  
  const [user, setUser] = useState('')

  useEffect(()=>{
    //Testing
      fetch('http://10.0.2.2:3000/api/user/getprofile',{
          headers:{
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQwMzYzOTFkOTA1ZTEwZTVmYzYwZDYiLCJpYXQiOjE2NDgzOTUwNjl9.L6bFuQ50tiGUFhfJrc-81CmVXVH1Xr-DmOXIj2-gvR0"
          }
      }).then(res=>res.json())
      .then(result=>{
        setUser(result);
      })
      .catch(err => console.log(err))
  },[])

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody user={user}/>
      </View>
      <ProfileNav user={user}/>
    </View>
  );
};

export default Profile;