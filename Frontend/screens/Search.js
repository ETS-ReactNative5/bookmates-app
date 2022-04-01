import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  RefreshControl,
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
  StyleSheet
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Searchbar } from 'react-native-paper';
import BookSearch from '../components/BookSearch';
import Ionic from 'react-native-vector-icons/Ionicons';

const Search = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  const getSearchResults = async () => {
    if(searchQuery){
      const token = await SecureStore.getItemAsync('token')
      await fetch('http://192.168.1.10:3000/api/book/search/' + searchQuery, {
        headers: {
          Authorization:
            'Bearer '+token,
        },
      })
        .then((res) => res.json())
        .then((result) =>{
          setSearchResults(result)
          setRefreshing(false);
          setModalVisible(true)
        })
        .catch((err) => console.log(err));
    }
  }

  const getSuggestions = async () => {
    const token = await SecureStore.getItemAsync('token')
    await fetch('http://192.168.1.10:3000/api/book/suggestions', {
      headers: {
        Authorization:
          'Bearer '+token,
      },
    })
      .then((res) => res.json())
      .then((result) =>{
        setSuggestions(
          result.map((item) => {
            return item[0];
          })
        )
        setRefreshing(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar />
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={getSearchResults}
        style={{
          height: 40,
          alignSelf: 'center',
          marginVertical: 15,
          width: '90%',
          borderRadius: 30,
          backgroundColor: '#F3F5F7',
        }}
      />
      <Text
        style={{ color: '#5A7FCC', paddingLeft: 25, fontFamily: 'Baloo2_600SemiBold', fontSize: 22, marginBottom: 2 }}
      >
        Wondering what to read next?
      </Text>
      <Text
        style={{ color: 'black', paddingLeft: 25, fontFamily: 'Roboto_300Light_Italic', fontSize: 14, marginBottom: 12 }}
      >
        Search a library of over 10 million books!
      </Text>


      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getSuggestions} />}
        style={{ marginHorizontal: 15 }}
        data={suggestions}
        renderItem={({ item }) => <BookSearch book={item} />}
        keyExtractor={(item) => item._id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
            <View style={styles.modalContainerStyle}>
            <View
              style={{
                borderRadius: 20,
                padding: 20,
                width: 300,
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: '#FFFFFFFF',
              }}
            >
              <View style={{flexDirection:'row'}}>
                <Text style={styles.searchHeader}>Search Results</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionic name="close-outline" style={{ fontSize: 28 }} />
                </TouchableOpacity>
              </View>
              <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

              <View style={{ justifyContent: 'center', width:'100%' }}>
                {searchResults.map((result) => {
                  return(
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                      <Image source={{uri: `${result?.thumbnail}`}} style={styles.thumbnail}/>
                      <View>
                        <Text style={{marginTop:5}}>{result.title}</Text>
                        <Text style={{fontFamily: 'Roboto_300Light_Italic', marginTop:2}}>By {result.author}</Text>                      
                      </View>
                    </TouchableOpacity>
                  )})}

          </View>
              </ScrollView>
        </View>
          </View>
                {/* <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('BookmateProfile', { user: selectedBookmate });
                    setModalVisible(!modalVisible);
                  }}
                >
                </TouchableOpacity> */}
      </Modal>

    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  searchHeader: {
    fontFamily: "Baloo2_800ExtraBold",
    color: "#5A7FCC",
    fontSize:20,
    marginBottom:15,
  },
  thumbnail: {
    height: 120,
    width: 80,
    marginVertical:5,
    marginHorizontal:5,
    borderRadius:10,
    marginRight: 10
  }
});
