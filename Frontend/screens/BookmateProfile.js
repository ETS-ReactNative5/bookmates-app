import React from 'react';
import {View} from 'react-native';
import BookmateProfileBody from '../components/BookmateProfileBody';
import ProfileNav from '../components/ProfileNav';

const BookmateProfile = ({route}) => {
  let {user} = route.params
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <BookmateProfileBody
          name={user?.name}
          profileImage={user?.profile_pic}
          followers={user?.followers}
          following={user?.following}
          bio={user?.bio}
        />
      </View>
      <ProfileNav name={user?.name} profileImage={user?.profile_pic}/>
    </View>
  );
};

export default BookmateProfile;