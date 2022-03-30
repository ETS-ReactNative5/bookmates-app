import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const BookSearch = ({book}) => {
    const navigation = useNavigation(); 
    return(
        <TouchableOpacity onPress={() => navigation.navigate('BookDetails', {book: book})}>
            <Image source={{uri: `${book?.thumbnail}`}}
            style={{
                resizeMode: 'cover',
                width: 95,
                height: 140,
                borderRadius: 5,
                marginBottom:10,
                marginHorizontal:10, 
            }}/>
        </TouchableOpacity>
    )
}

export default BookSearch;