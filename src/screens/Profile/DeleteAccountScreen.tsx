import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
const DeleteAccountScreen = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const [showOther, setShowOther] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [reasons, setReasons] = useState('');

  console.log(reasons,'read')
  const CheckAndNavigate = item => {
    setSelectedId(item.id);
    if (item?.name == 'Other') {
      setReasons('');
      setShowOther(true);
    } else {
      setReasons(item.name);
    }
  };

  const Continuation = () => {
    if (reasons) {
      navigate('DeleteAccount', {
        screen: 'FinalDeleteAccount',
        params: reasons,
      });
    } else {
      Alert.alert(
        'Error',
        'Kindly enter a reason to delete account or use the skip button!!!',
      );
    }
  };


  
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader
        title={'Delete Account'}
        // borderBottom
        rightComponent={true}
        rightText="Skip"
        onPress={() =>
          navigate('DeleteAccount', {
            screen: 'FinalDeleteAccount',
            params: 'The user used the skip button!!!!',
          })
        }
      />
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <ViewContainer>
          <Spacer height={30} />
          <BoldText fontSize={fontSize.md} color={colors.darkBlack}>
            Please let us know the reason you are leaving
          </BoldText>
          <Spacer height={15} />
          <RegularText fontSize={fontSize.sm + 2} 
         color={colors.secondaryBlack}>
            Are you sure you want to delete your account?
          </RegularText>
          <Spacer height={35} />
          {DeleteReasonArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{paddingVertical: 15}}
              onPress={() => CheckAndNavigate(item)}>
              <View
                style={[
                  styles.row,
                 {
                    backgroundColor:
                      item.id == selectedId ? "#F7FEFE" : colors.bgColor,
                  },
                ]}>
                <RegularText
                  color={colors.secondaryBlack}
                  fontSize={fontSize.sm }>
                  {item.name}
                </RegularText>
                {selectedId == item.id && (
                  <Ionicons name="checkmark-sharp" color={'#02A89E'} />
                )}
              </View>
            </TouchableOpacity>
          ))}
          {showOther && (
            <View>
              <Input
              onChangeText={(text)=>setReasons(text)}
                multiline={true}
                inputContainerStyle={[
                  InputContainerStyle,
                  {
                    backgroundColor: '#E4E7EC',
                    height: 150,
                  },
                ]}
                inputStyle={{
                  lineHeight: RFFontSize.sm + 0.5,
                  fontFamily: font.semiBold,
                  fontSize: RFFontSize.sm,
                }}
                // leftIcon={<Sms />}
                placeholder="I had some, you know...."

                // onChangeText={handleChange('phone')}
                // onFocus={() => setIsFocused(true)}
                // onBlur={() => setIsFocused(false)}
                // errorMessage={touched.phone && errors.phone}
                //   errorMessage='adlmladnn'
              />
            </View>
          )}

          <Spacer height={80} />

          <TouchableOpacity onPress={() => Continuation()}>
            <SemiBoldText fontSize={16} color="red" textAlign="center">
              Continue to account deletion
            </SemiBoldText>
          </TouchableOpacity>
        </ViewContainer>
      </KeyboardAwareScrollView>
    </BaseView>
  );
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#F7FEFE',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
