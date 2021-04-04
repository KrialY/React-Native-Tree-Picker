/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from "react";
 import { StyleSheet } from "react-native";
 import Tree from "./src/components/Base";
 import struct, {struct2} from "./src/struct";
 
 // 这里并不需要让用户输入数组类型的selected来选择选中哪个分支，
 // 我们只需要让用户传入选中的分支的ID即可，如果是叶子分支，那么渲染到叶子分支即可
 // 如果不是叶子分支，那么渲染到该分支后，默认会一直渲染该分支下的第一个分支，直至渲染至叶子分支。
 // 这里我们需要写一个N叉树的搜索算法，该算法支持记录路径
 export default function APP() {

   const onSelected = (val: Array<string>) => {
    console.log(val);
   }
   return (
     <>
      <Tree struct={struct2} onSelected={onSelected} />
     </>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "center",
     backgroundColor: "rgb(255, 255, 255)"
   },
   text: {
     color: "#000",
     fontWeight: "bold"
   }
 });
 