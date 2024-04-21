import 'react-native-gesture-handler';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnboardingScreen from './src/Screen/Onboarding/OnboardingScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigation from './src/navigation/AuthNavigation';
import HomeNavigation from './src/navigation/HomeNavigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import BottomTabNavigation from './src/navigation/BottomTabBar';
import OrderNavigation from './src/navigation/OrderNavigation';
import SingularOrderComponent from './src/component/SingularOrderComponent';
import Rating from './src/Screen/History/Rating';
import SearchScreen from './src/Screen/Search/SearchScreen';
import ProfileScreen from './src/Screen/Profile/ProfileScreen';
import {RootStackParamList} from './src/navigation/types/NavigationTypes';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import AddItem1 from './src/Screen/Product/component/AddItem1';
import PreviewItem from './src/Screen/Product/PreviewItem';
import LicenseScreen from './src/Screen/Licenses/LicenseScreen';
import ProductNavigation from './src/navigation/ProductNavigation';
import Setting from './src/Screen/Setting';
import {MenuProvider} from 'react-native-popup-menu';
import CategoryProductDetail from './src/Screen/Product/CategoryProductDetail';
import PaymentInfo from './src/Screen/Preaayment/PaymentInfo';
import PaymentNavigation from './src/navigation/PaymentNavigation';
import OrderScreen from './src/Screen/Order/OrderScreen';
import UploadAllItem from './src/Screen/Product/UploadAllItem';
import {LocalStorage} from './src/Util/Storage';
import AddItem3 from './src/Screen/Product/component/AddItem3';
import AddItem2 from './src/Screen/Product/component/AddItem2';
import AddItem4 from './src/Screen/Product/component/AddItem4';
import {HP} from './src/Util/Util';
import {SheetProvider} from 'react-native-actions-sheet';
import './sheets';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import RoutingRoute from './src/navigation/PrivateRoute';
import {ThemeProvider} from '@rneui/themed';
import Register2 from './src/Screen/Auth/Register2';
import LoginScreen from './src/Screen/Auth/Login';
import ConfirmPayment from './src/Screen/Payment/ConfirmPayment';
import PreviewScreenNoModal from './src/component/PreviewScreenModal';
import ShowProductDetails from './src/Screen/Product/ShowProductDetails';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const HideOnboardingScreen = LocalStorage.getBoolean('hideOnboardingScreen');
  const {getItem, setItem} = useAsyncStorage('@declut_user');
  const [users, setUsers] = React.useState(null);

  const readItemFromStorage = async () => {
    const item = await getItem();
    setUsers(JSON.parse(item)?.user);
  };

  React.useEffect(() => {
    readItemFromStorage();
  }, [users]);

  // useAsyncStorage.setItem(
  //   '@declut_user',
  //   JSON.stringify({ user, access_token })
  // );

  // console.log(users,'almdl')

  return (
    <Provider store={store}>
      <>
        <AlertNotificationRoot theme="light">
          <>
            <MenuProvider>
              <NavigationContainer>
                <>
                  <Stack.Navigator>
                    {/* <Stack.Screen
                        name="Onboarding"
                        component={LoginScreen}
                        options={{
                          headerShown: false,
                        }}
                      /> */}
                    {/* 
                   
                    {/*                     
                 {users && (
                      <Stack.Screen
                        name="Auth"
                        component={LoginScreen}
                        options={{
                        headerShown: false,
                        }}
                      />
                    )}  */}
                    {/*
                     */}

                    {/* {HideOnboardingScreen && (
                      <Stack.Screen
                        name="Onboarding"
                        component={OnboardingScreen}
                        options={{
                          headerShown: false,
                        }}
                      />
                    )} */}

                    {/* <Stack.Screen
                      name="Auth"
                      component={AuthNavigation}
                      options={{
                        headerShown: false,
                      }}
                    /> */}

                    <Stack.Screen
                      name="RoutingRoute"
                      component={RoutingRoute}
                      options={{
                        headerShown: false,
                      }}
                    />

                    <Stack.Screen
                      name="PreviewItem"
                      component={PreviewItem}
                      options={{
                        headerShown: false,
                      }}
                    />
                  </Stack.Navigator>
                </>
              </NavigationContainer>
            </MenuProvider>
          </>
        </AlertNotificationRoot>
      </>
    </Provider>
  );
};
('');

export default App;

const styles = StyleSheet.create({
  StatusBar: {
    height: HP(5),
    backgroundColor: 'white',
},
});
