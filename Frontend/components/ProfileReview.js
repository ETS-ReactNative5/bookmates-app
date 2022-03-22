import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome} from '@expo/vector-icons';

const ProfileReview = ({user, book,review_text,likes,dislikes, comments}) => {

  return (
    <SafeAreaView>
      <View style={{flexDirection:'row', alignItems:'flex-start', backgroundColor:'white', marginVertical:5}}>
        <Image style={styles.profile_pic} source={user.profile_pic}/>
        <View>
          <View style={styles.header}>
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <Text style={styles.book_title}>on {book.title} by {book.author}</Text>
          <View style={{flexDirection:'row'}}>
            <Image style={styles.book_img} source={book.thumbnail}/>
            <Text style={{fontFamily:'Roboto_300Light',flex: 1, flexWrap: 'wrap', paddingHorizontal:10}}>{review_text}</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10}}>
            <Text style={{color:"#6886C5"}}>{likes}<AntDesign name="like2" size={20} color="#6886C5"/></Text>
            <Text style={{color:"#6886C5"}}>{dislikes}<AntDesign name="dislike2" size={20} color="#6886C5" /></Text>
            <Text style={{color:"#6886C5"}}>{comments}<FontAwesome name="commenting-o" size={20} color="#6886C5" /></Text>
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
  },
  book_title:{
    fontStyle:"italic",
    paddingHorizontal:10,
    paddingVertical: 5,
    fontFamily:'Roboto_300Light_Italic'
  },
  book_img:{
    height: 67,
    width: 45,
    marginLeft:10,
  },
  header:{
    paddingHorizontal:10,
    paddingVertical: 5
  }
})