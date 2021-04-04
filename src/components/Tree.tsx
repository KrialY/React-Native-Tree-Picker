import React, { useState, Fragment } from "react";
import { View, StyleSheet } from "react-native";
import TreeNode from "./TreeNode";

const findPath = (struct: any, key: string) => {
  let res = null;

  dfs(struct, [], key, false);
  function dfs(struct: any, path: Array<string>, key: string, isFind?: boolean) {
    if (isFind || !struct || struct.length <= 0) return;

    for (let i = 0; i < struct.length; i++) {
      let node = struct[i];
      path.push(node.key);
      if (node.key === key) {
        isFind = true;
        let nodes = node.children;
        while (nodes && nodes.length > 0) {
          path.push(nodes[0].key);
          nodes = nodes[0].children;
        }
        res = [...path];
        return;
      }
      dfs(node.children, path, key);
      path.pop();
    }
  }
  return res;
};

interface Props {
  struct: any;
  defaultSelected: string;
  onSelected: (val: string) => void;
}
export default function Tree({ struct, defaultSelected, onSelected }: Props) {
  const [selected, setSelected] = useState(defaultSelected);
  const path: Array<string> = findPath(struct, selected) || [];
  
  console.log("Tree Render");
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
            
            console.log(val);
            if(dep === path.length - 1) {
              onSelected(val);
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
  },
  pickerContainer: {
    flex: 1
  }
});
