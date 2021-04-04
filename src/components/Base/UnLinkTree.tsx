import React from "react";
import { View, StyleSheet } from "react-native";
import TreeNode from "./TreeNode";

interface Props {
  pWidth:  number;
  struct: Array<Array<string>>;
  defaultSelectedArr?: Array<number>;
  onSelected?: (path: Array<string>) => void;
  columeOfNum?: number;
}
export default function Tree({struct, defaultSelectedArr = [], onSelected, pWidth, columeOfNum}: Props) {
  const path: Array<string> = [];
  const res = struct.map((item, i) => {
    // item[0]可能为undefined，暂未处理
    path[i] = defaultSelectedArr[i] === undefined ? item[0] : item[defaultSelectedArr[i]];
    return (
      <TreeNode
        lineItemNumber={columeOfNum}
        pWidth={pWidth}
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