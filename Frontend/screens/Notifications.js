import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import {CommentNotification, ReactionNotification, FollowBackNotification, FollowNotification} from './../components/Notification'

const Notifications = () => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <View style={styles.header}>
          <Text style={styles.logo}>Notifications</Text>
        </View>
      <CommentNotification></CommentNotification>
      <ReactionNotification></ReactionNotification>
      <FollowNotification></FollowNotification>
      <FollowBackNotification></FollowBackNotification>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notifications

const styles = StyleSheet.create({
  header:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:'white',
    elevation: 10,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
  logo:{
    fontFamily:'Baloo2_800ExtraBold',
    color:'#6886C5',
    textAlign:'center',
    fontSize:18
  }
})