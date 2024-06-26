import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR, FontFamily, HP} from '../Util/Util';
import { MediumText, SemiBoldText } from '../../utils/text';

const NumberCard = ({number, title, content}: number) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {(number)} {title}
      </Text>
      <MediumText lineHeight={20} style={{color:'black',fontSize:12}}>
        {content}
      </MediumText>
    </View>
  );
};

export default NumberCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: HP(2),
    fontFamily:FontFamily.black,
    color:"#101828",
    textAlign: 'left'
    // textAlign:"center"
  },
  subTitle: {
    fontSize: HP(1.7),
    color: "#101828",
    paddingTop:HP(1),
    fontFamily:FontFamily.medium,

  },
});
