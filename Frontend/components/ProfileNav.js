import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Bookshelf from './Bookshelf';
import ProfileReview from './ProfileReview';

const ProfileNav = () => {
  const Tab = createMaterialTopTabNavigator();

  const Review = () => {
    return(
      <Text>Reviews</Text>
    )
  }
  
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIndicatorStyle: {
          backgroundColor: '#6886C5',
          height: 2.5,
        },
        tabBarLabelStyle: { fontSize: 14, fontWeight:'bold'},
      })}>
      <Tab.Screen name="Bookshelf" component={Bookshelf} />
      <Tab.Screen name="Reviews" component={Review} />
    </Tab.Navigator>
  );
};

export default ProfileNav;