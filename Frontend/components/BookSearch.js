import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export const BookSearch = ({title, description, thumbnail, author}) => {
    const navigation = useNavigation(); 
    return(
        <TouchableOpacity onPress={() => navigation.navigate('BookDetails',{
            title: title,
            thumbnail: thumbnail,
            description: description,
            author: author})}>
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