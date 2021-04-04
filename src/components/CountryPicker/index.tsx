import React from 'react';
import Tree from '../Base/Tree';
import { countryData } from '../../struct';
interface Props {
  onSelected?: (path: Array<Object>) => void;
  columeOfNum?: number;
}
export default function CountryPicker ({ onSelected, columeOfNum }: Props){
  return (
    <Tree columeOfNum={columeOfNum} onSelected={onSelected} struct={countryData as any}  />
  )
}