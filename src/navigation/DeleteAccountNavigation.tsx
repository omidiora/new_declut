import DeleteAccountScreen from '../screens/Profile/DeleteAccountScreen';
import FinalDeleteAccountScreen from '../screens/Profile/FinalDeleteAccountScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const DeleteAccountNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="FirstDeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen
        name="FinalDeleteAccount"
        component={FinalDeleteAccountScreen}
      />
    </Stack.Navigator>
  );
};
export default DeleteAccountNavigation;
