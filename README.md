# React-Native-Tree-Selector
React Native多级选择器，支持任意层级。
## 基础组件
### Tree Picker
#### Demo
[structData]()
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

![TreePicker](https://gitee.com/krialy/images/raw/master/source/20210406004106.gif)

#### API
| 属性 | 说明 | 是否必传 | 默认值 |
| --- | --- | --- | --- |
| structData | 数据 | 是 | 无 |
| onSelected | 切换选项的回调函数，第一个参数返回当前选中的信息数组 | 否 | 无 |
| columnOfline | 一行展示多少个选择器 | 否 | 3 |
| level | 最多渲染多少级的节点 | 否 | 无限制 |
| struct | 定义传入数据的数据结构 | 是 | 无 |

### UnLinkTreePicker
#### Demo
[structData]()
````typescript
import { struct2 as structData } from '../struct';

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

![UnLinkTreePicker](https://gitee.com/krialy/images/raw/master/source/20210406004206.gif)

#### API
| 属性 | 说明 | 是否必传 | 默认值 |
| --- | --- | --- | --- |
| structData | 数据 | 是 | 无 |
| onSelected | 切换选项的回调函数，第一个参数返回当前选中的信息数组 | 否 | 无 |
| struct | 定义传入数据的数据结构 | 是 | 无 |

## 衍生组件
### CountryPicker
#### Demo
````typescript
import { CountryPicker } from '../../src/components'

export default function Example() {
  const onSelected = (path: any) => {
    console.log(path);
  }

  return (
    <>
      <View style={styles.line}>
        <Text>CountryPicker👇:</Text>
      </View>
      <CountryPicker onSelected={onSelected} />
    </>
  )
}
````
#### 效果

![CountryPicker](https://gitee.com/krialy/images/raw/master/source/20210406003959.gif)

#### API
| 属性 | 说明 | 是否必传 | 默认值 |
| --- | --- | --- | --- |
| columeOfNum | 一行展示多少个选择器 | 是 | 无 |
| onSelected | 切换选项的回调函数，第一个参数返回当前选中的信息数组 | 否 | 无 |
| level | 最多渲染多少级的节点 | 是 | 无 |
### ModalCountryPicker
#### Demo
````typescript
import { ModalCountryPicker } from '../../src/components'

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
        <Text>ModalCountryPicker👇:</Text>
      </View>
      <TouchableOpacity onPress={showPicker}>
        <Text>Show ModalCountryPicker</Text>
      </TouchableOpacity>
      <ModalCountryPicker ref={ref} onSelected={onSelected} />
    </>
  )
}
````
#### 效果

![ModalCountryPicker](https://gitee.com/krialy/images/raw/master/source/20210406003816.gif)

#### API
| 属性 | 说明 | 是否必传 | 默认值 |
| --- | --- | --- | --- |
| place | 省市选择器的位置（top, center, bottom） | 否 | 'bottom' |