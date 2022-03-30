import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const WriteReview = ({ route, navigation }) => {
  let {book} = route.params;
  const [reviewText, setReviewText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function post() {
    if(reviewText){
        try {
          const { data } = await axios({
            method: 'post',
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQwMzYzOTFkOTA1ZTEwZTVmYzYwZDYiLCJpYXQiOjE2NDgzOTUwNjl9.L6bFuQ50tiGUFhfJrc-81CmVXVH1Xr-DmOXIj2-gvR0',
            },
            url: 'http://192.168.1.10:3000/api/review/add',
            data: {
              text: reviewText,
              book_id: book._id,
            },
          });
    
          navigation.goBack();
        } catch (err) {
          setErrorMessage("Error! Please try again later.");
        }
      }else{
        setErrorMessage("Error! Review field is empty.")
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{fontSize:16}}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmbutton} onPress={() => post()}>
          <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>
            Post
          </Text>
        </TouchableOpacity>
      </View>

      {!! errorMessage && <Text style={{ fontSize: 14, color: 'red', textAlign: 'center', marginBottom:3 }}>{errorMessage}</Text>}
      <View style={styles.content}>
        <Image style={{width:60, height:90, borderRadius:5, marginRight:7}} source={{uri: `${book.thumbnail}`}}/>
        <TextInput 
        placeholder='Thoughts on the book?'
        style={{fontSize:18, flexGrow:1, flex:1, flexWrap:'wrap'}}
        autoFocus={true}
        maxLength='250'
        multiline={true}
        onChangeText={(e) => setReviewText(e)}>
        </TextInput>
      </View>
    </SafeAreaView>
  );
};

export default WriteReview;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    height:"100%"
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    paddingVertical:20,
    alignItems:'center'
  },
  confirmbutton:{
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A7FCC',
    borderRadius: 20,
  },
  content:{
    flexDirection:'row',
    marginHorizontal:20,
    alignItems:'flex-start',
    flex:1
  }
});
