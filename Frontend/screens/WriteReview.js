import React from 'react';
import { View, StyleSheet, TextInput, ScrollView, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const WriteReview = ({ route, navigation }) => {
  let {book} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{fontSize:16}}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmbutton}>
          <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>
            Post
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image style={{width:60, height:90, borderRadius:5, marginRight:7}} source={{uri: `${book.thumbnail}`}}/>
        <TextInput 
        placeholder='Thoughts on the book?'
        style={{fontSize:18, flexGrow:1, flex:1, flexWrap:'wrap'}}
        autoFocus={true}
        maxLength='250'
        multiline={true}>
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
