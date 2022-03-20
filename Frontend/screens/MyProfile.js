import React from 'react';
import {View} from 'react-native';
import {ProfileBody} from '../components/ProfileBody';
import ProfileNav from '../components/ProfileNav';

const Profile = () => {
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody
          name="Claudia Holland"
          profileImage={require('./../assets/test_profile_pic.jpg')}
          followers="220"
          following="220"
          bio="So many books, so little time📚"
        />
      </View>
      <ProfileNav />
    </View>
  );
};

export default Profile;