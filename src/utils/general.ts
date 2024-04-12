import moment from 'moment';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Alert, Linking, Platform} from 'react-native';

export const hp = (height: number | string) => heightPercentageToDP(height);

export const wp = (width: number | string) => widthPercentageToDP(width);

export const NAIRA_SYSMBOL = '\u20A6';

export const ShowFourteenWords = (str: string) => {
  let truncatedText = str.substring(0, 10);
  return truncatedText +'...';
};
