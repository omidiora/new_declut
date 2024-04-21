import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import styled from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllState} from '../../../redux/location/api';
import {SemiBoldText} from '../../utils/text';
import {colors} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

const ModalContainer = styled.View({
  flex: 1,
  backgroundColor: 'white',
  width: '110%',
  height: '110%',
  alignSelf: 'center',
  flex: 1,
});

const LocalGovComponent = ({option, setOption, isVisible, setVisible}) => {
  const dispatch = useDispatch();
  const StateOfNigeria = useSelector(state => state.location?.data ?? []);
  const {colors} = useTheme();

  useEffect(() => {
    dispatch(getAllState());
  }, []);

  return (
    <Modal isVisible={isVisible} style={{backgroundColor: 'white'}}>
      <ModalContainer>
        <ScrollView
          //   contentContainerStyle={{paddingBottom: 30}}
          style={{
            paddingBottom: 30,
            paddingLeft: 20,
            paddingTop: 12,
            zIndex: 120,
          }}>
          {StateOfNigeria.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.states}
              onPress={() => {
                setOption(item);
                setVisible(false);
              }}>
              <SemiBoldText color="black">{item.value}</SemiBoldText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ModalContainer>
    </Modal>
  );
};

export default LocalGovComponent;

const styles = StyleSheet.create({
  states: {paddingTop: 15, paddingBottom: 30, paddingLeft: 10},
});
