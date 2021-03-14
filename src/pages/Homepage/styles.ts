import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default () => {
    const theme = useTheme();

    return StyleSheet.create({
        networkStatus: {
            width: 40,
            height: 40,
            padding: 10,
            opacity: 0.6,
            position: 'absolute',
            top: 24,
            right: 60
        },
        settingsButton: {
            width: 40,
            height: 40,
            padding: 10,
            opacity: 0.6,
            position: 'absolute',
            top: 20,
            right: 20
        },
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
        },
        feedsGrid: {
            paddingLeft: 5
        },
        warningMessage: {
            color: theme.colors.text,
            fontSize: 20,
            textAlign: 'center',
            margin: 60
        }
    });
};
