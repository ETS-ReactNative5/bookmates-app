import React from 'react';
import {SafeAreaView, View, StyleSheet,Text, ScrollView, Image} from 'react-native';
import ProfileReview from '../components/ProfileReview';
import { Ionicons } from '@expo/vector-icons';

const Feed = () => {

  let book1 = {title:"Me Before You", author:"Jojo Moyes", 
  thumbnail:require('./../assets/mebeforeyou.jpg')};
  let book2 = {title:"Eleanor & Park", author:"Rainbow Rowell", 
  thumbnail:require('./../assets/eandp.jpg')};
  let book3 = {title:"To Kill A Mockingbird", author:"Harper Lee", 
  thumbnail:require('./../assets/mockingbird.jpg')};

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <View style={styles.header}>
          <Text style={styles.logo}>bookmates</Text>
        </View>
        <ProfileReview
            name='Jane Dow'
            profile_pic = {require('./../assets/test_profile_pic.jpg')}
            book = {book1}
            review_text="I love it. I love its warmth and vibrancy, its heartache and its pain, its humor and meanness, the ugliness, the beauty, the crying, the laughter, the sarcasm.
            I love Elanor and Park and I love that there's still a tiny chance for them."
            likes="20"
            dislikes="3"
            comments="5"/>

            <ProfileReview
            name='Claudia Holland' 
            profile_pic={require('./../assets/test_profile_pic.jpg')}
            book = {book2}
            review_text="I love it. I love its warmth and vibrancy, its heartache and its pain, its humor and meanness, the ugliness, the beauty, the crying, the laughter, the sarcasm.
            I love Elanor and Park and I love that there's still a tiny chance for them."
            likes="20"
            dislikes="3"
            comments="5"/>

            <ProfileReview
            name='Julia Collins'
            profile_pic={require('./../assets/test_profile_pic.jpg')}
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
  header:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:'white',
    elevation: 10,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    marginBottom:-15
  },
  logo:{
    fontFamily:'Baloo2_800ExtraBold',
    color:'#6886C5',
    textAlign:'center',
    fontSize:18
  }
})