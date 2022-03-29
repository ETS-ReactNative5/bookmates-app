import { StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import ProfileReview from './ProfileReview';

const MyReviewsSection = () => {

  const [reviews, setReviews] = useState([])
  const [refreshing, setRefreshing] = useState(true);

    //Testing
    useEffect(async () =>{
      loadReviews();
    },[])
  
    const loadReviews = async () => {
      //Testing
      fetch('http://10.0.2.2:3000/api/review/myreviews',{
          headers:{
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQwMzYzOTFkOTA1ZTEwZTVmYzYwZDYiLCJpYXQiOjE2NDgzOTUwNjl9.L6bFuQ50tiGUFhfJrc-81CmVXVH1Xr-DmOXIj2-gvR0"
          }
        }).then(res=>res.json())
        .then(result=>{
          setReviews(result)
          setRefreshing(false);
        })
        .catch(err => console.log(err))
    }
  
    return (
      <SafeAreaView>
        {refreshing ? <ActivityIndicator /> : null}
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadReviews}/>}>
        {reviews?.map((result) => {         
            return ( <ProfileReview key={result._id} review= {result} />)})
          }
        </ScrollView>
      </SafeAreaView>
    );
  };

export default MyReviewsSection