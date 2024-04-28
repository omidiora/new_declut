import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BoldText, MediumText, SemiBoldText} from '../utils/text';
import { useTheme } from '@react-navigation/native';

const AddItemCardInfo = ({text}) => {
    const {colors} = useTheme();
  return (
    <View style={{backgroundColor:"#FEF0C7",padding:10,borderRadius:5}}>
      <MediumText lineHeight={18} color={colors.darkBlack}>
        {text}
      </ MediumText  >
    </View>
  );
};

export default AddItemCardInfo;

const styles = StyleSheet.create({});
