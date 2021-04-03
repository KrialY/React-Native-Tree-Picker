/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';
import PickerView from './src/components/PickerView';
// import {PickerView} from 'react-native-pickers';

const App = () => {
  const list = ["list1", "list2", "list3", "list4"];

  return (
    <>
      <View style={styles.container}>
        <PickerView
          list={list}
          onPickerSelected={(toValue) => {
            // console.warn(toValue)
          }}
          selectedIndex={0}
          fontSize={14}
          itemWidth={100}
          itemHeight={50}
        /> 
      </View>
      <PickerView
        list={list}
        onPickerSelected={(toValue) => {
          // console.warn(toValue)
        }}
        selectedIndex={0}
        fontSize={14}
        itemWidth={300}
        itemHeight={50}
      /> 
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  },
});

export default App;
