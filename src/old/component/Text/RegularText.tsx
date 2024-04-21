import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLOR, FontFamily } from '../../Util/Util';


const RegularText = ({children, color, fontSize, textAlign,marginTop,width, lineHeight}) => {
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
            lineHeight:lineHeight,
            width:width
            
         
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default RegularText;

const styles = StyleSheet.create({
  font: {
    fontFamily:FontFamily.medium
  },
});
