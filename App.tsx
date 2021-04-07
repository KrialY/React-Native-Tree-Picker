 import React from "react";
 import { StyleSheet, View } from "react-native";
 import TreeExample from './example/Tree';
 import UnLinkTreeExample from './example/UnLinkTree';
 import CityPickerExample from './example/CityPicker';
 import ModalCityPickerExample from './example/ModalCityPicker';
 
 export default function APP() {
  return (
    <>
      <TreeExample />
      <UnLinkTreeExample />
      <CityPickerExample />
      <ModalCityPickerExample />
    </>
  );
 }
 