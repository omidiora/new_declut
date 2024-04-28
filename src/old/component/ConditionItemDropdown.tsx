import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {COLOR, FontFamily, HP, WP} from '../Util/Util';
import Feather from 'react-native-vector-icons/Feather';
import HeaderComponent from './HeaderComponent';
// import Modal from 'react-native-modal';
import SearchInput from './SearchInput';
import {StateInNigeria} from '../Util/StateAndLga';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFocusEffect} from '@react-navigation/native';
import { font } from '../../utils/theme/fonts';
import { RFFontSize, fontSize } from '../../utils/text';

const ConditionItemDropdown = ({
  captiton,
  onPress,
  data,
  error,
  placeholder,
  headerTitle,
  showLabel = false,
  componentTitle,
  backgroundColor,
  hideSearch,
  required,
  loading1,
  visible,
  setVisible,
  title,
}) => {
  return (
    <View style={{flex: 1, paddingBottom: 4}}>
      <Text
        style={{
          marginVertical: 10,
          marginLeft: 2,
          fontFamily: font.medium,
          fontWeight: '400',
          color: 'black',
          right: 5,
          fontSize: fontSize.sm + 2,

          // marginTop:-5
        }}>
        {headerTitle} {required && '*'}
      </Text>
      <TouchableOpacity
        style={[
          styles.dropdown,
          backgroundColor && {backgroundColor: backgroundColor},
        ]}
        onPress={() => setVisible(true)}>
        <View >
          {title == '' || title == null ? (
            <Text style={styles.text}>{placeholder}</Text>
          ) : (
            <Text style={styles.text2}>{title}</Text>
          )}
        </View>

        <View style={styles.icon}>
          {loading1 ? (
            <ActivityIndicator color={COLOR.mainColor} />
          ) : (
            <Entypo name="chevron-right" size={20} color={COLOR.black} />
          )}
        </View>
      </TouchableOpacity>
      <Text style={{color: 'red'}}>{error}</Text>
    </View>
  );
};

export default ConditionItemDropdown;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#E4E7EC',
    height: 54.2,
    width: '100%',
    borderRadius: WP(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  icon: {
    marginTop: 15,
    right: 15,
    // marginLeft: WP(-30),
  },
  value: {
    color: COLOR.black,
    marginLeft: WP(8),
    marginTop: HP(2),
    fontFamily: FontFamily.bold,
    marginVertical: 10,
  },
  text: {
    // padding: 20,
    // color: COLOR.lightGrey,
   
    // zIndex: 500,
    // lineHeight: RFFontSize.sm + 0.5,
    // fontFamily: font.semiBold,
    // fontSize: RFFontSize.sm,
    // opacity: 0.45,
    color: COLOR.black,
    // fontWeight: 'bold',
    padding: 22,
    zIndex: 500,
    textAlign: 'center',
    // fontSize: WP(3),
    paddingTop: 22,

    lineHeight: RFFontSize.sm + 0.5,
    fontFamily: font.semiBold,
    fontSize: RFFontSize.sm,
    opacity: 0.45,
    paddingBottom:10

  },

  text2: {
    color: COLOR.black,
    fontWeight: 'bold',
    padding: 18,
    zIndex: 500,
    textAlign: 'center',
    fontSize: WP(3),
    paddingBottom:2,
    height:170
  },
});
