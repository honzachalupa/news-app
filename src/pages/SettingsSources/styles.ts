import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default () => {
    const { colors } = useTheme();

    return StyleSheet.create({
        sectionTitle: {
            color: colors.text,
            fontSize: 14,
            opacity: 0.8
        },
        itemContainer: {
            backgroundColor: colors.card
        },
        itemLabel: {
            color: colors.text
        },
        textInput: {
            backgroundColor: colors.card,
            color: colors.text,
            borderRadius: 10,
            margin: 12,
            padding: 10
        },
        icon: {
            marginRight: 15
        },
        description: {
            color: colors.text,
            lineHeight: 23,
            marginLeft: 15,
            opacity: 0.8
        }
    });
};
