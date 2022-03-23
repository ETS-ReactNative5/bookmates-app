import React, { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import webview from 'react-native-webview'


export default function BookmatesMap() {

  const [user, setUser] = useState({
    name:'Laurena Fayad',
    profile_pic:require('./../assets/test_profile_pic.jpg'),
    bio:'I love books♥'
  })
  
  const [pin, setPin] = useState({
    latitude: 33.890536626710244,
    longitude: 35.489303601542964,
    user
  });
  const [region, setRegion] = useState({
    latitude: 33.890536626710244,
    longitude: 35.489303601542964,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Find bookmates nearby</Text>
        </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.890536626710244,
          longitude: 35.489303601542964,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}} />
        <Marker
          coordinate={pin}
          pinColor="red"
        >
          <Callout style={{borderRadius:100, width:200, height:100}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{width:50, height:50, borderRadius:100}}><Image  source={require('./../assets/test_profile_pic.jpg')}/></Text>
              <Text>{pin.user.name}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  header:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:'white',
    elevation: 10,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
  logo:{
    fontFamily:'Baloo2_800ExtraBold',
    color:'#6886C5',
    textAlign:'center',
    fontSize:18
  }
});
