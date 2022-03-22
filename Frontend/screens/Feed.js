import React from 'react';
import {SafeAreaView, View, StyleSheet,Text, ScrollView} from 'react-native';
import ProfileReview from '../components/ProfileReview';

const Feed = () => {

  let book1 = {title:"Me Before You", author:"Jojo Moyes", 
  thumbnail:require('./../assets/mebeforeyou.jpg')};
  let book2 = {title:"Eleanor & Park", author:"Rainbow Rowell", 
  thumbnail:require('./../assets/eandp.jpg')};
  let book3 = {title:"To Kill A Mockingbird", author:"Harper Lee", 
  thumbnail:require('./../assets/mockingbird.jpg')};

  let user1 = {name:'Jane Dow', profile_pic:require('./../assets/test_profile_pic.jpg')};
  let user2 = {name:'Claudia Holland', profile_pic:require('./../assets/test_profile_pic.jpg')};
  let user3 = {name:'Julia Collins', profile_pic:require('./../assets/test_profile_pic.jpg')};
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Reviews Feed</Text> 
        <ProfileReview
          user = {user1}
          book = {book1}
          review_text="I love it. I love its warmth and vibrancy, its heartache and its pain, its humor and meanness, the ugliness, the beauty, the crying, the laughter, the sarcasm.
          I love Elanor and Park and I love that there's still a tiny chance for them."
          likes="20"
          dislikes="3"
          comments="5"/>

          <ProfileReview
          user = {user2}
          book = {book2}
          review_text="I love it. I love its warmth and vibrancy, its heartache and its pain, its humor and meanness, the ugliness, the beauty, the crying, the laughter, the sarcasm.
          I love Elanor and Park and I love that there's still a tiny chance for them."
          likes="20"
          dislikes="3"
          comments="5"/>

          <ProfileReview
          user = {user3}
          book = {book3}
          review_text="I love it. I love its warmth and vibrancy, its heartache and its pain, its humor and meanness, the ugliness, the beauty, the crying, the laughter, the sarcasm.
          I love Elanor and Park and I love that there's still a tiny chance for them."
          likes="20"
          dislikes="3"
          comments="5"/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  title:{
    color: '#6886C5',
    fontFamily:'Baloo2_800ExtraBold',
    fontSize: 22,
    paddingVertical:15,
    backgroundColor:'white',
    paddingHorizontal:15,
    marginBottom:5
  }
})