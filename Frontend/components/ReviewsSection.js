import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import ProfileReview from './ProfileReview';

const ReviewsSection = ({user}) => {
    let book1 = { title: 'Me Before You', author: 'Jojo Moyes', thumbnail: require('./../assets/mebeforeyou.jpg') };

    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileReview 
            first_name={user.first_name}
            last_name={user.last_name}
            profileImage={user.profile_image_URL}
            book={book1}
            review_text="I love it. I love its warmth and vibrancy, its heartache and its pain, its humor and meanness, the ugliness, the beauty, the crying, the laughter, the sarcasm.
          I love Elanor and Park and I love that there's still a tiny chance for them."
            likes="20"
            dislikes="3"
            comments="5"
          />
        </ScrollView>
      </SafeAreaView>
    );
  };

export default ReviewsSection