# React-Native-Tree-Picker
React Native多级选择器，支持任意层级。底层使用React Native官方给出的[@react-native-community/picker](https://github.com/react-native-picker/picker)
因此针对不同平台所展示的UI是和@react-native-community/picker一致的。
| Android | iOS  | MacOS | Windows |
| --- | ---  | --- | --- |
| <img src="https://gitee.com/krialy/images/raw/master/source/20210407100943.png" width="150"> | <img src="https://gitee.com/krialy/images/raw/master/source/20210407101103.png" width="150"> | <img src="https://gitee.com/krialy/images/raw/master/source/20210407101138.png" width="300"> | <img src="https://gitee.com/krialy/images/raw/master/source/20210407101213.png" width="300"> |
## 如何使用 How to use
npm install @react-native-picker/picker --save
npm install rn-tree-picker --save
## 基础组件 BaseComponent
### Tree Picker
#### Demo
[structData](https://github.com/KrialY/React-Native-Tree-Selector/blob/main/src/components/CountryPicker/countryData.js)
##### 自定义数据结构适配不同的数据
- Demo1
````typescript
const struct = {
  uniqueKey: 'key',
  valkey: 'name',
  childrenKey: 'children'
};
const structData = [
  {
    key: '1',
    name: 'ming',
    children: [
      {
        key: '11',
        name: 'hua',
        children: []
      }, ...
    ]
  },
  {
    key: '2',
    name: 'tian',
    children: []
  }, ...
]
````
- Demo2
````typescript
const struct = {
  uniqueKey: 'mykey',
  valkey: 'myval',
  childrenKey: 'mychildren'
};
const structData = [
  {
    mykey: '1',
    myval: 'ming',
    mychildren: [
      {
        mykey: '11',
        myval: 'hua',
        mychildren: []
      }, ...
    ]
  },
  {
    mykey: '2',
    myval: 'tian',
    mychildren: []
  }, ...
]
````
##### 完整的Demo
````typescript
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
#### 效果

![TreePicker](https://gitee.com/krialy/images/raw/master/source/20210406112753.gif)

#### API
| 属性 | 说明 | 类型 | 是否必传 | 默认值 |
| --- | --- | --- | --- | --- |
| struct | 定义传入数据的数据结构 | Object | 是 | 无 |
| structData | 数据 | Array<Object> | 是 | 无 |
| onSelected | 切换选项的回调函数，第一个参数返回当前选中的信息数组 | (Array<Object>) => void | 否 | 无 |
| columnOfline | 一行展示多少个选择器 | number | 否 | 3 |
| level | 最多渲染多少级的节点| number | 否 | 无限制 |
| defaultSelected | 默认选中的选项 | struct.key（数据结构中的key的类型） | 否 | 第一项 |

### UnLinkTreePicker
#### Demo
````typescript
const structData = [["list1", "list2", "list3"],["list5","list6"],["list8"]];

export default function Example() {
  const onSelected = (path: any) => {
    console.log(path);
  }

  return (
    <>
      <View style={styles.line}>
        <Text>Tree Picker👇:</Text>
      </View>
      <UnLinkTree onSelected={onSelected} structData={structData} />
    </>
  )
}
````
#### 效果

![UnLinkTreePicker](https://gitee.com/krialy/images/raw/master/source/20210406112820.gif)

#### API
| 属性 | 说明 | 类型 | 是否必传 | 默认值 |
| --- | --- | --- | --- | --- |
| structData | 数据 | Array<Array<string>> | 是 | 无 |
| onSelected | 切换选项的回调函数，第一个参数返回当前选中的信息数组 | (Array<string>) => void | 否 | 无 |
| defaultSelected | 默认选中的选项 | Array<string> | 否 | 第一项 |
| columnOfline | 一行展示多少个选择器 | number | 否 | 3 |
## 衍生组件
### CityPicker
#### Demo
````typescript
import { CityPicker } from '../../src/components'

export default function Example() {
  const onSelected = (path: any) => {
    console.log(path);
  }

  return (
    <>
      <View style={styles.line}>
        <Text>CityPicker👇:</Text>
      </View>
      <CityPicker onSelected={onSelected} />
    </>
  )
}
````
#### 效果

![CityPicker](https://gitee.com/krialy/images/raw/master/source/20210406112923.gif)

#### API
| 属性 | 说明 | 类型 | 是否必传 | 默认值 |
| --- | --- | --- | --- | --- |
| columeOfNum | 一行展示多少个选择器 | number | 否 | 3 |
| onSelected | 切换选项的回调函数，第一个参数返回当前选中的信息数组 | (Array<Object>) => void | 否 | 无 |
| level | 最多渲染多少级的节点 | number | 否 | 无限制 |
| defaultSelected | 默认选中的选项 | string（省市的名称，例如：浙江省） | 否 | 第一项 |
### ModalCityPicker
#### Demo
````typescript
import { ModalCityPicker } from '../../src/components'

export default function Example() {
  const ref: any = useRef(null);
  const onSelected = (path: any) => {
    console.log(path);
  }

  const showPicker = () => {
    ref.current.show();
  }
  
  return (
    <>
      <View style={styles.line}>
        <Text>ModalCityPicker👇:</Text>
      </View>
      <TouchableOpacity onPress={showPicker}>
        <Text>Show ModalCityPicker</Text>
      </TouchableOpacity>
      <ModalCityPicker ref={ref} onSelected={onSelected} />
    </>
  )
}
````
#### 效果

![ModalCityPicker](https://gitee.com/krialy/images/raw/master/source/20210407101656.gif)

#### API
| 属性 | 说明 | 类型 | 是否必传 | 默认值 |
| --- | --- | --- | --- | --- |
| place | 省市选择器的位置（top, center, bottom） | string | 否 | 'bottom' |
| columeOfNum | 一行展示多少个选择器 | number | 否 | 1 |
| level | 最多渲染多少级的节点 | number | 否 | 无限制 |
| defaultSelected | 默认选中的选项 | string（省市的名称，例如：浙江省） | 否 | 第一项 |
| onConfirm | 确认后的回调函数 | (Array<Object>) => void | 否 | 无 |
| onCancel | 取消后的回调函数 | (Array<Object>) => void | 否 | 无 |