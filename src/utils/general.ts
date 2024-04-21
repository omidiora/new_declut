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
  return truncatedText + '...';
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
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
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




export const allFieldsFilled = (values) => {
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