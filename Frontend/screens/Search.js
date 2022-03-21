import * as React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { BookSearch } from '../components/BookSearch';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{height: 40, alignSelf:'center', marginVertical:40, width: '90%', borderRadius:30, backgroundColor:'#F3F5F7'}}
      />

      <ScrollView style={{flex:1}}>
        <View style={{flexDirection: 'row', paddingVertical:20, justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:18}}>
            Romance
          </Text>
          <TouchableOpacity>
            <Text style={{color:'#6886C5', paddingRight:20}}>See more</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <BookSearch thumbnail={require('./../assets/mebeforeyou.jpg')} 
          title="Me Before You"
          author="Jojo Moyes"
          description="They had nothing in common until love gave them everything to lose...Louisa Clark is an ordinary girl living an exceedingly ordinary life—steady boyfriend, close family—who has barely been farther afield than their tiny village. She takes a badly needed job working for exMaster of the Universe Will Traynor, who is wheelchair bound after an accident. Will has always lived a huge life—big deals, extreme sports, worldwide travel—and now hes pretty sure he cannot live the way he is.
          Will is acerbic, moody, bossy—but Lou refuses to treat him with kid gloves, and soon his happiness means more to her than she expected. When she learns that Will has shocking plans of his own, she sets out to show him that life is still worth living.
          A Love Story for this generation and perfect for fans of John Greens The Fault in Our Stars, Me Before You brings to life two people who couldnt have less in common—a heartbreakingly romantic novel that asks, What do you do when making the person you love happy also means breaking your own heart?"/>
          <BookSearch thumbnail={require('./../assets/mockingbird.jpg')}/>
          <BookSearch thumbnail={require('./../assets/EE.jpg')}/>
        </View>

        <View style={{flexDirection: 'row', paddingVertical:20, justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:18}}>
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
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:18}}>
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
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:18}}>
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
          <Text style={{color: '#6886C5', paddingLeft:20, fontFamily:'Baloo2_600SemiBold', fontSize:18}}>
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