import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import structData from '../struct';
import { Tree } from '../../src/components';

export default function Example() {
  console.log(structData);
  const struct = {
    uniqueKey: 'key',
    valKey: 'name',
    childrenKey: 'children',
  };

  const onSelected = (path: any) => {
    console.log(path, '//');
  };

  return (
    <>
      <View style={styles.line}>
        <Text>Tree Picker👇:</Text>
      </View>
      <Tree
        defaultSelected="北京市"
        struct={struct}
        onSelected={onSelected}
        structData={structData}
      />
    </>
  );
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: 'lightblue',
  },
});
