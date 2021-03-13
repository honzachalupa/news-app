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
            marginLeft: 20
        },
        searchButton: {
            width: 40,
            height: 40,
            backgroundColor: theme.colors.card,
            padding: 10,
            borderRadius: 22,
            overflow: 'hidden',
            opacity: 0.6,
            position: 'absolute',
            top: 60,
            right: 20
        },
        searchInput: {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            fontSize: 17,
            borderRadius: 10,
            padding: 12,
            paddingTop: 8,
            paddingBottom: 7,
            margin: 20,
            marginBottom: 0
        },
        articlesList: {
            marginTop: 20
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
            padding: 15,
            paddingTop: 10
        },
        date: {
            color: 'white',
            opacity: 0.7,
            marginBottom: 5
        },
        articleTitle: {
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 20
        }
    });
};
