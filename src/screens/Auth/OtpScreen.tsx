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
import {
  useOtpAuthMutation,
  useResendOtpAuthMutation,
} from '../../../redux/auth/api';
import {AlertNofity, AlertNofityError} from '../../utils/notify';

const Dotteds = styled(Dotted)({
  marginTop: SIZES.height / 15,
  alignSelf: 'center',
});

const OtpScreen = props => {
  const {colors} = useTheme();
  const [isVisble, setisVisble] = React.useState(false);
  const {navigate} = useNavigation();
  const [remainingTime, setRemainingTime] = React.useState(60);
  const [OtpAuth, {isLoading, data}] = useOtpAuthMutation();
  const [ResendOtpAuth, {isLoading: resendLoading}] =
    useResendOtpAuthMutation();
  const navigation = useNavigation();
  const [otpText, setotpText] = React.useState('');

  React.useEffect(() => {
    let timer;

    const updateRemainingTime = () => {
      if (remainingTime === 0) {
        clearTimeout(timer);
      } else {
        setRemainingTime(prevTime => {
          if (prevTime === 0) return 0;
          return prevTime - 1;
        });
        timer = setTimeout(updateRemainingTime, 1000);
      }
    };

    // Initial setup
    updateRemainingTime();

    // Cleanup function to clear the timer when component unmounts or re-renders
    return () => clearTimeout(timer);
  }, []);

  const VerifyOtp = () => {
    OtpAuth(otpText)
      .unwrap()
      .then(response => {
        console.log(response, 'response from verify otp');
        if (response.code == 200 || response.code == 201) {
          AlertNofity('Success', 'Account Verified Successfully');
          navigation.navigate('Auth', {
            screen: 'Login',
          });
        } else {
          AlertNofityError(response.message);
        }
      })
      .catch(err => {
        console.log(err, 'a');
        AlertNofityError(
          'Invalid',
          'Invalid Otp Code. Kindly Check your email',
        );
      });
  };

  const ResendOtpCode = () => {
    setRemainingTime(60);
    ResendOtpAuth(userId)
      .unwrap()
      .then(response => {
        console.log(response, 'resonse');
        AlertNofity('Otp', 'Otp Resent Successfully');
        setRemainingTime(60);
      })
      .catch(err => {
        console.log(err, 'eee');
        AlertNofityError('Otp', 'Something weng wrong. Kindly Retry');
      });
  };

  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader
        title={'OTP Verification'}
        // borderBottom
        rightComponent={true}
        rightText='Sigin In'
        onPress={()=>navigate("login")}
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
          handleTextChange={value => setotpText(value)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
          inputCellLength={1}
        />
        <Row alignItems="center" justifyContent="center" disabled={true}>
          <SemiBoldText color={colors.mediumGrey} textAlign="center">
            The code expires in
          </SemiBoldText>
          <SemiBoldText color={colors.mainColor}>
            {' '}
            {remainingTime} seconds.
          </SemiBoldText>
        </Row>

        <Spacer height={80} />
        {remainingTime == 0 && (
          <>
            <OutlineButton
              title="Resend Code"
              color={remainingTime == 0 ? colors.mainColor : colors.lightGrey}
              style={{borderWidth: 0, backgroundColor: 'transparent'}}
              onPress={() => ResendOtpCode()}
              disabled={remainingTime == 0 ? false : true}
            />
          </>
        )}
        <Spacer height={150} />
        <PrimaryButton
          onPress={() => VerifyOtp()}
          text="Verify"
          backgroundColor={
            otpText?.length == 6 ? colors.mainColor : colors.lightGrey
          }
          color={otpText?.length == 6 ? 'white' : colors.disabled}
          disabled={otpText?.length == 6 ? false : true}
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
