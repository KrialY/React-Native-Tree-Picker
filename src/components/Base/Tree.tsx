import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet } from "react-native";
import TreeNode from "./TreeNode";
import { mixKeyByAug } from '../../utils';

const findPath = (struct: any, key: string): any => {
  let resPath: any = [],
    resObj: any = [];

  dfs(struct, [], [], key, false);
  function dfs(struct: any, path: Array<string>, pathObj: Array<any>, key: string, isFind?: boolean) {
    if (isFind || !struct || struct.length <= 0) return;

    for (let i = 0; i < struct.length; i++) {
      let node = struct[i];
      const mixKey = mixKeyByAug(node.key, node.name);
      path.push(mixKey);
      pathObj.push({key: node.key, val: node.name});
      if (mixKey === key) {
        isFind = true;
        let nodes = node.children;
        while (nodes && nodes.length > 0) {
          let firstNode = nodes[0];
          path.push(mixKeyByAug(firstNode.key, firstNode.name));
          pathObj.push({key: firstNode.key, val: firstNode.name});
          nodes = firstNode.children;
        }
        resPath = [...path];
        resObj = [...pathObj];
        return;
      }
      dfs(node.children, path, pathObj, key);
      path.pop();
      pathObj.pop();
    }
  }
  return {
    path: resPath,
    pathObj: resObj
  }
};

export interface Props {
  struct: Array<Object>;
  defaultSelected?: string;
  onSelected?: (path: Array<string>) => void;
  columeOfNum?: number;
}

export default function Tree({ struct, defaultSelected = "name - 山东省", onSelected, columeOfNum }: Props) {
  const [selected, setSelected] = useState(defaultSelected);
  const { path, pathObj }: any = findPath(struct, selected);
  const [pWidth, setPWidth] = useState(0);
  
  useEffect(() => {
    onSelected && onSelected(pathObj);
  }, [selected]);
  const traverse = (struct: any, dep: number) => {
    if (!struct || struct.length <= 0) return;
    const res = struct.map((item: any) => {
      let key: string = mixKeyByAug(item.key, item.name);

      if (path.includes(key)) {
        return (
          <Fragment key={key}>{traverse(item.children, dep + 1)}</Fragment>
        );
      }
    });
    return (
      <>
        <TreeNode
          pWidth={pWidth}
          defaultSelected={path[dep]}
          key={dep}
          lineItemNumber={columeOfNum}
          onSelected={(val) => {
            // 性能优化，减少render次数。选择父节点的时候，默认会渲染父元素下的第一个子元素，子元素初始化会调用onSelected事件
            // 从而反复调用setSelected。如果当前路径已经包括了需要选择的目标则停止渲染。
            if(!path.includes(val)) {
              setSelected(val);
            }
          }}
          struct={struct}
        />
        {res}
      </>
    );
  };
  
  const _onLayout = (e: any) => {
    const {width} = e.nativeEvent.layout;
    setPWidth(width);
  }

  return <View onLayout={_onLayout} style={styles.treeWrapper}>{traverse(struct, 0)}</View>;
}



const styles = StyleSheet.create({
  treeWrapper: {
    flexDirection: "row",
    flexWrap: 'wrap'
  }
});
