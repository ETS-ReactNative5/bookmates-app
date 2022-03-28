import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, Modal, TouchableOpacity, SafeAreaView } from 'react-native';

export default function BookmatesMap({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 33.787395,
    longitude: 35.72789,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBookmate, setSelectedBookmate] = useState('');
  const [bookmates, setBookmates] = useState([
    {
      id: 1,
      name: 'Laurena Fayad',
      profile_pic: require('./../assets/test_profile_pic.jpg'),
      bio: 'I love books♥',
      followers: 200,
      following: 150,
      longitude: 35.5411,
      latitude: 33.8938,
    },
    {
      id: 2,
      name: 'John Doe',
      profile_pic: require('./../assets/test_profile_pic_male.jpg'),
      bio: 'Chilling',
      followers: 233,
      following: 56,
      longitude: 35.7325,
      latitude: 34.3244,
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Find bookmates nearby</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.903,
          longitude: 35.584,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {/* <Marker 
        coordinate={{ 
          latitude: region.latitude, 
          longitude: region.longitude 
        }} /> */}
        {bookmates.map((item) => {
          return (
            <View key={item.id}>
              <MapView.Marker
                onPress={() => {
                  setSelectedBookmate(item);
                  setModalVisible(true);
                }}
                pinColor="red"
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
              />
            </View>
          );
        })}
      </MapView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalContainerStyle}>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 60 }}>
            <View
              style={{
                borderRadius: 20,
                padding: 20,
                width: 300,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: '#FFFFFFFF',
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Image
                  style={{ width: 70, height: 70, borderRadius: 100 }}
                  source={selectedBookmate && selectedBookmate.profile_pic}
                />
              </View>
              <View style={{ marginLeft: 10, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Baloo2_600SemiBold', fontSize: 16, marginBottom: 8 }}>
                  {selectedBookmate && selectedBookmate.name}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('BookmateProfile', { user: selectedBookmate });
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.button_text}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    elevation: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: -10,
  },
  logo: {
    fontFamily: 'Baloo2_800ExtraBold',
    color: '#5A7FCC',
    textAlign: 'center',
    fontSize: 18,
  },
  modalContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  button: {
    width: 100,
    height: 30,
    backgroundColor: '#5A7FCC',
    borderRadius: 20,
    justifyContent: 'center',
  },
  button_text: {
    color: 'white',
    fontFamily: 'Baloo2_600SemiBold',
    textAlign: 'center',
  },
});
