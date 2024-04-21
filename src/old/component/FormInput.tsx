import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLOR, FontFamily, HP, WP} from '../Util/Util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {PostLoader} from 'react-native-preloader-shimmer';
import { font } from '../../utils/theme/fonts';
import { fontSize } from '../../utils/text';

interface FormInputProps {
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  showPassword?: boolean;
  forgotPassword: boolean;
  error: string;
  value: string | undefined;
  multiline: boolean;
  required?:boolean,
  bold?:boolean,
  labelColor:boolean,
  backgroundColor:string,
  disabled:boolean
}
const FormInput = ({
  label,
  placeholder,
  onChangeText,
  onFocus,
  onBlur,
  showPassword = false,
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
  disabled
  

}: FormInputProps) => {
  const [password, setPassword] = React.useState<boolean>(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topLabelContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.label, { color: labelColor? COLOR.mainColor:COLOR.black}]}>{label}</Text>
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
            {borderColor:borderColor?COLOR.mainColor:"#E4E7EC", },
            backgroundColor&&{backgroundColor:backgroundColor}, 
            inputBold && {fontWeight:"bold"} ,
              multiline && {
              height: HP(15),
              paddingTop: HP(2),
              textAlignVertical: 'top',
            },
          ]}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={!password && showPassword == true}
          // inputMode={password ? 'numeric' : 'text'}
          value={value}
        />

        {showPassword && (
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
    marginVertical: HP(1),
  },
  label: {
    paddingBottom: WP(2),
    color: 'black',
    
    // fontWeight: '400',
    marginLeft:1,
    fontFamily: font.medium,
    fontWeight: '400',
 
    right: 5,
    fontSize: fontSize.sm + 2,
   
  },
  textInput: {
    borderWidth: 1,
    width:  '100%',
    padding: HP(2),
    borderRadius: WP(2),
    backgroundColor: '#E4E7EC',
    height: 65,
    fontFamily:FontFamily.regular,
    color:"black"
    // fontWeight:'bold'
  },
  eye: {
    paddingTop: HP(3),
    marginLeft: WP(-8),
  },
  topLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
  },
  label2: {
    fontFamily: FontFamily.bold,
    fontWeight: 'bold',
    color: COLOR.mainColor,
  },
  error: {
    color: 'red',
    // paddingTop: Platform.OS == 'ios' ? 15 : -160,
    // marginTop:-15
  },
  asterisk: {
    marginLeft: 3,
    color: COLOR.mainColor,
  },
});
