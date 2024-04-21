import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Success from '../assets/images/success.svg';
import {SIZES} from '../Util/theme';

const RegisterModal = () => {
  return (
    <Modal isVisible={true}>
      <View style={styles.container}>
        <Success />
      </View>
    </Modal>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  container: {
    height: SIZES.height / 10,
    backgroundColor: 'white',
    width: SIZES.width / 3,
  },
});
