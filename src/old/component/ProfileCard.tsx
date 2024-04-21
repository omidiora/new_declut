import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '../Util/theme';
import {COLOR} from '../Util/Util';
import Spacer from './Spacer';
import LineComponent from './ LineComponent';
import ArrowRight from '../assets/images/svg/rightArrowBlack.svg';
const ProfileCard = ({
  headerTitle,
  title1,
  title2,
  onPress1,
  onPress2,
  hideLine,
}) => {
  return (
    <View
      style={{
        width: SIZES.width / 1.1,
        alignSelf: 'center',
        paddingBottom: SIZES.height / 35,
      }}>
      <Text style={styles.account}>{headerTitle}</Text>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 0.3,
          padding: 12,
          // paddingTop: 30,
          // paddingBottom: 30,
          borderColor: COLOR.lightGrey,
        }}>
        <View>
          <View style={styles.row}>
            <TouchableOpacity onPress={onPress1}>
              <Text style={styles.text}>{title1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}  onPress={onPress1}>
              <ArrowRight />
            </TouchableOpacity>
          </View>
          <Spacer height={5} />
          {!hideLine && <LineComponent />}
          <Spacer height={5} />
          <View style={styles.row}>
            <TouchableOpacity onPress={onPress2}>
              <Text style={styles.text}>{title2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={onPress2}>
              <ArrowRight />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  name: {
    ...FONTS.h2,
  },
  address: {
    color: COLOR.lightGrey,
  },
  text: {
    ...FONTS.body3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  account: {
    ...FONTS.body3,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  row: {flexDirection: 'row', justifyContent: 'space-between', padding: 5},
  icon: {
    paddingTop: SIZES.height / 52,
  },
});
