import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default () => {
    const theme = useTheme();

    return StyleSheet.create({
        card: {
            width: 140,
            height: 140,
            backgroundColor: theme.colors.card,
            borderRadius: 15,
            marginLeft: 10,
            marginBottom: 10,
            overflow: 'hidden'
        },
        logo: {
            width: 100,
            height: 100,
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20
        },
        feedName: {
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 5
        },
    });
};
