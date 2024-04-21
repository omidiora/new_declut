import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  Animated,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Modal from 'react-native-modal';
import QuickCard from './QuickCard';
import {BODY_IMAGE, COLOR, FontFamily, HP, WP} from '../Util/Util';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useAppDispatch } from '../../../redux/hook';
// furniture.svg

interface ConditionItemProps {
  onPress: () => void;
  setModalVisible: () => void;
  onClose: () => void;
  visible: boolean;
  item: {};
  onDelete: () => void;
}
const ConditionItem = ({
  onPress1,
  onPress2,
  visible,
  setModalVisible,
  onClose,
  item,
  onDelete,
}: ConditionItemProps) => {
  const navigation = useNavigation();

  const ArrayCondtition = [
    {label: 'Neatly Used', value: 'Neatly Used'},
    {label: 'New', value: 'New'},
  ];

  const dispatch = useAppDispatch();

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const {dy} = gestureState;
        // Limit vertical movement
        if (dy > 0) {
          pan.setValue({x: 0, y: dy});
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const {dy} = gestureState;
        if (dy > 100) {
          onClose();
          pan.setValue({x: 0, y: 0});
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  console.log(item?.id);
  return (
    <View>
      <Modal isVisible={visible}>
        <Animated.View
          style={[styles.container, {transform: [{translateY: pan.y}]}]}
          {...panResponder.panHandlers}>
          <Animated.View style={{alignSelf: 'center', marginTop: HP(-2)}}>
            <MaterialIcons name="remove" size={50} color={COLOR.lightGrey} />
          </Animated.View>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              onPress1();
              setModalVisible(false);
            }}>
            <Text style={styles.edit}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              onPress2();
              setModalVisible(false);
            }}>
            <Text style={styles.edit}>Neatly Used</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default ConditionItem;

const styles = StyleSheet.create({
  container: {
    height: HP(30),
    width: WP(101),
    backgroundColor: 'white',
    marginLeft: -25,
    borderRadius: 20,
    marginTop: HP(80),
    // position: 'absolute',
    // bottom:0,
    // left:0,

    // alignSelf:"center"
  },
  row: {
    flexDirection: 'row',
    marginLeft: WP(5),
    paddingTop: HP(5),
  },
  edit: {
    color: COLOR.black,
    marginHorizontal: 10,
    fontSize: WP(4),
    fontFamily: FontFamily.medium,
  },
});
