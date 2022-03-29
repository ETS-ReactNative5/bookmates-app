import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const BookSearch = ({book}) => {
    const navigation = useNavigation(); 
    return(
        <TouchableOpacity onPress={() => navigation.navigate('BookDetails', {book})}>
            <Image source={{uri: `${book.thumbnail}`}}
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

export default BookSearch;