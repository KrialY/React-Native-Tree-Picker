# React-Native-Tree-Selector
React Native多级选择器，支持任意层级。
## 基础组件-Tree
### Demo
````javascript
import { Tree } from 'react-native-tree-selector';

const struct = [
  {
    key: "0",
    name: "浙江省",
    children: [
      {
        key: "01",
        name: "杭州市"
      },
      {
        key: "02",
        name: "温州市"
      }
    ]
  },
  {
    key: "1",
    name: "北京市",
    children: [
      {
        key: "11",
        name: "海淀区",
        children: [
          {
            key: "111",
            name: "海淀区下的"
          },
          {
            key: "112",
            name: "海淀区下的2",
            children: [
              {
                key: "1121",
                name: "海淀区下的海淀区下的"
              },
              
            ]
          }
        ]
      },
      {
        key: "12",
        name: "朝阳区",
        children: [
          {
            key: "121",
            name: "33"
          }
        ]
      }
    ]
  },
  {
    key: "2",
    name: "test"
  },
  {
    key: "3",
    name: "test"
  },
  {
    key: "4",
    name: "test"
  }
];
function App() {
  const onSelected = (path) => {
    console.log(path);
  }
  return (
    <Tree struct={struct} onSelected={onSelected} />
  )
}
````
### API
| 属性 | 说明 | 默认值 |
| --- | --- | --- |
| struct | 数据结构 | 无 |
| onSelected | 切换选项的回调函数 | 无 |
| columnOfline | 一行展示多少个选择器 | 3 |

#### struct
````javascript
// ts类型：
interface Item {
  key: string;
  name: string;
  children?: Array<Object>
}
struct: Array<Item>
````
````javascript
// 结构：
[
  {
    key: 1,
    name: 'example',
    children: [
      {
        key: 2,
        name: 'example',
      },
      ...
    ]
  },
  {}...
]
````