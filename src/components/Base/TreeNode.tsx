import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
interface Props {
  pWidth: number;
  structData: any;
  onSelected: (val: string) => void;
  defaultSelected: string;
  lineItemNumber?: number;
  valkey?: string;
  uniqueKey?: string;
}
export default function TreeNode({
  structData,
  onSelected,
  defaultSelected,
  lineItemNumber = 3,
  pWidth,
  valkey,
  uniqueKey,
}: Props) {
  const [selectedValue, setSelectedValue] = useState(defaultSelected);

  const traverse = (structData: any) => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={{ width: pWidth / lineItemNumber }}
          numberOfLines={1}
          onValueChange={(itemValue, i) => {
            setSelectedValue(itemValue);
            onSelected(itemValue);
          }}>
          {structData.map((item: any) => {
            const key = item[uniqueKey as any] || item;
            const val = item[valkey as any] || item;
            return <Picker.Item key={key} label={val} value={key} />;
          })}
        </Picker>
      </View>
    );
  };

  return traverse(structData);
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
  },
});
