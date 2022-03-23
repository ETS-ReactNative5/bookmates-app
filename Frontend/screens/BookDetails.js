import { View,Text, StyleSheet, StatusBar,Modal, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import React, { useState } from "react";
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookReview from './../components/BookReview';

const BookDetails = ({route, navigation}) => {

const {title, thumbnail, description, author} = route.params;
const Tab = createMaterialTopTabNavigator();
const [modalVisible, setModalVisible] = useState(false);

const [currentlyReading, setCurrentlyReading] = useState (false);
const [finished, setFinished] = useState (false);
const [toRead, setToRead] = useState (false);

{/*Description component*/}
const Description = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white', flex:1}}>
      <Text style={{lineHeight:25, paddingTop:10, textAlign:'justify', paddingHorizontal:10}}>{description}</Text>
    </ScrollView>
  )
};

{/*Book Reviews component*/}
const BookReviews = () => {
    let book1 = {title:"Me Before You", author:"Jojo Moyes", 
    thumbnail:require('./../assets/mebeforeyou.jpg')};
    let user1 = {name:'Claudia Holland', profile_pic:require('./../assets/test_profile_pic.jpg')};
    return(
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BookReview
          user = {user1}
          book = {book1}
          review_text="I love it. I love its warmth and vibrancy, its heartache and its pain, its humor and meanness, the ugliness, the beauty, the crying, the laughter, the sarcasm.
          I love Elanor and Park and I love that there's still a tiny chance for them."
          likes="20"
          dislikes="3"
          comments="5"/>

        <BookReview
          user = {user1}
          book = {book1}
          review_text="I love it. I love its warmth and vibrancy, its heartache and its pain, its humor and meanness, the ugliness, the beauty, the crying, the laughter, the sarcasm.
          I love Elanor and Park and I love that there's still a tiny chance for them."
          likes="20"
          dislikes="3"
          comments="5"/>

      </ScrollView>
    </SafeAreaView>
)
};

{/*Change state of currently reading*/}
const toggleCurrentlyReading = () => {
  setCurrentlyReading(!currentlyReading);
}

{/*Change state of to read*/}
const toggleToRead = () => {
  setToRead(!toRead);
}

{/*Change state of finished*/}
const toggleFinished = () => {
  setFinished(!finished);
}
    
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6886C5" barStyle="light-content" />

      {/*Header section*/}
      <View style={styles.header}>

      {/*Modal*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.modalContainerStyle}
          >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => toggleCurrentlyReading()} style={{flexDirection:'row', alignItems:'center'}}>
                {currentlyReading ? (<MaterialCommunityIcons name="bookmark" size={19} color="#6886C5" />) 
                : (<Feather name="bookmark" size={18} color="#6886C5" />)}
                <Text style={styles.modalText}>Currently reading</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleToRead()} style={{flexDirection:'row', alignItems:'center'}}>
                {toRead ? (<MaterialCommunityIcons name="bookmark" size={19} color="#6886C5" />) 
                : (<Feather name="bookmark" size={18} color="#6886C5" />)}
                <Text style={styles.modalText}>To read</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleFinished()} style={{flexDirection:'row', alignItems:'center'}}>
                {finished ? (<MaterialCommunityIcons name="bookmark" size={19} color="#6886C5" />) 
                : (<Feather name="bookmark" size={18} color="#6886C5" />)}
                <Text style={styles.modalText}>Finished</Text>
              </TouchableOpacity>

              <View style={{flexDirection:'row', alignItems:'center'}}>
                <MaterialCommunityIcons name="comment-text-multiple-outline" size={18} color="#6886C5" />
                <Text style={styles.modalText}>Write review</Text>
              </View>
            </View>

          </View>
        </TouchableOpacity>
      </Modal>

        {/*Navigation buttons*/}
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/*Book thumbnail, title and author*/}
        <View style={{alignSelf:'center'}}>
          <Image style={{width:131, height:191, borderRadius:10}} source={thumbnail}/>
          <Text style={styles.book_title}>{title}</Text>
          <Text style={styles.book_author}>By {author}</Text>
        </View>
      </View>

      {/*White section*/}
      <View style={[styles.description, { backgroundColor: '#ffffff' }]}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIndicatorStyle: {
              backgroundColor: '#6886C5',
              height: 2.5,
            },
            tabBarLabelStyle: { fontSize: 14, fontWeight:'bold'},
          })}>
          <Tab.Screen name="Description" component={Description}/>
          <Tab.Screen name="Reviews" component={BookReviews} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6886C5',
  },
  header: {
    flex: 1,
    color: 'white',
    marginTop:30,
    paddingHorizontal:20
  },
  description: {
    flex: 1.2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  book_title: {
    textAlign:'center', 
    color:'white',
    fontSize:18,
    fontWeight:'bold',
    paddingTop:10
  },
  book_author: {
    textAlign:'center',
    color:'white', 
    fontSize:16, 
    fontStyle:'italic',
    paddingTop:3
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "flex-end",
  },
  modalView: {
    width:'45%',
    marginVertical:55,
    marginHorizontal:20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    color: '#6886C5',
    paddingVertical:10,
    borderBottomColor:'#6886C5',
    marginLeft:8
  },
  modalContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});