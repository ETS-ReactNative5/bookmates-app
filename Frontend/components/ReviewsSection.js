import { Text,SafeAreaView, View, ScrollView , RefreshControl, ActivityIndicator} from 'react-native'
import React , {useState, useEffect} from 'react'
import BookmateReview from './BookmateReview';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {useIsFocused} from '@react-navigation/native'

const ReviewsSection = ({user_id}) => {
  console.log(user_id)
  const isFocused = useIsFocused();
  const [message, setMessage] = useState('')
  const [reviews, setReviews] = useState([])
  const [refreshing, setRefreshing] = useState(true);
  const [emptyState, setEmptyState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

    useEffect(async () =>{
      if(isFocused){
        loadReviews();
      }
    },[isFocused])
  
    const loadReviews = async () => {
      const token = await SecureStore.getItemAsync('token')
      try {
        const { data } = await axios({
          method: 'get',
          headers: {
            Authorization:'Bearer '+token,
          },
          url: 'http://18.191.232.230:3000/api/review/bookmatereviews/' + user_id,
        }).then((response) => {
          setRefreshing(false)
          setReviews(response.data)
        });
        
      } catch (err) {
        setErrorMessage("Error! Please try again later.");
      }
    }
  
    return (
      <SafeAreaView style={{backgroundColor:'white', height:600}}>
        {refreshing ? <ActivityIndicator /> : null}
        {reviews.length ? 
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadReviews}/>}>
        <View>
          {reviews.map((result) => {         
            return ( <BookmateReview key={result._id} review= {result} />)})
          }
        </View>
        </ScrollView>
        :
        <View style={{backgroundColor:'white', height:600}}>
          <Text style={{marginVertical:20,color:'gray' , textAlign: 'center', fontFamily:'Roboto_300Light', fontSize:14}}>No Reviews</Text>
        </View>
      }
      </SafeAreaView>
    );
  };

export default ReviewsSection;