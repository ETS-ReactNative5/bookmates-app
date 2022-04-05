import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const EditReview = ({ route, navigation }) => {
  let {review} = route.params;
  const [reviewText, setReviewText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        navigation.navigate('Profile')
        // setEditMode(false);
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
        <TouchableOpacity style={styles.confirmbutton} onPress={() => editReview()}>
          <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {!! errorMessage && <Text style={{ fontSize: 14, color: 'red', textAlign: 'center', marginBottom:3 }}>{errorMessage}</Text>}
      <View style={styles.content}>
        <Image style={{width:60, height:90, borderRadius:5, marginRight:7}} source={{uri: `${review?.book_id.thumbnail}`}}/>
        <TextInput 
        defaultValue={review?.text}
        placeholder='Thoughts on the book?'
        style={{fontSize:18, flexGrow:1, flex:1, flexWrap:'wrap'}}
        autoFocus={true}
        maxLength={250}
        multiline={true}
        onChangeText={(e) => setReviewText(e)}>
        </TextInput>
      </View>
    </SafeAreaView>
  );
};

export default EditReview;

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
