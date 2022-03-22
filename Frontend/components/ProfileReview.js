import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, FontAwesome} from '@expo/vector-icons';

const ProfileReview = ({user, book,review_text,likes,dislikes, comments}) => {

  const [like_status, setLikeStatus] = useState(false);
  const [dislike_status, setDislikeStatus] = useState(false);

  const likeReview = () =>{
    setLikeStatus(!like_status)
  }

  const dislikeReview = () =>{
    setDislikeStatus(!dislike_status)
  }


  return (
    <SafeAreaView>
      <View style={{flexDirection:'row', alignItems:'flex-start', backgroundColor:'white', marginVertical:5}}>
        <Image style={styles.profile_pic} source={user.profile_pic}/>
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.book_title}>on {book.title} by {book.author}</Text>
          <View style={{flexDirection:'row'}}>
            <Image style={styles.book_img} source={book.thumbnail}/>
            <Text style={{fontFamily:'Roboto_300Light',flex: 1, flexWrap: 'wrap', paddingHorizontal:10}}>{review_text}</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingLeft:65, paddingVertical:10}}>
            
            <TouchableOpacity onPress={() => likeReview()}>
              {like_status ? 
              (<Text style={{color:"#6886C5"}}>{likes} <AntDesign name="like2" size={18} color="#6886C5"/></Text>)
              :(<Text style={{color:"#6886C5"}}>{likes} <AntDesign name="like1" size={18} color="#6886C5" /></Text>)}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dislikeReview()}>
              {dislike_status ? 
              (<Text style={{color:"#6886C5"}}>{dislikes} <AntDesign name="dislike2" size={18} color="#6886C5" /></Text>)
              :(<Text style={{color:"#6886C5"}}>{dislikes} <AntDesign name="dislike1" size={18} color="#6886C5" /></Text>)}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dislikeReview()}>
              
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"#6886C5"}}>{comments} <FontAwesome name="commenting-o" size={18} color="#6886C5" /></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
};

export default ProfileReview;

const styles = StyleSheet.create({
  profile_pic:{
    width: 50,
    height: 50,
    borderRadius:100,
    marginLeft:10,
    marginTop:10
  },
  name:{
    fontWeight:'bold',
    fontSize: 16,
    paddingHorizontal:10,
    paddingVertical: 5
  },
  book_title:{
    paddingHorizontal:10,
    paddingVertical: 5,
    fontFamily:'Roboto_300Light_Italic',
    fontSize:14
  },
  book_img:{
    height: 85,
    width: 65,
    marginLeft:10,
    borderRadius:6,
  },
})