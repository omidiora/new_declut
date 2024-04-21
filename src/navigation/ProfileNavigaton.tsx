import {View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Post from '../screens/Home/Post';
import PushNotificationSetting from '../screens/Profile/Setting/PushNotificationSetting';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../screens/Profile/EditProfile';
import EmailSetting from '../screens/Setting/EmailSetting';

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyProfile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EmailSetting" component={EmailSetting} />
      {/* 
      <Stack.Screen name="My Posts" component={Post} />
    
      <Stack.Screen
        name="PushNotification"
        component={PushNotificationSetting}
      /> */}
      {/* <Stack.Screen name="LicenseScreen" component={LicenseScreen} /> */}
    </Stack.Navigator>
  );
};
export default ProfileNavigation;
