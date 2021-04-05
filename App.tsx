 import React from "react";
 import { StyleSheet, View } from "react-native";
 import TreeExample from './example/Tree';
 import UnLinkTreeExample from './example/UnLinkTree';
 import CountryPickerExample from './example/CountryPicker';
 import ModalCountryPickerExample from './example/ModalCountryPicker';
 
 export default function APP() {
  return (
    <>
      <TreeExample />
      <UnLinkTreeExample />
      <CountryPickerExample />
      <ModalCountryPickerExample />
    </>
  );
 }
 