import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Tree, { Struct } from '../Base/Tree';
import countryData from './countryData';

const struct: Struct = {
  uniqueKey: 'name',
  valkey: 'name',
  childrenKey: 'children',
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
export default function CityPicker({
  onSelected,
  columeOfNum,
  level,
  defaultSelected,
}: Props) {
  return (
    <Tree
      struct={struct}
      defaultSelected={defaultSelected}
      columeOfNum={columeOfNum}
      onSelected={onSelected}
      level={level}
      structData={countryData as any}
    />
  );
}

/**
 * @param defaultSelected 默认选中的地区，中国省市的名称，例如：浙江省，上海市等
 * @param onConfirm 确认之后的回调函数，参数为确认后的选中项path
 * @param onCancel 取消之后的回调函数，参数为取消后的选中项path
 */
type Place = 'top' | 'center' | 'bottom';
interface ModalProps {
  place?: Place;
  columeOfNum?: number;
  level?: number;
  defaultSelected?: string;
  onConfirm?: (path: Array<any>) => void;
  onCancel?: (path: Array<any>) => void;
}
let ModalCityPicker: any = (
  {
    place = 'bottom',
    defaultSelected = '浙江省',
    columeOfNum = 1,
    level,
    onConfirm,
    onCancel,
  }: ModalProps,
  ref: any,
) => {
  const [isShow, setShow] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);
  let tempSelected: Array<any> = [];
  const positionMap: any = {
    bottom: 'flex-end',
    center: 'center',
    top: 'flex-start',
  };
  const onSelected = (path: Array<any>) => {
    console.log(path, 'modal path');
    tempSelected = path;
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setShow(true);
    },
  }));

  const confirm = () => {
    setShow(false);
    setSelected(tempSelected[tempSelected.length - 1].key);
    onConfirm && onConfirm(tempSelected);
  };

  const cancel = () => {
    setShow(false);
    setSelected(defaultSelected);
    onCancel && onCancel(tempSelected);
    console.log('cancel');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
      onRequestClose={cancel}>
      <View
        style={[styles.modalWrapper, { justifyContent: positionMap[place] }]}>
        <View style={styles.positionWrapper}>
          <View style={styles.optionWrapper}>
            <TouchableOpacity style={styles.textWrapper} onPress={confirm}>
              <Text style={styles.optionTextStyle}>确认</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textWrapper} onPress={cancel}>
              <Text style={styles.optionTextStyle}>取消</Text>
            </TouchableOpacity>
          </View>
          <CityPicker
            level={level}
            defaultSelected={selected}
            columeOfNum={columeOfNum}
            onSelected={onSelected}
          />
        </View>
      </View>
    </Modal>
  );
};

ModalCityPicker = forwardRef(ModalCityPicker);
export { ModalCityPicker };

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  positionWrapper: {
    backgroundColor: 'white',
  },
  optionWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 40,
    alignItems: 'center',
  },
  textWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  optionTextStyle: {
    color: 'black',
    fontSize: 16,
  },
});
