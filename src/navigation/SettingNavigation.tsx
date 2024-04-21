import {View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Post from '../screens/Home/Post';
import PushNotificationSetting from '../screens/Profile/Setting/PushNotificationSetting';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../screens/Profile/EditProfile';
import EmailSetting from '../screens/Setting/EmailSetting';
import GeneralSetting from '../screens/Setting/GeneralSetting';

const Stack = createNativeStackNavigator();

const SettingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GeneralSetting" component={GeneralSetting} />
    </Stack.Navigator>
  );
};
export default SettingNavigation;
