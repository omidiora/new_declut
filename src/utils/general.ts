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
  let truncatedText = str.substring(0, 23);
  return truncatedText + '';
};

export const currencyFormatter = (number: number | string) => {
  const numberString = String(number);
  const newArray: Array<string> = [];
  const splitedNumberStringArray = numberString.split('.');
  const mainNumber = splitedNumberStringArray[0];
  const reversedNumber = mainNumber.split('').reverse();
  reversedNumber.forEach((element, index) => {
    if (index % 3 === 0 && index !== 0) {
      newArray.push(',');
    }
    newArray.push(element);
  });
  return splitedNumberStringArray.length > 1
    ? newArray.reverse().join('') + '.' + splitedNumberStringArray[1]
    : newArray.reverse().join('');
};

export const callNumber = phone => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phone}`;
  } else {
    phoneNumber = `telprompt:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not supported');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(error => {
      Alert.alert('An error occurred while trying to open the phone number');
    });
};

export const sendOnWhatsApp = phoneNumber => {
  console.log(phoneNumber, 'a');
  console.log('test');
  let msg = 's';
  let mobile = '08067031917';

  if (mobile) {
    if (msg) {
      let url = 'whatsapp://send?phone=' + `${phoneNumber}` + '&text=' + msg;
      Linking.openURL(url)
        .then(() => {
          console.log('WhatasApp Opened');
        })
        .catch(() => {
          alert('Make Sure whatsapp is installed on your device');
        });
    } else {
      console.log('Please insert message to send');
    }
  } else {
    console.log('Please insert mobile no');
  }
};

export function removeFirstName(fullName) {
  // Check if fullName is not undefined and is a string
  if (typeof fullName !== 'string') {
    // Handle invalid input
    return '';
  }

  // Split the full name into an array of words
  const nameParts = fullName.split(' ');

  // Check if there's only one name
  if (nameParts.length === 1) {
    // Handle case where there's only one name
    return '';
  }

  // Remove the first element (first name)
  nameParts.shift();

  // Join the remaining elements back into a string
  const lastName = nameParts.join(' ');

  return lastName;
}

export const allFieldsFilled = values => {
  // Define the name of the optional field
  const optionalField = 'defectReason';

  // Check if all fields except the optional field are filled
  return Object.keys(values).every(key => {
    if (key !== optionalField) {
      return !!values[key];
    }
    return true; // Treat optional field as always filled
  });
};

export function shortenText(text) {
  if (text?.length <= 17) {
    return text;
  } else {
    return text?.substring(0, 17) + '..';
  }
}

export const RemoveLastName = value => {
  let name = value.replace(/\s+[^\s]*$/, '');
  return name;
};

export const OnlyFirstWordCapital = str => {
  const words = str.toLowerCase().split(' ');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const capitalizedStr = words.join(' ');
  return capitalizedStr;
};

export const convertDatetime = datetimeString => {
  // Validate input format
  if (!moment(datetimeString, 'MM/DD/YY HH:mm:ss', true).isValid()) {
    throw new Error('Invalid datetime format. Please use "MM/DD/YY HH:mm:ss".');
  }

  const then = moment(datetimeString, 'MM/DD/YY HH:mm:ss');
  const now = moment();
  const elapsedMs = now.diff(then);

  if (elapsedMs < 0) {
    throw new Error('Datetime cannot be in the future.');
  }

  const seconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years >= 1) {
    return `${years}yr`;
  } else if (days >= 1) {
    return `${days}d`;
  } 
  else if (hours == 1) {
    return `${hours}hr`;
  }
  else if (hours > 1) {
    return `${hours}hrs`;
  } else {
    return `${minutes}sec`;
  }
};
