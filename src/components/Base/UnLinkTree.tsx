import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TreeNode from "./TreeNode";

interface Props {
  struct: Array<Array<string>>;
  defaultSelectedArr?: Array<number>;
  onSelected: (path: Array<string>) => void;
}
export default function Tree({struct, defaultSelectedArr = [], onSelected}: Props) {
  const path: Array<string> = [];
  const res = struct.map((item, i) => {
    // item[0]可能为undefined，暂未处理
    path[i] = defaultSelectedArr[i] === undefined ? item[0] : item[defaultSelectedArr[i]];
    return (
      <TreeNode
        defaultSelected={path[i]}
        key={`${item}-${i}`}
        onSelected={(val) => {
          path[i] = val;
          onSelected && onSelected(path);
        }}
        struct={item}
      />
    )
  });
  return (
    <View style={styles.treeWrapper}>{res}</View>
  );
}

const styles = StyleSheet.create({
  treeWrapper: {
    flexDirection: "row"
  }
});