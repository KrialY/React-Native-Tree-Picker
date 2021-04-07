import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { struct2 as structData } from '../struct';
import { UnLinkTree } from '../../src/components'

export default function Example() {
  const onSelected = (path: any) => {
    console.log(path);
  }

  const defaultSelectedArr = [2, 1];

  return (
    <>
      <View style={styles.line}>
        <Text>Tree Picker👇:</Text>
      </View>
      <UnLinkTree defaultSelectedArr={defaultSelectedArr} onSelected={onSelected} structData={structData} />
    </>
  )
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: 'lightblue'
  }
});