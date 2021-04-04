import React from 'react';
import Tree from '../Base/Tree';
import {countryData} from '../../struct';

interface Props {
  onSelected?: (path: Array<Object>) => void;
}
export default function CountryPicker ({ onSelected }: Props){
  return (
    <Tree onSelected={onSelected} struct={countryData as any}  />
  )
}