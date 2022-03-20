import * as React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import { Searchbar } from 'react-native-paper';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{height: 40, alignSelf:'center', marginVertical:40, width: '90%', borderRadius:30, backgroundColor:'#F3F5F7'}}
      />
      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
          Romance
        </Text>
        <TouchableOpacity>
          <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
          Self-Help
        </Text>
        <TouchableOpacity>
          <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
          Business
        </Text>
        <TouchableOpacity>
          <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
          Fantasy
        </Text>
        <TouchableOpacity>
          <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
          Mystery
        </Text>
        <TouchableOpacity>
          <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>

    
  );
};

export default Search;