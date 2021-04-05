import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Tree, { Struct } from '../Base/Tree';
import countryData from '../../countryData';
interface Props {
  onSelected?: (path: Array<Object>) => void;
  columeOfNum?: number;
  struct: Struct;
  level?: number;
}
export default function CountryPicker ({ onSelected, columeOfNum, struct, level }: Props){
  return (
    <Tree struct={struct} columeOfNum={columeOfNum} onSelected={onSelected} level={level} structData={countryData as any}  />
  )
}

type Place = 'top' | 'center' | 'bottom';
interface ModalProps {
  place?: Place;
}
let ModalCountryPicker: any = ({place = 'bottom'}: ModalProps, ref: any) => {
  const [isShow, setShow] = useState(false);
  const struct = {
    uniqueKey: 'name',
    valkey: 'name',
    childrenKey: 'children'
  };

  const positionMap: any = {
    bottom: 'flex-end',
    center: 'center',
    top: 'flex-start'
  }
  const onSelected = (path: any) => {
    console.log(path, 'modal path');
  }

  useImperativeHandle(ref, () => ({
    show: () => {
      setShow(true);
    }
  }));
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
    >
      <View style={[styles.modalWrapper, { justifyContent: positionMap[place] }]}>
        <View style={styles.positionWrapper}>
          <View style={styles.optionWrapper}>
            <TouchableOpacity style={styles.textWrapper}>
              <Text style={styles.optionTextStyle}>确认</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.textWrapper} onPress={() => {
              setShow(false);
            }}>
              <Text style={styles.optionTextStyle}>取消</Text>
            </TouchableOpacity>
          </View>
          <CountryPicker struct={struct} columeOfNum={1} onSelected={onSelected} />
        </View>
      </View>
    </Modal>
  )
}

ModalCountryPicker = forwardRef(ModalCountryPicker);
export { ModalCountryPicker }

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