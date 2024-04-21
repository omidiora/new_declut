import AsyncStorage from '@react-native-async-storage/async-storage';
import {MMKV} from 'react-native-mmkv';
export const LocalStorage = new MMKV();

export const getBearerToken = async () => {
  try {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('@declut_user');
    if (token) {
      return `Bearer ${JSON.parse(token)?.user}`;
    } else {
      // If token does not exist, return null or handle accordingly
      return null;
    }
  } catch (error) {
    // Handle AsyncStorage errors
    console.error('Error retrieving bearer token:', error);
    return null;
  }
};
