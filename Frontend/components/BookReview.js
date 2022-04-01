import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const BookReview = ({ review }) => {
  const [like_status, setLikeStatus] = useState(false);
  const [dislike_status, setDislikeStatus] = useState(false);

  const likeReview = () => {
    setLikeStatus(!like_status);
  };

  const dislikeReview = () => {
    setDislikeStatus(!dislike_status);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: 'white',
          marginVertical: 5,
          flex: 1,
          paddingHorizontal: 15,
        }}
      >
        <Image style={styles.profile_pic} source={{uri: `${review.user_id.profile_image_URL}`}} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{review.user_id.first_name} {review.user_id.last_name}</Text>
          <Text style={styles.review_text}>{review.text}</Text>

          {/* Interactions */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
            <TouchableOpacity onPress={() => likeReview()}>
              {like_status ? (
                <Text style={{ color: '#5A7FCC' }}>
                  {review.likes.length} <AntDesign name="like1" size={18} color="#5A7FCC" />
                </Text>
              ) : (
                <Text style={{ color: '#5A7FCC' }}>
                  {review.likes.length} <AntDesign name="like2" size={18} color="#5A7FCC" />
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dislikeReview()}>
              {dislike_status ? (
                <Text style={{ color: '#5A7FCC' }}>
                  {review.dislikes.length} <AntDesign name="dislike1" size={18} color="#5A7FCC" />
                </Text>
              ) : (
                <Text style={{ color: '#5A7FCC' }}>
                  {review.dislikes.length} <AntDesign name="dislike2" size={18} color="#5A7FCC" />
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={{ color: '#5A7FCC' }}>
                {review.comments.length} <FontAwesome name="commenting-o" size={18} color="#5A7FCC" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookReview;

const styles = StyleSheet.create({
  profile_pic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginTop: 10,
  },
  name: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  review_text: {
    textAlign: 'justify',
    fontFamily: 'Roboto_300Light',
    flex: 1,
    flexWrap: 'wrap',
    flexGrow: 1,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
});
