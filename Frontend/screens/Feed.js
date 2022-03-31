import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, RefreshControl} from 'react-native';
import ProfileReview from '../components/ProfileReview';
import { Ionicons } from '@expo/vector-icons';
import BookmateReview from '../components/BookmateReview';
import * as SecureStore from 'expo-secure-store';

const Feed = () => {
  
  const [feedReviews, setFeedReviews] = useState([])
  const [refreshing, setRefreshing] = useState(true);

  useEffect(async () =>{
    await loadFeed();
  },[])

  const loadFeed = async () => {
    const token = await SecureStore.getItemAsync('token')
    await fetch('http://192.168.1.10:3000/api/review/getfeedreviews',{
        headers:{
          Authorization: "Bearer "+token
        }
    }).then(res=>res.json())
      .then(result=>{
        setFeedReviews(result);
        setRefreshing(false);
      })
      .catch(err => console.log(err))
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadFeed}/>} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <View style={styles.header}>
          <Text style={styles.logo}>bookmates</Text>
        </View>
        {feedReviews.map((result) => { 
              return ( <BookmateReview key={result._id} review= {result} />)})
        }

      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    elevation: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: -6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

  },
  logo: {
    fontFamily: 'Baloo2_800ExtraBold',
    color: '#5A7FCC',
    textAlign: 'center',
    fontSize: 18,
  },
});
