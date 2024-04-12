import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BaseView, Row, Spacer, ViewContainer} from '../../component/view';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TopHeader} from '../../component/view/headers/topHeader';
import {BoldText, SemiBoldText, fontSize} from '../../utils/text';
import Dotted from '../../assets/images/dotted.svg';
import styled from '@emotion/native';
import {SIZES} from '../../utils/theme/theme';
import OTPTextView from 'react-native-otp-textinput';
import {hp} from '../../utils/general';
import {OutlineButton, PrimaryButton} from '../../component/view/button';
import SuccessRegisterModal from '../../component/view/SuccessRegisterModal ';

const Dotteds = styled(Dotted)({
  marginTop: SIZES.height / 15,
  alignSelf: 'center',
});

const OtpScreen = () => {
  const {colors} = useTheme();
  const [isVisble, setisVisble] = React.useState(false);
  const {navigate} = useNavigation();
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader
        title={'OTP Verification'}
        // borderBottom
        rightComponent={
          <Row onPress={() => navigate('login')}>
            <SemiBoldText fontSize={fontSize.sm} color={colors.mainColor}>
              Sign in
            </SemiBoldText>
          </Row>
        }
      />
      <ViewContainer>
        <Spacer height={30} />
        <Dotteds />
        <Spacer height={30} />
        <BoldText
          fontSize={fontSize.md}
          color={colors.secondaryBlack}
          textAlign="center">
          Please input the code we sent to{' '}
        </BoldText>

        <BoldText
          fontSize={fontSize.md}
          lineHeight={fontSize.xxl - 4}
          color={colors.darkBlack}
          textAlign="center">
          +2349012345678
        </BoldText>
        <Spacer height={30} />
        <OTPTextView
          handleTextChange={value => console.log(value)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
          inputCellLength={1}
        />
        <Row alignItems="center" justifyContent="center" disabled={true}>
          <SemiBoldText color={colors.mediumGrey} textAlign="center">
            The code expires in
          </SemiBoldText>
          <SemiBoldText color={colors.mainColor}> 30 seconds.</SemiBoldText>
        </Row>

        <Spacer height={80} />
        <OutlineButton
          title="Resend Code"
          color={colors.lightGrey}
          style={{borderWidth: 0, backgroundColor: colors.lightGrey}}
        />
        <Spacer height={150} />
        <PrimaryButton
          text="Verify"
          backgroundColor={colors.lightGrey}
          color={colors.disabled}
        />

        <SuccessRegisterModal isVisible={isVisble} />
      </ViewContainer>
    </BaseView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 20,
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 2,
  },
  code: {
    alignSelf: 'center',
  },
});
