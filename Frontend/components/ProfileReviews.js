import React from 'react';
import {View, Text, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import { BookSearch } from '../components/BookSearch';

const ProfileReviews = () => {
return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
        width: '100%',
        height: '100%',
    }}>
        <View
            style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
            }}>
            <Text>Reviews</Text>        
        </View>
    </ScrollView>
)};

export default ProfileReviews;