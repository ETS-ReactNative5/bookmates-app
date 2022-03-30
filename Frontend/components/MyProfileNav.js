import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyBookshelf from './MyBookshelf';
import MyReviewsSection from './MyReviewsSection';
import { ScrollView } from 'react-native';

const MyProfileNav = () => {
  const Tab = createMaterialTopTabNavigator();
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
      <Tab.Screen name="Bookshelf" children={() => <MyBookshelf/>}  />
      <Tab.Screen name="Reviews" children={() => <MyReviewsSection/>} />
    </Tab.Navigator>
  );
};


export default MyProfileNav;
