import React, { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function BookmatesMap() {
  const [user, setUser] = useState({
    name:'Laurena Fayad',
    profile_pic:require('./../assets/test_profile_pic'),
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
          <Callout>

            <Text>{pin.user.name}</Text>
          
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
});
