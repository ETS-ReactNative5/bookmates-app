import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './Home';
import Search from './Search';
import MyProfile from './MyProfile';
import Notifications from './Notifications';
import Feed from './Feed';

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#6886C5"
      barStyle={{ backgroundColor: '#FFFFFF'}}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
          <Feather name="home" size={24} color={color}/>),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
          <Feather name="search" size={24} color={color} />),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="comment-text-multiple-outline" size={24} color={color} />)
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarBadge: 5,
          tabBarIcon: ({ color }) => (
          <Ionicons name="notifications-outline" size={24} color={color} />),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
          <Ionicons name="person-outline" size={24} color={color} />),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;