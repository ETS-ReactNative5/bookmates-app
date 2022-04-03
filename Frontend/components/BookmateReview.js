import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BookmateReview = ({ review }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [like_status, setLikeStatus] = useState(false);
  const [dislike_status, setDislikeStatus] = useState(false);
  const [reviewLikes, setReviewLikes] = useState(review.likes);
  const [reviewDislikes, setReviewDislikes] = useState(review.dislikes);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const likeReview = async () => {
    setLikeStatus(!like_status);
    const token = await SecureStore.getItemAsync('token')
      try {
        const { data } = await axios({
          method: 'put',
          headers: {
            Authorization:'Bearer '+token,
          },
          url: 'http://192.168.1.10:3000/api/review/like',
          data: {
            review_id: review._id,
          },
        }).then((response) => {
          setReviewLikes(response.data.review.likes)
          console.log(response.data.review.likes)
        });
        
      } catch (err) {
        setErrorMessage("Error! Please try again later.");
      }
    }

  const dislikeReview = async () => {
    setDislikeStatus(!dislike_status);
    const token = await SecureStore.getItemAsync('token')
    try {
      const { data } = await axios({
        method: 'put',
        headers: {
          Authorization:'Bearer '+token,
        },
        url: 'http://192.168.1.10:3000/api/review/dislike',
        data: {
          review_id: review._id,
        },
      }).then((response) => {
        setReviewDislikes(response.data.review.dislikes)
      });
      
    } catch (err) {
      setErrorMessage("Error! Please try again later.");
    }
  };

  const getReviewComments = async () => {
    const token = await SecureStore.getItemAsync('token')
    try {
      const { data } = await axios({
        method: 'post',
        headers: {
          Authorization:'Bearer '+token,
        },
        url: 'http://192.168.1.10:3000/api/review/comments',
        data: {
          review_id: review._id,
        },
      }).then((response) => {
        setComments(response.data)
        setModalVisible(true);
        console.log(comments)
      });
      
    } catch (err) {
      setErrorMessage("Error! Please try again later.");
    }

  }

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: 'white',
          marginBottom: 10,
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
      >
        <Image style={styles.profile_pic} source={{uri: `${review.user_id.profile_image_URL}`}} />
        <View style={{ flex: 1 }}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={styles.name}>{review.user_id.first_name} {review.user_id.last_name}</Text>
          
          </View>
          <Text style={styles.book_title}>
            on {review.book_id.title} by {review.book_id.author_id.name}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.book_img} source={{uri: `${review.book_id.thumbnail}`}} />
            
            <Text style={styles.review_text}>{review.text}</Text>
          
          </View>

          {/* Interactions */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
            <TouchableOpacity onPress={() => likeReview()}>
              {like_status ? (
                <Text style={{ color: '#5A7FCC' }}>
                  {reviewLikes.length} <AntDesign name="like1" size={18} color="#5A7FCC" />
                </Text>
              ) : (
                <Text style={{ color: '#5A7FCC' }}>
                  {reviewLikes.length} <AntDesign name="like2" size={18} color="#5A7FCC" />
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dislikeReview()}>
              {dislike_status ? (
                <Text style={{ color: '#5A7FCC' }}>
                  {reviewDislikes.length} <AntDesign name="dislike1" size={18} color="#5A7FCC" />
                </Text>
              ) : (
                <Text style={{ color: '#5A7FCC' }}>
                  {reviewDislikes.length} <AntDesign name="dislike2" size={18} color="#5A7FCC" />
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              if(review.comments.length){
                getReviewComments();
              }
            }}>
              <Text style={{ color: '#5A7FCC' }}>
                {review.comments.length} <FontAwesome name="commenting-o" size={18} color="#5A7FCC" />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:5, flexDirection:'row', alignItems:'center'}}>
            <TextInput
            backgroundColor="#f5f5f5"
            padding={10}
            marginHorizontal={5}
            borderRadius="20"
            height={30}
            placeholder='Write a comment...'
            style={{fontSize:14, flexGrow:1, flex:1, flexWrap:'wrap'}}
            maxLength={100}
            multiline={true}
            onChangeText={(e) => setCommentText(e)}>
            </TextInput>
            <TouchableOpacity>
              <Ionicons name="send" size={20} color="#5A7FCC" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalContainerStyle}>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 60 }}>
          <View
            style={{
              borderRadius: 20,
              padding: 20,
              width: 300,
              height: 250,
              alignItems: 'flex-start',
              justifyContent: 'center',
              flexDirection: 'column',
              backgroundColor: '#FFFFFFFF',
            }}
          >
                  <View style={{ justifyContent: 'center', width: '98%' }}>
                  <Text style={styles.commentsHeader}>Comments</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {comments?.map((comment, index) => {
                      return (
                        <View key={index} style={{ flexDirection: 'row', alignItems:'flex-start', marginVertical:5}}>
                          <Image source={{ uri: `${comment?.postedBy.profile_image_URL}` }} style={styles.profile_pic} />
                          <View>
                            <Text style={styles.name}>{comment?.postedBy?.first_name} {comment?.postedBy?.last_name}</Text>
                            <Text style={styles.review_text}>{comment?.text}</Text>
                          </View>                     
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
          </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default BookmateReview;

const styles = StyleSheet.create({
  modalView: {
    alignItems:'center',
    width: 200,
    borderRadius:10,
    marginVertical: 75,
    marginHorizontal: 18,
    backgroundColor: 'white',
    padding: 20,
    elevation: 10,
  },
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
  book_title: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'Roboto_300Light_Italic',
    fontSize: 14,
  },
  book_img: {
    height: 85,
    width: 60,
    marginHorizontal: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  review_text: {
    paddingHorizontal: 10,
    textAlign: 'justify',
    fontFamily: 'Roboto_300Light',
    flex: 1,
    flexWrap: 'wrap',
    flexGrow: 1,
    lineHeight: 18,
  },
  modalContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  confirmbutton:{
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A7FCC',
    borderRadius: 20,
  }, 
  commentsHeader: {
    fontFamily: 'Baloo2_800ExtraBold',
    color: '#5A7FCC',
    fontSize: 20,
    marginBottom: 15,
  },

});