import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet } from 'react-native';

export default () => {
    const { colors } = useTheme();

    const screenWidth = Dimensions.get('window').width;
    const cardMargin = 20;
    const cardWidth = screenWidth - cardMargin * 2;
    const imageWidthHeight = screenWidth / 3;
    const textWidth = cardWidth - imageWidthHeight;

    return StyleSheet.create({
        headline: {
            fontSize: 28,
            fontWeight: '700',
            marginTop: 20,
            marginLeft: 20
        },
        searchButton: {
            width: 40,
            height: 40,
            backgroundColor: colors.card,
            padding: 10,
            borderRadius: 22,
            overflow: 'hidden',
            opacity: 0.6,
            position: 'absolute',
            top: 60,
            right: 20
        },
        searchInput: {
            backgroundColor: colors.card,
            color: colors.text,
            fontSize: 17,
            borderRadius: 10,
            padding: 12,
            paddingTop: 8,
            paddingBottom: 7,
            margin: 20,
            marginBottom: 0
        },
        activityIndicator: {
            position: 'relative',
            top: Dimensions.get('window').height / 3
        },
        articlesList: {
            marginTop: 20
        },
        card: {
            backgroundColor: colors.card,
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
            color: colors.text,
            opacity: 0.7,
            marginBottom: 5
        },
        articleTitle: {
            color: colors.text,
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 22,
            marginTop: 10
        },
        message: {
            position: 'relative',
            top: 80,
            color: colors.text,
            fontSize: 20,
            textAlign: 'center'
        }
    });
};
