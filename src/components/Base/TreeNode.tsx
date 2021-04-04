import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';

interface Props {
  struct: any;
  onSelected: (val: string) => void;
  defaultSelected: string;
}
export default function TreeNode({ struct, onSelected, defaultSelected }: Props) {
  const [selectedValue, setSelectedValue] = useState(defaultSelected);

  const traverse = (struct: any) => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            onSelected(itemValue);
          }}
        >
          {struct.map((item: any) => {
            const key = item.key || item;
            const val = item.name || item;
            return <Picker.Item key={key} label={val} value={key} />;
          })}
        </Picker>
      </View>
    );
  };

  return traverse(struct);
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    alignItems: "center"
  }
});
