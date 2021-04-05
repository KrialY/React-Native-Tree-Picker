import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CountryPicker } from '../../src/components'

export default function Example() {
  const onSelected = (path: any) => {
    console.log(path);
  }

  return (
    <>
      <View style={styles.line}>
        <Text>CountryPicker👇:</Text>
      </View>
      <CountryPicker onSelected={onSelected} />
    </>
  )
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: 'lightblue'
  }
});