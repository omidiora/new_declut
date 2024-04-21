import {wp} from '../../utils/general';
import {RFFontSize, fontSize} from '../../utils/text';
import {font} from '../../utils/theme/fonts';

export const errorStyle = {
  borderColor: 'red',
  borderWidth: 1,
  borderBottomWidth: 1,
};

export const InputContainerStyle = {
  alignItems: 'flex-start',
  // borderBottomWidth: 0,
  borderBottomColor: 'red',
  borderWidth: 0,
  padding: 6,
  borderRadius: 10,
  width: wp(90),
  marginLeft: -10,
  paddingLeft: 20,
  borderBottomWidth: 0,
  backgroundColor: '#F9F9FA',
};
export const InputContainerStyle2 = {
  alignItems: 'flex-start',

  // borderBottomWidth: 0,
  borderBottomColor: 'red',
  borderWidth: 0,
  padding: 6,
  borderRadius: 10,
  width: wp(90),
  marginLeft: -10,
  paddingLeft: 20,
  borderBottomWidth: 0,
  backgroundColor: '#E4E7EC',
};
//

export const labelStyle = {
  fontFamily: font.medium,
  fontWeight: '400',
  color: 'black',
  right: 5,
  fontSize: fontSize.sm + 2,
};

export const ErrorColor = {
  color: 'red',
};

export const MainColor = {
  color: '#02A89E',
};

export const inputStyle = {
  lineHeight: RFFontSize.sm + 0.5,
  fontFamily: font.semiBold,
  fontSize: RFFontSize.sm,
};

export const FocusedInput = {
  borderColor: '#02A89E',
  borderWidth: 1,
  borderBottomWidth: 1,
};

export const valueFilledUnFocused = {
  borderWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#E4E7EC',
};
