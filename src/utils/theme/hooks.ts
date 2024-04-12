import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useMemo} from 'react';
import {DARK_THEME, LIGHT_THEME} from './theme';

type themeStorageProp = {
  variant: 'light' | 'dark';
};
const {getItem} = useAsyncStorage('@afrikobo_user_theme');

export const useThemeUtility = (
  variant: 'light' | 'dark' = 'light',
  stored = false,
) => {
  let selectedTheme = variant === 'light' ? LIGHT_THEME : DARK_THEME;
  if (stored) {
    getItem().then(result => {
      const stored_variant = result
        ? (JSON.parse(result) as themeStorageProp).variant
        : variant;
      selectedTheme = stored_variant === 'light' ? LIGHT_THEME : DARK_THEME;
    });
  }
  return useMemo(() => ({...selectedTheme}), [selectedTheme]);
};
