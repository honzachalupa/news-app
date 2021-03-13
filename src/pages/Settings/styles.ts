import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet } from 'react-native';

export default () => {
    const theme = useTheme();

    const cardWidthHeight = (Dimensions.get('window').width / 3) - 15;

    return StyleSheet.create({
        sectionTitle: {
            color: theme.colors.text,
            fontSize: 14,
            opacity: 0.8
        },
        switchContainer: {
            backgroundColor: theme.colors.card
        },
        switchLabel: {
            color: theme.colors.text
        },
        textInput: {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderRadius: 10,
            margin: 12,
            padding: 10
        },
        description: {
            color: theme.colors.text,
            lineHeight: 23,
            marginLeft: 15,
            opacity: 0.8
        }
    });
};
