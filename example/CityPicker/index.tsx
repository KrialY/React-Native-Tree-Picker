import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CityPicker } from '../../src/components';

export default function Example() {
  const onSelected = (path: any) => {
    console.log(path);
  }

  return (
    <>
      <View style={styles.line}>
        <Text>CityPicker👇:</Text>
      </View>
      <CityPicker defaultSelected={"乐清市"} onSelected={onSelected} />
    </>
  )
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: 'lightblue'
  }
});