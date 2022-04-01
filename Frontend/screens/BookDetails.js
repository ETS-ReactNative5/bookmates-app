import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookReview from './../components/BookReview';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Description = ({description}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', flex: 1 }}>
      <Text style={{ lineHeight: 25, paddingTop: 10, textAlign: 'justify', paddingHorizontal: 10 }}>
        {description}
      </Text>
    </ScrollView>
  );
};

const BookReviews = ({book_id}) => {

  const [bookReviews, setBookReviews] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    loadBookReviews();
  }, [])
  
  const loadBookReviews = async () => {
    const token = await SecureStore.getItemAsync('token')
    try {
      const { data } = await axios({
        method: 'post',
        headers: {
          Authorization:'Bearer '+token,
        },
        url: 'http://192.168.1.10:3000/api/review/getBookReviews',
        data: {
          book_id: book_id,
        },
      }).then((response) => {
        setBookReviews(response.data)
        console.log(bookReviews)
      });
      
    } catch (err) {
      setErrorMessage("Error! Please try again later.");
    }
  }
  
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {bookReviews?.map((review) => {         
              return ( <BookReview key={review._id} review= {review} />)})
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const BookDetails = ({ route, navigation }) => {
  
  let {book} = route.params;
  
  const Tab = createMaterialTopTabNavigator();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [currentlyReading, setCurrentlyReading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [toRead, setToRead] = useState(false);

  
  const toggleCurrentlyReading = async () => {
    const token = await SecureStore.getItemAsync('token')
    try {
      const { data } = await axios({
        method: 'put',
        headers: {
          Authorization:'Bearer '+token,
        },
        url: 'http://192.168.1.10:3000/api/book/addcurrently',
        data: {
          book_id: book._id,
        },
      }).then((response) => {
          setCurrentlyReading(!currentlyReading);
      });
        
      } catch (err) {
        setErrorMessage("Error! Please try again later.");
      }
  };

  const toggleToRead = () => {
    setToRead(!toRead);
  };

  const toggleFinished = () => {
    setFinished(!finished);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#5A7FCC" barStyle="light-content" />

      {/*Header section*/}
      <View style={styles.header}>
        {/*Modal*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalContainerStyle}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => toggleCurrentlyReading()}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  {currentlyReading ? (
                    <MaterialCommunityIcons name="bookmark" size={19} color="#5A7FCC" />
                  ) : (
                    <Feather name="bookmark" size={18} color="#5A7FCC" />
                  )}
                  <Text style={styles.modalText}>Currently reading</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleToRead()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {toRead ? (
                    <MaterialCommunityIcons name="bookmark" size={19} color="#5A7FCC" />
                  ) : (
                    <Feather name="bookmark" size={18} color="#5A7FCC" />
                  )}
                  <Text style={styles.modalText}>To read</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => toggleFinished()}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  {finished ? (
                    <MaterialCommunityIcons name="bookmark" size={19} color="#5A7FCC" />
                  ) : (
                    <Feather name="bookmark" size={18} color="#5A7FCC" />
                  )}
                  <Text style={styles.modalText}>Finished</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('WriteReview', {book: book});}}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <MaterialCommunityIcons name="comment-text-multiple-outline" size={18} color="#5A7FCC" />
                  <Text style={styles.modalText}>Write review</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/*Navigation buttons*/}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/*Book thumbnail, title and author*/}
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 110, height: 160, borderRadius: 5 }} source={{uri: `${book.thumbnail}`}} />
          <Text style={styles.book_title}>{book.title}</Text>
          <Text style={styles.book_author}>By {book.author_id.name}</Text>
        </View>
      </View>

      {/*White section*/}
      <View style={[styles.description, { backgroundColor: '#ffffff' }]}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIndicatorStyle: {
              backgroundColor: '#5A7FCC',
            },
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          })}
        >
          <Tab.Screen name="Description" children={() => <Description description={book.description}/>} />
          <Tab.Screen name="Reviews" children={() => <BookReviews book_id={book._id}/>}/>
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A7FCC',
  },
  header: {
    flex: 1,
    color: 'white',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  description: {
    flex: 1.2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  book_title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  book_author: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
    paddingTop: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalView: {
    width: 200,
    marginVertical: 75,
    marginHorizontal: 18,
    backgroundColor: 'white',
    borderRadius: 20,
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
  modalText: {
    color: '#5A7FCC',
    paddingVertical: 10,
    marginLeft: 8,
    fontFamily:'Roboto_700Bold'
  },
  modalContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
