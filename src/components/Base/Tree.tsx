import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet } from "react-native";
import TreeNode from "./TreeNode";

const findPath = (structData: any, key: string, valkey: string, uniqueKey: string, childrenKey: string): any => {
  let resPath: any = [],
    resObj: any = [];

  dfs(structData, [], [], key, false);
  function dfs(structData: any, path: Array<string>, pathObj: Array<any>, key: string, isFind?: boolean) {
    if (isFind || !structData || structData.length <= 0) return;

    for (let i = 0; i < structData.length; i++) {
      let node = structData[i];
      const mixKey = node[uniqueKey];
      path.push(mixKey);
      pathObj.push({key: node[uniqueKey], val: node[valkey]});
      if (mixKey === key) {
        isFind = true;
        let nodes = node[childrenKey];
        while (nodes && nodes.length > 0) {
          let firstNode = nodes[0];
          path.push(firstNode[uniqueKey]);
          pathObj.push({key: firstNode[uniqueKey], val: firstNode[valkey]});
          nodes = firstNode[childrenKey];
        }
        resPath = [...path];
        resObj = [...pathObj];
        return;
      }
      dfs(node[childrenKey], path, pathObj, key);
      path.pop();
      pathObj.pop();
    }
  }
  return {
    path: resPath,
    pathObj: resObj
  }
};

export interface Struct {
  uniqueKey: string;
  valkey: string;
  childrenKey: string;
}
export interface Props {
  structData: Array<Object>;
  defaultSelected?: string;
  onSelected?: (path: Array<string>) => void;
  columeOfNum?: number;
  struct: Struct;
  level?: number;
}

export default function Tree({ structData, defaultSelected = "浙江省", onSelected, columeOfNum, struct, level }: Props) {
  const [selected, setSelected] = useState(defaultSelected);
  const [pWidth, setPWidth] = useState(0);
  const { valkey, uniqueKey, childrenKey } = struct;
  const { path, pathObj }: any = findPath(structData, selected, valkey, uniqueKey, childrenKey);
  
  useEffect(() => {
    onSelected && onSelected(pathObj);
  }, [selected]);
  const traverse = (structData: any, dep: number) => {
    if (!structData || structData.length <= 0 || (level !== undefined && dep >= level)) return;
    const res = structData.map((item: any) => {
      let key: string = item[valkey];

      if (path.includes(key)) {
        return (
          <Fragment key={key}>{traverse(item[childrenKey], dep + 1)}</Fragment>
        );
      }
    });
    return (
      <>
        <TreeNode
          pWidth={pWidth}
          defaultSelected={path[dep]}
          key={dep}
          valkey={valkey}
          uniqueKey={uniqueKey}
          lineItemNumber={columeOfNum}
          onSelected={(val) => {
            // 性能优化，减少render次数。选择父节点的时候，默认会渲染父元素下的第一个子元素，子元素初始化会调用onSelected事件
            // 从而反复调用setSelected。如果当前路径已经包括了需要选择的目标则停止渲染。
            if(!path.includes(val)) {
              setSelected(val);
            }
          }}
          structData={structData}
        />
        {res}
      </>
    );
  };
  
  const _onLayout = (e: any) => {
    const {width} = e.nativeEvent.layout;
    setPWidth(width);
  }

  return <View onLayout={_onLayout} style={styles.treeWrapper}>{traverse(structData, 0)}</View>;
}



const styles = StyleSheet.create({
  treeWrapper: {
    flexDirection: "row",
    flexWrap: 'wrap'
  }
});
