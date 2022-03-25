import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Bookshelf from './Bookshelf';
import ProfileReview from './ProfileReview';

const ProfileNav = ({ name, profileImage }) => {
  const Tab = createMaterialTopTabNavigator();

  const Review = ({ name, profile_pic }) => {
    let book1 = { title: 'Me Before You', author: 'Jojo Moyes', thumbnail: require('./../assets/mebeforeyou.jpg') };
    // let user1 = {name:'Claudia Holland', profile_pic:require('./../assets/test_profile_pic.jpg')};
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileReview
            name={name}
            profile_pic={profile_pic}
            book={book1}
            review_text="I love it. I love its warmth and vibrancy, its heartache and its pain, its humor and meanness, the ugliness, the beauty, the crying, the laughter, the sarcasm.
          I love Elanor and Park and I love that there's still a tiny chance for them."
            likes="20"
            dislikes="3"
            comments="5"
          />
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIndicatorStyle: {
          backgroundColor: '#5A7FCC',
          height: 2.5,
        },
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Bookshelf" component={Bookshelf} />
      <Tab.Screen name="Reviews" children={() => <Review name={name} profile_pic={profileImage} />} />
    </Tab.Navigator>
  );
};

export default ProfileNav;
