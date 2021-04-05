import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import TreeNode from "./TreeNode";

interface Props {
  structData: Array<Array<string>>;
  defaultSelectedArr?: Array<number>;
  onSelected?: (path: Array<string>) => void;
  columeOfNum?: number;
}
export default function Tree({structData, defaultSelectedArr = [], onSelected, columeOfNum}: Props) {
  const [pWidth, setPWidth] = useState(0);
  const path: Array<string> = [];
  const res = structData.map((item, i) => {
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
        structData={item}
      />
    )
  });

  const _onLayout = (e: any) => {
    const {width} = e.nativeEvent.layout;
    if(pWidth <= 0) {
      setPWidth(width);
    }
  }

  return (
    <View onLayout={_onLayout} style={styles.treeWrapper}>{res}</View>
  );
}

const styles = StyleSheet.create({
  treeWrapper: {
    flexDirection: "row"
  }
});