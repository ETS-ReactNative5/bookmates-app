import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Ionic from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ProfileReview = ({ review }) => {
  const [like_status, setLikeStatus] = useState(false);
  const [dislike_status, setDislikeStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const[editMode, setEditMode] = useState(false);
  const [reviewText, setReviewText] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [reviewLikes, setReviewLikes] = useState(review.likes);
  const [reviewDislikes, setReviewDislikes] = useState(review.dislikes);

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
        });
        
      } catch (err) {
        setErrorMessage("Error! Please try again later.");
      }
    }

  const dislikeReview = async() => {
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
  }

  const editReview = async () => {
    const token = await SecureStore.getItemAsync('token')
    if(reviewText){
      try {
        const { data } = await axios({
          method: 'put',
          headers: {
            Authorization:'Bearer '+token,
          },
          url: 'http://192.168.1.10:3000/api/review/edit',
          data: {
            text: reviewText,
            review_id: review._id,
          },
        });
        setEditMode(false);
      } catch (err) {
        setErrorMessage("Error! Please try again later.");
      }
    }else{
      setErrorMessage("Error! Review field is empty.")
    }
  }

  const deleteReview = async () => {
      try {
        const token = await SecureStore.getItemAsync('token')
        const { data } = await axios({
          method: 'delete',
          headers: {
            Authorization:
              'Bearer '+token,
          },
          url: 'http://192.168.1.10:3000/api/review/delete',
          data: {
            review_id: review._id
          }
        });
        setModalVisible(false);
      } catch (err) {
        console.log(err)
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
            
            {editMode ? 
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.confirmbutton} onPress={() => editReview()}>
                  <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Edit</Text>
              </TouchableOpacity> 
            </View>
            :
            (<TouchableOpacity style={{marginTop: 10}} onPress={() => setModalVisible(!modalVisible)}>
              <MaterialCommunityIcons name="dots-horizontal" size={25} color="black" />
            </TouchableOpacity>)
            }
          
          </View>
          <Text style={styles.book_title}>
            on {review.book_id.title} by {review.book_id.author_id.name}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.book_img} source={{uri: `${review.book_id.thumbnail}`}} />
            {editMode ? 
              <KeyboardAwareScrollView>
                <TextInput 
                      style={{fontSize:14, flexGrow:1, flex:1, flexWrap:'wrap'}}
                      defaultValue={reviewText}
                      autoFocus={true}
                      editable={true}
                      maxLength={250}
                      multiline={true}
                      onChangeText={(e) => setReviewText(e)}>
                </TextInput>       
              </KeyboardAwareScrollView> :
            
            <Text style={styles.review_text}>{review.text}</Text>}
          
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

            <TouchableOpacity>
              <Text style={{ color: '#5A7FCC' }}>
                {review.comments.length} <FontAwesome name="commenting-o" size={18} color="#5A7FCC" />
              </Text>
            </TouchableOpacity>
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
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <TouchableOpacity onPress={() => deleteReview()}>
                    <Text style={{color:'red', fontSize:20, paddingVertical:9}}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()  => {
                    setModalVisible(false)
                    setEditMode(true)
                  }}>
                    <Text style={{color:'black', fontSize:20, paddingVertical:10}}>Edit</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileReview;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    alignItems:'center',
    width: 200,
    borderRadius:10,
    marginVertical: 75,
    marginHorizontal: 18,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  confirmbutton:{
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A7FCC',
    borderRadius: 20,
  },
});