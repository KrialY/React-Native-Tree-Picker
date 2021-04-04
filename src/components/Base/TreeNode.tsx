import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {Picker} from '@react-native-picker/picker';
const { width: SCREENWIDTH } = Dimensions.get('window');
import { mixKeyByAug } from '../../utils';
interface Props {
  pWidth: number;
  struct: any;
  onSelected: (val: string) => void;
  defaultSelected: string;
  lineItemNumber?: number;
}
export default function TreeNode({ struct, onSelected, defaultSelected, lineItemNumber = 3, pWidth }: Props) {
  const [selectedValue, setSelectedValue] = useState(defaultSelected);

  const traverse = (struct: any) => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={{ width: pWidth / lineItemNumber}}
          numberOfLines={1}
          onValueChange={(itemValue, i) => {
            setSelectedValue(itemValue);
            onSelected(itemValue);
          }}
        >
          {struct.map((item: any) => {
            const key = item.key || item;
            const val = item.name || item;
            return <Picker.Item key={key} label={val} value={mixKeyByAug(key, val)} />;
          })}
        </Picker>
      </View>
    );
  };

  return traverse(struct);
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: "center"
  }
});
