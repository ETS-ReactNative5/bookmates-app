import React , {useState, useEffect} from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import BookSearch from '../components/BookSearch';

const MyBookshelf = () => {

  const [bookshelf, setBookshelf] = useState({})
  const [refreshing, setRefreshing] = useState(true);

  useEffect(async () =>{
    loadBookshelf();
  },[])

  const loadBookshelf = async () => {
    fetch('http://192.168.1.10:3000/api/book/displaymybookshelf',{
        headers:{
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQwMzYzOTFkOTA1ZTEwZTVmYzYwZDYiLCJpYXQiOjE2NDgzOTUwNjl9.L6bFuQ50tiGUFhfJrc-81CmVXVH1Xr-DmOXIj2-gvR0"
        }
      }).then(res=>res.json())
      .then(result=>{
        setRefreshing(false);
        setBookshelf(result);
      })
      .catch(err => console.log(err))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadBookshelf}/>}>
        <View
          style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-between', alignItems: 'center' }}
        >
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

export default MyBookshelf;
