import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default () => {
    const theme = useTheme();

    return StyleSheet.create({
        date: {
            color: theme.colors.text,
            fontSize: 15,
            fontWeight: '600',
            textTransform: 'uppercase',
            opacity: 0.4
        },
        headline: {
            color: theme.colors.text,
            fontSize: 40,
            fontWeight: '700',
            marginTop: 5
        },
        subheadline: {
            color: theme.colors.text,
            fontSize: 24,
            fontWeight: '700',
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 20
        }
    });
};
