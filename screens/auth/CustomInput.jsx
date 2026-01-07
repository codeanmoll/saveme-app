import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export default function CustomInput({ placeholder, value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"  // grey placeholder
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    marginTop: 18
  },
  input: {
    // backgroundColor: "#1E1E1E",   // Android dark background
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    color: "#FFF",             // text color
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#2F3640",      // subtle border
  },
});
