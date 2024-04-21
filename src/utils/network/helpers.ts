import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { Auth } from '../../../redux/auth';

export const getUserAsyncStorage = async () => {
  const {getItem} = useAsyncStorage('@declut_user');
  const result = await getItem();
  console.log(result,'adaf1111a')
  // const user = result ? (JSON.parse(result) as Auth) : null;
  return result;
};