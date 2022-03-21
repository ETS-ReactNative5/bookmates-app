import { View,Text, StyleSheet, StatusBar,Modal, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import React, { useState } from "react";
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const BookDetails = ({route, navigation}) => {

  const {title, thumbnail, description, author} = route.params;
  const Tab = createMaterialTopTabNavigator();
  const [modalVisible, setModalVisible] = useState(false);

  const Description = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white', flex:1}}>
        <Text style={{lineHeight:25, paddingTop:10, textAlign:'justify', paddingHorizontal:10}}>{description}</Text>
      </ScrollView>
    )
  };
  
  const BookReviews = () => {
    return (
      <View style={{backgroundColor:'white', flex:1}}>
        <Text>Reviews</Text>
      </View>
    )
  };
  
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Entypo name="add-to-list" size={18} color="#6886C5"/>
                <Text style={styles.modalText}>Currently reading</Text>
              </View>

              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Entypo name="add-to-list" size={18} color="#6886C5"/>
                <Text style={styles.modalText}>To read</Text>
              </View>

              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Entypo name="add-to-list" size={18} color="#6886C5"/>
                <Text style={styles.modalText}>Finished</Text>
              </View>

              <Text style={styles.modalText}>Write review</Text>
           
            </View>
          </View>
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
    justifyContent:'center',
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
    paddingVertical:5,
    borderBottomColor:'#6886C5',
  }
});