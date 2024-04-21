import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
// import {COLOR, FontFamily, hp, wp} from '../Util/Util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {PostLoader} from 'react-native-preloader-shimmer';
import {hp, wp} from '../../utils/general';
import { useTheme } from '@emotion/react';

interface FormInputProps {
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  showpassword?: boolean;
  forgotPassword: boolean;
  error: string;
  value: string | undefined;
  multiline: boolean;
  required?: boolean;
  bold?: boolean;
  labelColor: boolean;
  backgroundColor: string;
  disabled: boolean;
}
const FormInput = ({
  label,
  placeholder,
  onChangeText,
  onFocus,
  onBlur,
  showpassword = false,
  forgotPassword,
  error,
  value,
  multiline = false,
  required,
  bold,
  labelColor,
  borderColor,
  keyboardType,
  backgroundColor,
  inputBold,
  disabled,
}: FormInputProps) => {
  const [password, setPassword] = React.useState<boolean>(false);
  const navigation = useNavigation();
  const {colors} =useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.topLabelContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.label,
              {
                // fontFamily: bold ? FontFamily.bold : FontFamily.regular,
                color: labelColor ? colors.mainColor: colors.darkBlack
              },
            ]}>
            {label}
          </Text>
          {required && <Text style={styles.asterisk}>{'*'}</Text>}
        </View>
        {forgotPassword && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.label2}>{'Forgot Password?'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          numberOfLines={multiline ? 0 : 3}
          multiline={multiline ? true : false}
          autoCapitalize="none"
          placeholder={placeholder}
          keyboardType={keyboardType}
          editable={!disabled}
          style={[
            styles.textInput,
            {borderColor: borderColor ? 'red' : '#E4E7EC'},
            backgroundColor && {backgroundColor: backgroundColor},
            inputBold && {fontWeight: 'bold'},
            multiline && {
              height: hp(15),
              paddingTop: hp(2),
              textAlignVertical: 'top',
            },
          ]}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={!password && showpassword == true}
          // inputMode={password ? 'numeric' : 'text'}
          value={value}
        />

        {showpassword && (
          <TouchableOpacity
            style={styles.eye}
            onPress={() => setPassword(!password)}>
            <Ionicons name={password ? 'eye' : 'eye-off'} size={18} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View style={{top: multiline ? 1 : 3}}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(1),
  },
  label: {
    paddingBottom: wp(2),

    // fontWeight: '400',
    marginLeft: 1,
  },
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: hp(2),
    borderRadius: wp(2),
    backgroundColor: '#E4E7EC',
    height: hp(9),
    // fontWeight:'bold'
  },
  eye: {
    paddingTop: hp(3),
    marginLeft: wp(-8),
  },
  topLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
  },
  label2: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    // paddingTop: Platform.OS == 'ios' ? 15 : -160,
    // marginTop:-15
  },
  asterisk: {
    marginLeft: 3,
  },
});
