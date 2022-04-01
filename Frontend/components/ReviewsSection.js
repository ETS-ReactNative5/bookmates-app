import { Text,SafeAreaView, View, ScrollView , RefreshControl, ActivityIndicator} from 'react-native'
import React , {useState, useEffect} from 'react'
import BookmateReview from './BookmateReview';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ReviewsSection = ({user_id}) => {
  const [message, setMessage] = useState('')
  const [reviews, setReviews] = useState([])
  const [refreshing, setRefreshing] = useState(true);
  const [emptyState, setEmptyState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

    useEffect(async () =>{
      loadReviews();
    },[])
  
    const loadReviews = async () => {
      const token = await SecureStore.getItemAsync('token')
      try {
        const { data } = await axios({
          method: 'get',
          headers: {
            Authorization:'Bearer '+token,
          },
          url: 'http://192.168.1.10:3000/api/review/bookmatereviews/' + user_id,
        }).then((response) => {
          setRefreshing(false)
          setReviews(response.data)
        });
        
      } catch (err) {
        setErrorMessage("Error! Please try again later.");
      }
    }
  
    return (
      <SafeAreaView>
        {refreshing ? <ActivityIndicator /> : null}
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadReviews}/>}>
        <View>
          {reviews.map((result) => {         
            return ( <BookmateReview key={result._id} review= {result} />)})
          }
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

export default ReviewsSection;