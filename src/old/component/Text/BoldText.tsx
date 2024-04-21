import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLOR, FontFamily } from '../../Util/Util';

const BoldText = ({children, color, fontSize, textAlign,marginTop, marginVertical,width ,...rest}) => {
  return (
    <View>
      <Text
        style={[
          styles.font,
          {
            color: color ? color : COLOR.black,
            fontSize: fontSize,
            textAlign: textAlign,
            marginTop:marginTop,
            marginVertical:marginVertical,
            width:width,
            rest,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default BoldText;

const styles = StyleSheet.create({
  font: {
    fontFamily: FontFamily.bold,
  },
});
