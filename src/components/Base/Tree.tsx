import React, { useState, useEffect, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import TreeNode from './TreeNode';

interface PathRes {
  path: Array<string>;
  pathObj: Array<object>;
}
const findPath = (
  structData: Array<any>,
  key: string,
  valKey: string,
  uniqueKey: string,
  childrenKey: string,
): PathRes => {
  let resPath: Array<string> = [],
    resObj: Array<object> = [];

  dfs(structData, [], [], key, false);
  function dfs(
    structData: any,
    path: Array<string>,
    pathObj: Array<any>,
    key: string,
    isFind?: boolean,
  ) {
    if (isFind || !structData || structData.length <= 0) {
      return;
    }

    for (let i = 0; i < structData.length; i++) {
      let node = structData[i];
      const mixKey = node[uniqueKey];
      path.push(mixKey);
      pathObj.push({ key: node[uniqueKey], val: node[valKey] });
      if (mixKey === key) {
        isFind = true;
        let nodes = node[childrenKey];
        while (nodes && nodes.length > 0) {
          let firstNode = nodes[0];
          path.push(firstNode[uniqueKey]);
          pathObj.push({ key: firstNode[uniqueKey], val: firstNode[valKey] });
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
  // 如果整棵N叉树查找完成之后没有结果，则返回树的第一个分支。
  if (resPath.length === 0) {
    return findPath(
      structData,
      structData[0][uniqueKey],
      valKey,
      uniqueKey,
      childrenKey,
    );
  }
  return {
    path: resPath,
    pathObj: resObj,
  };
};

export interface Struct {
  uniqueKey: string;
  valKey: string;
  childrenKey: string;
}

/**
 * @param defaultSelected 默认选择的选项可能不存在，此时会选择数据的第一项
 * @param structData 可能为数组，还存在问题，待处理
 */
export interface Props {
  structData: Array<Object>;
  defaultSelected?: string;
  onSelected?: (path: Array<any>) => void;
  columeOfNum?: number;
  struct: Struct;
  level?: number;
}

export default function Tree({
  structData,
  defaultSelected = '浙江省',
  onSelected,
  columeOfNum,
  struct,
  level,
}: Props) {
  const [selected, setSelected] = useState(defaultSelected);
  const [pWidth, setPWidth] = useState(0);
  const { valKey, uniqueKey, childrenKey } = struct;
  const { path, pathObj }: PathRes = findPath(
    structData,
    selected,
    valKey,
    uniqueKey,
    childrenKey,
  );

  console.log('render');
  useEffect(() => {
    onSelected && onSelected(pathObj);
  }, [selected]);
  const traverse = (structData: any, dep: number) => {
    if (
      !structData ||
      structData.length <= 0 ||
      (level !== undefined && dep >= level)
    ) {
      return;
    }
    const res = structData.map((item: any) => {
      let key: string = item[uniqueKey];

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
          valKey={valKey}
          uniqueKey={uniqueKey}
          lineItemNumber={columeOfNum}
          onSelected={val => {
            // 性能优化，减少render次数。选择父节点的时候，默认会渲染父元素下的第一个子元素，子元素初始化会调用onSelected事件
            // 从而反复调用setSelected。如果当前路径已经包括了需要选择的目标则停止渲染。
            if (!path.includes(val)) {
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
    const { width } = e.nativeEvent.layout;
    if (pWidth <= 0) {
      setPWidth(width);
    }
  };

  return (
    <View onLayout={_onLayout} style={styles.treeWrapper}>
      {traverse(structData, 0)}
    </View>
  );
}

const styles = StyleSheet.create({
  treeWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
