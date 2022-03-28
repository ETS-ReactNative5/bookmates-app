import React from 'react';
import { View, StyleSheet, TextInput, ScrollView, Image } from 'react-native';

const WriteReview = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          placeholder="What are your thoughts on the book?"
          multiline={true}
          numberOfLines={5}
        />
      </View>
    </ScrollView>
  );
};

export default WriteReview;

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    color: '#1DA1F2',
    borderRadius: 50,
    width: 80,
  },
  textInput: {
    flex: 1,
    fontSize: 30,
    marginRight: 10,
  },
  input: {
    fontSize: 20,
  },
  icon: {
    marginRight: 20,
    fontSize: 30,
  },
  image: {
    aspectRatio: 4 / 5,
  },
});
