import React from 'react';
import {View} from 'react-native';
import BookmateProfileBody from '../components/BookmateProfileBody';
import ProfileNav from '../components/ProfileNav';

const BookmateProfile = ({route}) => {
  let {name, profile_pic} = route.params
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <BookmateProfileBody
          name={name}
          profileImage={profile_pic}
          followers="220"
          following="220"
          bio="I love books😍"
        />
      </View>
      <ProfileNav name={name} profileImage={profile_pic}/>
    </View>
  );
};

export default BookmateProfile;