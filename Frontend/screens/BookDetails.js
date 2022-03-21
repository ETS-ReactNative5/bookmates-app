import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const BookDetails = ({route, navigation}) => {

  const {title, thumbnail, description, author} = route.params;
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6886C5" barStyle="light-content" />

      {/*Header sec*/}
      <View style={styles.header}>

        {/*Navigation buttons*/}
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/*Book thumbnail, title and author*/}
        <View style={{alignSelf:'center'}}>
          <Image style={{width:131, height:191, borderRadius:10}} source={thumbnail}/>
          <Text style={styles.book_title}>{title}</Text>
          <Text style={styles.book_author}>By {author}</Text>
        </View>
      </View>

      {/*White section*/}
      <View style={[styles.description, { backgroundColor: '#ffffff' }]}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIndicatorStyle: {
              backgroundColor: '#6886C5',
              height: 2.5,
            },
            tabBarLabelStyle: { fontSize: 14, fontWeight:'bold'},
          })}>
          <Tab.Screen name="Description" component={Description} initialParams={{description}}  />
          <Tab.Screen name="Reviews" component={BookReviews} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default BookDetails;

export const Description = ({description}) => {
  return (
    <View style={{backgroundColor:'white', flex:1}}>
      <Text>{description}</Text>
    </View>
  )
};

export const BookReviews = () => {
  return (
    <Text>Reviews</Text>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6886C5',
  },
  header: {
    flex: 1,
    color: 'white',
    marginTop:30,
    paddingHorizontal:20
  },
  description: {
    flex: 1.2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  book_title: {
    textAlign:'center', 
    color:'white',
    fontSize:18,
    fontWeight:'bold',
    paddingTop:10
  },
  book_author: {
    textAlign:'center',
    color:'white', 
    fontSize:16, 
    fontStyle:'italic',
    paddingTop:3
  }
});