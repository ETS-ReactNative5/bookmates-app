import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileNav = () => {
  const Tab = createMaterialTopTabNavigator();

  const Bookshelf = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
            <Text style={{marginBottom: 10}}>Bookshelf</Text>
        </View>
      </ScrollView>
    );
  };
  const Reviews = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
            <Text>Reviews</Text>        
        </View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIndicatorStyle: {
          backgroundColor: '#6886C5',
          height: 2.5,
        },
      })}>
      <Tab.Screen name="Bookshelf" component={Bookshelf} />
      <Tab.Screen name="Reviews" component={Reviews} />
    </Tab.Navigator>
  );
};

export default ProfileNav;