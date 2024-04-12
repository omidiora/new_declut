import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useThemeUtility} from './src/utils/theme/hooks';
import {BaseView, ViewContainer} from './src/component/view';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@emotion/react';
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  const {colors, variant} = useThemeUtility('light', true);
  const theme = {dark: Boolean(variant === 'dark'), colors};

  
  return (
    <Provider store={store}>
    <NavigationContainer  theme={theme}>
      <ThemeProvider theme={theme}>
          <RootNavigation />
      </ThemeProvider>
    </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
