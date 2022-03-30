import { Text,SafeAreaView, View, ScrollView , RefreshControl, ActivityIndicator} from 'react-native'
import React , {useState, useEffect} from 'react'
import BookmateReview from './BookmateReview';

const ReviewsSection = ({user}) => {
  const [message, setMessage] = useState('')
  const [reviews, setReviews] = useState([])
  const [refreshing, setRefreshing] = useState(true);
  const [emptyState, setEmptyState] = useState(false);

    //Testing
    useEffect(async () =>{
      loadReviews();
    },[])
  
    const loadReviews = async () => {
      console.log(user._id)
      //Testing
      await fetch('http://192.168.1.10:3000/api/review/bookmatereviews?id=' + user._id,{
          headers:{
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQwMzYzOTFkOTA1ZTEwZTVmYzYwZDYiLCJpYXQiOjE2NDgzOTUwNjl9.L6bFuQ50tiGUFhfJrc-81CmVXVH1Xr-DmOXIj2-gvR0"
          }
        }).then(res=>res.text())
        .then(result=>{
          if(result == "No reviews") {
            setMessage("No reviews");
            setEmptyState(true);
            setRefreshing(false);
          }
          setReviews(result)
          setRefreshing(false);
          setEmptyState(false);
        })
        .catch(err => console.log(err))
    }

    return (
      <SafeAreaView>
        {refreshing ? <ActivityIndicator /> : null}
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadReviews}/>}>
        {emptyState ? 
          <Text style>{message}</Text>
        :
        <View>
          <Text>Hoi</Text>
          {/* {reviews.map((result) => {         
            return ( <BookmateReview key={result._id} review= {result} />)})
          } */}
        </View>
        }
        </ScrollView>
      </SafeAreaView>
    );
  };

export default ReviewsSection;