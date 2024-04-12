import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import styled from '@emotion/native';
import { ViewContainer } from '../view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TopHeaderRow = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between'
});

const PayoutHeader = ({ title, showIcon }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <TopHeaderRow
        style={{
          paddingTop: insets.top
        }}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
        <View style={{ paddingTop: 3 }}>
          <Text>{title ?? 'Send Money'}</Text>
        </View>
        {showIcon && (
          <Entypo name="dots-three-vertical" size={20} color="black" />
        )}

        <Text></Text>
      </TopHeaderRow>
    </>
  );
};

export default PayoutHeader;

const styles = StyleSheet.create({});
