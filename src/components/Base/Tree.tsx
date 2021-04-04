import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet } from "react-native";
import TreeNode from "./TreeNode";

const findPath = (struct: any, key: string): any => {
  let resPath = null,
    resObj = null;

  dfs(struct, [], [], key, false);
  function dfs(struct: any, path: Array<string>, pathObj: Array<any>, key: string, isFind?: boolean) {
    if (isFind || !struct || struct.length <= 0) return;

    for (let i = 0; i < struct.length; i++) {
      let node = struct[i];
      path.push(node.key);
      pathObj.push({key: node.key, val: node.name});
      if (node.key === key) {
        isFind = true;
        let nodes = node.children;
        while (nodes && nodes.length > 0) {
          let firstNode = nodes[0];
          path.push(firstNode.key);
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

interface Props {
  struct: any;
  defaultSelected: string;
  onSelected: (path: Array<string>) => void;
}
export default function Tree({ struct, defaultSelected, onSelected }: Props) {
  const [selected, setSelected] = useState(defaultSelected);
  const { path, pathObj }: any = findPath(struct, selected) || [];
  
  useEffect(() => {
    onSelected && onSelected(pathObj);
  }, [selected]);
  const traverse = (struct: any, dep: number) => {
    if (!struct || struct.length <= 0) return;
    const res = struct.map((item: any) => {
      let key: string = item.key;

      if (path.includes(key)) {
        return (
          <Fragment key={key}>{traverse(item.children, dep + 1)}</Fragment>
        );
      }
    });
    return (
      <>
        <TreeNode
          defaultSelected={path[dep]}
          key={dep}
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

  return <View style={styles.treeWrapper}>{traverse(struct, 0)}</View>;
}



const styles = StyleSheet.create({
  treeWrapper: {
    flexDirection: "row"
  }
});
