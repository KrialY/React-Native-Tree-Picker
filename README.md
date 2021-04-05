# React-Native-Tree-Selector
React Native多级选择器，支持任意层级。
## 基础组件-Tree
### Demo
#### Tree Picker
[structData]()
````javascript
import structData from '../struct';
export default function Example() {
  const struct = {
    uniqueKey: 'key',
    valkey: 'name',
    childrenKey: 'children'
  }

  const onSelected = (path: any) => {
    console.log(path);
  }

  return (
    <>
      <View style={styles.line}>
        <Text>Tree Picker👇:</Text>
      </View>
      <Tree struct={struct} onSelected={onSelected} structData={structData} />
    </>
  )
}
````
### API
| 属性 | 说明 | 是否必传 | 默认值 |
| --- | --- | --- |--- |
| structData | 数据 | 是 | 无 |
| onSelected | 切换选项的回调函数，第一个参数返回当前选中的信息数组 | 否 | 无 |
| columnOfline | 一行展示多少个选择器 | 否 | 3 |
| level | 最多渲染多少级的节点 | 否 | 无限制 |
| struct | 定义传入数据的数据结构 | 是 | 无 |
