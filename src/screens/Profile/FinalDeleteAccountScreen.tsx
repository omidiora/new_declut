import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {BaseView, Spacer, ViewContainer} from '../../component/view';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TopHeader} from '../../component/view/headers/topHeader';
import {
  BoldText,
  RFFontSize,
  RegularText,
  SemiBoldText,
  fontSize,
} from '../../utils/text';
import {Input} from '@rneui/base';
import {font} from '../../utils/theme/fonts';
import {InputContainerStyle} from '../Auth/styling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OutlineButton, PrimaryButton} from '../../component/view/button';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccountApi} from '../../../redux/auth/profile';

const DeleteReasonArray = [
  {
    id: 1,
    name: 'I need a break from Declut',
  },
  {
    id: 2,
    name: 'I want a fresh start',
  },
  {
    id: 3,
    name: 'I don’t like Declut',
  },
  {
    id: 4,
    name: 'I have sold all my items',
  },
  {
    id: 5,
    name: 'Other',
  },
];
const FinalDeleteAccountScreen = props => {
  console.log(props?.route.params, 'rpos');
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const [showOther, setShowOther] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(state => state?.profile?.loading);

  const deleteAccApi = item => {
    dispatch( 
      deleteAccountApi({
        reason: props?.route.params,
        navigation:navigate
      }),
    );
  };
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader
        title={'Delete Account'}
        // borderBottom
        rightComponent={false}
        rightText="Skip"
        onPress={() => navigate('register1')}
      />
      <KeyboardAwareScrollView>
       
        <ViewContainer>
          <Spacer height={30} />
          <BoldText
            fontSize={fontSize.md}
            textAlign="center"
            lineHeight={20}
            color={colors.darkBlack}>
            Are you sure you want to delete your account?
          </BoldText>
          <Spacer height={40} />
          <RegularText fontSize={fontSize.sm} 
         lineHeight={18} 
          color={colors.secondaryBlack}>
            If you delete your account, you will permanently lose your profile,
            messages, history, and photos. If you delete your account, this
            action cannot be undone .
          </RegularText>
          <Spacer height={15} />
         

          <Spacer height={500} />
          {loading ? (
           <>
           <ActivityIndicator color={'green'} size={'large'}/>
           </>
          ) : (
            <TouchableOpacity onPress={() => deleteAccApi()}>
              <SemiBoldText fontSize={16} color="red" textAlign="center">
                Delete my account
              </SemiBoldText>
            </TouchableOpacity>
          )}
        </ViewContainer>
      </KeyboardAwareScrollView>
    </BaseView>
  );
};

export default FinalDeleteAccountScreen;

const styles = StyleSheet.create({});
