import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import {CommentNotification, ReactionNotification, FollowBackNotification, FollowNotification} from './../components/Notification'

const Notifications = () => {
  return (
    <SafeAreaView>
      <CommentNotification></CommentNotification>
      <ReactionNotification></ReactionNotification>
      <FollowNotification></FollowNotification>
      <FollowBackNotification></FollowBackNotification>
    </SafeAreaView>
  )
}

export default Notifications

const styles = StyleSheet.create({})