import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/Onboarding/Index';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import {useAuth} from '../screens/Auth/hook';
import PreviewItem from '../screens/Product/PreviewItem';
import PaymentNavigation from './PaymentNavigation';
import NoOrderScreen from '../screens/Order/NoOrderScreen';
import BottomTabNavigation from './BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import ProductNavigation from './ProductNavigation';
import OrderDetailScreen from '../screens/Order/OrderDetailScreen';
import CategoryDetailPage from '../screens/Product/CategoryDetailPage';
import SettingNavigation from './SettingNavigation';
import DeleteAccountNavigation from './DeleteAccountNavigation';
import UploadAllItem from '../screens/Product/component/UploadAllItem';
import AddItem1 from '../screens/Product/component/AddItem1';
import ReportScreen from '../screens/Report/ReportScreen';
import RatingScreen from '../screens/Order/RatingScreen';
import LicenseScreen from '../screens/Licenses/LicenseScreen';
import HelpDesk from '../screens/Help/HelpDesk';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  const {user, isLoading} = useAuth();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Onboarding"
          component={OnboardingScreen}
        />
        

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Auth"
          component={AuthNavigation}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
        <Stack.Screen
          name="ProductNavigation"
          component={ProductNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PreviewItem"
          component={PreviewItem}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Payment"
          component={PaymentNavigation}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Order"
          component={PaymentNavigation}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Setting"
          component={SettingNavigation}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="OrderDetailScreen"
          component={OrderDetailScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="License"
          component={LicenseScreen}
        />

        <Stack.Screen
          name="NoOrderScreen"
          component={NoOrderScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="CategoryPage"
          component={CategoryDetailPage}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DeleteAccount"
          component={DeleteAccountNavigation}
        />

        <Stack.Screen
          name="UploadAllItem"
          component={UploadAllItem}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ReportItem"
          component={ReportScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Rating"
          component={RatingScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HelpDesk"
          component={HelpDesk}
        />
      </Stack.Navigator>
    </>
  );
};

export default RootNavigation;
