import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {useThemeUtility} from './src/utils/theme/hooks';
import {BaseView, ViewContainer} from './src/component/view';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@emotion/react';
import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const {colors, variant} = useThemeUtility('light', true);
  const theme = {dark: Boolean(variant === 'dark'), colors};

  const MyTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: '#F9FAFB',
      secondary: '#F9FAFB',
      secondaryContainer: 'white',
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <GestureHandlerRootView>
          <ThemeProvider theme={theme}>
            <AlertNotificationRoot theme="light">
              <RootNavigation />
            </AlertNotificationRoot>
          </ThemeProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
