import React from 'react';
import {View} from 'react-native';
import BookmateProfileBody from '../components/BookmateProfileBody';
import BookmateProfileNav from '../components/BookmateProfileNav';

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
      <BookmateProfileNav name={user?.name} profileImage={user?.profile_pic}/>
    </View>
  );
};

export default BookmateProfile;