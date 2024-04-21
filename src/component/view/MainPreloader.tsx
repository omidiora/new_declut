import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {Spacer} from '.';
import {ActivityIndicator} from 'react-native-paper';
import {SemiBoldText} from '../../utils/text';
import { useTheme } from '@react-navigation/native';

const MainPreloader = ({isVisible, text}) => {
    const {colors} =useTheme();
  return (
    <ReactNativeModal isVisible={isVisible}>
      <View
        style={{
          height: 150,
          width: 300,
          backgroundColor: 'white',
          alignSelf: 'center',
        }}>
        <View>
          <Spacer height={40} />
          <ActivityIndicator color={colors.mainColor} size={'small'} />
          <Spacer />
          <SemiBoldText textAlign="center" color="black">
            {text ?? 'loading!!!!!!'}
          </SemiBoldText>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default MainPreloader;

const styles = StyleSheet.create({});
