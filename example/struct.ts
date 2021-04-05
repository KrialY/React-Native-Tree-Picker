interface Item {
  key: string;
  name: string;
  children?: Array<Object>
}
const struct: Array<Item> = [
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
export const struct2: Array<Array<string>> = [["list1", "list2", "list3"],["list5","list6"],["list8"]];
export default struct;

