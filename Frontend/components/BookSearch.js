import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export const BookSearch = ({title, description, thumbnail}) => {
    return(
        <TouchableOpacity>
            <Image source={thumbnail}
            style={{
                resizeMode: 'cover',
                width: 94,
                height: 128,
                borderRadius: 10,
                marginBottom:10,
            }}/>
        </TouchableOpacity>
    )
}
