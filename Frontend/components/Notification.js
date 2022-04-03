import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const FollowNotification = ({ notification }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.notification}
    >
      <Image style={styles.profile_pic} source={{uri: `${notification?.from?.profile_image_URL}`}} />
      <View>
        <View style={styles.text}>
          <Text style={styles.name}>{notification?.from?.first_name} {notification?.from?.last_name}</Text>
          <Text style={styles.action}> followed you.</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CommentNotification = ({ name, profile_pic, comment_text }) => {
  return (
    <View style={styles.notification}>
      <Image style={styles.profile_pic} source={profile_pic} />
      <View>
        <View style={styles.text}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.action}> commented on your review.</Text>
        </View>
        <Text style={styles.comment}>" {comment_text} "</Text>
      </View>
    </View>
  );
};

export const ReactionNotification = ({ name, profile_pic }) => {
  return (
    <View style={styles.notification}>
      <Image style={styles.profile_pic} source={profile_pic} />
      <View>
        <View style={styles.text}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.action}> reacted to your review.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile_pic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  notification: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 3,
  },
  button: {
    backgroundColor: '#5A7FCC',
    width: 100,
    height: 25,
    borderRadius: 30,
    marginVertical: 10,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Roboto_700Bold',
  },
  action: {
    fontFamily: 'Roboto_300Light',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button_text: {
    color: 'white',
    fontFamily: 'Baloo2_600SemiBold',
    textAlign: 'center',
  },
  comment: {
    fontFamily: 'Roboto_300Light_Italic',
    paddingVertical: 10,
  },
});
