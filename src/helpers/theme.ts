import { Context } from '@honzachalupa/helpers';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useContext } from 'react';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { IContext } from '../App';
import { EThemes } from '../enumerators';

export const useCustomTheme = () => {
    const { settingsTheme } = useContext(Context) as IContext;
    const colorScheme = useColorScheme();
    const accentColor = '#fd425e';
    const isDark = (settingsTheme === EThemes.SYSTEM && colorScheme === 'dark') || settingsTheme === EThemes.DARK

    const MyLightTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: accentColor
        }
    };

    const MyDarkTheme = {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: accentColor
        }
    };

    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);

    return isDark ? MyDarkTheme : MyLightTheme;
}
