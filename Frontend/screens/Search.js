import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  RefreshControl,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Searchbar } from 'react-native-paper';
import BookSearch from '../components/BookSearch';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  const getSuggestions = async () => {
    const token = await SecureStore.getItemAsync('token')
    await fetch('http://192.168.1.10:3000/api/book/suggestions', {
      headers: {
        Authorization:
          'Bearer '+token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setSuggestions(result);
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
        style={{
          height: 40,
          alignSelf: 'center',
          marginVertical: 20,
          width: '90%',
          borderRadius: 30,
          backgroundColor: '#F3F5F7',
        }}
      />

      <Text
        style={{ color: '#5A7FCC', paddingLeft: 20, fontFamily: 'Baloo2_600SemiBold', fontSize: 20, marginBottom: 15 }}
      >
        Wondering what to read next?
      </Text>

      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getSuggestions} />}
        style={{ marginHorizontal: 15 }}
        renderItem={({ item }) => <BookSearch book={item} />}
        data={suggestions}
        keyExtractor={(item) => String(item._id)}
        numColumns={3}
      />
    </SafeAreaView>
  );
};

export default Search;
