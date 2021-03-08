import { Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default (theme: Theme) => StyleSheet.create({
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
    }
});
