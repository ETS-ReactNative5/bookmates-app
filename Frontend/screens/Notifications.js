import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  CommentNotification,
  ReactionNotification,
  FollowBackNotification,
  FollowNotification,
} from './../components/Notification';
import * as SecureStore from 'expo-secure-store';
import {useIsFocused} from '@react-navigation/native'

const Notifications = () => {
  const isFocused = useIsFocused();
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getNotifications();
  }, [isFocused])
  
  const getNotifications = async () => {
    const token = await SecureStore.getItemAsync('token')
    await fetch('http://192.168.1.10:3000/api/user/notifications',{
      headers:{
        "Authorization":"Bearer "+token,
      }}).then(res=>res.json())
  .then(result=>{
    setNotifications(result);
    console.log(notifications)
  })
  .catch(err => console.log(err))
  }

  return (
    <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.logo}>Notifications</Text>
        </View>
        {notifications.length ?        
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {notifications?.map((notif) => {         
                    return ( <FollowNotification key={notif._id} notification= {notif} />)
              })}
            </ScrollView>
          </View>
        :
      <View>
        <Text style={{marginVertical:20,color:'gray' , textAlign: 'center', fontFamily:'Roboto_300Light', fontSize:14}}>No Notifications</Text>
       </View>
      }
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    marginBottom:5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: -3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    zIndex:999,  
  },
  logo: {
    fontFamily: 'Baloo2_800ExtraBold',
    color: '#5A7FCC',
    textAlign: 'center',
    fontSize: 18,
  },
});
