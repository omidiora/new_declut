import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/Onboarding/Index';
import LoginScreen from '../screens/Auth/LoginScreen';
import Register1 from '../screens/Auth/Register1';
import Register2 from '../screens/Auth/Register2';
import CreatePassword from '../screens/Auth/CreatePassword';
import OtpScreen from '../screens/Auth/OtpScreen';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="login"
        component={LoginScreen}
      />
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="register1"
        component={Register1}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="register2"
        component={Register2}
      />
      */}
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="createPassword"
        component={CreatePassword}
      /> */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="otp"
        component={OtpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
