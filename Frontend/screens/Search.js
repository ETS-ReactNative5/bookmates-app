import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{alignSelf:'center', marginVertical:40, width: '90%', borderRadius:30, backgroundColor:'#F3F5F7'}}
    />
  );
};

export default Search;