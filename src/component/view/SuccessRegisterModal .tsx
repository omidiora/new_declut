import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Success from '../../assets/images/success.svg';
import {SIZES} from '../../utils/theme/theme';
import styled from '@emotion/native';
import {fontSize} from '../../utils/text';
import {wp} from '../../utils/general';
import {Spacer} from '.';

const ContainerView = styled.View({
  alignSelf: 'center',
  alignItems: 'center',
  paddingTop: 30,
});
const HeaderTitle = styled.Text({
  textAlign: 'center',
  color: 'black',
  fontWeight: 'bold',
  fontSize: fontSize.lg,
});
const SubHeaderTitle = styled.Text({
  textAlign: 'center',
  color: '#344054',
  fontWeight: '600',
  fontSize: fontSize.sm + 2,
  width: wp(75),
});
const SuccessRegisterModal = ({isVisible}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <ContainerView>
          <Success />
          <Spacer />
          <HeaderTitle>Success</HeaderTitle>
          <Spacer />
          <SubHeaderTitle>
            Your account is ready to use. You’ll be redirected to the home page
            shortly.
          </SubHeaderTitle>
        </ContainerView>
      </View>
    </Modal>
  );
};

export default SuccessRegisterModal;

const styles = StyleSheet.create({
  container: {
    height: SIZES.height / 2,
    backgroundColor: 'white',
    width: SIZES.width / 1.2,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
