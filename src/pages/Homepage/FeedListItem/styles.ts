import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet } from 'react-native';

export default () => {
    const theme = useTheme();

    const cardWidthHeight = (Dimensions.get('window').width / 3) - 15;
    const imageWidthHeight = cardWidthHeight - 35;

    return StyleSheet.create({
        card: {
            width: cardWidthHeight,
            height: cardWidthHeight,
            backgroundColor: theme.colors.card,
            borderRadius: 15,
            marginLeft: 15,
            marginBottom: 15,
            overflow: 'hidden'
        },
        logo: {
            width: imageWidthHeight,
            height: imageWidthHeight,
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20
        },
        feedName: {
            height: 18,
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center'
        }
    });
};
