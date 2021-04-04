import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

export default function TreeSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return <Picker
      selectedValue={"java"}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedLanguage(itemValue)
      }>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  
}