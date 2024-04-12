import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { Auth } from '../../../redux/auth';

export const getUserAsyncStorage = async () => {
  const {getItem} = useAsyncStorage('@declut_user');
  
  const result = await getItem();
  console.log(result,'adakdn')
  const user = result ? result: null;
  

  return user;
};
