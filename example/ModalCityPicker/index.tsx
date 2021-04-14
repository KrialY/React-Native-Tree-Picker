import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ModalCityPicker } from '../../src/components';

export default function Example() {
  const ref: any = useRef(null);
  const onSelected = (path: any) => {
    console.log(path);
  };

  const showPicker = () => {
    ref.current.show();
  };

  return (
    <>
      <View style={styles.line}>
        <Text>ModalCountryPicker👇:</Text>
      </View>
      <TouchableOpacity onPress={showPicker}>
        <Text>Show ModalCountryPicker</Text>
      </TouchableOpacity>
      <ModalCityPicker ref={ref} onSelected={onSelected} />
    </>
  );
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: 'lightblue',
  },
});
