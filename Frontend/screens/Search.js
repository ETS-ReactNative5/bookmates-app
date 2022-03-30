import React, {useState} from 'react';
import axios  from 'axios';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import BookSearch from '../components/BookSearch';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          height: 40,
          alignSelf: 'center',
          marginVertical: 40,
          width: '90%',
          borderRadius: 30,
          backgroundColor: '#F3F5F7',
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={{ color: '#5A7FCC', paddingLeft: 20, fontFamily: 'Baloo2_600SemiBold', fontSize:22 }}>
            Today's Suggestions
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>



        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
