import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet } from 'react-native';

export default () => {
    const theme = useTheme();

    const screenWidth = Dimensions.get('window').width;
    const cardMargin = 20;
    const cardWidth = screenWidth - cardMargin * 2;
    const imageWidthHeight = screenWidth / 3;
    const textWidth = cardWidth - imageWidthHeight;

    return StyleSheet.create({
        feedName: {
            color: theme.colors.text,
            fontSize: 28,
            fontWeight: '700',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20
        },
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: 15,
            marginLeft: cardMargin,
            marginRight: cardMargin,
            marginBottom: 20,
            flex: 1,
            flexDirection: 'row',
            overflow: 'hidden'
        },
        image: {
            width: imageWidthHeight,
            height: imageWidthHeight,
            borderRadius: 15,
            aspectRatio: 1 / 1
        },
        textContainer: {
            width: textWidth,
            height: imageWidthHeight,
            padding: 15
        },
        articleTitle: {
            fontSize: 20,
            fontWeight: '700',
        },
        articleContent: {
            color: theme.colors.text,
            fontSize: 18,
            lineHeight: 25,
            marginBottom: 20,
            opacity: 0.7,
            overflow: 'hidden'
        }
    });
};
