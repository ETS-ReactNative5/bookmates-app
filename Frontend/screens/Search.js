import * as React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { BookSearch } from '../components/BookSearch';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SafeAreaView style={{flex:1}}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{height: 40, alignSelf:'center', marginVertical:40, width: '90%', borderRadius:30, backgroundColor:'#F3F5F7'}}
      />

      <ScrollView style={{flex:1}}>
        <View style={{flexDirection: 'row', paddingVertical:20, justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
            Romance
          </Text>
          <TouchableOpacity>
            <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <BookSearch thumbnail={require('./../assets/mebeforeyou.jpg')}/>
          <BookSearch thumbnail={require('./../assets/mockingbird.jpg')}/>
          <BookSearch thumbnail={require('./../assets/EE.jpg')}/>
        </View>

        <View style={{flexDirection: 'row', paddingVertical:20, justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
            Self-Help
          </Text>
          <TouchableOpacity>
            <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <BookSearch thumbnail={require('./../assets/Whomovedmycheese.jpg')}/>
          <BookSearch thumbnail={require('./../assets/RichDadPoorDad.jpg')}/>
          <BookSearch thumbnail={require('./../assets/awakenthegiant.jpg')}/>
        </View>

        <View style={{flexDirection: 'row', paddingVertical:20, justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
            Business
          </Text>
          <TouchableOpacity>
            <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <BookSearch thumbnail={require('./../assets/Zerotoone.jpg')}/>
          <BookSearch thumbnail={require('./../assets/Bigquestions.jpg')}/>
          <BookSearch thumbnail={require('./../assets/AtomicHabits.jpg')}/>
        </View>

        <View style={{flexDirection: 'row', paddingVertical:20, justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
            Fantasy
          </Text>
          <TouchableOpacity>
            <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <BookSearch thumbnail={require('./../assets/mebeforeyou.jpg')}/>
          <BookSearch thumbnail={require('./../assets/mockingbird.jpg')}/>
          <BookSearch thumbnail={require('./../assets/EE.jpg')}/>
        </View>


        <View style={{flexDirection: 'row', paddingVertical:20, justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:20}}>
            Mystery
          </Text>
          <TouchableOpacity>
            <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <BookSearch thumbnail={require('./../assets/Whomovedmycheese.jpg')}/>
          <BookSearch thumbnail={require('./../assets/RichDadPoorDad.jpg')}/>
          <BookSearch thumbnail={require('./../assets/awakenthegiant.jpg')}/>
        </View>

      </ScrollView>

    </SafeAreaView>
    
  );
};

export default Search;