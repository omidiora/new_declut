import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BaseView,
  BottomContainer,
  Spacer,
  ViewContainer,
} from '../../component/view';
import Background from './background';
import {PrimaryButton, SecondaryButton} from '../../component/view/button';
import {hp} from '../../utils/general';
import {useNavigation, useTheme} from '@react-navigation/native';

const OnboardingScreen = () => {
  const {colors} = useTheme();
  const { navigate } = useNavigation();

  return (
    <BaseView backgroundColor={'white'}>
      <Background />
      <Spacer height={50} />
      <BottomContainer>
        <PrimaryButton
          backgroundColor={colors.mainColor}
          text="Get Started"
          onPress={() => navigate('Auth')}
        />
        <Spacer height={hp(1)} />
      </BottomContainer>
    </BaseView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
