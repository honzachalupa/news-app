import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';

export const useCustomTheme = () => {
    const colorScheme = useColorScheme();
    const signatureRed = '#FF0006';

    const MyLightTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: signatureRed
        },
    };

    const MyDarkTheme = {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: signatureRed
        },
    };

    return colorScheme === 'dark' ? MyDarkTheme : MyLightTheme;
}
