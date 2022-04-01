import React , {useState, useEffect} from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import BookSearch from '../components/BookSearch';
import BookmateReview from './BookmateReview';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const BookmateBookshelf = ({user_id}) => {
  
  const [reviews, setReviews] = useState([])
  const [bookshelf, setBookshelf] = useState({})
  const [refreshing, setRefreshing] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(async () =>{
    loadBookshelf();
  },[])

  const loadBookshelf = async () => {
    const token = await SecureStore.getItemAsync('token')
    console.log(token)
    try {
      const { data } = await axios({
        method: 'get',
        headers: {
          Authorization:'Bearer '+token,
        },
        url: 'http://192.168.1.10:3000/api/book/bookmatebookshelf/' + user_id,
      }).then((response) => {
        setRefreshing(false)
        setBookshelf(response.data)
      });
      
    } catch (err) {
      setErrorMessage("Error! Please try again later.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    {refreshing ? <ActivityIndicator /> : null}
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadBookshelf}/>}>
      <View style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-between', alignItems: 'center' }}>
          {errorMessage && <Text> {errorMessage}</Text>}
          <Text style={{ color: '#5A7FCC', paddingLeft: 20, fontFamily: 'Baloo2_600SemiBold', fontSize: 16 }}>
            Currently Reading
          </Text>
        </View>

        <View style={{marginLeft:15}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {bookshelf?.currentlyReadingBooks?.map((result) => {         
              return ( <BookSearch key={result[0]._id} book= {result[0]} />)})
            }
          </ScrollView>
        </View>

        <View
          style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={{ color: '#5A7FCC', paddingLeft: 20, fontFamily: 'Baloo2_600SemiBold', fontSize: 16 }}>
            To-Read
          </Text>
        </View>

        <View style={{marginLeft:15}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {bookshelf?.toReadBooks?.map((result) => {         
              return ( <BookSearch key={result[0]._id} book= {result[0]} />)})
            }
          </ScrollView>
        </View>

        <View
          style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={{ color: '#5A7FCC', paddingLeft: 20, fontFamily: 'Baloo2_600SemiBold', fontSize: 16 }}>
            Finished
          </Text>
        </View>

        <View style={{marginLeft:15}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {bookshelf?.finishedBooks?.map((result) => {         
              return ( <BookSearch key={result[0]._id} book= {result[0]} />)})
            }
          </ScrollView>
        </View>

    </ScrollView>
  </SafeAreaView>
  );
};

export default BookmateBookshelf;
