import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Tree, { Struct } from '../Base/Tree';
import countryData from './countryData';
const struct = {
  uniqueKey: 'name',
  valkey: 'name',
  childrenKey: 'children'
};

/**
 * @param defaultSelected 中国省市的名称，例如：浙江省，上海市等
 */
interface Props {
  onSelected?: (path: Array<Object>) => void;
  columeOfNum?: number;
  level?: number;
  defaultSelected?: string;
}
export default function CityPicker ({ onSelected, columeOfNum, level, defaultSelected }: Props){
  return (
    <Tree struct={struct} defaultSelected={defaultSelected} columeOfNum={columeOfNum} onSelected={onSelected} level={level} structData={countryData as any}  />
  )
}

type Place = 'top' | 'center' | 'bottom';
interface ModalProps {
  place?: Place;
  columeOfNum?: number;
  level?: number;
}
let ModalCityPicker: any = ({place = 'bottom'}: ModalProps, ref: any) => {
  const [isShow, setShow] = useState(false);
  const [status, setStatus] = useState([]);
  let tempPath = [];

  const positionMap: any = {
    bottom: 'flex-end',
    center: 'center',
    top: 'flex-start'
  }
  const onSelected = (path: Array<any>) => {
    console.log(path, 'modal path');
    tempPath = path;
  }

  console.log("country render");
  
  useImperativeHandle(ref, () => ({
    show: () => {
      setShow(true);
    }
  }));

  const onCancel = () => {
    console.log("cancle");
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
    >
      <View style={[styles.modalWrapper, { justifyContent: positionMap[place] }]}>
        <View style={styles.positionWrapper}>
          <View style={styles.optionWrapper}>
            <TouchableOpacity style={styles.textWrapper} onPress={() => {
              setShow(!isShow);
            }}>
              <Text style={styles.optionTextStyle}>确认</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.textWrapper} onPress={() => {
              setShow(!isShow);
            }}>
              <Text style={styles.optionTextStyle}>取消</Text>
            </TouchableOpacity>
          </View>
          <CityPicker columeOfNum={1} onSelected={onSelected} />
        </View>
      </View>
    </Modal>
  )
}

ModalCityPicker = forwardRef(ModalCityPicker);
export { ModalCityPicker }

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  positionWrapper: {
    backgroundColor: 'white'
  },
  optionWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 40,
    alignItems: 'center'
  },
  textWrapper: {
    alignItems: 'center',
    flex: 1
  },
  optionTextStyle: {
    color: 'black',
    fontSize: 16
  }
})