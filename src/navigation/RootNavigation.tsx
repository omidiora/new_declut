import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/Onboarding/Index';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { useAuth } from '../screens/Auth/hook';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  const { user, isLoading } = useAuth();


  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Onboarding"
        component={OnboardingScreen}
      /> */}
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Auth"
        component={AuthNavigation}
      /> */}
       <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeNavigation}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
